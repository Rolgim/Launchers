/* Fait tourner toute la scène d'une maquette et fige la rotation dans les sommets (avant prep.mjs).
   Usage (depuis socle/models) : node ../../tools/models/rot.mjs <source.glb> <sortie.glb> <axe x|y|z> <degrés>
   Ex. une maquette couchée le long de -Z, pointe vers -Z : rot.mjs a.glb b.glb x 90 (la pointe passe en haut, +Y). */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { transformMesh, prune } from '@gltf-transform/functions';
const [src, dst, ax, deg] = process.argv.slice(2);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(src), root = doc.getRoot(), scene = root.getDefaultScene() || root.listScenes()[0];
const h = (+deg) * Math.PI / 360, q = [0, 0, 0, Math.cos(h)]; q['xyz'.indexOf(ax)] = Math.sin(h);
const top = doc.createNode('rot').setRotation(q);
scene.listChildren().forEach(n => { scene.removeChild(n); top.addChild(n); }); scene.addChild(top);
/* chaque nœud porteur de maillage : sa matrice dans la scène est appliquée aux sommets, puis il passe à la racine sans transformation
   (un maillage partagé par plusieurs nœuds est d'abord copié) */
const used = new Set();
const meshNodes = root.listNodes().filter(n => n.getMesh());
const W = new Map(meshNodes.map(n => [n, n.getWorldMatrix()]));
for (const n of meshNodes) {
  let m = n.getMesh(); if (used.has(m)) { m = m.clone(); n.setMesh(m); } used.add(m);
  m.listPrimitives().forEach(p => { p.setAttribute('POSITION', p.getAttribute('POSITION').clone()); if (p.getAttribute('NORMAL')) p.setAttribute('NORMAL', p.getAttribute('NORMAL').clone()); });
  transformMesh(m, W.get(n));
  n.setTranslation([0, 0, 0]).setRotation([0, 0, 0, 1]).setScale([1, 1, 1]);
  n.listChildren().forEach(c => n.removeChild(c));
}
root.listNodes().forEach(n => { if (n.getMesh()) { const p = n.getParentNode(); if (p) p.removeChild(n); scene.addChild(n); } });
root.listNodes().filter(n => !n.getMesh()).forEach(n => n.dispose());
await doc.transform(prune());
await io.write(dst, doc);
