/* Liste des pages du site, partagée par les tests (smoke.js, i18n-scan.js, a11y.js) : une seule source, lue dans le registre.
   IDS : lanceurs (src/data-launchers.js) ; PAGES = ALL : pages d'ensemble et page de chaque lanceur. */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const IDS = [...fs.readFileSync(path.join(ROOT, 'src', 'data-launchers.js'), 'utf8').matchAll(/^    id:'(\w+)'/gm)].map(m => m[1]);
const VIEWS = ['comparer', 'flotte'];
const PAGES = [...VIEWS, ...IDS];
module.exports = { ROOT, IDS, INST: [], VIEWS, PAGES, ALL: PAGES };
