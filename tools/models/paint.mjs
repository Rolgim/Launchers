/* Retouche les couleurs d'une maquette déjà préparée (prep.mjs, cut.js), pièce par pièce, sans refaire la découpe.
   Usage (depuis socle/models, où sont installés les outils) :
     node ../../tools/models/paint.mjs <maquette.glb> '<règles JSON>'
   Règles : [[pièce, réglages], …] ; pièce = clé de la pièce (nœud « <clé>_m ») ou « * » pour toutes ;
   réglages : { c:[r,g,b] couleur de base en sRGB 0-255 (déjà ramenée à 35 %, comme dans prep.mjs), k: facteur sur la couleur existante,
               metal, rough }. Chaque pièce reçoit ses propres copies des matériaux, pour qu'une couleur ne déborde pas sur une autre pièce.
   Couleurs approchées, choisies à l'œil (réservoir externe orange de la navette, acier de Starship…), signalées dans CREDITS.md. */
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune } from '@gltf-transform/functions';
const [file, rulesJ] = process.argv.slice(2);
const rules = JSON.parse(rulesJ);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
const doc = await io.read(file), root = doc.getRoot();
const DIM = 0.35, lin = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const parentOf = new Map(); root.listNodes().forEach(p => p.listChildren().forEach(c => parentOf.set(c, p)));
function partOf(n){ for (let p = n; p; p = parentOf.get(p)) { const m = /^(.*)_m$/.exec(p.getName() || ''); if (m) return m[1]; } return null; }
const copies = new Map(), done = {};
for (const n of root.listNodes().filter(n => n.getMesh())) {
  const k = partOf(n), r = rules.filter(([key]) => key === '*' || key === k).map(x => x[1]);
  if (!r.length) continue;
  for (const prim of n.getMesh().listPrimitives()) {
    const m0 = prim.getMaterial(); if (!m0) continue;
    const id = k + '|' + m0.getName() + '|' + root.listMaterials().indexOf(m0);
    if (!copies.has(id)) {
      const m = m0.clone().setName((m0.getName() || 'mat') + '_' + k);
      for (const s of r) {
        if (s.c) m.setBaseColorFactor([...s.c.map(v => lin(v) * DIM), m.getBaseColorFactor()[3]]);
        if (s.k) m.setBaseColorFactor(m.getBaseColorFactor().map((v, i) => i < 3 ? Math.min(1, v * s.k) : v));
        if (s.metal != null) m.setMetallicFactor(Math.min(m.getMetallicFactor(), s.metal));
        if (s.rough != null) m.setRoughnessFactor(s.rough);
      }
      copies.set(id, m); done[k] = (done[k] || 0) + 1;
    }
    prim.setMaterial(copies.get(id));
  }
}
await doc.transform(prune());
await io.write(file, doc);
console.log(file, JSON.stringify(done));
