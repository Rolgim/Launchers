/* Redécoupe face par face une maquette dont les étages ne sont pas des nœuds séparés : chaque triangle reçoit une clé d'après
   la position de son centre. Généralise seg_cz5.js. La maquette doit être debout (+Y vers le haut, voir rot.mjs).
   Usage (modules de socle/models) : node tools/models/cut.js source.glb sortie.glb '<règles JSON>' ; puis tools/models/prep.mjs.
   Règles : [[condition, clé], …], la première vraie l'emporte ; dernière règle conseillée : ["true", "<clé par défaut>"].
   Variables de la condition : f = hauteur relative (0 en bas, 1 en haut de la maquette), r = distance à l'axe vertical
   divisée par la hauteur totale, x, y, z = position brute, n = nom du nœud d'origine. Ex. ["r > 0.03 && f < 0.48", "boosters"].
   La clé « drop » écarte la face (socle d'exposition, exemplaire en double…).
   Les hauteurs de coupe se tirent des longueurs publiées des étages : les limites entre étages sont donc approchées. */
const { NodeIO } = require('@gltf-transform/core');
const { ALL_EXTENSIONS } = require('@gltf-transform/extensions');
const { prune } = require('@gltf-transform/functions');
const [src, dst, rulesJ] = process.argv.slice(2);
const rules = JSON.parse(rulesJ).map(([c, k]) => [new Function('f', 'r', 'x', 'y', 'z', 'n', 'return ' + c), k]);
let Y0 = 0, H = 1, CX = 0, CZ = 0;
const cls = (x, y, z, n) => { const f = (y - Y0) / H, r = Math.hypot(x - CX, z - CZ) / H;
  for (const [c, k] of rules) if (c(f, r, x, y, z, n)) return k; return 'autre'; };
(async () => {
  const io = new NodeIO().registerExtensions(ALL_EXTENSIONS), doc = await io.read(src), root = doc.getRoot(), buffer = root.listBuffers()[0];
  { const lo = [1e9, 1e9, 1e9], hi = [-1e9, -1e9, -1e9], v = [0, 0, 0];
    for (const node of root.listNodes()) { const mesh = node.getMesh(); if (!mesh) continue; const M = node.getWorldMatrix();
      for (const prim of mesh.listPrimitives()) { const pos = prim.getAttribute('POSITION');
        for (let i = 0; i < pos.getCount(); i++) { pos.getElement(i, v);
          const w = [M[0]*v[0]+M[4]*v[1]+M[8]*v[2]+M[12], M[1]*v[0]+M[5]*v[1]+M[9]*v[2]+M[13], M[2]*v[0]+M[6]*v[1]+M[10]*v[2]+M[14]];
          for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], w[k]); hi[k] = Math.max(hi[k], w[k]); } } } }
    Y0 = lo[1]; H = hi[1] - lo[1]; CX = (lo[0] + hi[0]) / 2; CZ = (lo[2] + hi[2]) / 2;
    console.log('boîte', lo.map(q => q.toFixed(3)), hi.map(q => q.toFixed(3))); }
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
        const c = [0, 1, 2].map(k => (W[tri[0]][k] + W[tri[1]][k] + W[tri[2]][k]) / 3), k = cls(c[0], c[1], c[2], node.getName() || ''), key = k + '|' + (mat ? mat.getName() : '');
        if (k === 'drop') continue;   /* clé « drop » : face écartée (socle, deuxième exemplaire éclaté…) */
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
