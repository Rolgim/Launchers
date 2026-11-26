/* Prépare une maquette de lanceur pour le site : regroupe les nœuds en pièces nommées (étages, propulseurs, coiffe…),
   fige les transformations dans les maillages (la vue éclatée du socle déplace les maillages dans le repère de la scène),
   réduit les textures et quantifie les positions.
   Usage (depuis socle/models, où sont installés les outils : npm ci) :
     node ../../tools/models/prep.mjs <source.glb> <sortie.glb> '<règles JSON>' [texMax=512] [simplify=1] [erreur=0.0005]
   Règles : [[motif, clé], …] ; le premier motif (expression régulière, sur le nom du nœud) qui correspond à un nœud ou à l'un de
   ses parents donne la clé ; dernier motif conseillé : [".", "<clé par défaut>"].
   Un motif qui commence par « @ » est une condition sur la boîte du maillage dans la scène (maquettes aux nœuds sans nom parlant) :
   c = centre [x, y, z], lo et hi = coins, en unités de la maquette ; ex. "@Math.abs(c[0]) > 0.5" ou "@c[1] > 5.3 && c[1] < 6". */
import { NodeIO, getBounds } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { flatten, clearNodeTransform, prune, dedup, quantize, textureCompress, weld, simplify, metalRough } from '@gltf-transform/functions';
import { MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';
const [src, dst, rulesJ, texMax = '512', ratio = '1', err = '0.0005'] = process.argv.slice(2);
const rules = JSON.parse(rulesJ).map(([re, k]) => re[0] === '@' ? [{ geo:new Function('c', 'lo', 'hi', 'return ' + re.slice(1)) }, k] : [new RegExp(re), k]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(src), root = doc.getRoot(), scene = root.getDefaultScene() || root.listScenes()[0];
/* clé de chaque nœud porteur de maillage, d'après lui-même puis ses parents (du plus proche au plus lointain) */
const parentOf = new Map(); root.listNodes().forEach(p => p.listChildren().forEach(c => parentOf.set(c, p)));
const keyOf = new Map(), count = {};
root.listNodes().filter(n => n.getMesh()).forEach(n => {
  let k = null; const B = getBounds(n), c = B.min.map((v, i) => (v + B.max[i]) / 2);
  for (const [re, key] of rules) {
    if (re.geo) { if (re.geo(c, B.min, B.max)) k = key; }
    else for (let p = n; p && !k; p = parentOf.get(p)) if (re.source !== '.' && re.test(p.getName() || '')) k = key;
    if (k) break; }
  if (!k) k = (rules.find(([re]) => re.source === '.') || [])[1] || 'autre';
  keyOf.set(n, k); count[k] = (count[k] || 0) + 1;
});
/* matériaux « spéculaire-brillance » (ancien format) : convertis en métal-rugosité, sinon la couleur de base ignore l'assombrissement */
if (root.listExtensionsUsed().some(e => e.extensionName === 'KHR_materials_pbrSpecularGlossiness')) await doc.transform(metalRough());
await doc.transform(flatten());
const groups = {};
for (const [n, k] of keyOf) {
  clearNodeTransform(n);
  if (!groups[k]) { groups[k] = doc.createNode(k); scene.addChild(groups[k]); }
  scene.removeChild(n); groups[k].addChild(n); n.setName(k + '_m');
}
scene.listChildren().filter(n => !Object.values(groups).includes(n)).forEach(n => scene.removeChild(n));
/* matériaux « sans éclairage » (KHR_materials_unlit, fréquents sur Sketchfab) : retirés, sinon la vue 3D ne peut pas surligner l'étage choisi */
for (const e of root.listExtensionsUsed()) if (e.extensionName === 'KHR_materials_unlit') e.dispose();
/* couleurs de base ramenées à 35 % : la lumière de la vue 3D du socle (socle/page/viewer.js) est réglée pour des sondes sombres ;
   sans cela, les lanceurs blancs saturent et l'étage choisi (les autres sont assombris) ne se distingue pas */
const DIM = +(process.env.DIM || 0.35);
for (const m of root.listMaterials()) m.setBaseColorFactor(m.getBaseColorFactor().map((v, i) => i < 3 ? v * DIM : v));
const steps = [dedup(), prune(), textureCompress({ encoder: sharp, targetFormat: 'jpeg', resize: [+texMax, +texMax] })];
if (+ratio < 1) { await MeshoptSimplifier.ready; steps.unshift(weld(), simplify({ simplifier: MeshoptSimplifier, ratio: +ratio, error: +err })); }
steps.push(quantize({ quantizePosition: 14, quantizeNormal: 10, quantizeTexcoord: 12 }));
await doc.transform(...steps);
await io.write(dst, doc);
const b = getBounds(scene);
console.log(dst, JSON.stringify(count), 'taille', b.max.map((v, i) => +(v - b.min[i]).toFixed(2)).join(' × '));
