/* =================================================================
   LANCEURS — registre (le nom MISSIONS est gardé pour réutiliser le code du socle : i18n.js, viewer.js, outils de test).
   Ajouter un lanceur = une entrée ici et ses textes anglais dans en/launchers.js ; app.js et views.js n'ont pas à changer.
   build.js et tools/pages.js lisent ce registre (une ligne « id:'…' » par lanceur, indentée de 4 espaces).
     id, name, short, year      identifiant (ancre #id), nom complet, nom court, année du premier vol
     group                      famille d'affichage (pays ou région du lanceur) : eu, us, ru, cn, jp, in (ordre et noms : GROUPS dans views.js)
     agency                     constructeur et opérateur, en texte
     first, firstRef            date du premier vol (AAAA-MM-JJ) et sa source ; last, lastRef : dernier vol d'un lanceur retiré
     dims                       { h, d, mass } : hauteur (m), diamètre du corps central (m), masse au décollage (t) ;
                                chacun { v, ref, approx } (approx : valeur approchée, affichée avec « ≈ »)
     cap                        capacités : [{ o:'LEO'|'GTO'|'TLI', t (tonnes), note (orbite de référence), ref, approx }]
     sil                        silhouette de « Comparer » (schéma) : { body:[{ d, h, k, nose }] du bas vers le haut, bst:{ n, d, h, nose } }
     file, bytes, unit          maquette (models/<id>.glb, préparée par tools/models/prep.mjs), null s'il n'y en a pas ; unit : mètres par unité
     model                      { src, license, u, note } : provenance et licence de la maquette, écrites à côté d'elle
     view, sun                  cadrage initial { az, el, dist } ; direction de la lumière dans le repère de la maquette
     parts                      étages et éléments cliquables : { key (nom du nœud dans la maquette), name, desc, facts:[[texte, clé de source]] }
     refs                       sources : { clé:{ t:titre, p:éditeur, u:URL } } ; chaque valeur chiffrée cite une clé
     sections                   fiche : [{ title, rows:[[libellé, valeur, clé de source]] }] ; « ≈ » pour l'approximatif
     desc, checked              description courte ; date de la dernière vérification des valeurs
================================================================= */
var MISSIONS = [
  {
    id:'ariane5', name:'Ariane 5 ECA', short:'Ariane 5', year:'1996', group:'eu',
    agency:'ESA, ArianeGroup ; exploité par Arianespace',
    first:'1996-06-04', firstRef:'csg', last:'2023-07-05', lastRef:'csg',
    dims:{ h:{ v:53, ref:'esa' }, d:{ v:5.4, ref:'esa' }, mass:{ v:780, ref:'esa' } },
    cap:[ { o:'GTO', t:10, note:'lancement double', ref:'esa' }, { o:'LEO', t:21, ref:'csg' } ],
    sil:{ body:[ { d:5.4, h:30.5, k:'core' }, { d:5.4, h:5.5, k:'up' }, { d:5.4, h:17, k:'fair', nose:7 } ], bst:{ n:2, d:3.05, h:31.6, nose:4 } },
    file:'models/ariane5.glb', bytes:0, unit:5.43,
    model:{ src:'« Ariane 5 model », Yanis / notbadworks (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/ariane-5-model-88a1de562245402da653bc1ae92b1b91', note:'Maquette regroupée par étage d\'après la position de chaque pièce, et allégée pour ce site. Mise à l\'échelle : 53 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur lourd européen de 1996 à 2023 : 117 vols depuis Kourou, dont le télescope James Webb en 2021 et la sonde JUICE en 2023. Sa version ECA, la plus puissante, pouvait placer deux satellites de télécommunications à la fois en orbite de transfert géostationnaire.',
    checked:'2026-11-26',
    refs:{
      esa:{ t:'Ariane 5 ECA (page publiée le 5 mars 2004)', p:'ESA', u:'https://esa.int/Enabling_Support/Space_Transportation/Launch_vehicles/Ariane_5_ECA' },
      csg:{ t:'Ariane 5, the legend', p:'CNES, Centre spatial guyanais', u:'https://centrespatialguyanais.cnes.fr/en/ariane-5' }
    },
    parts:[
      { key:'eap', name:'Propulseurs d\'appoint EAP', desc:'Deux propulseurs à poudre fixés de part et d\'autre de l\'étage principal ; ils fournissent l\'essentiel de la poussée au décollage, puis se détachent.',
        facts:[['Poussée des deux propulseurs au décollage : 1 300 tonnes', 'esa']] },
      { key:'epc', name:'Étage principal EPC (moteur Vulcain 2)', desc:'Étage cryogénique allumé au sol, quelques secondes avant les propulseurs, et qui fonctionne près de neuf minutes.',
        facts:[['Ergols : 150 t d\'oxygène liquide et 25 t d\'hydrogène liquide', 'esa'], ['Poussée du Vulcain 2 : jusqu\'à 137 tonnes', 'esa'], ['Durée de fonctionnement : près de 540 s', 'esa']] },
      { key:'esc', name:'Étage supérieur ESC-A (moteur HM7B)', desc:'Étage cryogénique qui achève la mise en orbite.',
        facts:[['Ergols : 14,7 t', 'esa'], ['Poussée du HM7B dans le vide : 6,5 tonnes', 'esa'], ['Durée de fonctionnement : près de 940 s', 'esa']] },
      { key:'fairing', name:'Coiffe', desc:'Protège les satellites pendant la traversée de l\'atmosphère, puis s\'ouvre en deux. Pour un lancement double, une structure (Sylda) sépare les deux satellites sous la coiffe.',
        facts:[] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', 'jusqu\'à 53 m', 'esa'],
        ['Diamètre', 'jusqu\'à 5,4 m', 'esa'],
        ['Masse au décollage', '780 t (lancement double)', 'esa'],
        ['Étages', 'deux propulseurs à poudre EAP, étage principal EPC, étage supérieur ESC-A', 'esa']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '4 juin 1996 (premier vol de la version ECA : 11 décembre 2002, échec)', 'csg'],
        ['Dernier vol', '5 juillet 2023, 117e vol', 'csg'],
        ['Fiabilité', '98,4 % au dernier vol', 'csg'],
        ['Base de lancement', 'Centre spatial guyanais, Kourou (ensemble ELA-3)', 'csg']
      ]},
      { title:'Capacités', rows:[
        ['Orbite de transfert géostationnaire', '10 t en lancement double, 10,8 t en lancement simple', 'csg'],
        ['Orbite basse', 'jusqu\'à 21 t', 'csg']
      ]}
    ]
  },
  {
    id:'ariane6', name:'Ariane 64', short:'Ariane 6', year:'2024', group:'eu',
    agency:'ESA, ArianeGroup ; exploité par Arianespace',
    first:'2024-07-09', firstRef:'esa1',
    dims:{ h:{ v:62, ref:'cnes' }, d:{ v:5.4, ref:'esa' }, mass:{ v:860, ref:'cnes' } },
    cap:[ { o:'GTO', t:11.5, approx:true, ref:'esa' }, { o:'LEO', t:21.6, ref:'esa' } ],
    sil:{ body:[ { d:5.4, h:30, k:'core' }, { d:5.4, h:12, k:'up' }, { d:5.4, h:20, k:'fair', nose:8 } ], bst:{ n:4, d:3.4, h:13.5, nose:3 } },
    file:'models/ariane6.glb', bytes:0, unit:4.9,
    model:{ src:'« ESA Ariane 6 (64) », Clarence365 (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/esa-ariane-6-64-98a68de96a61406cb68b8f8ac89eb5ef', note:'Maquette regroupée par étage et allégée pour ce site (textures réduites). Mise à l\'échelle : 62 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Successeur d\'Ariane 5, lancé pour la première fois le 9 juillet 2024 depuis Kourou. Deux versions : Ariane 62, avec deux propulseurs à poudre, et Ariane 64, avec quatre. Son étage supérieur, propulsé par le moteur Vinci, peut se rallumer pour déposer des satellites sur plusieurs orbites au cours d\'un même vol.',
    checked:'2026-11-26',
    refs:{
      esa:{ t:'Ariane 6 overview', p:'ESA', u:'https://www.esa.int/Enabling_Support/Space_Transportation/Launch_vehicles/Ariane_6_overview' },
      cnes:{ t:'Ariane 6, technical features', p:'CNES', u:'https://ariane6.cnes.fr/en/technical-features' },
      esa1:{ t:'Europe\'s new Ariane 6 rocket powers into space (communiqué du premier vol)', p:'ESA', u:'https://www.esa.int/Newsroom/Press_Releases/Europe_s_new_Ariane_6_rocket_powers_into_space' }
    },
    parts:[
      { key:'p120c', name:'Propulseurs d\'appoint P120C', desc:'Deux (Ariane 62) ou quatre (Ariane 64) propulseurs à poudre ; le même moteur sert de premier étage à Vega-C.',
        facts:[['Poudre : 142 t par propulseur', 'cnes'], ['Poussée au décollage : 350 tonnes par propulseur', 'cnes'], ['Durée de combustion : 130 s', 'cnes']] },
      { key:'llpm', name:'Étage principal (moteur Vulcain 2.1)', desc:'Étage cryogénique à hydrogène et oxygène liquides, qui assure les dix premières minutes du vol.',
        facts:[['Ergols : 150 t', 'cnes'], ['Poussée du Vulcain 2.1 au décollage : 135 tonnes', 'cnes']] },
      { key:'ulpm', name:'Étage supérieur (moteur Vinci)', desc:'Étage cryogénique réallumable : il peut s\'éteindre et se rallumer plusieurs fois pour viser des orbites différentes.',
        facts:[['Réservoirs pleins : 30 t', 'cnes'], ['Poussée du Vinci : 18 tonnes', 'cnes']] },
      { key:'fairing', name:'Coiffe', desc:'Protège les satellites pendant la traversée de l\'atmosphère, puis s\'ouvre en deux.',
        facts:[['Hauteur : 14 ou 20 m', 'cnes'], ['Diamètre : 5,4 m', 'esa']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '62 m', 'cnes'],
        ['Diamètre', '5,4 m (coiffe)', 'esa'],
        ['Masse au décollage', 'Ariane 62 : 530 t ; Ariane 64 : 860 t', 'cnes'],
        ['Poussée au décollage', 'Ariane 62 : 800 tonnes ; Ariane 64 : 1 500 tonnes', 'cnes'],
        ['Étages', 'deux ou quatre propulseurs P120C, étage principal (Vulcain 2.1), étage supérieur (Vinci)', 'esa']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '9 juillet 2024 (Ariane 62)', 'esa1'],
        ['Base de lancement', 'Centre spatial guyanais, Kourou (nouvel ensemble à 4 km à l\'ouest de celui d\'Ariane 5)', 'esa']
      ]},
      { title:'Capacités', rows:[
        ['Orbite de transfert géostationnaire', 'Ariane 62 : ≈ 4,5 t ; Ariane 64 : ≈ 11,5 t', 'esa'],
        ['Orbite basse', 'Ariane 62 : 10,3 t ; Ariane 64 : 21,6 t', 'esa']
      ]}
    ]
  },
  {
    id:'vegac', name:'Vega-C', short:'Vega-C', year:'2022', group:'eu',
    agency:'ESA, Avio ; exploité par Avio',
    first:'2022-07-13', firstRef:'csg',
    dims:{ h:{ v:34.8, ref:'csg' }, d:{ v:3.4, ref:'csg' }, mass:{ v:210, ref:'csg' } },
    cap:[ { o:'LEO', t:3.3, ref:'esa' } ],
    sil:{ body:[ { d:3.4, h:13.5, k:'core' }, { d:2.4, h:8, k:'up' }, { d:1.9, h:4, k:'up' }, { d:3.3, h:9.3, k:'fair', nose:4 } ] },
    file:'models/vegac.glb', bytes:0, unit:0.2021,
    model:{ src:'« Vega-c », SethAlevy (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/vega-c-8b74cf8d08bc419e966d7ede30c27bf6', note:'Maquette « inspirée de Vega-C » selon son auteur (modèle de CAO personnel), pas une reproduction exacte. Regroupée par étage et allégée pour ce site. Mise à l\'échelle : 34,8 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Petit lanceur européen pour les satellites d\'observation de la Terre et les missions scientifiques en orbite basse. Ses trois premiers étages sont à poudre ; le quatrième, AVUM+, à ergols liquides, peut se rallumer. Premier vol le 13 juillet 2022, retour en vol le 5 décembre 2024 après l\'échec de fin 2022.',
    checked:'2026-11-26',
    refs:{
      esa:{ t:'Vega-C', p:'ESA', u:'https://www.esa.int/Enabling_Support/Space_Transportation/Launch_vehicles/Vega-C' },
      csg:{ t:'Vega-C', p:'CNES, Centre spatial guyanais', u:'https://centrespatialguyanais.cnes.fr/en/vega-c' }
    },
    parts:[
      { key:'p120c', name:'Premier étage P120C', desc:'Moteur à poudre, le même que les propulseurs d\'appoint d\'Ariane 6.',
        facts:[['Poudre : 143,6 t', 'esa'], ['Poussée moyenne : 4 500 kN', 'esa'], ['Durée : environ deux minutes', 'csg']] },
      { key:'z40', name:'Deuxième étage Zefiro 40', desc:'Moteur à poudre.',
        facts:[['Poudre : 36,2 t', 'esa'], ['Poussée moyenne : 1 304 kN', 'esa']] },
      { key:'z9', name:'Troisième étage Zefiro 9', desc:'Moteur à poudre.',
        facts:[['Poudre : 10 t', 'esa'], ['Durée : deux minutes et demie', 'csg']] },
      { key:'avum', name:'Étage supérieur AVUM+', desc:'Étage à ergols liquides, réallumable, qui ajuste l\'orbite et peut déposer plusieurs satellites.',
        facts:[['Ergols : 740 kg', 'esa'], ['Poussée moyenne : 2,42 kN', 'esa']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '34,8 m', 'csg'],
        ['Diamètre', '3,4 m', 'csg'],
        ['Masse au décollage', '210 t', 'csg'],
        ['Étages', 'P120C, Zefiro 40, Zefiro 9 (poudre), AVUM+ (liquide)', 'esa']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '13 juillet 2022', 'csg'],
        ['Retour en vol', '5 décembre 2024, après l\'échec de fin 2022', 'csg'],
        ['Base de lancement', 'Centre spatial guyanais, Kourou', 'csg']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse', '3,3 t', 'esa'],
        ['Orbite héliosynchrone', '2,3 t', 'esa'],
        ['Orbite polaire, 700 km', 'jusqu\'à 2,2 t', 'csg']
      ]}
    ]
  },
  {
    id:'falcon9', name:'Falcon 9 Block 5', short:'Falcon 9', year:'2010', group:'us',
    agency:'SpaceX',
    first:'2010-06-04', firstRef:'wp',
    dims:{ h:{ v:70, ref:'wv' }, d:{ v:3.7, ref:'wv' }, mass:{ v:549, ref:'wv' } },
    cap:[ { o:'LEO', t:22.8, note:'premier étage non récupéré ; 17,5 t avec retour sur barge (28,5°)', ref:'wp' }, { o:'GTO', t:8.3, note:'premier étage non récupéré ; 5,5 t avec retour sur barge', ref:'wp' } ],
    sil:{ body:[ { d:3.7, h:42.6, k:'core' }, { d:3.7, h:14.3, k:'up' }, { d:5.2, h:13.1, k:'fair', nose:6 } ] },
    file:'models/falcon9.glb', bytes:0, unit:1.057,
    model:{ src:'« SpaceX Falcon 9 V4 », Clarence365 (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/spacex-falcon-9-v4-33e974795a21416eaac38d536ae1ceb9', note:'Maquette regroupée par étage et allégée pour ce site (textures réduites). Mise à l\'échelle : 70 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur le plus utilisé au monde aujourd\'hui. Son premier étage, propulsé par neuf moteurs Merlin, revient se poser sur une barge en mer ou près du pas de tir, puis revole : c\'est le premier lanceur orbital dont le premier étage est réutilisé couramment. Il lance les satellites Starlink, des missions scientifiques et, avec la capsule Dragon, des équipages vers la Station spatiale internationale.',
    checked:'2026-11-26',
    refs:{
      wv:{ t:'Falcon 9 v1.2 or Full Thrust (Block 5), fiche technique', p:'Wevolver', u:'https://www.wevolver.com/specs/falcon-9-v12-or-full-thrust-block-5' },
      wp:{ t:'Falcon 9 (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Falcon_9' }
    },
    parts:[
      { key:'stage1', name:'Premier étage (neuf moteurs Merlin 1D)', desc:'Étage à kérosène et oxygène liquide, réutilisable : après la séparation, il rallume trois de ses moteurs, se guide avec ses ailerons en grille et se pose sur quatre pieds.',
        facts:[['Hauteur : 41,2 m (47,7 m avec l\'interétage)', 'wv'], ['Poussée au sol : 7 607 kN ; dans le vide : 8 227 kN', 'wv'], ['Durée : 162 s', 'wv']] },
      { key:'stage2', name:'Deuxième étage (moteur Merlin Vacuum)', desc:'Étage à kérosène et oxygène liquide, non récupéré ; son moteur peut se rallumer.',
        facts:[['Hauteur : 13,8 m', 'wv'], ['Poussée dans le vide : 981 kN', 'wv'], ['Durée : 397 s', 'wv']] },
      { key:'fairing', name:'Coiffe', desc:'Coiffe en deux moitiés, récupérées en mer et réutilisées. Pour un vol habité, la capsule Dragon remplace la coiffe.',
        facts:[['Hauteur : 13,1 m ; diamètre : 5,2 m', 'wv']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '70 m', 'wv'],
        ['Diamètre', '3,7 m', 'wv'],
        ['Masse au décollage', '549 054 kg', 'wv'],
        ['Poussée au décollage', '7 607 kN', 'wv'],
        ['Étages', 'deux, à kérosène et oxygène liquide ; premier étage réutilisable', 'wv']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '4 juin 2010 (version Block 5 : 11 mai 2018)', 'wp'],
        ['Bases de lancement', 'Cap Canaveral (SLC-40), centre Kennedy (LC-39A), Vandenberg (SLC-4E)', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (28,5°)', '22,8 t sans récupération ; 17,5 t avec retour sur barge', 'wp'],
        ['Orbite de transfert géostationnaire', '8,3 t sans récupération ; 5,5 t avec retour sur barge', 'wp'],
        ['Vers Mars', '4,02 t', 'wv']
      ]}
    ]
  },
  {
    id:'falconheavy', name:'Falcon Heavy', short:'Falcon Heavy', year:'2018', group:'us',
    agency:'SpaceX',
    first:'2018-02-06', firstRef:'wp',
    dims:{ h:{ v:70, ref:'wp' }, d:{ v:3.7, ref:'wp' }, mass:{ v:1420, ref:'wp' } },
    cap:[ { o:'LEO', t:63.8, note:'sans récupération (28,5°)', ref:'wp' }, { o:'GTO', t:26.7, note:'sans récupération ; 8 t si les trois corps sont récupérés', ref:'wp' } ],
    sil:{ body:[ { d:3.7, h:42.6, k:'core' }, { d:3.7, h:14.3, k:'up' }, { d:5.2, h:13.1, k:'fair', nose:6 } ], bst:{ n:2, d:3.7, h:44, nose:4 } },
    file:'models/falconheavy.glb', bytes:0, unit:1.057,
    model:{ src:'« SpaceX Falcon Heavy V4 », Clarence365 (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/spacex-falcon-heavy-v4-a91bccdf8e624997892bab2f0fbec28f', note:'Maquette regroupée par étage et allégée pour ce site (textures réduites). Mise à l\'échelle : 70 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Trois premiers étages de Falcon 9 côte à côte, 27 moteurs Merlin allumés au décollage. Les deux propulseurs latéraux reviennent souvent se poser ensemble près du pas de tir. Il a lancé la sonde Psyche, le satellite météorologique GOES-U et la sonde Europa Clipper vers Jupiter.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Falcon Heavy (article encyclopédique ; capacités d\'après SpaceX, « Capabilities & Services »)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Falcon_Heavy' }
    },
    parts:[
      { key:'boosters', name:'Deux propulseurs latéraux', desc:'Deux premiers étages de Falcon 9 renforcés, avec un nez à la place de l\'étage supérieur ; ils se séparent les premiers et peuvent revenir se poser.',
        facts:[['Neuf moteurs Merlin 1D chacun', 'wp'], ['Poussée au sol : 7 600 kN chacun', 'wp'], ['Durée : 154,3 s', 'wp']] },
      { key:'core', name:'Corps central', desc:'Premier étage central, renforcé pour porter les deux propulseurs ; ses moteurs tournent au ralenti au début pour durer plus longtemps.',
        facts:[['Neuf moteurs Merlin 1D', 'wp'], ['Hauteur : 42,6 m', 'wp'], ['Durée : 187 s', 'wp']] },
      { key:'stage2', name:'Deuxième étage (moteur Merlin Vacuum)', desc:'Le même que celui de Falcon 9.',
        facts:[['Poussée dans le vide : 934 kN', 'wp'], ['Durée : 397 s', 'wp']] },
      { key:'fairing', name:'Coiffe', desc:'La même coiffe que Falcon 9.',
        facts:[] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '70 m', 'wp'],
        ['Largeur', '12,2 m (chaque corps : 3,7 m)', 'wp'],
        ['Masse au décollage', '1 420 t', 'wp'],
        ['Poussée au décollage', '22,82 MN (27 moteurs Merlin 1D)', 'wp'],
        ['Étages', 'deux propulseurs latéraux et un corps central (premiers étages de Falcon 9), deuxième étage de Falcon 9', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '6 février 2018, centre Kennedy', 'wp'],
        ['Base de lancement', 'centre Kennedy (LC-39A)', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (28,5°)', '63,8 t sans récupération', 'wp'],
        ['Orbite de transfert géostationnaire', '26,7 t sans récupération ; 8 t si les trois corps sont récupérés', 'wp'],
        ['Vers Mars', '16,8 t', 'wp']
      ]}
    ]
  },
  {
    id:'sls', name:'SLS Block 1', short:'SLS', year:'2022', group:'us',
    agency:'NASA ; Boeing (étage central), Northrop Grumman (propulseurs)',
    first:'2022-11-16', firstRef:'nasa',
    dims:{ h:{ v:98.3, ref:'nasa1b' }, d:{ v:8.4, ref:'wp', approx:true }, mass:{ v:2610, ref:'wp' } },
    cap:[ { o:'TLI', t:27, note:'plus de 27 t vers la Lune (Orion comprise)', ref:'nasa1b' }, { o:'LEO', t:95, note:'200 km, 28,5°', ref:'wp' } ],
    sil:{ body:[ { d:8.4, h:64.6, k:'core' }, { d:5, h:13.4, k:'up' }, { d:5, h:6, k:'cap' }, { d:1.6, h:14.3, k:'cap', nose:6 } ], bst:{ n:2, d:3.7, h:54, nose:5 } },
    file:'models/sls.glb', bytes:0, unit:1.0725,
    model:{ src:'« NASA SLS Block 1 Crew V4 », Clarence365 (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/nasa-sls-block-1-crew-v4-2d521014700b44dbbc7662f648974e98', note:'Maquette regroupée par élément et allégée pour ce site (textures réduites). Mise à l\'échelle : 98,3 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur lunaire de la NASA, pour le programme Artemis. Il a lancé la capsule Orion sans équipage autour de la Lune le 16 novembre 2022 (Artemis I), puis avec quatre astronautes en avril 2026 (Artemis II). Ses quatre moteurs RS-25 ont volé sur la navette spatiale, comme ses deux propulseurs à poudre, allongés d\'un segment.',
    checked:'2026-11-26',
    refs:{
      nasa1b:{ t:'SLS (Space Launch System) Block 1B (page de référence, comparaison avec le Block 1)', p:'NASA', u:'https://www.nasa.gov/reference/sls-space-launch-system-block-1b/' },
      nasa:{ t:'Space Launch System', p:'NASA', u:'https://www.nasa.gov/humans-in-space/space-launch-system/' },
      wp:{ t:'Space Launch System (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Space_Launch_System' }
    },
    parts:[
      { key:'srb', name:'Deux propulseurs à poudre', desc:'Propulseurs à cinq segments, dérivés de ceux de la navette spatiale (quatre segments) ; ils fournissent l\'essentiel de la poussée pendant les deux premières minutes.',
        facts:[['Poussée des deux propulseurs au décollage : 8,8 millions de livres-force (≈ 39 MN)', 'nasa1b']] },
      { key:'core', name:'Étage central', desc:'Le plus grand étage construit par la NASA : réservoirs d\'hydrogène et d\'oxygène liquides, qui alimentent quatre moteurs RS-25 pendant un peu plus de huit minutes.',
        facts:[['Hauteur : 212 pieds (≈ 64,6 m)', 'nasa'], ['Fonctionnement : un peu plus de huit minutes', 'nasa']] },
      { key:'rs25', name:'Quatre moteurs RS-25', desc:'Moteurs à hydrogène et oxygène liquides, au bas de l\'étage central ; ceux des premiers vols ont volé sur la navette spatiale.',
        facts:[['Poussée de l\'étage central : plus de 2 millions de livres-force', 'nasa']] },
      { key:'icps', name:'Étage supérieur ICPS (moteur RL10)', desc:'Étage cryogénique provisoire, dérivé de celui de la fusée Delta IV : il envoie Orion vers la Lune.',
        facts:[['Poussée du RL10 : 24 750 livres-force (≈ 110 kN)', 'nasa']] },
      { key:'orion', name:'Capsule Orion et module de service', desc:'Le vaisseau habité, pour quatre astronautes, avec son module de service européen (ESA) et ses panneaux solaires.',
        facts:[] },
      { key:'las', name:'Tour de sauvetage', desc:'En cas de problème au décollage ou pendant la montée, ses moteurs à poudre arrachent la capsule du lanceur. Larguée dès que la montée est sûre.',
        facts:[] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '322,4 pieds (98,3 m), version avec équipage', 'nasa1b'],
        ['Masse au décollage', '5,7 millions de livres (≈ 2 600 t)', 'nasa1b'],
        ['Poussée au décollage', '8,8 millions de livres-force (≈ 39 MN)', 'nasa1b'],
        ['Étages', 'deux propulseurs à poudre, étage central (quatre RS-25), étage supérieur ICPS', 'nasa']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '16 novembre 2022, Artemis I, pas de tir 39B du centre Kennedy', 'nasa'],
        ['Premier vol habité', 'avril 2026, Artemis II', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Vers la Lune', 'plus de 27 t', 'nasa1b'],
        ['Orbite basse (200 km, 28,5°)', '95 t', 'wp']
      ]}
    ]
  },
  {
    id:'soyuz2', name:'Soyouz-2', short:'Soyouz', year:'2004', group:'ru',
    agency:'Roscosmos ; construit par RKTs Progress',
    first:'2004-11-08', firstRef:'wp',
    dims:{ h:{ v:46.3, ref:'wp' }, d:{ v:2.95, ref:'wp' }, mass:{ v:312, ref:'wp' } },
    cap:[ { o:'LEO', t:8.67, note:'Soyouz-2.1b, 240 km, 51,6°, depuis Baïkonour', ref:'wp' }, { o:'TLI', t:2.35, note:'Soyouz-2.1b avec étage Fregat', ref:'wp' } ],
    sil:{ body:[ { d:2.95, h:27.1, k:'core' }, { d:2.66, h:6.7, k:'up' }, { d:3.7, h:12.5, k:'fair', nose:5 } ], bst:{ n:4, d:2.68, h:19.6, nose:8 } },
    file:'models/soyuz2.glb', bytes:0, unit:1,
    model:{ src:'« Soyuz-FG », Paculino (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/soyuz-fg-1320bf0fd1b242cd8cfda77d381a147f', note:'Maquette d\'un Soyouz-FG, le prédécesseur de Soyouz-2 (même architecture, coiffe pour vaisseau habité), regroupée par étage. Taille d\'origine de la maquette : 49,5 m avec sa coiffe.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Dernière version de la famille Soyouz, héritière de la fusée R-7 qui a lancé Spoutnik en 1957 et Gagarine en 1961. Quatre propulseurs en forme de cône entourent l\'étage central ; tous s\'allument au sol. Il lance les équipages et les cargos vers la Station spatiale internationale, et des satellites depuis Baïkonour, Plessetsk et Vostotchny.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Soyuz-2 (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Soyuz-2' }
    },
    parts:[
      { key:'blockb', name:'Quatre propulseurs (blocs B, V, G, D)', desc:'Premier étage : quatre propulseurs coniques à kérosène et oxygène liquide, un moteur RD-107A chacun.',
        facts:[['Hauteur : 19,6 m ; diamètre : 2,68 m', 'wp'], ['Poussée au sol : 838,5 kN chacun', 'wp'], ['Durée : 118 s', 'wp']] },
      { key:'blocka', name:'Étage central (bloc A)', desc:'Deuxième étage, allumé au sol en même temps que les propulseurs ; moteur RD-108A.',
        facts:[['Hauteur : 27,1 m ; diamètre : 2,95 m', 'wp'], ['Poussée au sol : 792,5 kN', 'wp'], ['Durée : 286 s', 'wp']] },
      { key:'blocki', name:'Troisième étage (bloc I)', desc:'Moteur RD-0110 (Soyouz-2.1a) ou RD-0124 (Soyouz-2.1b), à kérosène et oxygène liquide.',
        facts:[['Hauteur : 6,7 m ; diamètre : 2,66 m', 'wp'], ['Poussée : 298 kN (2.1a), 294,3 kN (2.1b)', 'wp']] },
      { key:'fregat', name:'Étage Fregat (facultatif) et coiffe', desc:'Quatrième étage réallumable, à ergols stockables, pour les orbites hautes ; sous la coiffe avec les satellites.',
        facts:[] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '46,3 m', 'wp'],
        ['Diamètre', '2,95 m (étage central), 10,3 m avec les propulseurs', 'wp'],
        ['Masse au décollage', '312 t', 'wp'],
        ['Étages', 'trois, ou quatre avec Fregat', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', 'Soyouz-2.1a : 8 novembre 2004 ; Soyouz-2.1b : 27 décembre 2006', 'wp'],
        ['Bases de lancement', 'Baïkonour, Plessetsk, Vostotchny', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (240 km, 51,6°, Baïkonour)', 'Soyouz-2.1a : 7,43 t ; Soyouz-2.1b : 8,67 t', 'wp'],
        ['Vers la Lune', 'Soyouz-2.1b : 2,35 t', 'wp']
      ]}
    ]
  },
  {
    id:'cz5', name:'Longue Marche 5', short:'Longue Marche 5', year:'2016', group:'cn',
    agency:'CASC ; construit par la CALT',
    first:'2016-11-03', firstRef:'wp',
    dims:{ h:{ v:56.97, ref:'wp' }, d:{ v:5, ref:'wp' }, mass:{ v:851.8, ref:'wp' } },
    cap:[ { o:'LEO', t:25, note:'200 × 400 km', ref:'wp' }, { o:'GTO', t:14, ref:'wp' }, { o:'TLI', t:8.8, note:'8,8 à 9,4 t selon la source', ref:'wp' } ],
    sil:{ body:[ { d:5, h:33.16, k:'core' }, { d:5, h:11.54, k:'up' }, { d:5.2, h:12.27, k:'fair', nose:5 } ], bst:{ n:4, d:3.35, h:27.6, nose:4 } },
    file:'models/cz5.glb', bytes:0, unit:3.578,
    model:{ src:'« Long March 5 rocket », andertan (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/long-march-5-rocket-4da241732264439c9112e66ebc3e16e8', note:'Maquette redécoupée en étages pour ce site d\'après la position de chaque face et les longueurs publiées des étages (tools/models/seg_cz5.js) : les limites entre étages sont approchées. Mise à l\'échelle : 56,97 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur lourd chinois, en service depuis 2016 au centre de Wenchang, sur l\'île de Hainan. Il a lancé la sonde martienne Tianwen-1, les missions lunaires Chang\'e 5 et Chang\'e 6 et, dans sa version 5B, les modules de la station Tiangong.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Long March 5 (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Long_March_5' },
      sf:{ t:'Long March 5 Launch Vehicle', p:'Spaceflight101', u:'https://spaceflight101.com/spacerockets/?p=1667' }
    },
    parts:[
      { key:'boosters', name:'Quatre propulseurs CZ-5-300', desc:'Propulseurs à kérosène et oxygène liquide, deux moteurs YF-100 chacun.',
        facts:[['Hauteur : 27,6 m ; diamètre : 3,35 m', 'wp'], ['Poussée au sol : 2 400 kN chacun', 'wp'], ['Durée : 173 s', 'wp']] },
      { key:'core', name:'Premier étage CZ-5-500', desc:'Étage cryogénique à hydrogène et oxygène liquides, deux moteurs YF-77.',
        facts:[['Hauteur : 33,16 m ; diamètre : 5 m', 'wp'], ['Ergols : 165,3 t', 'wp'], ['Durée : 492 s', 'wp']] },
      { key:'stage2', name:'Deuxième étage CZ-5-HO', desc:'Étage cryogénique, deux moteurs YF-75D ; absent de la version 5B, qui place directement ses charges en orbite basse.',
        facts:[['Hauteur : 11,54 m', 'wp'], ['Poussée : 176,72 kN', 'wp'], ['Durée : 700 s', 'wp']] },
      { key:'fairing', name:'Coiffe', desc:'Coiffe de 5,2 m de diamètre, en deux longueurs.',
        facts:[['Longueur : 12,27 m ou 20,5 m', 'sf']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '56,97 m (63,2 m avec la coiffe longue)', 'wp'],
        ['Diamètre', '5 m', 'wp'],
        ['Masse au décollage', '851,8 t', 'wp'],
        ['Poussée au décollage', '10 565 kN', 'sf'],
        ['Étages', 'quatre propulseurs, deux étages cryogéniques ; étage YZ-2 facultatif', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', 'CZ-5 : 3 novembre 2016 ; CZ-5B : 5 mai 2020', 'wp'],
        ['Base de lancement', 'Wenchang (Hainan), pas de tir 1', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (200 × 400 km)', '25 t (CZ-5B)', 'wp'],
        ['Orbite de transfert géostationnaire', '14 t', 'wp'],
        ['Vers la Lune', '8,8 à 9,4 t', 'wp']
      ]}
    ]
  },
  {
    id:'saturnv', name:'Saturn V', short:'Saturn V', year:'1967', group:'us',
    agency:'NASA ; étages construits par Boeing, North American et Douglas',
    first:'1967-11-09', firstRef:'wp', last:'1973-05-14', lastRef:'wp',
    dims:{ h:{ v:111, ref:'wp' }, d:{ v:10, ref:'wp' }, mass:{ v:2965, ref:'wp' }, thrust:{ v:34500, ref:'wp' } },
    cap:[ { o:'LEO', t:140, note:'185 km', ref:'wp' }, { o:'TLI', t:43.5, ref:'wp' } ],
    sil:{ body:[ { d:10, h:42, k:'core' }, { d:10, h:24.87, k:'up' }, { d:6.6, h:17.86, k:'up' }, { d:6.6, h:8, k:'cap' }, { d:3.9, h:7, k:'cap' }, { d:1.2, h:11.27, k:'cap', nose:5 } ] },
    file:'models/saturnv.glb', bytes:0, unit:0.005291,
    model:{ src:'« Saturn V Rocket - Nasa », dannzjs (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/saturn-v-rocket-nasa-9b61dbd396334aca8faac51f9ef63f2e', note:'Maquette redécoupée en étages pour ce site d\'après la hauteur de chaque face et les longueurs publiées des étages (tools/models/cut.js) : les limites entre étages sont approchées. Mise à l\'échelle : 111 m de haut avec le vaisseau Apollo.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'La fusée du programme Apollo, la plus puissante jamais mise en service jusqu\'aux années 2020. Neuf vols, d\'Apollo 8 à Apollo 17, ont emmené 24 astronautes vers la Lune. Son dernier vol a lancé Skylab, la première station spatiale américaine, aménagée dans un troisième étage de Saturn V.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Saturn V (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Saturn_V' }
    },
    parts:[
      { key:'sic', name:'Premier étage S-IC (cinq moteurs F-1)', desc:'Étage à kérosène et oxygène liquide, construit par Boeing.',
        facts:[['Hauteur : 42 m ; diamètre : 10 m', 'wp'], ['Poussée au sol : 33 000 kN', 'wp'], ['Durée : 150 s', 'wp']] },
      { key:'sii', name:'Deuxième étage S-II (cinq moteurs J-2)', desc:'Étage à hydrogène et oxygène liquides, construit par North American.',
        facts:[['Hauteur : 24,87 m ; diamètre : 10 m', 'wp'], ['Poussée dans le vide : 4 400 kN', 'wp'], ['Durée : 395 s', 'wp']] },
      { key:'sivb', name:'Troisième étage S-IVB (un moteur J-2)', desc:'Étage à hydrogène et oxygène liquides, construit par Douglas. Il s\'allumait deux fois : pour atteindre l\'orbite terrestre, puis pour partir vers la Lune.',
        facts:[['Hauteur : 17,86 m ; diamètre : 6,60 m', 'wp'], ['Poussée dans le vide : 1 000 kN', 'wp'], ['Durée : 165 s puis 312 s (deux allumages)', 'wp']] },
      { key:'apollo', name:'Vaisseau Apollo et tour de sauvetage', desc:'Au sommet : l\'adaptateur qui abritait le module lunaire, le module de service, la capsule de l\'équipage et la tour de sauvetage.',
        facts:[] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '111 m avec le vaisseau Apollo', 'wp'],
        ['Diamètre', '10 m', 'wp'],
        ['Masse au décollage', '2 822 à 2 965 t selon la mission', 'wp'],
        ['Poussée au décollage', '34,5 MN', 'wp'],
        ['Étages', 'trois', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '9 novembre 1967 (Apollo 4)', 'wp'],
        ['Dernier vol', '14 mai 1973 (Skylab)', 'wp'],
        ['Vols', '13, dont 12 réussis et un échec partiel (Apollo 6)', 'wp'],
        ['Base de lancement', 'centre Kennedy, complexe 39', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (185 km)', '140 t', 'wp'],
        ['Vers la Lune', '43,5 t', 'wp']
      ]}
    ]
  },
  {
    id:'shuttle', name:'Navette spatiale américaine', short:'Navette', year:'1981', group:'us',
    agency:'NASA ; orbiteur construit par Rockwell, réservoir par Martin Marietta, propulseurs par Thiokol',
    first:'1981-04-12', firstRef:'wp', last:'2011-07-21', lastRef:'wp',
    dims:{ h:{ v:56, ref:'wp' }, d:{ v:8.7, ref:'wp' }, mass:{ v:2030, ref:'wp' } },
    cap:[ { o:'LEO', t:27.5, note:'204 km', ref:'wp' }, { o:'GTO', t:4.94, note:'avec l\'étage IUS emporté dans la soute', ref:'wp' } ],
    sil:{ body:[ { d:8.4, h:47, k:'core', nose:9 } ], bst:{ n:2, d:3.7, h:45, nose:5 }, side:{ d:5.2, h:37.2, y:6, nose:4 } },
    file:'models/shuttle.glb', bytes:0, unit:1.264,
    model:{ src:'« Space Shuttle (A) », NASA 3D Resources', license:'NASA (libre de droits)', u:'https://github.com/nasa/NASA-3D-Resources/tree/master/3D%20Models/Space%20Shuttle%20(A)', note:'Maquette sans couleurs de la NASA, redressée et regroupée en trois éléments pour ce site. Mise à l\'échelle sur la longueur du réservoir externe (47 m) : les autres longueurs sont approchées.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le premier véhicule orbital conçu pour être réutilisé : l\'orbiteur, avec son équipage, revenait se poser comme un planeur, et les propulseurs à poudre étaient repêchés en mer ; seul le grand réservoir orange était perdu. En trente ans, elle a lancé et réparé le télescope Hubble, lancé Chandra, Galileo, Magellan et Ulysses, et assemblé la Station spatiale internationale. Deux accidents, Challenger en 1986 et Columbia en 2003, ont coûté la vie à 14 astronautes.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Space Shuttle (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Space_Shuttle' }
    },
    parts:[
      { key:'srb', name:'Deux propulseurs d\'appoint à poudre', desc:'Les plus gros moteurs à poudre de leur époque, récupérés en mer sous parachutes puis rechargés.',
        facts:[['Poussée : 13 MN chacun', 'wp'], ['Durée : 124 s', 'wp']] },
      { key:'et', name:'Réservoir externe', desc:'Grand réservoir d\'hydrogène et d\'oxygène liquides qui alimentait les trois moteurs de l\'orbiteur ; largué juste avant l\'orbite, il retombait dans l\'océan.',
        facts:[['Diamètre : 8,7 m', 'wp']] },
      { key:'orbiter', name:'Orbiteur (trois moteurs RS-25)', desc:'L\'avion spatial, avec l\'équipage et une soute de 18 m de long. Ses moteurs brûlaient l\'hydrogène et l\'oxygène du réservoir externe pendant toute la montée.',
        facts:[['Poussée au sol : 1 750 kN par moteur', 'wp'], ['Durée : 480 s', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '56 m', 'wp'],
        ['Diamètre', '8,7 m (réservoir externe)', 'wp'],
        ['Masse au décollage', '2 030 t', 'wp'],
        ['Éléments', 'deux propulseurs à poudre, un réservoir externe, l\'orbiteur et ses trois moteurs', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '12 avril 1981 (STS-1)', 'wp'],
        ['Dernier vol', '21 juillet 2011 (STS-135)', 'wp'],
        ['Vols', '135, dont deux accidents (Challenger, 1986 ; Columbia, 2003)', 'wp'],
        ['Bases de lancement', 'centre Kennedy, complexes 39A et 39B', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (204 km)', '27,5 t', 'wp'],
        ['Vers la Station spatiale internationale', '16,05 t', 'wp'],
        ['Orbite de transfert géostationnaire', '4,94 t avec l\'étage IUS', 'wp'],
        ['Retour sur Terre', '14,4 t', 'wp']
      ]}
    ]
  },
  {
    id:'delta2', name:'Delta II', short:'Delta II', year:'1989', group:'us',
    agency:'McDonnell Douglas, puis Boeing, puis United Launch Alliance',
    first:'1989-02-14', firstRef:'wp', last:'2018-09-15', lastRef:'wp',
    dims:{ h:{ v:38.9, ref:'wp' }, d:{ v:2.44, ref:'wp' }, mass:{ v:286.1, ref:'wp' } },
    cap:[ { o:'LEO', t:6.107, note:'2,8 à 6,1 t selon la version (28,7°)', ref:'wp' }, { o:'GTO', t:2.18, note:'0,93 à 2,18 t selon la version', ref:'wp' } ],
    sil:{ body:[ { d:2.44, h:26.1, k:'core' }, { d:2.44, h:6, k:'up' }, { d:2.9, h:6.8, k:'fair', nose:3 } ], bst:{ n:9, d:1.02, h:13, nose:1.5 } },
    file:null,
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur moyen des missions scientifiques de la NASA pendant trente ans, avec 155 vols. Neuf propulseurs à poudre entouraient le plus souvent son premier étage. Il a lancé les rovers martiens Spirit et Opportunity, les sondes lunaires GRAIL, et des observatoires comme WMAP et Fermi.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Delta II (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Delta_II' }
    },
    parts:[
      { key:'stage1', name:'Premier étage (moteur RS-27A)', desc:'Étage à kérosène et oxygène liquide, hérité du missile Thor.',
        facts:[['Hauteur : 26,1 m ; diamètre : 2,44 m', 'wp'], ['Poussée : 1 054 kN', 'wp'], ['Durée : 260,5 s', 'wp']] },
      { key:'gem', name:'Propulseurs GEM 40 (trois, quatre ou neuf)', desc:'Propulseurs à poudre ; avec neuf propulseurs, six s\'allument au sol et trois en vol.',
        facts:[['Hauteur : 13 m ; diamètre : 1,02 m', 'wp'], ['Poussée : 499,2 kN chacun (allumés au sol)', 'wp'], ['Durée : 64 s', 'wp']] },
      { key:'stage2', name:'Deuxième étage Delta-K (moteur AJ10-118K)', desc:'Étage à ergols stockables, réallumable.',
        facts:[['Hauteur : 6 m ; diamètre : 2,44 m', 'wp'], ['Poussée : 43,6 kN', 'wp'], ['Durée : 431 s', 'wp']] },
      { key:'fairing', name:'Coiffe et troisième étage Star 48B (facultatif)', desc:'Pour les sondes interplanétaires, un troisième étage à poudre s\'ajoutait sous la coiffe.',
        facts:[['Star 48B : 66 kN pendant 87 s', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '38,9 m', 'wp'],
        ['Diamètre', '2,44 m', 'wp'],
        ['Masse au décollage', '152 à 286,1 t selon la version', 'wp'],
        ['Étages', 'deux ou trois, avec trois, quatre ou neuf propulseurs à poudre', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '14 février 1989', 'wp'],
        ['Dernier vol', '15 septembre 2018 (ICESat-2)', 'wp'],
        ['Vols', '155, dont 153 réussis, un échec et un échec partiel', 'wp'],
        ['Bases de lancement', 'Cap Canaveral (SLC-17), Vandenberg (SLC-2W)', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (28,7°)', '2,8 à 6,1 t selon la version', 'wp'],
        ['Orbite héliosynchrone', '1,65 à 3,18 t selon la version', 'wp'],
        ['Orbite de transfert géostationnaire', '0,93 à 2,18 t selon la version', 'wp']
      ]}
    ]
  },
  {
    id:'atlas5', name:'Atlas V', short:'Atlas V', year:'2002', group:'us',
    agency:'United Launch Alliance (développé par Lockheed Martin)',
    first:'2002-08-21', firstRef:'wp',
    dims:{ h:{ v:58.3, ref:'wp' }, d:{ v:3.81, ref:'wp' }, mass:{ v:590, ref:'wp' } },
    cap:[ { o:'LEO', t:18.814, note:'version 551 (cinq propulseurs, coiffe de 5 m)', ref:'wp' }, { o:'GTO', t:8.9, note:'version 551', ref:'wp' } ],
    sil:{ body:[ { d:3.81, h:32.46, k:'core' }, { d:5.4, h:25.84, k:'fair', nose:6 } ], bst:{ n:5, d:1.6, h:17, nose:2 } },
    file:'models/atlas5.glb', bytes:0, unit:0.9725,
    model:{ src:'« Atlas V », SunnyChen754 (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/atlas-v-cbf8f28c35134aff9839275374521dba', note:'Maquette de la version 551, redécoupée pour ce site d\'après la position de chaque face (tools/models/cut.js) : la limite entre premier étage et coiffe est approchée. Mise à l\'échelle : 58,3 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Un lanceur américain très fiable, en fin de carrière : son premier étage utilise un moteur russe RD-180 et son étage supérieur Centaur brûle de l\'hydrogène. Il a lancé Mars Reconnaissance Orbiter, New Horizons vers Pluton, Juno vers Jupiter, et les rovers Curiosity et Perseverance.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Atlas V (article encyclopédique, figures de l\'infobox et tableau des versions)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Atlas_V' }
    },
    parts:[
      { key:'ccb', name:'Premier étage (moteur RD-180)', desc:'Le « Common Core Booster », à kérosène et oxygène liquide, avec un moteur russe à deux chambres.',
        facts:[['Hauteur : 32,46 m ; diamètre : 3,81 m', 'wp'], ['Poussée au sol : 3 827 kN', 'wp'], ['Durée : 253 s', 'wp']] },
      { key:'srb', name:'Propulseurs à poudre (zéro à cinq)', desc:'Le chiffre des dizaines du nom de version donne leur nombre : la version 551 en a cinq.',
        facts:[['AJ-60A : 17 m ; 1,6 m de diamètre', 'wp'], ['GEM 63 (depuis 2020) : 20,1 m', 'wp'], ['Durée : 94 s', 'wp']] },
      { key:'fairing', name:'Coiffe et deuxième étage Centaur', desc:'Coiffe de 4,2 m (versions 4xx) ou de 5,4 m (versions 5xx) ; la grande coiffe enveloppe aussi le deuxième étage Centaur, à hydrogène et oxygène liquides, avec un ou deux moteurs RL10.',
        facts:[['Coiffe de 5,4 m : 20,7, 23,4 ou 26,5 m de long', 'wp'], ['Centaur : 12,68 m ; diamètre 3,05 m ; 842 s (un RL10A)', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', 'jusqu\'à 58,3 m', 'wp'],
        ['Diamètre', '3,81 m', 'wp'],
        ['Masse au décollage', '590 t (version la plus lourde)', 'wp'],
        ['Étages', 'deux, avec zéro à cinq propulseurs à poudre', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '21 août 2002', 'wp'],
        ['Vols', '109, dont 108 réussis et un échec partiel', 'wp'],
        ['État', 'en fin de carrière : huit lanceurs restaient à lancer en avril 2026', 'wp'],
        ['Bases de lancement', 'Cap Canaveral (SLC-41), Vandenberg (SLC-3E, jusqu\'en 2022)', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (28,7°)', '9,8 t (version 401) à 18,8 t (version 551)', 'wp'],
        ['Orbite de transfert géostationnaire', '4,75 t (version 401) à 8,9 t (version 551)', 'wp']
      ]}
    ]
  },
  {
    id:'titan4', name:'Titan IV', short:'Titan IV', year:'1989', group:'us',
    agency:'US Air Force ; construit par Martin Marietta, puis Lockheed Martin',
    first:'1989-06-14', firstRef:'wp', last:'2005-10-19', lastRef:'wp',
    dims:{ h:{ v:62, ref:'wp' }, d:{ v:3.05, ref:'wp' }, mass:{ v:943, ref:'wp' } },
    cap:[ { o:'LEO', t:21.68, ref:'wp' } ],
    sil:{ body:[ { d:3.05, h:26.4, k:'core' }, { d:3.05, h:10, k:'up' }, { d:5.1, h:25.6, k:'fair', nose:6 } ], bst:{ n:2, d:3.2, h:34, nose:4 } },
    file:'models/titan4.glb', bytes:0, unit:4.539,
    model:{ src:'« Titan IV », AllThingsSpace (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/titan-iv-0560341d278d4308b7a330ca4e75f1ae', note:'Maquette d\'une Titan IVB ; seul l\'exemplaire assemblé est gardé (la maquette d\'origine en montre aussi un éclaté). Redécoupée en étages pour ce site d\'après la position de chaque face (tools/models/cut.js) : les limites entre étages sont approchées. Mise à l\'échelle : 62 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur lourd de l\'armée de l\'air américaine dans les années 1990. Ses deux étages brûlaient des ergols stockables, et deux énormes propulseurs à poudre l\'aidaient au décollage. Une seule de ses missions n\'était pas militaire : Cassini-Huygens, partie vers Saturne en 1997.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Titan IV (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Titan_IV' }
    },
    parts:[
      { key:'srmu', name:'Deux propulseurs à poudre SRMU (Titan IVB)', desc:'Propulseurs à enveloppe composite, allumés au sol.',
        facts:[['Poussée : 7,56 MN chacun', 'wp'], ['Durée : 140 s', 'wp']] },
      { key:'stage1', name:'Premier étage (deux moteurs LR87)', desc:'Étage à ergols stockables (peroxyde d\'azote et Aérozine 50), allumé en vol, peu avant la fin des propulseurs.',
        facts:[['Poussée : 2 438 kN', 'wp'], ['Durée : 164 s', 'wp']] },
      { key:'stage2', name:'Deuxième étage (moteur LR91)', desc:'Étage à ergols stockables.',
        facts:[['Poussée : 467 kN', 'wp'], ['Durée : 223 s', 'wp']] },
      { key:'centaur', name:'Étage Centaur et coiffe', desc:'Étage supérieur facultatif à hydrogène et oxygène liquides, sous une coiffe de 5,1 m de diamètre.',
        facts:[['Centaur : deux moteurs RL10, 147 kN, 625 s', 'wp'], ['Coiffe : 5,1 m de diamètre, 17 à 26 m de long', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '50 à 62 m selon la coiffe', 'wp'],
        ['Diamètre', '3,05 m', 'wp'],
        ['Masse au décollage', '943 t', 'wp'],
        ['Étages', 'trois à cinq, avec deux propulseurs à poudre', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', 'Titan IVA : 14 juin 1989 ; Titan IVB : 23 février 1997', 'wp'],
        ['Dernier vol', '19 octobre 2005', 'wp'],
        ['Vols', '39, dont 35 réussis', 'wp'],
        ['Bases de lancement', 'Cap Canaveral (SLC-40 et 41), Vandenberg (SLC-4E)', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse', '21,68 t', 'wp'],
        ['Orbite géostationnaire (avec Centaur)', '5,76 t', 'wp']
      ]}
    ]
  },
  {
    id:'protonm', name:'Proton-M', short:'Proton-M', year:'2001', group:'ru',
    agency:'Roscosmos ; construit par Khrounitchev',
    first:'2001-04-07', firstRef:'wp',
    dims:{ h:{ v:58.2, ref:'wp' }, d:{ v:7.4, ref:'wp' }, mass:{ v:705, ref:'wp' } },
    cap:[ { o:'LEO', t:23, ref:'wp' }, { o:'GTO', t:6.92, note:'avec l\'étage Breeze-M ; orbite à 1 800 m/s du géostationnaire', ref:'wp' } ],
    sil:{ body:[ { d:7.4, h:21.18, k:'core' }, { d:4.1, h:17.05, k:'up' }, { d:4.1, h:4.11, k:'up' }, { d:4.35, h:15.86, k:'fair', nose:5 } ] },
    file:'models/protonm.glb', bytes:0, unit:32.24,
    model:{ src:'« Proton-M Heavy launch vehicle », Kuat-Entralla 3D Engineering (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/proton-m-heavy-launch-vehicle-d070389b42be4f2b8aa67104e15885ca', note:'Maquette redécoupée en étages pour ce site d\'après la hauteur de chaque face et les longueurs publiées des étages (tools/models/cut.js) : les limites entre étages sont approchées. Mise à l\'échelle : 58,2 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur lourd russe, version modernisée de la Proton des années 1960. Son premier étage est entouré de six réservoirs et brûle des ergols toxiques mais stockables. Il a lancé des satellites de télécommunication, des modules de la Station spatiale internationale (Zvezda, Nauka) et des sondes vers Mars.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Proton-M (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Proton-M' }
    },
    parts:[
      { key:'stage1', name:'Premier étage (six moteurs RD-275M)', desc:'Un réservoir central d\'oxydant entouré de six réservoirs de carburant, chacun portant un moteur.',
        facts:[['Hauteur : 21,18 m ; diamètre : 7,4 m', 'wp'], ['Poussée : 10 532 kN', 'wp'], ['Durée : 108 s', 'wp']] },
      { key:'stage2', name:'Deuxième étage (quatre moteurs)', desc:'Trois moteurs RD-0210 et un RD-0211.',
        facts:[['Hauteur : 17,05 m ; diamètre : 4,1 m', 'wp'], ['Poussée : 2 399 kN', 'wp'], ['Durée : 206 s', 'wp']] },
      { key:'stage3', name:'Troisième étage', desc:'Étage à ergols stockables.',
        facts:[['Hauteur : 4,11 m ; diamètre : 4,1 m', 'wp'], ['Poussée : 613,8 kN', 'wp'], ['Durée : 238 s', 'wp']] },
      { key:'breeze', name:'Étage Breeze-M et coiffe', desc:'Étage supérieur réallumable pour les orbites hautes, sous une coiffe de 4,35 m de diamètre.',
        facts:[['Breeze-M : 19,62 kN, jusqu\'à 3 000 s de fonctionnement', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '58,2 m', 'wp'],
        ['Diamètre', '7,4 m', 'wp'],
        ['Masse au décollage', '705 t', 'wp'],
        ['Étages', 'trois, ou quatre avec Breeze-M ou Blok DM', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '7 avril 2001', 'wp'],
        ['Vols', '116, dont 105 réussis (fiche consultée le 26 novembre 2026)', 'wp'],
        ['Base de lancement', 'Baïkonour', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse', '23 t', 'wp'],
        ['Orbite de transfert géostationnaire', '6,92 t (avec Breeze-M)', 'wp'],
        ['Orbite géostationnaire', '3,25 t', 'wp']
      ]}
    ]
  },
  {
    id:'h2a', name:'H-IIA', short:'H-IIA', year:'2001', group:'jp',
    agency:'JAXA et Mitsubishi Heavy Industries',
    first:'2001-08-29', firstRef:'wp', last:'2025-06-28', lastRef:'wp',
    dims:{ h:{ v:53, ref:'wp' }, d:{ v:4, ref:'wp' }, mass:{ v:285, ref:'wp' } },
    cap:[ { o:'LEO', t:10, note:'10 à 15 t selon la version', approx:true, ref:'wp' }, { o:'GTO', t:4.1, note:'version 202 ; 6 t en version 204', ref:'wp' } ],
    sil:{ body:[ { d:4, h:37.2, k:'core' }, { d:4, h:4, k:'up' }, { d:4, h:11.8, k:'fair', nose:4 } ], bst:{ n:2, d:2.5, h:15.1, nose:3 } },
    file:'models/h2a.glb', bytes:0, unit:1,
    model:{ src:'« H-IIA Rocket », MarioK (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/h-iia-rocket-99a86c831c2a4b24bdd42365e382427e', note:'Maquette regroupée par étage pour ce site ; hauteur d\'origine : 53 m.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur principal du Japon pendant près de 25 ans, tiré de Tanegashima. Ses deux étages brûlent de l\'hydrogène et de l\'oxygène liquides. Il a lancé la sonde lunaire Kaguya, la sonde vénusienne Akatsuki et Hayabusa2, qui a rapporté des échantillons de l\'astéroïde Ryugu. Son successeur est H3.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'H-IIA (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/H-IIA' }
    },
    parts:[
      { key:'stage1', name:'Premier étage (moteur LE-7A)', desc:'Étage à hydrogène et oxygène liquides.',
        facts:[['Hauteur : 37,2 m ; diamètre : 4 m', 'wp'], ['Poussée : 1 098 kN', 'wp'], ['Durée : 390 s', 'wp']] },
      { key:'srb', name:'Propulseurs à poudre SRB-A (deux ou quatre)', desc:'La version 202 en a deux, la version 204 quatre.',
        facts:[['Hauteur : 15,1 m ; diamètre : 2,5 m', 'wp'], ['Poussée : 2 260 kN chacun', 'wp'], ['Durée : 120 s', 'wp']] },
      { key:'stage2', name:'Deuxième étage (moteur LE-5B)', desc:'Étage à hydrogène et oxygène liquides, réallumable.',
        facts:[['Hauteur : 9,2 m ; diamètre : 4 m', 'wp'], ['Poussée : 137 kN', 'wp'], ['Durée : 534 s', 'wp']] },
      { key:'fairing', name:'Coiffe', desc:'Coiffe de 4 m de diamètre, qui enveloppe le haut du deuxième étage.', facts:[] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '53 m', 'wp'],
        ['Diamètre', '4 m', 'wp'],
        ['Masse au décollage', '285 t (version 202) à 445 t', 'wp'],
        ['Étages', 'deux, avec deux ou quatre propulseurs à poudre', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '29 août 2001', 'wp'],
        ['Dernier vol', '28 juin 2025 (50e vol)', 'wp'],
        ['Vols', '50, dont 49 réussis', 'wp'],
        ['Base de lancement', 'Tanegashima', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse', '10 à 15 t selon la version', 'wp'],
        ['Orbite de transfert géostationnaire', '4,1 t (version 202) à 6 t (version 204)', 'wp']
      ]}
    ]
  },
  {
    id:'pslv', name:'PSLV', short:'PSLV', year:'1993', group:'in',
    agency:'ISRO (Organisation indienne de recherche spatiale)',
    first:'1993-09-20', firstRef:'wp',
    dims:{ h:{ v:44, ref:'wp' }, d:{ v:2.8, ref:'wp' }, mass:{ v:320, ref:'wp' } },
    cap:[ { o:'LEO', t:3.8, note:'PSLV-XL, 200 km, 30°', ref:'wp' }, { o:'GTO', t:1.3, note:'PSLV-XL', ref:'wp' } ],
    sil:{ body:[ { d:2.8, h:20, k:'core' }, { d:2.8, h:12.8, k:'up' }, { d:2, h:3.6, k:'up' }, { d:3.2, h:7.6, k:'fair', nose:3 } ], bst:{ n:6, d:1, h:12, nose:1.5 } },
    file:'models/pslv.glb', bytes:0, unit:0.1729,
    model:{ src:'« PSLV C40 », Neel3Dartist (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/pslv-c40-c7066310704040a9bf0c86d7d21ab94f', note:'Maquette du vol PSLV-C40 (version XL), sans son socle, redécoupée en étages pour ce site d\'après la position de chaque face (tools/models/cut.js) : les limites entre étages sont approchées. Mise à l\'échelle : 44 m de haut.' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le lanceur à tout faire de l\'Inde, tiré de Sriharikota. Ses quatre étages alternent poudre et ergols liquides, et six petits propulseurs entourent le premier étage dans la version XL. Il a lancé Chandrayaan-1, la première sonde lunaire indienne, la sonde martienne Mangalyaan et l\'observatoire solaire Aditya-L1.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Polar Satellite Launch Vehicle (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Polar_Satellite_Launch_Vehicle' }
    },
    parts:[
      { key:'ps1', name:'Premier étage PS1 (moteur à poudre S139)', desc:'L\'un des plus gros moteurs à poudre du monde.',
        facts:[['Hauteur : 20 m ; diamètre : 2,8 m', 'wp'], ['Poussée : 4 846,9 kN', 'wp'], ['Durée : 110 s', 'wp']] },
      { key:'psom', name:'Six propulseurs PSOM-XL', desc:'Propulseurs à poudre de la version XL.',
        facts:[['Hauteur : 12 m ; diamètre : 1 m', 'wp'], ['Poussée : 703,5 kN chacun', 'wp'], ['Durée : 70 s', 'wp']] },
      { key:'ps2', name:'Deuxième étage PS2 (moteur Vikas)', desc:'Étage à ergols liquides stockables.',
        facts:[['Hauteur : 12,8 m ; diamètre : 2,8 m', 'wp'], ['Poussée : 803,7 kN', 'wp'], ['Durée : 151 s', 'wp']] },
      { key:'ps3', name:'Troisième étage PS3 (poudre)', desc:'Étage à poudre.',
        facts:[['Hauteur : 3,6 m ; diamètre : 2 m', 'wp'], ['Poussée : 250 kN', 'wp']] },
      { key:'ps4', name:'Quatrième étage PS4 et coiffe', desc:'Petit étage à ergols liquides, avec deux moteurs, sous la coiffe avec les satellites.',
        facts:[['PS4 : hauteur 3 m ; diamètre 1,3 m ; 525 s', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '44 m', 'wp'],
        ['Diamètre', '2,8 m', 'wp'],
        ['Masse au décollage', '320 t (PSLV-XL)', 'wp'],
        ['Étages', 'quatre, avec zéro, deux, quatre ou six propulseurs à poudre selon la version', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '20 septembre 1993 ; version XL : 22 octobre 2008', 'wp'],
        ['Vols', '64, dont 59 réussis (fiche consultée le 26 novembre 2026)', 'wp'],
        ['Base de lancement', 'centre spatial Satish Dhawan, Sriharikota', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite basse (200 km, 30°)', '3,8 t (PSLV-XL)', 'wp'],
        ['Orbite héliosynchrone (620 km)', '1,75 t (PSLV-XL)', 'wp'],
        ['Orbite de transfert géostationnaire', '1,3 t (PSLV-XL)', 'wp']
      ]}
    ]
  },
  {
    id:'vega', name:'Vega', short:'Vega', year:'2012', group:'eu',
    agency:'Arianespace pour l\'ESA et l\'ASI ; construit par Avio',
    first:'2012-02-13', firstRef:'wp', last:'2024-09-05', lastRef:'wp',
    dims:{ h:{ v:30, ref:'wp' }, d:{ v:3, ref:'wp' }, mass:{ v:137, ref:'wp' } },
    cap:[ { o:'LEO', t:1.43, note:'orbite polaire à 700 km', ref:'wp' } ],
    sil:{ body:[ { d:3, h:11.7, k:'core' }, { d:1.9, h:8.39, k:'up' }, { d:1.9, h:4.12, k:'up' }, { d:2.6, h:5.79, k:'fair', nose:3 } ] },
    file:null,
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le petit lanceur européen, lancé de Kourou de 2012 à 2024 et remplacé par Vega-C. Trois étages à poudre et un petit étage supérieur réallumable, AVUM, qui dépose les satellites un par un. Il a lancé LISA Pathfinder en 2015 et plusieurs satellites Sentinel de Copernicus.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'Vega (rocket) (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/Vega_(rocket)' }
    },
    parts:[
      { key:'p80', name:'Premier étage P80', desc:'Moteur à poudre à enveloppe en fibre de carbone.',
        facts:[['Hauteur : 11,7 m ; diamètre : 3 m', 'wp'], ['Poussée : 2 261 kN', 'wp'], ['Durée : 107 s', 'wp']] },
      { key:'z23', name:'Deuxième étage Zefiro 23', desc:'Moteur à poudre.',
        facts:[['Hauteur : 8,39 m ; diamètre : 1,9 m', 'wp'], ['Poussée : 871 kN', 'wp'], ['Durée : 71,6 s', 'wp']] },
      { key:'z9', name:'Troisième étage Zefiro 9', desc:'Moteur à poudre.',
        facts:[['Hauteur : 4,12 m ; diamètre : 1,9 m', 'wp'], ['Poussée : 260 kN', 'wp'], ['Durée : 117 s', 'wp']] },
      { key:'avum', name:'Étage AVUM et coiffe', desc:'Étage à ergols liquides, réallumable jusqu\'à cinq fois, sous une coiffe de 2,6 m de diamètre.',
        facts:[['AVUM : 2,45 kN, jusqu\'à 612,5 s', 'wp'], ['Coiffe : 7,8 m de haut', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '30 m', 'wp'],
        ['Diamètre', '3 m', 'wp'],
        ['Masse au décollage', '137 t', 'wp'],
        ['Étages', 'trois à poudre et un étage liquide AVUM', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '13 février 2012', 'wp'],
        ['Dernier vol', '5 septembre 2024 (Sentinel-2C)', 'wp'],
        ['Vols', '22, dont 20 réussis', 'wp'],
        ['Base de lancement', 'Kourou (ensemble de lancement Vega)', 'wp']
      ]},
      { title:'Capacités', rows:[
        ['Orbite polaire (700 km)', '1,43 t', 'wp'],
        ['Orbite héliosynchrone (400 km)', '1,45 t', 'wp']
      ]}
    ]
  },
  {
    id:'starship', name:'Starship', short:'Starship', year:'2023', group:'us', status:'dev',
    agency:'SpaceX',
    first:'2023-04-20', firstRef:'wp',
    dims:{ h:{ v:123.1, ref:'wp' }, d:{ v:9, ref:'wp' }, mass:{ v:5000, ref:'wp', approx:true } },
    cap:[ { o:'LEO', t:100, note:'objectif annoncé pour la version réutilisable (Block 3) ; 35 t pour la Block 2', approx:true, ref:'wp' }, { o:'GTO', t:27, note:'objectif annoncé, version réutilisable', approx:true, ref:'wp' } ],
    sil:{ body:[ { d:9, h:71, k:'core' }, { d:9, h:52.1, k:'up', nose:12 } ] },
    file:'models/starship.glb', bytes:0, unit:4.946,
    model:{ src:'« SpaceX Starship Block 3 », Clarence365 (Sketchfab)', license:'CC BY 4.0', u:'https://sketchfab.com/3d-models/spacex-starship-block-3-6f6c6f88a3eb4b4d822fdca66733fbb2', note:'Maquette de la version Block 3, regroupée en deux étages et allégée pour ce site. Mise à l\'échelle : 124,4 m de haut (Block 3).' },
    view:{ az:0.6, el:0.12, dist:2.1 }, sun:[0.6, 0.5, 0.6],
    desc:'Le plus grand lanceur jamais construit, encore en développement. Ses deux étages, le propulseur Super Heavy et le vaisseau Starship, brûlent du méthane et de l\'oxygène liquides et doivent être entièrement réutilisables : le propulseur revient se faire attraper par la tour de lancement, une première réussie le 13 octobre 2024. Treize vols d\'essai ont eu lieu à la date de la fiche.',
    checked:'2026-11-26',
    refs:{
      wp:{ t:'SpaceX Starship (article encyclopédique, figures de l\'infobox)', p:'Wikipédia (en)', u:'https://en.wikipedia.org/wiki/SpaceX_Starship' }
    },
    parts:[
      { key:'booster', name:'Propulseur Super Heavy (33 moteurs Raptor)', desc:'Premier étage au méthane et à l\'oxygène liquides, conçu pour revenir au-dessus du pas de tir.',
        facts:[['Hauteur : 71 m (Block 1 et 2) ; diamètre : 9 m', 'wp'], ['Ergols : 3 250 t (Block 2)', 'wp']] },
      { key:'ship', name:'Vaisseau Starship (six moteurs Raptor)', desc:'Deuxième étage et vaisseau, avec trois moteurs pour l\'atmosphère et trois pour le vide.',
        facts:[['Hauteur : 52,1 m (Block 2) ; diamètre : 9 m', 'wp'], ['Ergols : 1 500 t (Block 2)', 'wp']] }
    ],
    sections:[
      { title:'Lanceur', rows:[
        ['Hauteur', '121,3 m (Block 1), 123,1 m (Block 2), 124,4 m (Block 3)', 'wp'],
        ['Diamètre', '9 m', 'wp'],
        ['Masse au décollage', 'environ 5 000 t', 'wp'],
        ['Étages', 'deux, réutilisables', 'wp']
      ]},
      { title:'Carrière', rows:[
        ['Premier vol', '20 avril 2023', 'wp'],
        ['Vols d\'essai', '13 au 24 juillet 2026, dont 8 réussis', 'wp'],
        ['État', 'en développement', 'wp'],
        ['Base de lancement', 'Starbase (Texas)', 'wp']
      ]},
      { title:'Capacités (objectifs)', rows:[
        ['Orbite basse', 'Block 2 : 35 t ; Block 3 : 100 t ; version réutilisable de référence : 100 à 150 t', 'wp'],
        ['Orbite de transfert géostationnaire', '27 t (version réutilisable de référence)', 'wp']
      ]}
    ]
  }
];
