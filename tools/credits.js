/* Registre des crédits et licences : écrit CREDITS.md et data/credits.json à partir de src/data-launchers.js (maquettes)
   et de la liste fixe ci-dessous (polices, bibliothèques, outils). Ne pas modifier CREDITS.md à la main : node tools/credits.js
   data/credits.json est lu par le workflow « Liens et licences » (socle/data/check_links.py). */
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..');
const ctx = {}; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ROOT, 'src', 'data-launchers.js'), 'utf8') + ';this.M = MISSIONS;', ctx);
const CC = { 'CC BY 4.0':'https://creativecommons.org/licenses/by/4.0/' };
const items = [];
for (const m of ctx.M) if (m.file) items.push({ kind:'maquette 3D', file:m.file, title:m.model.src, source:m.model.u, page:m.model.u, license:m.model.license, license_url:CC[m.model.license] || null,
  credit:/NASA 3D Resources/.test(m.model.src) ? 'NASA, NASA 3D Resources (GitHub)' : m.model.src.replace(/^« [^»]+ », /, '').replace(/ \(Sketchfab\)$/, '') + ', Sketchfab', fetched:'2026-11-26',
  transform:(m.id === 'cz5' ? 'redécoupée face par face (tools/models/seg_cz5.js), ' : '') + (/NASA 3D Resources/.test(m.model.src) ? 'téléchargée depuis le dépôt nasa/NASA-3D-Resources, redressée (tools/models/rot.mjs)' : 'téléchargée par l\'API de Sketchfab (tools/probe/fetch_sketchfab.py)') + ', nœuds regroupés par étage, transformations figées, couleurs de base assombries pour l\'éclairage du site, textures réduites à 512 px (JPEG), géométrie quantifiée (tools/models/prep.mjs)' + (['shuttle', 'titan4', 'starship', 'falconheavy'].indexOf(m.id) >= 0 ? ', couleurs retouchées pièce par pièce, approchées (tools/models/paint.mjs)' : '') + (m.id === 'vegac' ? ', simplifiée (socle/models/slim.mjs, sans textures)' : m.id === 'ariane5' ? ', simplifiée' : '') + ' ; ' + (m.model.note || ''), status:'ok' });
const fixed = [
  ['police', 'Google Fonts', 'Archivo ; IBM Plex Mono', 'https://fonts.google.com/', 'SIL Open Font License 1.1', 'https://openfontlicense.org/', 'Omnibus-Type (Archivo) ; IBM (Plex)', 'aucune (chargées depuis Google Fonts)'],
  ['schéma', 'src/views.js (SVG)', 'Silhouettes à l\'échelle et frise des lanceurs', null, 'créés pour ce site', null, 'Lanceurs', 'schémas dessinés à partir des dimensions citées dans chaque fiche'],
  ['code', 'src/, build.js, tools/', 'Code du site (Lanceurs)', 'https://github.com/Rolgim/Launchers', 'Apache-2.0 (code seulement : les maquettes gardent leur licence)', 'https://github.com/Rolgim/Launchers/blob/main/LICENSE', 'Rolgim', '—'],
  ['code', 'socle/', 'Socle commun de la série (copie de Rolgim/rolgim.github.io)', 'https://github.com/Rolgim/rolgim.github.io', 'Apache-2.0 (code du même auteur)', 'https://github.com/Rolgim/rolgim.github.io', 'Rolgim', 'copié tel quel (socle/sync.js)'],
  ['code', 'three.js r128 (cdnjs)', 'rendu 3D dans le navigateur', 'https://github.com/mrdoob/three.js/blob/r128/LICENSE', 'MIT', 'https://github.com/mrdoob/three.js/blob/r128/LICENSE', null, 'servi aux visiteurs tel quel'],
  ['code', 'GLTFLoader.js (three@0.128.0, jsDelivr)', 'lecture des maquettes glTF', 'https://github.com/mrdoob/three.js/blob/r128/LICENSE', 'MIT', 'https://github.com/mrdoob/three.js/blob/r128/LICENSE', null, 'servi aux visiteurs tel quel'],
  ['code', '@gltf-transform/core, extensions, functions 4.5.1', 'préparation des maquettes', 'https://github.com/donmccurdy/glTF-Transform/blob/main/LICENSE.md', 'MIT', 'https://github.com/donmccurdy/glTF-Transform/blob/main/LICENSE.md', null, 'outil de préparation, pas distribué avec le site'],
  ['code', 'meshoptimizer', 'simplification des maquettes', 'https://github.com/zeux/meshoptimizer/blob/master/LICENSE.md', 'MIT', 'https://github.com/zeux/meshoptimizer/blob/master/LICENSE.md', null, 'outil de préparation, pas distribué avec le site'],
  ['code', 'sharp', 'réduction des textures', 'https://github.com/lovell/sharp/blob/main/LICENSE', 'Apache-2.0', 'https://github.com/lovell/sharp/blob/main/LICENSE', null, 'outil de préparation, pas distribué avec le site'],
  ['code', 'Playwright', 'tests et captures (tools/smoke.js, tools/a11y.js)', 'https://github.com/microsoft/playwright/blob/main/LICENSE', 'Apache-2.0', 'https://github.com/microsoft/playwright/blob/main/LICENSE', null, 'outil de test, pas distribué avec le site'],
  ['code', 'axe-core', 'audit d\'accessibilité (tools/a11y.js)', 'https://github.com/dequelabs/axe-core/blob/develop/LICENSE', 'MPL-2.0', 'https://github.com/dequelabs/axe-core/blob/develop/LICENSE', null, 'outil de test, pas distribué avec le site']
];
for (const [kind, file, title, source, license, license_url, credit, transform] of fixed) items.push({ kind, file, title, source, page:source, license, license_url, credit, fetched:null, transform, status:'ok' });
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROOT, 'data', 'credits.json'), JSON.stringify({ generated:today, items }, null, 1) + '\n');
const cell = s => String(s == null ? '—' : s).replace(/\|/g, '\\|');
const groups = [['maquette 3D', 'Maquettes 3D'], ['schéma', 'Schémas'], ['police', 'Polices'], ['code', 'Code']];
let md = '# Crédits et licences\n\nRegistre de tout ce que le site affiche et qui ne vient pas de lui : maquettes 3D, polices et bibliothèques.\n' +
  'Il est **généré** par `tools/credits.js` à partir de `src/data-launchers.js` : ne pas le modifier à la main. La provenance et la licence de chaque maquette sont aussi écrites sous la vue 3D, sur le site.\n\n' +
  'Généré le ' + today + '. Licences des maquettes relevées dans la réponse de l\'API de Sketchfab au téléchargement (`tools/probe/fetch_sketchfab.py`), puis sur la page de chaque modèle. Le site est non commercial.\n\n' +
  'Les valeurs chiffrées des fiches ne sont pas des médias : chacune cite sa source dans la fiche (lien à côté de la valeur).\n';
for (const [k, t] of groups) { const g = items.filter(i => i.kind === k); if (!g.length) continue;
  md += '\n## ' + t + ' (' + g.length + ')\n\n| Fichier | Titre | Crédit | Licence | Statut | Source | Transformations |\n|---|---|---|---|---|---|---|\n' +
    g.map(i => '| `' + cell(i.file) + '` | ' + cell(i.title) + ' | ' + cell(i.credit) + ' | ' + (i.license_url ? '[' + cell(i.license) + '](' + i.license_url + ')' : cell(i.license)) + ' | ' + i.status + ' | ' + (i.source ? '[page](' + i.source + ')' : '—') + ' | ' + cell(i.transform) + ' |').join('\n') + '\n'; }
fs.writeFileSync(path.join(ROOT, 'CREDITS.md'), md);
console.log('CREDITS.md, data/credits.json : ' + items.length + ' entrées');
