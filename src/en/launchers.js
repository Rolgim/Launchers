/* Textes anglais des lanceurs : EN_MISSIONS[id] = { name, short, agency, desc, sections, refs, parts, model } (mêmes champs que MISSIONS).
   Les clés de source des lignes de la fiche sont reprises du français ; short et model.note sont appliqués par app.js. */
var EN_MISSIONS = {
  ariane5:{
    agency:'ESA, ArianeGroup; operated by Arianespace',
    desc:'Europe\'s heavy launcher from 1996 to 2023: 117 flights from Kourou, including the James Webb telescope in 2021 and the JUICE probe in 2023. Its ECA version, the most powerful, could place two telecommunications satellites at once into geostationary transfer orbit.',
    refs:{ esa:'Ariane 5 ECA (page published 5 March 2004)' },
    parts:{
      eap:{ name:'EAP solid boosters', desc:'Two solid boosters attached on either side of the main stage; they provide most of the thrust at lift-off, then separate.', facts:['Thrust of both boosters at lift-off: 1,300 tonnes'] },
      epc:{ name:'EPC main stage (Vulcain 2 engine)', desc:'Cryogenic stage ignited on the ground, a few seconds before the boosters, which runs for nearly nine minutes.', facts:['Propellants: 150 t of liquid oxygen and 25 t of liquid hydrogen', 'Vulcain 2 thrust: up to 137 tonnes', 'Burn time: nearly 540 s'] },
      esc:{ name:'ESC-A upper stage (HM7B engine)', desc:'Cryogenic stage that completes the injection into orbit.', facts:['Propellants: 14.7 t', 'HM7B vacuum thrust: 6.5 tonnes', 'Burn time: nearly 940 s'] },
      fairing:{ name:'Fairing', desc:'Protects the satellites through the atmosphere, then opens in two. For a dual launch, a structure (Sylda) separates the two satellites under the fairing.' }
    },
    model:{ license:'CC BY 4.0', note:'Model grouped by stage from the position of each piece, and lightened for this site. Scaled to 53 m tall.' },
    sections:[
      { title:'Launcher', rows:[ ['Height', 'up to 53 m'], ['Diameter', 'up to 5.4 m'], ['Lift-off mass', '780 t (dual launch)'], ['Stages', 'two EAP solid boosters, EPC main stage, ESC-A upper stage'] ]},
      { title:'Career', rows:[ ['First flight', '4 June 1996 (first ECA flight: 11 December 2002, failure)'], ['Last flight', '5 July 2023, 117th flight'], ['Reliability', '98.4% at its last flight'], ['Launch site', 'Guiana Space Centre, Kourou (ELA-3 complex)'] ]},
      { title:'Capabilities', rows:[ ['Geostationary transfer orbit', '10 t in dual launch, 10.8 t in single launch'], ['Low Earth orbit', 'up to 21 t'] ]}
    ]
  },
  ariane6:{
    agency:'ESA, ArianeGroup; operated by Arianespace',
    desc:'Ariane 5\'s successor, first launched on 9 July 2024 from Kourou. Two versions: Ariane 62, with two solid boosters, and Ariane 64, with four. Its upper stage, powered by the Vinci engine, can reignite to drop satellites into several orbits during one flight.',
    refs:{ esa1:'Europe\'s new Ariane 6 rocket powers into space (first flight press release)' },
    model:{ license:'CC BY 4.0', note:'Model grouped by stage and lightened for this site (reduced textures). Scaled to 62 m tall.' },
    parts:{
      p120c:{ name:'P120C solid boosters', desc:'Two (Ariane 62) or four (Ariane 64) solid boosters; the same motor is Vega-C\'s first stage.', facts:['Propellant: 142 t per booster', 'Lift-off thrust: 350 tonnes per booster', 'Burn time: 130 s'] },
      llpm:{ name:'Main stage (Vulcain 2.1 engine)', desc:'Cryogenic stage burning liquid hydrogen and oxygen, which powers the first ten minutes of flight.', facts:['Propellants: 150 t', 'Vulcain 2.1 lift-off thrust: 135 tonnes'] },
      ulpm:{ name:'Upper stage (Vinci engine)', desc:'Re-ignitable cryogenic stage: it can shut down and restart several times to reach different orbits.', facts:['Full tanks: 30 t', 'Vinci thrust: 18 tonnes'] },
      fairing:{ name:'Fairing', desc:'Protects the satellites through the atmosphere, then opens in two.', facts:['Height: 14 or 20 m', 'Diameter: 5.4 m'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '62 m'], ['Diameter', '5.4 m (fairing)'], ['Lift-off mass', 'Ariane 62: 530 t; Ariane 64: 860 t'], ['Lift-off thrust', 'Ariane 62: 800 tonnes; Ariane 64: 1,500 tonnes'], ['Stages', 'two or four P120C boosters, main stage (Vulcain 2.1), upper stage (Vinci)'] ]},
      { title:'Career', rows:[ ['First flight', '9 July 2024 (Ariane 62)'], ['Launch site', 'Guiana Space Centre, Kourou (new complex 4 km west of Ariane 5\'s)'] ]},
      { title:'Capabilities', rows:[ ['Geostationary transfer orbit', 'Ariane 62: ≈ 4.5 t; Ariane 64: ≈ 11.5 t'], ['Low Earth orbit', 'Ariane 62: 10.3 t; Ariane 64: 21.6 t'] ]}
    ]
  },
  vegac:{
    agency:'ESA, Avio; operated by Avio',
    model:{ license:'CC BY 4.0', note:'Model “inspired by Vega-C” according to its author (personal CAD model), not an exact replica. Grouped by stage and lightened for this site. Scaled to 34.8 m tall.' },
    desc:'Small European launcher for Earth observation satellites and science missions in low orbit. Its first three stages are solid; the fourth, AVUM+, burns liquid propellants and can reignite. First flight on 13 July 2022, return to flight on 5 December 2024 after the late-2022 failure.',
    parts:{
      p120c:{ name:'P120C first stage', desc:'Solid motor, the same as Ariane 6\'s boosters.', facts:['Propellant: 143.6 t', 'Average thrust: 4,500 kN', 'Burn time: about two minutes'] },
      z40:{ name:'Zefiro 40 second stage', desc:'Solid motor.', facts:['Propellant: 36.2 t', 'Average thrust: 1,304 kN'] },
      z9:{ name:'Zefiro 9 third stage', desc:'Solid motor.', facts:['Propellant: 10 t', 'Burn time: two and a half minutes'] },
      avum:{ name:'AVUM+ upper stage', desc:'Re-ignitable liquid-propellant stage, which trims the orbit and can release several satellites.', facts:['Propellants: 740 kg', 'Average thrust: 2.42 kN'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '34.8 m'], ['Diameter', '3.4 m'], ['Lift-off mass', '210 t'], ['Stages', 'P120C, Zefiro 40, Zefiro 9 (solid), AVUM+ (liquid)'] ]},
      { title:'Career', rows:[ ['First flight', '13 July 2022'], ['Return to flight', '5 December 2024, after the late-2022 failure'], ['Launch site', 'Guiana Space Centre, Kourou'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit', '3.3 t'], ['Sun-synchronous orbit', '2.3 t'], ['Polar orbit, 700 km', 'up to 2.2 t'] ]}
    ]
  },
  falcon9:{
    desc:'The most used launcher in the world today. Its first stage, powered by nine Merlin engines, lands back on a ship at sea or near the launch pad, then flies again: it is the first orbital launcher whose first stage is routinely reused. It launches Starlink satellites, science missions and, with the Dragon capsule, crews to the International Space Station.',
    refs:{ wv:'Falcon 9 v1.2 or Full Thrust (Block 5), specifications', wp:'Falcon 9 (encyclopedia article, infobox figures)' },
    model:{ license:'CC BY 4.0', note:'Model grouped by stage and lightened for this site (reduced textures). Scaled to 70 m tall.' },
    parts:{
      stage1:{ name:'First stage (nine Merlin 1D engines)', desc:'Reusable kerosene and liquid-oxygen stage: after separation it relights three engines, steers with its grid fins and lands on four legs.', facts:['Height: 41.2 m (47.7 m with the interstage)', 'Thrust at sea level: 7,607 kN; in vacuum: 8,227 kN', 'Burn time: 162 s'] },
      stage2:{ name:'Second stage (Merlin Vacuum engine)', desc:'Kerosene and liquid-oxygen stage, not recovered; its engine can reignite.', facts:['Height: 13.8 m', 'Vacuum thrust: 981 kN', 'Burn time: 397 s'] },
      fairing:{ name:'Fairing', desc:'Two-half fairing, recovered at sea and reused. On crewed flights, the Dragon capsule replaces the fairing.', facts:['Height: 13.1 m; diameter: 5.2 m'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '70 m'], ['Diameter', '3.7 m'], ['Lift-off mass', '549,054 kg'], ['Lift-off thrust', '7,607 kN'], ['Stages', 'two, kerosene and liquid oxygen; reusable first stage'] ]},
      { title:'Career', rows:[ ['First flight', '4 June 2010 (Block 5 version: 11 May 2018)'], ['Launch sites', 'Cape Canaveral (SLC-40), Kennedy Space Center (LC-39A), Vandenberg (SLC-4E)'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (28.5°)', '22.8 t without recovery; 17.5 t with a ship landing'], ['Geostationary transfer orbit', '8.3 t without recovery; 5.5 t with a ship landing'], ['To Mars', '4.02 t'] ]}
    ]
  },
  falconheavy:{
    desc:'Three Falcon 9 first stages side by side, 27 Merlin engines lit at lift-off. The two side boosters often land back together near the pad. It launched the Psyche probe, the GOES-U weather satellite and the Europa Clipper probe to Jupiter.',
    refs:{ wp:'Falcon Heavy (encyclopedia article; capabilities per SpaceX, “Capabilities & Services”)' },
    model:{ license:'CC BY 4.0', note:'Model grouped by stage and lightened for this site (reduced textures). Scaled to 70 m tall.' },
    parts:{
      boosters:{ name:'Two side boosters', desc:'Two strengthened Falcon 9 first stages, with a nose cone instead of an upper stage; they separate first and can land back.', facts:['Nine Merlin 1D engines each', 'Thrust at sea level: 7,600 kN each', 'Burn time: 154.3 s'] },
      core:{ name:'Centre core', desc:'Central first stage, strengthened to carry both boosters; its engines throttle down early on to last longer.', facts:['Nine Merlin 1D engines', 'Height: 42.6 m', 'Burn time: 187 s'] },
      stage2:{ name:'Second stage (Merlin Vacuum engine)', desc:'The same as Falcon 9\'s.', facts:['Vacuum thrust: 934 kN', 'Burn time: 397 s'] },
      fairing:{ name:'Fairing', desc:'The same fairing as Falcon 9.' }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '70 m'], ['Width', '12.2 m (each core: 3.7 m)'], ['Lift-off mass', '1,420 t'], ['Lift-off thrust', '22.82 MN (27 Merlin 1D engines)'], ['Stages', 'two side boosters and a centre core (Falcon 9 first stages), Falcon 9 second stage'] ]},
      { title:'Career', rows:[ ['First flight', '6 February 2018, Kennedy Space Center'], ['Launch site', 'Kennedy Space Center (LC-39A)'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (28.5°)', '63.8 t without recovery'], ['Geostationary transfer orbit', '26.7 t without recovery; 8 t with all three cores recovered'], ['To Mars', '16.8 t'] ]}
    ]
  },
  sls:{
    agency:'NASA; Boeing (core stage), Northrop Grumman (boosters)',
    desc:'NASA\'s Moon rocket, for the Artemis programme. It launched the Orion capsule around the Moon without a crew on 16 November 2022 (Artemis I), then with four astronauts in April 2026 (Artemis II). Its four RS-25 engines flew on the Space Shuttle, as did its two solid boosters, lengthened by one segment.',
    refs:{ nasa1b:'SLS (Space Launch System) Block 1B (reference page, comparison with Block 1)', wp:'Space Launch System (encyclopedia article, infobox figures)' },
    model:{ license:'CC BY 4.0', note:'Model grouped by element and lightened for this site (reduced textures). Scaled to 98.3 m tall.' },
    parts:{
      srb:{ name:'Two solid boosters', desc:'Five-segment boosters, derived from the Space Shuttle\'s (four segments); they provide most of the thrust during the first two minutes.', facts:['Thrust of both boosters at lift-off: 8.8 million pounds-force (≈ 39 MN)'] },
      core:{ name:'Core stage', desc:'The largest stage NASA has built: liquid hydrogen and oxygen tanks feeding four RS-25 engines for just over eight minutes.', facts:['Height: 212 feet (≈ 64.6 m)', 'Burn: just over eight minutes'] },
      rs25:{ name:'Four RS-25 engines', desc:'Liquid hydrogen and oxygen engines at the bottom of the core stage; those of the first flights flew on the Space Shuttle.', facts:['Core stage thrust: more than 2 million pounds-force'] },
      icps:{ name:'ICPS upper stage (RL10 engine)', desc:'Interim cryogenic stage, derived from the Delta IV rocket\'s: it sends Orion to the Moon.', facts:['RL10 thrust: 24,750 pounds-force (≈ 110 kN)'] },
      orion:{ name:'Orion capsule and service module', desc:'The crewed spacecraft, for four astronauts, with its European (ESA) service module and solar arrays.' },
      las:{ name:'Launch abort tower', desc:'If something goes wrong at lift-off or during the climb, its solid motors pull the capsule away from the rocket. Jettisoned once the climb is safe.' }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '322.4 feet (98.3 m), crew version'], ['Lift-off mass', '5.7 million pounds (≈ 2,600 t)'], ['Lift-off thrust', '8.8 million pounds-force (≈ 39 MN)'], ['Stages', 'two solid boosters, core stage (four RS-25), ICPS upper stage'] ]},
      { title:'Career', rows:[ ['First flight', '16 November 2022, Artemis I, Kennedy Space Center pad 39B'], ['First crewed flight', 'April 2026, Artemis II'] ]},
      { title:'Capabilities', rows:[ ['To the Moon', 'more than 27 t'], ['Low Earth orbit (200 km, 28.5°)', '95 t'] ]}
    ]
  },
  soyuz2:{
    name:'Soyuz-2', short:'Soyuz',
    model:{ license:'CC BY 4.0', note:'Model of a Soyuz-FG, Soyuz-2\'s predecessor (same layout, fairing for a crewed spacecraft), grouped by stage. Original size of the model: 49.5 m with its fairing.' },
    agency:'Roscosmos; built by RKTs Progress',
    desc:'The latest version of the Soyuz family, heir to the R-7 rocket that launched Sputnik in 1957 and Gagarin in 1961. Four cone-shaped boosters surround the core stage; all ignite on the ground. It launches crews and cargo ships to the International Space Station, and satellites from Baikonur, Plesetsk and Vostochny.',
    refs:{ wp:'Soyuz-2 (encyclopedia article, infobox figures)' },
    parts:{
      blockb:{ name:'Four boosters (blocks B, V, G, D)', desc:'First stage: four conical kerosene and liquid-oxygen boosters, one RD-107A engine each.', facts:['Height: 19.6 m; diameter: 2.68 m', 'Thrust at sea level: 838.5 kN each', 'Burn time: 118 s'] },
      blocka:{ name:'Core stage (block A)', desc:'Second stage, ignited on the ground together with the boosters; RD-108A engine.', facts:['Height: 27.1 m; diameter: 2.95 m', 'Thrust at sea level: 792.5 kN', 'Burn time: 286 s'] },
      blocki:{ name:'Third stage (block I)', desc:'RD-0110 (Soyuz-2.1a) or RD-0124 (Soyuz-2.1b) engine, burning kerosene and liquid oxygen.', facts:['Height: 6.7 m; diameter: 2.66 m', 'Thrust: 298 kN (2.1a), 294.3 kN (2.1b)'] },
      fregat:{ name:'Fregat stage (optional) and fairing', desc:'Re-ignitable fourth stage with storable propellants, for high orbits; under the fairing with the satellites.' }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '46.3 m'], ['Diameter', '2.95 m (core stage), 10.3 m with the boosters'], ['Lift-off mass', '312 t'], ['Stages', 'three, or four with Fregat'] ]},
      { title:'Career', rows:[ ['First flight', 'Soyuz-2.1a: 8 November 2004; Soyuz-2.1b: 27 December 2006'], ['Launch sites', 'Baikonur, Plesetsk, Vostochny'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (240 km, 51.6°, Baikonur)', 'Soyuz-2.1a: 7.43 t; Soyuz-2.1b: 8.67 t'], ['To the Moon', 'Soyuz-2.1b: 2.35 t'] ]}
    ]
  },
  cz5:{
    name:'Long March 5', short:'Long March 5',
    model:{ license:'CC BY 4.0', note:'Model re-cut into stages for this site from the position of each face and the published stage lengths (tools/models/seg_cz5.js): the boundaries between stages are approximate. Scaled to 56.97 m tall.' },
    agency:'CASC; built by CALT',
    desc:'China\'s heavy launcher, in service since 2016 at the Wenchang centre on Hainan island. It launched the Tianwen-1 Mars probe, the Chang\'e 5 and Chang\'e 6 lunar missions and, in its 5B version, the modules of the Tiangong station.',
    refs:{ wp:'Long March 5 (encyclopedia article, infobox figures)' },
    parts:{
      boosters:{ name:'Four CZ-5-300 boosters', desc:'Kerosene and liquid-oxygen boosters, two YF-100 engines each.', facts:['Height: 27.6 m; diameter: 3.35 m', 'Thrust at sea level: 2,400 kN each', 'Burn time: 173 s'] },
      core:{ name:'CZ-5-500 first stage', desc:'Cryogenic liquid hydrogen and oxygen stage, two YF-77 engines.', facts:['Height: 33.16 m; diameter: 5 m', 'Propellants: 165.3 t', 'Burn time: 492 s'] },
      stage2:{ name:'CZ-5-HO second stage', desc:'Cryogenic stage, two YF-75D engines; absent from the 5B version, which puts its payloads directly into low orbit.', facts:['Height: 11.54 m', 'Thrust: 176.72 kN', 'Burn time: 700 s'] },
      fairing:{ name:'Fairing', desc:'5.2 m diameter fairing, in two lengths.', facts:['Length: 12.27 m or 20.5 m'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '56.97 m (63.2 m with the long fairing)'], ['Diameter', '5 m'], ['Lift-off mass', '851.8 t'], ['Lift-off thrust', '10,565 kN'], ['Stages', 'four boosters, two cryogenic stages; optional YZ-2 stage'] ]},
      { title:'Career', rows:[ ['First flight', 'CZ-5: 3 November 2016; CZ-5B: 5 May 2020'], ['Launch site', 'Wenchang (Hainan), pad 1'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (200 × 400 km)', '25 t (CZ-5B)'], ['Geostationary transfer orbit', '14 t'], ['To the Moon', '8.8 to 9.4 t'] ]}
    ]
  },
  saturnv:{
    name:'Saturn V', short:'Saturn V',
    model:{ license:'CC BY 4.0', note:'Model re-cut into stages for this site from the height of each face and the published stage lengths (tools/models/cut.js): the boundaries between stages are approximate. Scaled to 111 m tall with the Apollo spacecraft.' },
    agency:'NASA; stages built by Boeing, North American and Douglas',
    desc:'The rocket of the Apollo programme, the most powerful ever put into service until the 2020s. Nine flights, from Apollo 8 to Apollo 17, carried 24 astronauts to the Moon. Its last flight launched Skylab, the first American space station, fitted out inside a Saturn V third stage.',
    refs:{ wp:'Saturn V (encyclopedia article, infobox figures)' },
    parts:{
      sic:{ name:'S-IC first stage (five F-1 engines)', desc:'Kerosene and liquid-oxygen stage, built by Boeing.', facts:['Height: 42 m; diameter: 10 m', 'Thrust at sea level: 33,000 kN', 'Burn time: 150 s'] },
      sii:{ name:'S-II second stage (five J-2 engines)', desc:'Liquid hydrogen and oxygen stage, built by North American.', facts:['Height: 24.87 m; diameter: 10 m', 'Thrust in vacuum: 4,400 kN', 'Burn time: 395 s'] },
      sivb:{ name:'S-IVB third stage (one J-2 engine)', desc:'Liquid hydrogen and oxygen stage, built by Douglas. It fired twice: to reach Earth orbit, then to leave for the Moon.', facts:['Height: 17.86 m; diameter: 6.60 m', 'Thrust in vacuum: 1,000 kN', 'Burn time: 165 s then 312 s (two burns)'] },
      apollo:{ name:'Apollo spacecraft and escape tower', desc:'At the top: the adapter that housed the lunar module, the service module, the crew capsule and the launch escape tower.' }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '111 m with the Apollo spacecraft'], ['Diameter', '10 m'], ['Lift-off mass', '2,822 to 2,965 t depending on the mission'], ['Lift-off thrust', '34.5 MN'], ['Stages', 'three'] ]},
      { title:'Career', rows:[ ['First flight', '9 November 1967 (Apollo 4)'], ['Last flight', '14 May 1973 (Skylab)'], ['Flights', '13, of which 12 successful and one partial failure (Apollo 6)'], ['Launch site', 'Kennedy Space Center, Launch Complex 39'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (185 km)', '140 t'], ['To the Moon', '43.5 t'] ]}
    ]
  },
  shuttle:{
    name:'Space Shuttle', short:'Shuttle',
    model:{ license:'NASA (copyright-free)', note:'Uncoloured NASA model, set upright and grouped into three elements for this site. Scaled on the length of the external tank (47 m): the other lengths are approximate.' },
    agency:'NASA; orbiter built by Rockwell, tank by Martin Marietta, boosters by Thiokol',
    desc:'The first orbital vehicle designed for reuse: the orbiter and its crew glided back to a runway, and the solid boosters were recovered at sea; only the big orange tank was lost. Over thirty years it launched and repaired the Hubble telescope, launched Chandra, Galileo, Magellan and Ulysses, and assembled the International Space Station. Two accidents, Challenger in 1986 and Columbia in 2003, killed 14 astronauts.',
    refs:{ wp:'Space Shuttle (encyclopedia article, infobox figures)' },
    parts:{
      srb:{ name:'Two solid rocket boosters', desc:'The largest solid motors of their time, recovered at sea under parachutes and refilled.', facts:['Thrust: 13 MN each', 'Burn time: 124 s'] },
      et:{ name:'External tank', desc:'Large liquid hydrogen and oxygen tank that fed the orbiter\'s three engines; dropped just before orbit, it fell back into the ocean.', facts:['Diameter: 8.7 m'] },
      orbiter:{ name:'Orbiter (three RS-25 engines)', desc:'The spaceplane, with the crew and an 18 m long payload bay. Its engines burned the external tank\'s hydrogen and oxygen throughout the climb.', facts:['Thrust at sea level: 1,750 kN per engine', 'Burn time: 480 s'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '56 m'], ['Diameter', '8.7 m (external tank)'], ['Lift-off mass', '2,030 t'], ['Elements', 'two solid boosters, an external tank, the orbiter and its three engines'] ]},
      { title:'Career', rows:[ ['First flight', '12 April 1981 (STS-1)'], ['Last flight', '21 July 2011 (STS-135)'], ['Flights', '135, including two accidents (Challenger, 1986; Columbia, 2003)'], ['Launch sites', 'Kennedy Space Center, Complexes 39A and 39B'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (204 km)', '27.5 t'], ['To the International Space Station', '16.05 t'], ['Geostationary transfer orbit', '4.94 t with the IUS stage'], ['Return to Earth', '14.4 t'] ]}
    ]
  },
  delta2:{
    name:'Delta II', short:'Delta II',
    agency:'McDonnell Douglas, then Boeing, then United Launch Alliance',
    desc:'NASA\'s medium launcher for science missions for thirty years, with 155 flights. Nine solid boosters usually surrounded its first stage. It launched the Mars rovers Spirit and Opportunity, the GRAIL lunar probes, and observatories such as WMAP and Fermi.',
    refs:{ wp:'Delta II (encyclopedia article, infobox figures)' },
    parts:{
      stage1:{ name:'First stage (RS-27A engine)', desc:'Kerosene and liquid-oxygen stage, derived from the Thor missile.', facts:['Height: 26.1 m; diameter: 2.44 m', 'Thrust: 1,054 kN', 'Burn time: 260.5 s'] },
      gem:{ name:'GEM 40 boosters (three, four or nine)', desc:'Solid boosters; with nine, six ignite on the ground and three in flight.', facts:['Height: 13 m; diameter: 1.02 m', 'Thrust: 499.2 kN each (ground-lit)', 'Burn time: 64 s'] },
      stage2:{ name:'Delta-K second stage (AJ10-118K engine)', desc:'Storable-propellant stage, re-ignitable.', facts:['Height: 6 m; diameter: 2.44 m', 'Thrust: 43.6 kN', 'Burn time: 431 s'] },
      fairing:{ name:'Fairing and Star 48B third stage (optional)', desc:'For interplanetary probes, a solid third stage was added under the fairing.', facts:['Star 48B: 66 kN for 87 s'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '38.9 m'], ['Diameter', '2.44 m'], ['Lift-off mass', '152 to 286.1 t depending on the version'], ['Stages', 'two or three, with three, four or nine solid boosters'] ]},
      { title:'Career', rows:[ ['First flight', '14 February 1989'], ['Last flight', '15 September 2018 (ICESat-2)'], ['Flights', '155, of which 153 successful, one failure and one partial failure'], ['Launch sites', 'Cape Canaveral (SLC-17), Vandenberg (SLC-2W)'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (28.7°)', '2.8 to 6.1 t depending on the version'], ['Sun-synchronous orbit', '1.65 to 3.18 t depending on the version'], ['Geostationary transfer orbit', '0.93 to 2.18 t depending on the version'] ]}
    ]
  },
  atlas5:{
    name:'Atlas V', short:'Atlas V',
    model:{ license:'CC BY 4.0', note:'Model of version 551, re-cut for this site from the position of each face (tools/models/cut.js): the boundary between first stage and fairing is approximate. Scaled to 58.3 m tall.' },
    agency:'United Launch Alliance (developed by Lockheed Martin)',
    desc:'A very reliable American launcher, nearing retirement: its first stage uses a Russian RD-180 engine and its Centaur upper stage burns hydrogen. It launched Mars Reconnaissance Orbiter, New Horizons to Pluto, Juno to Jupiter, and the Curiosity and Perseverance rovers.',
    refs:{ wp:'Atlas V (encyclopedia article, infobox figures and table of versions)' },
    parts:{
      ccb:{ name:'First stage (RD-180 engine)', desc:'The Common Core Booster, burning kerosene and liquid oxygen, with a two-chamber Russian engine.', facts:['Height: 32.46 m; diameter: 3.81 m', 'Thrust at sea level: 3,827 kN', 'Burn time: 253 s'] },
      srb:{ name:'Solid boosters (zero to five)', desc:'The tens digit of the version name gives their number: version 551 has five.', facts:['AJ-60A: 17 m; 1.6 m in diameter', 'GEM 63 (since 2020): 20.1 m', 'Burn time: 94 s'] },
      fairing:{ name:'Fairing and Centaur second stage', desc:'4.2 m fairing (4xx versions) or 5.4 m fairing (5xx versions); the large fairing also encloses the Centaur second stage, burning liquid hydrogen and oxygen with one or two RL10 engines.', facts:['5.4 m fairing: 20.7, 23.4 or 26.5 m long', 'Centaur: 12.68 m; diameter 3.05 m; 842 s (one RL10A)'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', 'up to 58.3 m'], ['Diameter', '3.81 m'], ['Lift-off mass', '590 t (heaviest version)'], ['Stages', 'two, with zero to five solid boosters'] ]},
      { title:'Career', rows:[ ['First flight', '21 August 2002'], ['Flights', '109, of which 108 successful and one partial failure'], ['Status', 'nearing retirement: eight rockets remained to be launched in April 2026'], ['Launch sites', 'Cape Canaveral (SLC-41), Vandenberg (SLC-3E, until 2022)'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (28.7°)', '9.8 t (version 401) to 18.8 t (version 551)'], ['Geostationary transfer orbit', '4.75 t (version 401) to 8.9 t (version 551)'] ]}
    ]
  },
  titan4:{
    name:'Titan IV', short:'Titan IV',
    model:{ license:'CC BY 4.0', note:'Model of a Titan IVB; only the assembled copy is kept (the original model also shows an exploded one). Re-cut into stages for this site from the position of each face (tools/models/cut.js): the boundaries between stages are approximate. Scaled to 62 m tall.' },
    agency:'US Air Force; built by Martin Marietta, then Lockheed Martin',
    desc:'The US Air Force\'s heavy launcher in the 1990s. Its two stages burned storable propellants, and two huge solid boosters helped at lift-off. Only one of its missions was not military: Cassini-Huygens, which left for Saturn in 1997.',
    refs:{ wp:'Titan IV (encyclopedia article, infobox figures)' },
    parts:{
      srmu:{ name:'Two SRMU solid boosters (Titan IVB)', desc:'Composite-case boosters, ignited on the ground.', facts:['Thrust: 7.56 MN each', 'Burn time: 140 s'] },
      stage1:{ name:'First stage (two LR87 engines)', desc:'Storable-propellant stage (nitrogen tetroxide and Aerozine 50), ignited in flight shortly before the boosters burn out.', facts:['Thrust: 2,438 kN', 'Burn time: 164 s'] },
      stage2:{ name:'Second stage (LR91 engine)', desc:'Storable-propellant stage.', facts:['Thrust: 467 kN', 'Burn time: 223 s'] },
      centaur:{ name:'Centaur stage and fairing', desc:'Optional liquid hydrogen and oxygen upper stage, under a 5.1 m diameter fairing.', facts:['Centaur: two RL10 engines, 147 kN, 625 s', 'Fairing: 5.1 m in diameter, 17 to 26 m long'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '50 to 62 m depending on the fairing'], ['Diameter', '3.05 m'], ['Lift-off mass', '943 t'], ['Stages', 'three to five, with two solid boosters'] ]},
      { title:'Career', rows:[ ['First flight', 'Titan IVA: 14 June 1989; Titan IVB: 23 February 1997'], ['Last flight', '19 October 2005'], ['Flights', '39, of which 35 successful'], ['Launch sites', 'Cape Canaveral (SLC-40 and 41), Vandenberg (SLC-4E)'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit', '21.68 t'], ['Geostationary orbit (with Centaur)', '5.76 t'] ]}
    ]
  },
  protonm:{
    name:'Proton-M', short:'Proton-M',
    model:{ license:'CC BY 4.0', note:'Model re-cut into stages for this site from the height of each face and the published stage lengths (tools/models/cut.js): the boundaries between stages are approximate. Scaled to 58.2 m tall.' },
    agency:'Roscosmos; built by Khrunichev',
    desc:'Russia\'s heavy launcher, a modernised version of the 1960s Proton. Its first stage is surrounded by six tanks and burns toxic but storable propellants. It has launched telecommunication satellites, International Space Station modules (Zvezda, Nauka) and probes to Mars.',
    refs:{ wp:'Proton-M (encyclopedia article, infobox figures)' },
    parts:{
      stage1:{ name:'First stage (six RD-275M engines)', desc:'A central oxidiser tank surrounded by six fuel tanks, each carrying an engine.', facts:['Height: 21.18 m; diameter: 7.4 m', 'Thrust: 10,532 kN', 'Burn time: 108 s'] },
      stage2:{ name:'Second stage (four engines)', desc:'Three RD-0210 engines and one RD-0211.', facts:['Height: 17.05 m; diameter: 4.1 m', 'Thrust: 2,399 kN', 'Burn time: 206 s'] },
      stage3:{ name:'Third stage', desc:'Storable-propellant stage.', facts:['Height: 4.11 m; diameter: 4.1 m', 'Thrust: 613.8 kN', 'Burn time: 238 s'] },
      breeze:{ name:'Breeze-M stage and fairing', desc:'Re-ignitable upper stage for high orbits, under a 4.35 m diameter fairing.', facts:['Breeze-M: 19.62 kN, up to 3,000 s of operation'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '58.2 m'], ['Diameter', '7.4 m'], ['Lift-off mass', '705 t'], ['Stages', 'three, or four with Breeze-M or Blok DM'] ]},
      { title:'Career', rows:[ ['First flight', '7 April 2001'], ['Flights', '116, of which 105 successful (page checked on 26 November 2026)'], ['Launch site', 'Baikonur'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit', '23 t'], ['Geostationary transfer orbit', '6.92 t (with Breeze-M)'], ['Geostationary orbit', '3.25 t'] ]}
    ]
  },
  h2a:{
    name:'H-IIA', short:'H-IIA',
    model:{ license:'CC BY 4.0', note:'Model grouped by stage for this site; original height: 53 m.' },
    agency:'JAXA and Mitsubishi Heavy Industries',
    desc:'Japan\'s main launcher for nearly 25 years, flown from Tanegashima. Both its stages burn liquid hydrogen and oxygen. It launched the Kaguya lunar probe, the Akatsuki Venus probe and Hayabusa2, which brought back samples of the asteroid Ryugu. Its successor is H3.',
    refs:{ wp:'H-IIA (encyclopedia article, infobox figures)' },
    parts:{
      stage1:{ name:'First stage (LE-7A engine)', desc:'Liquid hydrogen and oxygen stage.', facts:['Height: 37.2 m; diameter: 4 m', 'Thrust: 1,098 kN', 'Burn time: 390 s'] },
      srb:{ name:'SRB-A solid boosters (two or four)', desc:'Version 202 has two, version 204 four.', facts:['Height: 15.1 m; diameter: 2.5 m', 'Thrust: 2,260 kN each', 'Burn time: 120 s'] },
      stage2:{ name:'Second stage (LE-5B engine)', desc:'Liquid hydrogen and oxygen stage, re-ignitable.', facts:['Height: 9.2 m; diameter: 4 m', 'Thrust: 137 kN', 'Burn time: 534 s'] },
      fairing:{ name:'Fairing', desc:'4 m diameter fairing, which encloses the top of the second stage.' }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '53 m'], ['Diameter', '4 m'], ['Lift-off mass', '285 t (version 202) to 445 t'], ['Stages', 'two, with two or four solid boosters'] ]},
      { title:'Career', rows:[ ['First flight', '29 August 2001'], ['Last flight', '28 June 2025 (50th flight)'], ['Flights', '50, of which 49 successful'], ['Launch site', 'Tanegashima'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit', '10 to 15 t depending on the version'], ['Geostationary transfer orbit', '4.1 t (version 202) to 6 t (version 204)'] ]}
    ]
  },
  pslv:{
    name:'PSLV', short:'PSLV',
    model:{ license:'CC BY 4.0', note:'Model of flight PSLV-C40 (XL version), without its stand, re-cut into stages for this site from the position of each face (tools/models/cut.js): the boundaries between stages are approximate. Scaled to 44 m tall.' },
    agency:'ISRO (Indian Space Research Organisation)',
    desc:'India\'s workhorse launcher, flown from Sriharikota. Its four stages alternate solid and liquid propellants, and six small boosters surround the first stage in the XL version. It launched Chandrayaan-1, India\'s first lunar probe, the Mangalyaan Mars probe and the Aditya-L1 solar observatory.',
    refs:{ wp:'Polar Satellite Launch Vehicle (encyclopedia article, infobox figures)' },
    parts:{
      ps1:{ name:'PS1 first stage (S139 solid motor)', desc:'One of the largest solid motors in the world.', facts:['Height: 20 m; diameter: 2.8 m', 'Thrust: 4,846.9 kN', 'Burn time: 110 s'] },
      psom:{ name:'Six PSOM-XL boosters', desc:'Solid boosters of the XL version.', facts:['Height: 12 m; diameter: 1 m', 'Thrust: 703.5 kN each', 'Burn time: 70 s'] },
      ps2:{ name:'PS2 second stage (Vikas engine)', desc:'Storable liquid-propellant stage.', facts:['Height: 12.8 m; diameter: 2.8 m', 'Thrust: 803.7 kN', 'Burn time: 151 s'] },
      ps3:{ name:'PS3 third stage (solid)', desc:'Solid stage.', facts:['Height: 3.6 m; diameter: 2 m', 'Thrust: 250 kN'] },
      ps4:{ name:'PS4 fourth stage and fairing', desc:'Small liquid-propellant stage with two engines, under the fairing with the satellites.', facts:['PS4: height 3 m; diameter 1.3 m; 525 s'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '44 m'], ['Diameter', '2.8 m'], ['Lift-off mass', '320 t (PSLV-XL)'], ['Stages', 'four, with zero, two, four or six solid boosters depending on the version'] ]},
      { title:'Career', rows:[ ['First flight', '20 September 1993; XL version: 22 October 2008'], ['Flights', '64, of which 59 successful (page checked on 26 November 2026)'], ['Launch site', 'Satish Dhawan Space Centre, Sriharikota'] ]},
      { title:'Capabilities', rows:[ ['Low Earth orbit (200 km, 30°)', '3.8 t (PSLV-XL)'], ['Sun-synchronous orbit (620 km)', '1.75 t (PSLV-XL)'], ['Geostationary transfer orbit', '1.3 t (PSLV-XL)'] ]}
    ]
  },
  vega:{
    name:'Vega', short:'Vega',
    agency:'Arianespace for ESA and ASI; built by Avio',
    desc:'Europe\'s small launcher, flown from Kourou from 2012 to 2024 and replaced by Vega-C. Three solid stages and a small re-ignitable upper stage, AVUM, which drops satellites off one by one. It launched LISA Pathfinder in 2015 and several Copernicus Sentinel satellites.',
    refs:{ wp:'Vega (rocket) (encyclopedia article, infobox figures)' },
    parts:{
      p80:{ name:'P80 first stage', desc:'Solid motor with a carbon-fibre case.', facts:['Height: 11.7 m; diameter: 3 m', 'Thrust: 2,261 kN', 'Burn time: 107 s'] },
      z23:{ name:'Zefiro 23 second stage', desc:'Solid motor.', facts:['Height: 8.39 m; diameter: 1.9 m', 'Thrust: 871 kN', 'Burn time: 71.6 s'] },
      z9:{ name:'Zefiro 9 third stage', desc:'Solid motor.', facts:['Height: 4.12 m; diameter: 1.9 m', 'Thrust: 260 kN', 'Burn time: 117 s'] },
      avum:{ name:'AVUM stage and fairing', desc:'Liquid-propellant stage, re-ignitable up to five times, under a 2.6 m diameter fairing.', facts:['AVUM: 2.45 kN, up to 612.5 s', 'Fairing: 7.8 m tall'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '30 m'], ['Diameter', '3 m'], ['Lift-off mass', '137 t'], ['Stages', 'three solid and one AVUM liquid stage'] ]},
      { title:'Career', rows:[ ['First flight', '13 February 2012'], ['Last flight', '5 September 2024 (Sentinel-2C)'], ['Flights', '22, of which 20 successful'], ['Launch site', 'Kourou (Vega launch complex)'] ]},
      { title:'Capabilities', rows:[ ['Polar orbit (700 km)', '1.43 t'], ['Sun-synchronous orbit (400 km)', '1.45 t'] ]}
    ]
  },
  starship:{
    name:'Starship', short:'Starship',
    model:{ license:'CC BY 4.0', note:'Model of the Block 3 version, grouped into two stages and lightened for this site. Scaled to 124.4 m tall (Block 3).' },
    agency:'SpaceX',
    desc:'The largest launcher ever built, still in development. Its two stages, the Super Heavy booster and the Starship vehicle, burn liquid methane and oxygen and are meant to be fully reusable: the booster returns to be caught by the launch tower, a first achieved on 13 October 2024. Thirteen test flights had taken place at the date of this page.',
    refs:{ wp:'SpaceX Starship (encyclopedia article, infobox figures)' },
    parts:{
      booster:{ name:'Super Heavy booster (33 Raptor engines)', desc:'Methane and liquid-oxygen first stage, designed to return above the launch pad.', facts:['Height: 71 m (Block 1 and 2); diameter: 9 m', 'Propellants: 3,250 t (Block 2)'] },
      ship:{ name:'Starship vehicle (six Raptor engines)', desc:'Second stage and spacecraft, with three engines for the atmosphere and three for vacuum.', facts:['Height: 52.1 m (Block 2); diameter: 9 m', 'Propellants: 1,500 t (Block 2)'] }
    },
    sections:[
      { title:'Launcher', rows:[ ['Height', '121.3 m (Block 1), 123.1 m (Block 2), 124.4 m (Block 3)'], ['Diameter', '9 m'], ['Lift-off mass', 'about 5,000 t'], ['Stages', 'two, reusable'] ]},
      { title:'Career', rows:[ ['First flight', '20 April 2023'], ['Test flights', '13 by 24 July 2026, of which 8 successful'], ['Status', 'in development'], ['Launch site', 'Starbase (Texas)'] ]},
      { title:'Capabilities (targets)', rows:[ ['Low Earth orbit', 'Block 2: 35 t; Block 3: 100 t; baseline reusable version: 100 to 150 t'], ['Geostationary transfer orbit', '27 t (baseline reusable version)'] ]}
    ]
  }
};
