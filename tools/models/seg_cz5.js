/* Longue Marche 5 (maquette d'andertan, Sketchfab, CC BY 4.0) : le corps central et les étages supérieurs sont un seul maillage.
   Redécoupage face par face : chaque triangle est classé d'après la position de son centre (hauteur, distance à l'axe),
   avec des hauteurs de séparation tirées des longueurs publiées (propulseurs 27,6 m, premier étage 33,16 m, deuxième 11,54 m,
   sur 56,97 m) : les limites entre étages sont donc approchées.
   Usage (modules de socle/models) : node tools/models/seg_cz5.js source.glb sortie.glb ; puis tools/models/prep.mjs. */
const { NodeIO } = require('@gltf-transform/core');
const { ALL_EXTENSIONS } = require('@gltf-transform/extensions');
const { prune } = require('@gltf-transform/functions');
const [src, dst] = process.argv.slice(2);
const Y0 = -7.36, H = 15.92, cut = f => Y0 + H * f;
const cls = (x, y, z) => {
  if (Math.hypot(x, z) > 0.8 && y < cut(27.6 / 56.97)) return 'boosters';
  if (y < cut(33.16 / 56.97)) return 'core';
  if (y < cut(44.7 / 56.97)) return 'stage2';
  return 'fairing';
};
(async () => {
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS), doc = await io.read(src), root = doc.getRoot(), buffer = root.listBuffers()[0];
  const buckets = new Map(), stats = {};
  for (const node of root.listNodes()) { const mesh = node.getMesh(); if (!mesh) continue; const M = node.getWorldMatrix();
    for (const prim of mesh.listPrimitives()) {
      const pos = prim.getAttribute('POSITION'), nor = prim.getAttribute('NORMAL'), uv = prim.getAttribute('TEXCOORD_0'), idx = prim.getIndices();
      const n = pos.getCount(), W = [], N = [], U = [], v = [0, 0, 0], t2 = [0, 0];
      for (let i = 0; i < n; i++) { pos.getElement(i, v);
        W.push([M[0]*v[0]+M[4]*v[1]+M[8]*v[2]+M[12], M[1]*v[0]+M[5]*v[1]+M[9]*v[2]+M[13], M[2]*v[0]+M[6]*v[1]+M[10]*v[2]+M[14]]);
        if (nor) { nor.getElement(i, v); const a = [M[0]*v[0]+M[4]*v[1]+M[8]*v[2], M[1]*v[0]+M[5]*v[1]+M[9]*v[2], M[2]*v[0]+M[6]*v[1]+M[10]*v[2]], l = Math.hypot(...a) || 1; N.push(a.map(q => q / l)); } else N.push([0, 1, 0]);
        if (uv) { uv.getElement(i, t2); U.push([t2[0], t2[1]]); } else U.push([0, 0]); }
      const ia = idx ? idx.getArray() : null, T = ia ? ia.length : n, mat = prim.getMaterial();
      for (let t = 0; t < T; t += 3) { const tri = [ia ? ia[t] : t, ia ? ia[t+1] : t+1, ia ? ia[t+2] : t+2];
        const c = [0, 1, 2].map(k => (W[tri[0]][k] + W[tri[1]][k] + W[tri[2]][k]) / 3), k = cls(...c), key = k + '|' + (mat ? mat.getName() : '');
        let bk = buckets.get(key); if (!bk) { bk = { cls:k, mat, pos:[], nor:[], uv:[], idx:[] }; buckets.set(key, bk); }
        for (const vi of tri) { bk.idx.push(bk.pos.length / 3); bk.pos.push(...W[vi]); bk.nor.push(...N[vi]); bk.uv.push(...U[vi]); }
        stats[k] = (stats[k] || 0) + 1; } } }
  root.listScenes().forEach(s => s.listChildren().forEach(ch => s.removeChild(ch)));
  root.listNodes().forEach(n => n.dispose()); root.listMeshes().forEach(m => m.dispose());
  const scene = root.listScenes()[0]; let bi = 0;
  for (const bk of buckets.values()) {
    const prim = doc.createPrimitive()
      .setAttribute('POSITION', doc.createAccessor().setType('VEC3').setArray(new Float32Array(bk.pos)).setBuffer(buffer))
      .setAttribute('NORMAL', doc.createAccessor().setType('VEC3').setArray(new Float32Array(bk.nor)).setBuffer(buffer))
      .setAttribute('TEXCOORD_0', doc.createAccessor().setType('VEC2').setArray(new Float32Array(bk.uv)).setBuffer(buffer))
      .setIndices(doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(bk.idx)).setBuffer(buffer));
    if (bk.mat) prim.setMaterial(bk.mat);
    scene.addChild(doc.createNode(bk.cls).setMesh(doc.createMesh(bk.cls + '_' + (bi++)).addPrimitive(prim)));
  }
  await doc.transform(prune()); await io.write(dst, doc);
  console.log(dst, JSON.stringify(stats));
})();
