/* =================================================================
   VUES D'ENSEMBLE — « Comparer » (silhouettes à l'échelle, dimensions, capacités) et « Flotte » (frise des lanceurs).
   Tout part de MISSIONS (src/data-launchers.js) : dims, cap, sil, first, last, status.
   Views.page(route) -> HTML ou null ; Views.mount(route) après insertion.
================================================================= */
var Views = (function(){
'use strict';
var T = function(s){ return OBS_T(s); };
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function n(v, d){ if (v == null) return '—'; var s = (d != null ? v.toFixed(d) : String(v)); return OBS_LANG === 'en' ? s : s.replace('.', ','); }
function src(m, k){ var r = k && m.refs[k]; return r ? ' <a class="src" href="' + esc(r.u) + '" rel="noopener" target="_blank" title="' + esc(r.t) + '">' + esc(T(r.p)) + '</a>' : ''; }
function approx(o){ return o && o.approx ? '≈ ' : ''; }

/* ---------- familles : les lanceurs sont rangés par pays ou région, puis par premier vol ---------- */
var GROUPS = [['eu', 'Europe'], ['us', 'États-Unis'], ['ru', 'Russie'], ['cn', 'Chine'], ['jp', 'Japon'], ['in', 'Inde']];
var GI = {}; GROUPS.forEach(function(g, i){ GI[g[0]] = i; });
MISSIONS.sort(function(a, b){ return (GI[a.group] - GI[b.group]) || (a.first < b.first ? -1 : a.first > b.first ? 1 : 0); });
function groupName(id){ for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i][0] === id) return T(GROUPS[i][1]); return ''; }
/* [[groupe, [lanceurs…]], …] dans l'ordre de GROUPS */
function byGroup(){ var out = []; MISSIONS.forEach(function(m){ var l = out[out.length - 1]; if (!l || l[0] !== m.group) out.push(l = [m.group, []]); l[1].push(m); }); return out; }
function grpRow(g, n){ return '<tr class="grp"><th scope="colgroup" colspan="' + n + '">' + esc(groupName(g)) + '</th></tr>'; }

/* ---------- silhouettes (schéma) ---------- */
/* m.sil = { body:[{ d, h, k:'core'|'up'|'fair'|'cap', nose }], bst:{ n, d, h, nose }, side:{ d, h, y, nose } } : du bas vers le haut, en mètres.
   nose : hauteur de la partie effilée en haut du segment (coiffe, tour de sauvetage, pointe des propulseurs). */
function seg(x, y, w, h, nose, cls){
  var top = y - h, nz = Math.min(nose || 0, h);
  if (!nz) return '<rect class="' + cls + '" x="' + (x - w / 2).toFixed(1) + '" y="' + top.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '"/>';
  var yb = top + nz;
  return '<path class="' + cls + '" d="M' + (x - w / 2).toFixed(1) + ' ' + y.toFixed(1) + 'V' + yb.toFixed(1) + 'Q' + (x - w / 2).toFixed(1) + ' ' + (top + nz * 0.25).toFixed(1) + ' ' + x.toFixed(1) + ' ' + top.toFixed(1) +
    'Q' + (x + w / 2).toFixed(1) + ' ' + (top + nz * 0.25).toFixed(1) + ' ' + (x + w / 2).toFixed(1) + ' ' + yb.toFixed(1) + 'V' + y.toFixed(1) + 'Z"/>';
}
function silWidth(m){ var s = m.sil, w = 0; s.body.forEach(function(b){ w = Math.max(w, b.d); }); if (s.bst) w = Math.max(w, s.body[0].d + 2 * s.bst.d); if (s.side) w = Math.max(w, s.body[0].d + 2 * (s.side.d + (s.bst ? s.bst.d : 0))); return w; }
function silhouette(m, cx, base, k){
  var s = m.sil, out = '', y = base;
  if (s.bst){ var off = (s.body[0].d + s.bst.d) / 2 * k;
    out += seg(cx - off, base, s.bst.d * k, s.bst.h * k, (s.bst.nose || 0) * k, 'sil-bst') + seg(cx + off, base, s.bst.d * k, s.bst.h * k, (s.bst.nose || 0) * k, 'sil-bst'); }
  /* side : élément accroché sur le côté (orbiteur de la navette), posé à side.y mètres du sol, dessiné de profil */
  if (s.side){ var sx = cx + (s.body[0].d / 2 + (s.bst ? s.bst.d : 0) + s.side.d / 2) * k;
    out += seg(sx, base - s.side.y * k, s.side.d * k, s.side.h * k, (s.side.nose || 0) * k, 'sil-cap'); }
  s.body.forEach(function(b){ out += seg(cx, y, b.d * k, b.h * k, (b.nose || 0) * k, 'sil-' + b.k); y -= b.h * k; });
  return out;
}
function comparer(){
  var L = MISSIONS, H = 0; L.forEach(function(m){ H = Math.max(H, m.dims.h.v); });
  /* toute la largeur de la page : colonnes serrées, noms longs sur deux lignes, un écart plus grand et un titre entre familles */
  var top = 52, bottom = 62, plotH = 460, k = plotH / (Math.ceil(H / 10) * 10), gap = 12, ggap = 30, x = 66, cols = [], heads = [];
  byGroup().forEach(function(G, gi){
    if (gi) x += ggap - gap;
    var x0 = x;
    G[1].forEach(function(m){ var w = Math.max(silWidth(m) * k, 50); cols.push({ m:m, x:x + w / 2, w:w }); x += w + gap; });
    heads.push({ g:G[0], a:x0, b:x - gap });
  });
  var human = 1.8, W = x + 10, base = top + plotH, g = '';
  for (var hgt = 0; hgt <= H + 0.1; hgt += 10){ var yy = base - hgt * k; g += '<line class="gl" x1="40" x2="' + (W - 10) + '" y1="' + yy.toFixed(1) + '" y2="' + yy.toFixed(1) + '"/><text class="gt" x="36" y="' + (yy + 4).toFixed(1) + '" text-anchor="end">' + hgt + ' m</text>'; }
  heads.forEach(function(h){
    g += '<line class="gh" x1="' + h.a.toFixed(1) + '" x2="' + h.b.toFixed(1) + '" y1="' + (top - 30) + '" y2="' + (top - 30) + '"/><text class="gn" x="' + h.a.toFixed(1) + '" y="' + (top - 36) + '">' + esc(groupName(h.g)) + '</text>';
  });
  cols.forEach(function(c){
    var m = c.m, h = m.dims.h.v * k, nm = String(m.short), sp = -1;
    if (nm.length > 9) nm.replace(/ /g, function(_, i){ if (sp < 0 || Math.abs(i - nm.length / 2) < Math.abs(sp - nm.length / 2)) sp = i; });   /* coupure la plus proche du milieu */
    var lines = sp > 0 ? [nm.slice(0, sp), nm.slice(sp + 1)] : [nm];
    g += '<a href="#' + m.id + '" aria-label="' + esc(m.name) + ', ' + n(m.dims.h.v) + ' m">' +
      '<rect class="bx" x="' + (c.x - c.w / 2 - 4).toFixed(1) + '" y="' + (base - h - 4).toFixed(1) + '" width="' + (c.w + 8).toFixed(1) + '" height="' + (h + 52).toFixed(1) + '"/>' +
      silhouette(m, c.x, base, k) +
      lines.map(function(l, i){ return '<text class="nm" x="' + c.x.toFixed(1) + '" y="' + (base + 17 + i * 14) + '" text-anchor="middle">' + esc(l) + '</text>'; }).join('') +
      '<text class="hm" x="' + c.x.toFixed(1) + '" y="' + (base + 18 + lines.length * 14) + '" text-anchor="middle">' + approx(m.dims.h) + n(m.dims.h.v) + ' m</text></a>';
  });
  /* silhouette humaine (1,8 m) à la même échelle, au pied de la grille */
  var hx = 54, hh = human * k;
  g += '<rect x="' + (hx - 0.6) + '" y="' + (base - hh).toFixed(1) + '" width="1.6" height="' + hh.toFixed(1) + '" fill="#FFD21F"/>';
  var svg = '<svg viewBox="0 0 ' + W.toFixed(0) + ' ' + (base + bottom) + '" style="min-width:' + Math.round(W * 0.7) + 'px" role="group" aria-label="' + T('Lanceurs à la même échelle') + '"><desc>' +
    L.map(function(m){ return esc(m.name) + ' ' + n(m.dims.h.v) + ' m'; }).join(', ') + '. ' + T('Trait jaune à gauche : une personne de 1,8 m.') + '</desc>' + g + '</svg>';
  var dimRows = byGroup().map(function(G){ return grpRow(G[0], 5) + G[1].map(function(m){ var d = m.dims;
    return '<tr><th scope="row"><a href="#' + m.id + '">' + esc(m.name) + '</a></th><td class="num">' + approx(d.h) + n(d.h.v) + ' m' + src(m, d.h.ref) + '</td><td class="num">' + approx(d.d) + n(d.d.v) + ' m' + src(m, d.d.ref) + '</td><td class="num">' + (d.mass ? approx(d.mass) + n(d.mass.v) + ' t' + src(m, d.mass.ref) : '—') + '</td><td class="num">' + (d.thrust ? approx(d.thrust) + n(d.thrust.v) + ' kN' + src(m, d.thrust.ref) : '—') + '</td></tr>'; }).join(''); }).join('');
  var ORB = [['LEO', T('Orbite basse')], ['GTO', T('Transfert géostationnaire')], ['TLI', T('Vers la Lune')]];
  var capRows = byGroup().map(function(G){ return grpRow(G[0], 4) + G[1].map(function(m){
    return '<tr><th scope="row"><a href="#' + m.id + '">' + esc(m.name) + '</a></th>' + ORB.map(function(o){
      var c = (m.cap || []).filter(function(x){ return x.o === o[0]; })[0];
      return '<td class="num">' + (c ? approx(c) + n(c.t) + ' t' + src(m, c.ref) + (c.note ? '<small>' + esc(T(c.note)) + '</small>' : '') : '—') + '</td>';
    }).join('') + '</tr>'; }).join(''); }).join('');
  return '<div class="sk full"><h2>' + T('Comparer') + '</h2>' +
    '<p class="lead">' + T('Les lanceurs côte à côte, à la même échelle, rangés par pays ou région. Cliquer une silhouette ouvre la vue 3D du lanceur.') + '</p>' +
    '<figure class="cmp-fig">' + svg + '</figure><div class="cmp-text">' +
    '<p class="note">' + T('Silhouettes simplifiées (schéma) : hauteur totale et diamètres publiés, longueurs d\'étages approchées, deux propulseurs d\'appoint dessinés même quand il y en a quatre. Version la plus haute de chaque lanceur.') + '</p>' +
    '<h3>' + T('Dimensions') + '</h3><table class="sk-table cmp-tab"><thead><tr><th scope="col">' + T('Lanceur') + '</th><th scope="col" class="num">' + T('Hauteur') + '</th><th scope="col" class="num">' + T('Diamètre') + '</th><th scope="col" class="num">' + T('Masse au décollage') + '</th><th scope="col" class="num">' + T('Poussée au décollage') + '</th></tr></thead><tbody>' + dimRows + '</tbody></table>' +
    '<h3>' + T('Capacités') + '</h3><table class="sk-table cmp-tab"><thead><tr><th scope="col">' + T('Lanceur') + '</th>' + ORB.map(function(o){ return '<th scope="col" class="num">' + o[1] + '</th>'; }).join('') + '</tr></thead><tbody>' + capRows + '</tbody></table>' +
    '<p class="note">' + T('Masse utile maximale annoncée par le constructeur ou l\'opérateur, pour l\'orbite de référence indiquée sous chaque chiffre ; les orbites de référence diffèrent d\'un lanceur à l\'autre, donc les chiffres ne se comparent qu\'en ordre de grandeur.') + '</p></div></div>';
}

/* ---------- Flotte ---------- */
function flotte(){
  var L = MISSIONS, GR = byGroup();
  var y0 = Math.floor(Math.min.apply(null, L.map(function(m){ return +m.first.slice(0, 4); })) / 10) * 10, y1 = new Date().getUTCFullYear() + 1, W = 900, left = 150, right = 20, rowH = 34, gH = 30, top = 26;
  var X = function(d){ var t = typeof d === 'string' ? (+d.slice(0, 4) + ((+d.slice(5, 7) || 1) - 1) / 12) : d; return left + (t - y0) / (y1 - y0) * (W - left - right); };
  var H = top + L.length * rowH + GR.length * gH + 4, g = '';
  for (var y = y0; y <= y1; y += (y1 - y0 > 40 ? 10 : 5)){ g += '<line class="fl-grid" x1="' + X(y).toFixed(1) + '" x2="' + X(y).toFixed(1) + '" y1="' + (top - 6) + '" y2="' + (H - 6) + '"/><text class="fl-year" x="' + X(y).toFixed(1) + '" y="' + (top - 10) + '" text-anchor="middle">' + y + '</text>'; }
  var today = new Date().toISOString().slice(0, 10), yy = top;
  GR.forEach(function(G){
    yy += gH; g += '<text class="fl-grp" x="0" y="' + (yy - 9) + '">' + esc(groupName(G[0])) + '</text><line class="fl-gl" x1="0" x2="' + (W - right) + '" y1="' + (yy - 4) + '" y2="' + (yy - 4) + '"/>';
    G[1].forEach(function(m){
      var c = yy + 14, a = X(m.first), b = X(m.last || today);
      g += '<a href="#' + m.id + '"><text class="fl-lab" x="' + (left - 10) + '" y="' + (c + 4) + '" text-anchor="end">' + esc(m.short) + '</text></a>' +
        '<rect class="fl-bar' + (m.last ? ' off' : m.status === 'dev' ? ' dev' : '') + '" x="' + a.toFixed(1) + '" y="' + (c - 5) + '" width="' + Math.max(2, b - a).toFixed(1) + '" height="10"><title>' + esc(m.name) + '</title></rect>' +
        '<circle class="fl-mark" cx="' + a.toFixed(1) + '" cy="' + c + '" r="5"/>';
      yy += rowH;
    });
  });
  var rows = GR.map(function(G){ return grpRow(G[0], 5) + G[1].map(function(m){ var st = m.last ? T('Retiré') : m.status === 'dev' ? T('En développement') : T('En service');
    return '<tr><th scope="row"><a href="#' + m.id + '">' + esc(m.name) + '</a></th><td>' + esc(m.agency) + '</td><td>' + esc(m.first) + src(m, m.firstRef) + '</td><td>' + (m.last ? esc(m.last) + src(m, m.lastRef) : '—') + '</td><td>' + st + '</td></tr>'; }).join(''); }).join('');
  return '<div class="sk wide"><h2>' + T('Flotte') + '</h2><p class="lead">' + T('Premier vol et période de service de chaque lanceur, par pays ou région.') + '</p>' +
    '<figure class="fl-fig"><svg viewBox="0 0 ' + W + ' ' + H + '" role="group" aria-label="' + T('Frise des lanceurs, du premier vol à aujourd\'hui ou au dernier vol') + '">' + g + '</svg></figure>' +
    '<p class="note">' + T('Barre foncée : en service ; barre hachurée : en développement ; barre claire : retiré. Point orange : premier vol.') + '</p>' +
    '<table class="sk-table cmp-tab"><thead><tr><th scope="col">' + T('Lanceur') + '</th><th scope="col">' + T('Opérateur') + '</th><th scope="col">' + T('Premier vol') + '</th><th scope="col">' + T('Dernier vol') + '</th><th scope="col">' + T('État') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
}

var PAGES = { comparer:comparer, flotte:flotte };
return {
  groupName:groupName,
  page:function(r){ return PAGES[r] ? PAGES[r]() : null; },
  mount:function(){}
};
})();
