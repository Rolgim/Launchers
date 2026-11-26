# Lanceurs — Launchers

Site des lanceurs spatiaux, quatrième site de la famille [Observatoires en orbite](https://rolgim.github.io/Observatories/),
[Explorateurs du Système solaire](https://rolgim.github.io/SolarExplorers/) et [Observateurs de la Terre](https://rolgim.github.io/EarthObservers/) :
https://rolgim.github.io/Launchers/

Les lanceurs en 3D, étage par étage (cliquer un étage l'identifie, « Éclater » écarte les étages), une fiche sourcée par lanceur,
« Comparer » (silhouettes à la même échelle, dimensions, capacités avec leur orbite de référence) et « Flotte » (frise des périodes de service).
Première vague : Ariane 5, Ariane 6, Vega-C, Falcon 9, Falcon Heavy, SLS, Soyouz-2, Longue Marche 5.

Règles communes : tout est sourcé, l'approximatif est signalé (« ≈ »), bilingue (anglais par défaut), WCAG 2.1 AA, site non commercial,
code sous licence Apache 2.0, licence de chaque média vérifiée et tracée ([CREDITS.md](CREDITS.md)).

## Organisation

| Chemin | Rôle |
|---|---|
| `site.json`, `build.js` | réglages du site ; `node build.js` assemble `index.html` avec le socle commun |
| `socle/` | copie du socle commun ([Rolgim/rolgim.github.io](https://github.com/Rolgim/rolgim.github.io), dossier `socle/`) : ne pas modifier ici (`node socle/check.js`) |
| `src/data-launchers.js` | registre des lanceurs : dimensions, capacités, étages, sources, maquette ; `src/en/` : textes anglais |
| `src/app.js`, `src/views.js` | page d'un lanceur (vue 3D + fiche), pages « Comparer » et « Flotte » |
| `models/` | maquettes préparées par `tools/models/prep.mjs` (voir ci-dessous) |
| `tools/smoke.js`, `tools/a11y.js`, `tools/i18n-scan.js` | tests dans un vrai navigateur (workflow « Tests ») |
| `tools/credits.js` | écrit `CREDITS.md` et `data/credits.json` |
| `tools/probe/fetch_sketchfab.py` | sonde (workflow « Sonde ») : télécharge une maquette Sketchfab avec le jeton du secret `SKETCHFAB_TOKEN` et relève sa licence et ses nœuds |

## Maquettes

Elles viennent de Sketchfab (CC BY 4.0) et du dépôt NASA 3D Resources (navette) ; le détail est dans [CREDITS.md](CREDITS.md). Chaque maquette est regroupée en étages nommés comme les clés `parts` du registre
(`tools/models/prep.mjs`, avec des règles sur le nom des nœuds ou, quand les noms ne disent rien, sur la position des pièces) :

```
cd socle/models && npm ci && cd ../.. && ln -s ../../socle/models/node_modules tools/models/node_modules
node tools/models/prep.mjs source.glb models/<id>.glb '[["Fairing","fairing"],["Second Stage","stage2"],[".","stage1"]]'
node tools/credits.js
```

Quand plusieurs étages partagent un même maillage, `tools/models/cut.js` les redécoupe face par face d'après la hauteur de chaque face
et les longueurs publiées des étages (Longue Marche 5, Saturn V, Atlas V, Proton-M, Titan IV, PSLV : limites entre étages approchées, signalées dans la fiche).
Une maquette couchée est d'abord redressée par `tools/models/rot.mjs`. Quand les couleurs de la source sont fausses ou trop sombres
(métal sans reflets dans la vue 3D), `tools/models/paint.mjs` les retouche pièce par pièce, après la découpe (couleurs approchées) :

```
node tools/models/paint.mjs models/shuttle.glb '[["srb",{"c":[238,238,232]}],["et",{"c":[196,104,46],"rough":0.8}],["orbiter",{"c":[236,236,232]}]]'
node tools/models/paint.mjs models/titan4.glb '[["*",{"c":[222,222,216]}]]'
node tools/models/paint.mjs models/starship.glb '[["*",{"k":1.9,"metal":0.3}]]'
node tools/models/paint.mjs models/falconheavy.glb '[["*",{"k":2.6,"metal":0.3}]]'
```
 Sans maquette libre convenable (Delta II et Vega pour l'instant),
la vue 3D montre un point et la fiche reste complète.