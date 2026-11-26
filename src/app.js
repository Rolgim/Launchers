/* =================================================================
   APPLICATION — en-tête, routage par ancre, page d'un lanceur (vue 3D + panneau).
   Reprise d'EarthObservers (src/app.js) sans la Terre ni la page « Mission et données ». Rien ici n'est propre à un lanceur :
   tout part de MISSIONS (src/data-launchers.js). Pages d'ensemble (Comparer, Flotte) : src/views.js.
================================================================= */
(function(){
'use strict';
function $(id){ return document.getElementById(id); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
/* titre et maison de l'en-tête : page d'accueil commune des sites (https://rolgim.github.io/), dans la même langue */
document.querySelectorAll('.hub-link, .home-link').forEach(function(a){ a.href = 'https://rolgim.github.io/#' + OBS_LANG; });
function launcher(id){ for (var i = 0; i < MISSIONS.length; i++) if (MISSIONS[i].id === id) return MISSIONS[i]; return null; }
var T = OBS_T;
/* anglais : nom court et note de la maquette (champs que socle/page/i18n.js ne reprend pas) */
if (OBS_LANG === 'en') MISSIONS.forEach(function(m){ var e = EN_MISSIONS[m.id] || {}; if (e.short) m.short = e.short; if (e.model && e.model.note && m.model) m.model.note = e.model.note; });

function isDark(){ var a = document.documentElement.getAttribute('data-theme'); return a ? a === 'dark' : !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches); }
(function(){ try { var v = localStorage.getItem('ln-theme'); if (v === 'dark' || v === 'light') document.documentElement.setAttribute('data-theme', v); } catch(e){} })();

/* vues d'ensemble : boutons fixes en haut à droite, même graisse quel que soit l'état */
var VIEWS = [['lanceurs', 'Lanceurs'], ['comparer', 'Comparer'], ['flotte', 'Flotte']];
function renderHeader(route){
  var cur = launcher(route);
  $('tabs').innerHTML = cur ? '<div class="trow" role="tablist" aria-label="' + T('Lanceur') + '">' + MISSIONS.map(function(m){
    return '<button class="tab" role="tab" data-go="' + m.id + '" aria-selected="' + (m.id === cur.id) + '">' + esc(m.short || m.name) + '<small>' + esc(m.year || '') + '</small></button>';
  }).join('') + '</div>' : '';
  $('views').innerHTML = '<div class="views">' + VIEWS.map(function(v){
    var on = route === v[0] || (v[0] === 'lanceurs' && cur);
    return '<button class="vbtn" data-go="' + v[0] + '" aria-pressed="' + !!on + '">' + T(v[1]) + '</button>';
  }).join('') + '</div>';
  var ll = OBS_LANG === 'en' ? 'Lire en français' : 'Read in English';
  var h = '<button class="tab util lang" id="b-lang" title="' + ll + '" aria-label="' + ll + '" lang="' + (OBS_LANG === 'en' ? 'fr' : 'en') + '"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="10" r="7.6"/><path d="M2.4 10h15.2M10 2.4c2.2 2.1 3.3 4.6 3.3 7.6s-1.1 5.5-3.3 7.6M10 2.4C7.8 4.5 6.7 7 6.7 10s1.1 5.5 3.3 7.6"/></svg><span>' + (OBS_LANG === 'en' ? 'FR' : 'EN') + '</span></button>';
  var dk = isDark(), lab = T(dk ? 'Passer au thème clair' : 'Passer au thème sombre');
  h += '<button class="tab util theme" id="b-theme" title="' + lab + '" aria-label="' + lab + '"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">' +
       (dk ? '<circle cx="10" cy="10" r="3.6"/><path d="M10 1.8v2.2M10 16v2.2M1.8 10H4M16 10h2.2M4.2 4.2l1.6 1.6M14.2 14.2l1.6 1.6M4.2 15.8l1.6-1.6M14.2 5.8l1.6-1.6"/>'
           : '<path d="M16.6 12.1A7 7 0 0 1 7.9 3.4a7 7 0 1 0 8.7 8.7z" stroke-linejoin="round"/>') + '</svg></button>';
  $('utils').innerHTML = h;
}

/* ---------- page d'un lanceur ---------- */
var CREDITS_URL = 'https://github.com/Rolgim/Launchers/blob/main/CREDITS.md';
function src(m, k){
  var r = k && m.refs && m.refs[k];
  return r ? ' <a class="src" href="' + esc(r.u) + '" rel="noopener" target="_blank" title="' + esc(r.t) + '">' + esc(T(r.p)) + '</a>' : '';
}
function fiche(m){
  var h = '<p class="desc">' + esc(m.desc || '') + '</p>';
  (m.sections || []).forEach(function(sec){
    h += '<h3>' + esc(sec.title) + '</h3><table class="sk-table"><tbody>' + sec.rows.map(function(r){
      return '<tr><th scope="row">' + esc(r[0]) + '</th><td>' + esc(OBS_NUM(r[1])) + src(m, r[2]) + '</td></tr>';
    }).join('') + '</tbody></table>';
  });
  return h + '<p class="note">' + T('Valeurs vérifiées le') + ' ' + esc(m.checked) + '. ' + T('« ≈ » : valeur approchée.') + '</p>' +
    '<button class="cta" data-go="comparer">' + T('Comparer') + '<small>' + T('Tous les lanceurs à la même échelle, et leurs capacités.') + '</small></button>';
}
function partsHtml(m, sel){
  return '<ul class="parts">' + m.parts.map(function(p){
    var on = p.key === sel;
    return '<li class="part' + (on ? ' on' : '') + '"><button data-part="' + p.key + '" aria-expanded="' + on + '">' + esc(p.name) + '</button>' +
      (on ? '<div class="part-body"><p>' + esc(p.desc) + '</p>' + (p.facts.length ? '<ul>' + p.facts.map(function(f){ return '<li>' + esc(OBS_NUM(f[0])) + src(m, f[1]) + '</li>'; }).join('') + '</ul>' : '') + '</div>' : '') + '</li>';
  }).join('') + '</ul>' + modelNote(m);
}
function modelNote(m){
  return m.file ? '<p class="note">' + T('Maquette') + ' : <a href="' + esc(m.model.u) + '" rel="noopener" target="_blank">' + esc(m.model.src) + '</a> · ' + T('Licence') + ' : ' + esc(m.model.license) + ' · <a href="' + CREDITS_URL + '" rel="noopener" target="_blank">' + T('registre des crédits') + '</a>' + (m.model.note ? '<br>' + esc(m.model.note) : '') + '</p>'
    : '<p class="note">' + T('Pas encore de maquette 3D libre de droits pour ce lanceur : il est figuré par un point. Sa silhouette est dans « Comparer ».') + '</p>';
}
var MS = { tab:'fiche', part:null, explode:0, run:!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) };
function launcherPage(m){
  if (MS.mid !== m.id){ MS.part = null; MS.mid = m.id; }   /* l'étage choisi ne passe pas d'un lanceur à l'autre */
  return '<div class="mission"><section id="stage" class="m-stage" aria-label="' + T('Vue 3D du lanceur') + '">' +
    '<div class="m-hud"><div class="m-name">' + esc(m.name) + '</div><div class="m-sub">' + esc(m.agency) + '</div></div>' +
    '<p class="m-msg" id="m-msg" hidden></p>' +
    '<div class="m-tools" role="toolbar" aria-label="' + T('Affichage') + '">' +
      (m.file ? '<label class="m-ex" title="' + T('Écarter les étages') + '">' + ICO.ex + '<span class="lbl">' + T('Éclater') + '</span><input id="m-explode" type="range" min="0" max="100" value="' + Math.round(MS.explode*100) + '" aria-label="' + T('Écarter les étages') + '"></label>' : '') +
      '<button class="m-b" id="m-reset" title="' + T('Recadrer') + '">' + ICO.reset + '<span class="lbl">' + T('Recadrer') + '</span></button>' +
      '<button class="m-b" id="m-run" aria-pressed="' + !MS.run + '" title="' + T('Pause') + '">' + ICO.pause + '<span class="lbl">' + T('Pause') + '</span></button></div>' +
    '<p class="m-hint">' + T(m.file ? 'Glisser pour tourner, molette pour zoomer, cliquer un étage pour l\'identifier' : 'Glisser pour tourner, molette pour zoomer') + '</p>' +
    '</section><aside class="m-panel"><h2 class="sr-only">' + esc(m.name) + '</h2>' +
    '<div class="ptl-row"><div class="ptl" role="tablist" aria-label="' + T('Contenu du panneau') + '">' +
      (m.parts.length ? ['fiche', 'parts'] : ['fiche']).map(function(k){ return '<button class="ptab" role="tab" data-ptab="' + k + '" aria-selected="' + (MS.tab === k) + '">' + T(k === 'fiche' ? 'Fiche' : 'Étages') + (k === 'parts' ? ' <small>' + m.parts.length + '</small>' : '') + '</button>'; }).join('') +
    '</div></div><div id="m-body">' + (MS.tab === 'fiche' || !m.parts.length ? fiche(m) : partsHtml(m, MS.part)) + '</div></aside></div>';
}
/* icônes de la barre d'outils de la vue 3D (mêmes traits que celles d'Observatories) */
var ICO = (function(){ function i(d){ return '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true" focusable="false">' + d + '</svg>'; }
  return { ex:i('<rect x="5.5" y="5.5" width="5" height="5"/><path d="M8 3.6V1M8 15v-2.6M3.6 8H1M15 8h-2.6"/>'), reset:i('<path d="M1.5 5.5v-4h4M14.5 5.5v-4h-4M1.5 10.5v4h4M14.5 10.5v4h-4"/>'), pause:i('<path d="M5.5 3.5v9M10.5 3.5v9"/>') }; })();
function mountLauncher(m){
  var msg = $('m-msg');
  if (!Viewer.available()){ msg.hidden = false; msg.textContent = T('La vue 3D demande WebGL, indisponible ici. La fiche reste lisible à droite.'); return; }
  Viewer.open($('stage'), m, {
    onPick:function(k){ MS.part = k; MS.tab = 'parts'; renderPanel(m); },
    onState:function(st){ msg.hidden = st === 'ready'; msg.textContent = st === 'loading' ? T('Chargement de la maquette…') : st === 'nogl' ? T('La vue 3D demande WebGL, indisponible ici. La fiche reste lisible à droite.') : st === 'error' ? T('La maquette n\'a pas pu être chargée.') : ''; }
  });
  Viewer.select(MS.part); Viewer.explode(MS.explode); Viewer.run(MS.run);
  if ($('m-explode')) $('m-explode').addEventListener('input', function(e){ MS.explode = e.target.value / 100; Viewer.explode(MS.explode); });
  $('m-reset').addEventListener('click', function(){ Viewer.reset(m); });
  /* pause : arrête la rotation (WCAG 2.2.2) */
  $('m-run').addEventListener('click', function(e){ MS.run = !MS.run; Viewer.run(MS.run); e.currentTarget.setAttribute('aria-pressed', String(!MS.run)); });
}
function renderPanel(m){
  if (!m.parts.length) MS.tab = 'fiche';
  document.querySelectorAll('.m-panel [data-ptab]').forEach(function(b){ b.setAttribute('aria-selected', String(b.getAttribute('data-ptab') === MS.tab)); });
  $('m-body').innerHTML = MS.tab === 'fiche' ? fiche(m) : partsHtml(m, MS.part);
}

function currentRoute(){ return (location.hash || '').replace(/^#/, '').replace(/^(en|fr)-/, ''); }
function route(){
  var r = currentRoute() || 'comparer';
  if (r === 'lanceurs'){ r = window.LN_LAST || MISSIONS[0].id; history.replaceState(null, '', '#' + ((location.hash.match(/^#((?:en|fr)-)/) || [])[1] || '') + r); }   /* « Lanceurs » ouvre le dernier lanceur vu */
  var m = launcher(r);
  if (m) window.LN_LAST = m.id;
  var xp = !m && Views.page(r);
  if (!m && !xp){ r = 'comparer'; xp = Views.page(r); }
  renderHeader(m ? m.id : r);
  $('page').innerHTML = m ? launcherPage(m) : xp;
  $('page').classList.toggle('is-mission', !!m);
  if (m) mountLauncher(m); else Views.mount(r);
  var h2 = $('page').querySelector('h2');
  document.title = (h2 ? h2.textContent + ' · ' : '') + T('Lanceurs');
  $('live').textContent = h2 ? h2.textContent : '';
}

document.addEventListener('click', function(e){
  var el = e.target.closest ? e.target.closest('#b-lang,#b-theme,[data-go],[data-ptab],[data-part]') : null;
  if (!el) return;
  var cm = launcher(currentRoute());
  if (el.hasAttribute('data-ptab') && cm){ MS.tab = el.getAttribute('data-ptab'); renderPanel(cm); return; }
  if (el.hasAttribute('data-part') && cm){ var k = el.getAttribute('data-part'); MS.part = MS.part === k ? null : k; Viewer.select(MS.part); renderPanel(cm); var b = document.querySelector('[data-part="' + k + '"]'); if (b) b.focus(); return; }
  if (el.id === 'b-lang'){ var nl = OBS_LANG === 'en' ? 'fr' : 'en'; try { localStorage.setItem('ln-lang', nl); } catch(x){} location.hash = nl + '-' + currentRoute(); location.reload(); return; }
  if (el.id === 'b-theme'){ var nt = isDark() ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', nt); try { localStorage.setItem('ln-theme', nt); } catch(x){} route(); $('b-theme').focus(); return; }
  if (el.tagName === 'A') return;
  location.hash = el.getAttribute('data-go');
});
/* onglets des lanceurs : flèches gauche/droite, début, fin (motif « tablist ») */
document.addEventListener('keydown', function(e){
  var t = e.target.closest && e.target.closest('#tabs [role="tab"]'); if (!t) return;
  var all = [].slice.call(document.querySelectorAll('#tabs [role="tab"]')), i = all.indexOf(t), n = all.length, j = -1;
  if (e.key === 'ArrowRight') j = (i + 1) % n; else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n; else if (e.key === 'Home') j = 0; else if (e.key === 'End') j = n - 1;
  if (j < 0) return; e.preventDefault(); location.hash = all[j].getAttribute('data-go');
  setTimeout(function(){ var a = document.querySelector('#tabs [aria-selected="true"]'); if (a) a.focus(); }, 0);
});
window.addEventListener('hashchange', route);
OBS_I18N.static();
route();
window.__ln = { route:route, launcher:launcher };
})();
