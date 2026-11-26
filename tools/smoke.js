/* Test de fumée : parcourt le site dans Chromium et échoue à la première anomalie.
   Usage : node tools/smoke.js          (hors ligne : VENDOR=/chemin)
   Vérifie : chaque page s'ouvre sans erreur JavaScript, en français et en anglais, en thème clair et sombre ;
   registre des lanceurs complet ; boutons de vue d'ensemble immobiles (règle 6) ; bascule de langue ;
   pas de défilement horizontal sur téléphone. */
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), serve = require('./serve');
const PORT = 8134, srv = serve(PORT);
const { IDS, ALL } = require('./pages');
const PAGES = ALL;
const errors = [];
const fail = m => { errors.push(m); console.log('ÉCHEC', m); };

async function open(b, vp, dark, lang){
  const pg = await b.newPage({ viewport: vp, colorScheme: dark ? 'dark' : 'light', locale: lang === 'en' ? 'en-GB' : 'fr-FR' });
  await serve.lang(pg, lang);
  pg.on('pageerror', e => fail('erreur JavaScript : ' + e.message));
  pg.on('console', m => { if (m.type() === 'error' && !/GL Driver|ERR_|Failed to load resource/.test(m.text())) fail('console : ' + m.text().slice(0, 200)); });
  await serve.offline(pg, PORT);
  return pg;
}
const go = async (pg, h) => { await pg.goto('http://localhost:' + PORT + '/index.html#' + h); await pg.waitForTimeout(200); };
const overflow = async (pg, where) => { const [sw, iw] = await pg.evaluate(() => [document.documentElement.scrollWidth, innerWidth]); if (sw > iw + 1) fail('défilement horizontal (' + sw + ' > ' + iw + ') sur ' + where); };

(async () => {
  const b = await chromium.launch();
  for (const lang of ['fr', 'en']) for (const dark of [false, true]) {
    const pg = await open(b, { width: 1360, height: 820 }, dark, lang);
    // ---- registre : chaque mission a ce que le site attend
    if (lang === 'fr' && !dark) {
      await go(pg, 'lanceurs');
      const miss = await pg.evaluate(() => MISSIONS.map(m => {
        const k = ['name', 'short', 'year', 'agency', 'refs', 'sections', 'checked', 'parts', 'view', 'sun', 'dims', 'cap', 'sil', 'first', 'firstRef'].concat(m.file ? ['model'] : []).filter(x => !m[x]);
        (m.parts || []).forEach(p => (p.facts || []).forEach(f => { if (f[1] && !(m.refs || {})[f[1]]) k.push('source inconnue « ' + f[1] + ' » (pièce ' + p.key + ')'); }));
        (m.sections || []).forEach(s => s.rows.forEach(r => { if (r[2] && !(m.refs || {})[r[2]]) k.push('source inconnue « ' + r[2] + ' »'); }));
        ['h', 'd', 'mass'].forEach(x => { const d = m.dims && m.dims[x]; if (d && !(m.refs || {})[d.ref]) k.push('source inconnue « ' + d.ref + ' » (dimension ' + x + ')'); });
        (m.cap || []).forEach(c => { if (!(m.refs || {})[c.ref]) k.push('source inconnue « ' + c.ref + ' » (capacité ' + c.o + ')'); });
        if (m.last && !(m.refs || {})[m.lastRef]) k.push('source du dernier vol');
        if (!(m.refs || {})[m.firstRef]) k.push('source du premier vol');
        if (!EN_MISSIONS[m.id]) k.push('EN_MISSIONS');
        return k.length ? m.id + ' : ' + k.join(', ') : '';
      }).filter(Boolean));
      miss.forEach(m => fail('registre, il manque ' + m));
    }
    for (const p of PAGES) {
      await go(pg, (lang === 'en' ? 'en-' : '') + p);
      const h2 = await pg.locator('#page h2').count();
      if (!h2) fail('page #' + p + ' (' + lang + ') : pas de titre');
      const pressed = await pg.locator('.vbtn[aria-pressed="true"]').count();
      if (pressed !== 1) fail('page #' + p + ' : ' + pressed + ' vue(s) d\'ensemble active(s) au lieu d\'une');
      if (!dark) for (const e of await pg.evaluate(() => {
        const o = [];
        document.querySelectorAll('#page img').forEach(i => { if (!i.getAttribute('alt')) o.push('image sans texte de remplacement : ' + i.getAttribute('src')); else if (i.complete && !i.naturalWidth) o.push('image introuvable : ' + i.getAttribute('src')); });
        document.querySelectorAll('#page a[href]').forEach(a => { const h = a.getAttribute('href'); if (!h || h === '#' || /undefined|null/.test(h)) o.push('lien vide : « ' + a.textContent.trim().slice(0, 40) + ' »'); });
        document.querySelectorAll('#page [data-go]').forEach(a => { if (!a.getAttribute('data-go')) o.push('bouton sans destination'); });
        return o; })) fail('page #' + p + ' (' + lang + ') : ' + e);
    }
    // ---- règle 6 : les boutons de vue d'ensemble ne bougent pas d'une page à l'autre
    const pos = [];
    for (const p of ['comparer', 'lanceurs', 'flotte', IDS[IDS.length - 1]]) { await go(pg, (lang === 'en' ? 'en-' : '') + p);
      pos.push(await pg.evaluate(() => [...document.querySelectorAll('.vbtn')].map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width)].join(','); }).join(' '))); }
    if (new Set(pos).size !== 1) fail('vues d\'ensemble : les boutons bougent (' + lang + ') : ' + pos.join(' | '));
    await pg.close();
  }
  // ---- vue 3D : chaque maquette se charge, chaque pièce du registre existe dans la maquette et se sélectionne
  { const pg = await open(b, { width: 1360, height: 820 }, false, 'fr');
    for (const id of IDS) {
      await go(pg, id);
      await pg.waitForFunction(() => document.getElementById('m-msg').hidden, null, { timeout: 60000 }).catch(() => fail(id + ' : la maquette ne se charge pas'));
      /* chaque étage du registre doit exister dans la maquette (nœud du même nom, tools/models/prep.mjs) */
      const fileKeys = await pg.evaluate(i => { const m = MISSIONS.filter(x => x.id === i)[0]; return m.file ? [m.file, m.parts.map(p => p.key)] : null; }, id);
      if (fileKeys) { const buf = fs.readFileSync(path.join(__dirname, '..', fileKeys[0])), gl = JSON.parse(buf.slice(20, 20 + buf.readUInt32LE(12)).toString());
        const names = (gl.nodes || []).map(n => n.name), miss = fileKeys[1].filter(k => names.indexOf(k) < 0);
        if (miss.length) fail(id + ' : étage(s) absent(s) de la maquette : ' + miss.join(', ')); }
      if (await pg.locator('[data-ptab="parts"]').count()) await pg.click('[data-ptab="parts"]');
      for (const k of await pg.evaluate(i => MISSIONS.filter(m => m.id === i)[0].parts.map(p => p.key), id)) {
        await pg.click('[data-part="' + k + '"]'); await pg.waitForTimeout(80);
        if (!(await pg.locator('.part.on [data-part="' + k + '"]').count())) fail(id + ' : la pièce ' + k + ' ne se sélectionne pas');
      }
    }
    await pg.close(); }
  // ---- langue : le bouton bascule et garde la page
  { const pg = await open(b, { width: 1360, height: 820 }, false, 'fr');
    await go(pg, 'flotte'); await pg.click('#b-lang'); await pg.waitForTimeout(400);
    const [l, h] = await pg.evaluate(() => [document.documentElement.lang, location.hash]);
    if (l !== 'en' || h !== '#en-flotte') fail('bascule de langue : ' + l + ' ' + h);
    await pg.click('#b-theme'); await pg.waitForTimeout(100);
    if (await pg.evaluate(() => document.documentElement.getAttribute('data-theme')) !== 'dark') fail('bascule de thème');
    await pg.close(); }
  // ---- téléphone
  { const pg = await open(b, { width: 390, height: 800 }, false, 'en');
    for (const p of PAGES) { await go(pg, 'en-' + p); await overflow(pg, 'téléphone #' + p); }
    await pg.close(); }
  await b.close(); srv.close();
  console.log(errors.length ? '\n' + errors.length + ' échec(s)' : 'Tout est passé (' + PAGES.length + ' pages, ' + IDS.length + ' lanceur(s))');
  process.exit(errors.length ? 1 : 0);
})();
