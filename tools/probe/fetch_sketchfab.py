#!/usr/bin/env python3
"""Télécharge des maquettes Sketchfab (format glb) avec le jeton du secret SKETCHFAB_TOKEN, et décrit chacune :
nom, auteur, licence déclarée, lien, taille, et noms des nœuds et maillages (pour voir si les étages sont séparés).
Usage : python tools/probe/fetch_sketchfab.py <uid> [<uid> …]   Sortie : tools/probe/_out/<uid>.glb et rapport.md
Le jeton n'est jamais écrit ni affiché."""
import os, sys, json, struct, requests
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "_out"); os.makedirs(OUT, exist_ok=True)
TOK = os.environ.get("SKETCHFAB_TOKEN", "")
S = requests.Session(); S.headers["User-Agent"] = "launchers-probe/1.0 (+https://github.com/Rolgim/Launchers)"
A = {"Authorization": "Token " + TOK} if TOK else {}
rep = ["# Maquettes Sketchfab", "", "Jeton présent : %s" % bool(TOK), ""]
def glb_names(path):
    b = open(path, "rb").read()
    if b[:4] != b"glTF": return None
    n = struct.unpack("<I", b[12:16])[0]; j = json.loads(b[20:20 + n])
    return [x.get("name", "") for x in j.get("nodes", [])], [x.get("name", "") for x in j.get("meshes", [])], [x.get("name", "") for x in j.get("materials", [])]
for uid in sys.argv[1:]:
    rep.append("## " + uid)
    try:
        m = S.get("https://api.sketchfab.com/v3/models/" + uid, timeout=60).json()
        lic = m.get("license") or {}
        rep.append("- %s, par %s (%s)" % (m.get("name"), (m.get("user") or {}).get("displayName") or (m.get("user") or {}).get("username"), (m.get("user") or {}).get("profileUrl")))
        rep.append("- licence : %s (%s) ; téléchargeable : %s ; faces %s" % (lic.get("label"), lic.get("url"), m.get("isDownloadable"), m.get("faceCount")))
        rep.append("- fiche : %s ; publié le %s" % (m.get("viewerUrl"), m.get("publishedAt")))
        desc = (m.get("description") or "").strip().replace("\n", " ")
        if desc: rep.append("- description : " + desc[:600])
        if not TOK: continue
        d = S.get("https://api.sketchfab.com/v3/models/%s/download" % uid, headers=A, timeout=60)
        if d.status_code != 200: rep.append("- téléchargement refusé : HTTP %s %s" % (d.status_code, d.text[:200])); continue
        d = d.json(); f = d.get("glb") or d.get("gltf") or {}
        rep.append("- formats proposés : %s" % ", ".join("%s (%s o)" % (k, v.get("size")) for k, v in d.items() if isinstance(v, dict)))
        if not f.get("url"): continue
        ext = ".glb" if d.get("glb") else ".zip"; p = os.path.join(OUT, uid + ext)
        with S.get(f["url"], stream=True, timeout=600) as r:
            r.raise_for_status()
            with open(p, "wb") as o:
                for c in r.iter_content(1 << 20): o.write(c)
        rep.append("- fichier : %s (%.1f Mo)" % (os.path.basename(p), os.path.getsize(p) / 1e6))
        if ext == ".glb":
            nodes, meshes, mats = glb_names(p) or ([], [], [])
            rep.append("- %d nœuds : %s" % (len(nodes), ", ".join(nodes[:80])))
            rep.append("- %d maillages ; matériaux : %s" % (len(meshes), ", ".join(mats[:40])))
    except Exception as e:
        rep.append("- erreur : %r" % e)
    rep.append("")
open(os.path.join(OUT, "rapport.md"), "w").write("\n".join(rep)); print("\n".join(rep))
