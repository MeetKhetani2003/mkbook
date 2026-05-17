
import { work1, work2, work3, work4, work5, work6, pebble_1, pebble_2, pebble_3, pebble_4, pebble_5, sculpture1, sculpture2, sculpture3, sculpture4, sculpture5, sculpture6, sculpture7, sculpture8, sculpture9, sculpture10, sculpture11, sculpture12, engraving_1, engraving_2, engraving_3, engraving_4, engraving_5, engraving_6, engraving_7, engraving_8, engraving_9, engraving_10, engraving_11, engraving_12, engraving_13, engraving_14, engraving_15, gift_1, gift_2, gift_3, gift_4, gift_5, gift_6, gift_7, gift_8, gift_9, gift_10, gift_11, gift_12, gift_13, furniture_1, furniture_2, furniture_3, furniture_4, furniture_5, furniture_6, furniture_7, furniture_8 } from "../assets/assets.js";
export type Chapter = {
  number: string;
  category: string;
  title: string;
  subtitle: string;
  year: string;
  location: string;
  architect: string;
  intro: string;
  body: string[];
  specs: { label: string; value: string }[];
  images: { src: string; caption: string }[];
};

export const chapters: Chapter[] = [
  {
    number: "I",
    category: "Architectural Surface Art",
    title: "The Surface Atelier",
    subtitle: "Monumental inlays, sculpted geometries, and bespoke architectural compositions",
    year: "MMXXVI",
    location: "Rajkot · Milano",
    architect: "MK Creations Atelier",

    intro:
      "Within the language of architecture, the floor is often treated as silence. At MK Creations, we approach it instead as a canvas for memory, geometry, and permanence. Each composition presented in this folio emerges from the dialogue between stone, proportion, craftsmanship, and atmosphere.",

    body: [
      "This opening chapter presents a curated exploration of bespoke marble inlays and architectural surface artworks developed for luxury residences, hospitality environments, and sculptural interiors. Executed through precision waterjet cutting, hand-finishing, and material balancing, these compositions transform functional surfaces into collectible architectural statements.",

      "From monumental radial medallions to geometric insert systems and sculptural floor compositions, every work is conceived as an extension of spatial identity. The intention is not ornamentation alone, but the creation of emotional architectural moments — surfaces that anchor movement, light, and atmosphere within space.",

      "Inspired by classical geometry, contemporary minimalism, and artisanal material traditions, the atelier’s work merges modern hospitality aesthetics with timeless craftsmanship. Marble, brass, bronze, and engineered stone converge into compositions that feel both architectural and sculptural in presence.",

      "Rather than treating surfaces as background elements, MK Creations positions them as the visual and emotional centerpiece of interior architecture — monumental yet restrained, luxurious yet deeply material in character."
    ],

    specs: [
      {
        label: "Medium",
        value: "Marble · Stone · Brass · Bronze"
      },
      {
        label: "Techniques",
        value: "Waterjet Cutting · Hand Finishing · Precision Inlay"
      },
      {
        label: "Applications",
        value: "Luxury Residences · Hospitality · Architectural Interiors"
      },
      {
        label: "Design Language",
        value: "Geometric · Sculptural · Contemporary Classic"
      },
      {
        label: "Craft Origin",
        value: "MK Creations Atelier · Rajkot"
      },
      {
        label: "Timeline",
        value: "MMXXIV — MMXXVI"
      }
    ],

    images: [
      {
        src: work1,
        caption:
          "Plate I.I — Monumental marble medallion composition installed within a contemporary architectural foyer."
      },

      {
        src: work2,
        caption:
          "Plate I.II — Atmospheric spatial composition exploring light, geometry, and reflection."
      },

      {
        src: work3,
        caption:
          "Plate I.III — Geometric floor articulation inspired by navigational symmetry and architectural proportion."
      },

      {
        src: work4,
        caption:
          "Plate I.IV — Material dialogue between polished marble, brass inlay, and handcrafted finishing."
      },

      {
        src: work5,
        caption:
          "Plate I.V — Editorial study of the MK Creations architectural folio within a hospitality-inspired environment."
      },

      {
        src: work6,
        caption:
          "Plate I.VI — Sculptural wall composition integrating symbolic form with contemporary architectural minimalism."
      }
    ]
  },
  {
    number: "II",
    category: "Fragments of Stillness",
    title: "Pebble Art Collection",
    subtitle: "Handcrafted sculptural narratives formed through stone, balance & emotion",
    year: "MMXXVI",
    location: "Collectible Artisan Series",
    architect: "MK Creations Atelier",
    intro:
      "Fragments of Stillness explores the emotional language of stone. Each composition transforms naturally weathered pebbles into intimate sculptural narratives — meditations on memory, connection, family, and silence.",

    body: [
      "Minimal in material yet monumental in emotion, these works exist between sculpture and poetry. Organic forms are carefully balanced to create moments of tenderness, movement, and human presence through the permanence of stone.",

      "Presented within refined architectural environments, the collection celebrates craftsmanship, restraint, and the quiet luxury of handmade artistry. Each plate becomes an encounter between texture, emotion, and timeless spatial calm.",
    ],

    specs: [
      { label: "Medium", value: "Natural Pebbles · Stone · Driftwood" },
      { label: "Techniques", value: "Hand Composition · Sculptural Balance" },
      { label: "Collection", value: "Fragments of Stillness" },
      { label: "Atelier", value: "MK Creations" },
    ],

    images: [
      {
        src: pebble_1,
        caption:
          "Plate I — The Silent Figure, a sculptural meditation on solitude and balance.",
      },

      {
        src: pebble_2,
        caption:
          "Plate II — Sisters Apart, an intimate composition exploring connection through distance.",
      },

      {
        src: pebble_3,
        caption:
          "Plate III — The Heart Vessel, a study of emotional weight through collected stone forms.",
      },

      {
        src: pebble_4,
        caption:
          "Plate IV — Family Narratives, handcrafted moments translated into sculptural pebble tableaux.",
      },

      {
        src: pebble_5,
        caption:
          "Plate V — Togetherness, a suspended composition exploring intimacy, stillness, and trust.",
      },
    ],
  },
  {
    number: "III",

    category: "Sacred Sculptures & Relief Art",

    title: "The Devotional Atelier",

    subtitle:
      "Collectible spiritual sculptures, architectural reliefs & handcrafted sacred artistry",

    year: "MMXXVI",

    location: "Temple · Residential · Hospitality Interiors",

    architect: "MK Creations Atelier",

    intro:
      "The Devotional Atelier explores the intersection of sacred symbolism, handcrafted sculpture, and architectural storytelling. Each work is conceived not merely as ornamentation, but as an emotional spiritual presence designed to inhabit refined contemporary interiors.",

    body: [
      "From intimate marble murtis and collectible devotional objects to monumental relief installations and ceremonial sculptural panels, the collection celebrates the timeless language of sacred craftsmanship through a contemporary editorial lens.",

      "Executed through hand carving, relief sculpting, marble finishing, and layered artisanal detailing, these works balance devotion with restraint — creating sculptural experiences suited for luxury residences, spiritual galleries, hospitality environments, and collectible interiors.",

      "Rather than reproducing traditional iconography mechanically, the atelier approaches each composition as an architectural object: calm, balanced, materially rich, and emotionally resonant."
    ],

    specs: [
      {
        label: "Medium",
        value: "Marble · Stone Relief · Plaster · Resin"
      },

      {
        label: "Techniques",
        value: "Hand Sculpture · Relief Carving · Marble Finishing"
      },

      {
        label: "Applications",
        value: "Luxury Residences · Spiritual Interiors · Hospitality"
      },

      {
        label: "Design Language",
        value: "Sacred · Sculptural · Contemporary Devotional"
      },

      {
        label: "Craft Origin",
        value: "MK Creations Atelier"
      },

      {
        label: "Timeline",
        value: "MMXXIV — MMXXVI"
      }
    ],

    images: [
      {
        src: sculpture1,
        caption:
          "Plate I — Lotus Mandala Relief, a sacred radial composition carved through layered sculptural geometry."
      },

      {
        src: sculpture2,
        caption:
          "Plate II — Lotus & Nandi Partition, integrating devotional symbolism within contemporary architectural space."
      },

      {
        src: sculpture3,
        caption:
          "Plate III — Portrait Relief Study, exploring texture, shadow, and ceremonial ornamentation."
      },

      {
        src: sculpture4,
        caption:
          "Plate IV — Equestrian Relief Panel, a study of motion translated through monumental sculptural depth."
      },

      {
        src: sculpture5,
        caption:
          "Plate V — Desert Narrative Wall, handcrafted relief storytelling inspired by landscape and memory."
      },

      {
        src: sculpture6,
        caption:
          "Plate VI — Divine Feminine Relief, balancing sacred serenity with architectural sculptural rhythm."
      },

      {
        src: sculpture7,
        caption:
          "Plate VII — Temple Axis Composition, structured through layered sacred geometry and meditative symmetry."
      },

      {
        src: sculpture8,
        caption:
          "Plate VIII — White Marble Ganesha, a collectible devotional murti carved in refined spiritual minimalism."
      },

      {
        src: sculpture9,
        caption:
          "Plate IX — Royal Ganesha Study, combining ceremonial ornamentation with luxury marble craftsmanship."
      },

      {
        src: sculpture10,
        caption:
          "Plate X — Durga on Lion, a sacred sculptural tableau embodying power, protection, and divine energy."
      },

      {
        src: sculpture11,
        caption:
          "Plate XI — Ram Darbar Ensemble, presented as a museum-grade devotional composition in carved marble."
      },

      {
        src: sculpture12,
        caption:
          "Plate XII — Lotus Throne Vishnu, a serene collectible sculpture balancing divinity and sculptural elegance."
      }
    ]
  },
  {
    number: "IV",

    category: "Architectural Engraving & Sacred Surface Craft",

    title: "The Engraved Sanctum",

    subtitle:
      "Sacred inscriptions, geometric carvings & contemporary spiritual surfaces",

    year: "MMXXVI",

    location: "Temple · Residential · Ceremonial Architecture",

    architect: "MK Creations Atelier",

    intro:
      "The Engraved Sanctum explores the refinement of sacred carving through architectural surfaces, ceremonial inscriptions, geometric symbolism, and devotional spatial detailing.",

    body: [
      "Rather than functioning as decorative graphics alone, each engraved composition is conceived as an architectural intervention — integrating spiritual symbolism directly into stone, marble, tile, and handcrafted surface systems.",

      "The collection balances precision CNC engraving, handcrafted finishing, and sacred geometry with a restrained contemporary aesthetic suited for luxury residences, meditation spaces, temple interiors, and collectible spiritual architecture.",

      "From Sanskrit inscriptions and yantra carvings to lotus compositions, threshold markers, memorial plaques, and meditative floor engravings, every work transforms material into symbolic spatial experience."
    ],

    specs: [
      {
        label: "Medium",
        value: "Marble · Granite · Stone · Architectural Tile"
      },

      {
        label: "Techniques",
        value: "CNC Engraving · Relief Carving · Gold Inlay"
      },

      {
        label: "Applications",
        value: "Temple Interiors · Luxury Residences · Sacred Spaces"
      },

      {
        label: "Design Language",
        value: "Sacred Geometry · Minimal Spiritualism · Architectural Craft"
      },

      {
        label: "Specialization",
        value: "Custom Devotional Surface Design"
      },

      {
        label: "Craft Origin",
        value: "MK Creations Atelier"
      }
    ],

    images: [
      {
        src: engraving_1,
        caption:
          "Plate I — Sanskrit Stone Inscription engraved through minimal sacred architectural composition."
      },

      {
        src: engraving_2,
        caption:
          "Plate II — Lotus Emblem Tile exploring symbolic floral geometry through carved stone surfaces."
      },

      {
        src: engraving_3,
        caption:
          "Plate III — Sacred Om Composition executed through handcrafted curvilinear engraving."
      },

      {
        src: engraving_4,
        caption:
          "Plate IV — Sri Yantra Relief Panel balancing geometric precision with sculptural depth."
      },

      {
        src: engraving_5,
        caption:
          "Plate V — Devotional Wardrobe Elevation integrating sacred symbolism into luxury interior architecture."
      },

      {
        src: engraving_6,
        caption:
          "Plate VI — Geometric Surface Study exploring rhythm, depth, and contemporary engraving minimalism."
      },

      {
        src: engraving_7,
        caption:
          "Plate VII — Yantra Meditation Wall designed for serene spiritual interior environments."
      },

      {
        src: engraving_8,
        caption:
          "Plate VIII — Monolithic Om Marker carved in pure white marble with restrained sculptural elegance."
      },

      {
        src: engraving_9,
        caption:
          "Plate IX — Ceremonial Threshold Panels combining sacred symbols with architectural material richness."
      },

      {
        src: engraving_10,
        caption:
          "Plate X — Floral Sacred Partition integrating perforated carving and symbolic devotional geometry."
      },

      {
        src: engraving_11,
        caption:
          "Plate XI — Marble Memorial Bust presented through formal institutional sculptural language."
      },

      {
        src: engraving_12,
        caption:
          "Plate XII — Temple Dedication Plaque executed in polished black granite with gold engraved typography."
      },

      {
        src: engraving_13,
        caption:
          "Plate XIII — Minimal Floor Engraving introducing sacred geometry into contemporary residential interiors."
      },

      {
        src: engraving_14,
        caption:
          "Plate XIV — Gayatri Mantra Installation framed through luxury temple architecture and ceremonial lighting."
      },

      {
        src: engraving_15,
        caption:
          "Plate XV — Om Lotus Relief Panel balancing minimal carving with meditative spatial symmetry."
      }
    ]
  },
  {
    number: "V",

    category: "Collectible Gift Articles",

    title: "Objects of Everyday Luxury",

    subtitle:
      "Handcrafted marble lifestyle objects, collectible decor & refined gifting artifacts",

    year: "MMXXVI",

    location: "Luxury Residential · Hospitality · Curated Gifting",

    architect: "MK Creations Atelier",

    intro:
      "Objects of Everyday Luxury explores the transformation of functional artifacts into collectible sculptural experiences. Each piece balances utility, craftsmanship, and material richness through marble, brass, wood, and handcrafted detailing.",

    body: [
      "Designed for luxury residences, hospitality environments, executive gifting, and curated interiors, the collection elevates everyday rituals through architectural object design and handcrafted material expression.",

      "From marble tea-light holders and ornamental clocks to sacred collectibles, sculptural tabletop accessories, and handcrafted utility objects, each work is conceived as a refined lifestyle artifact rather than mass-produced decor.",

      "The chapter celebrates tactile materiality, balanced geometry, artisanal craftsmanship, and the quiet elegance of collectible marble living."
    ],

    specs: [
      {
        label: "Medium",
        value: "Marble · Brass · Walnut · Stone Inlay"
      },

      {
        label: "Techniques",
        value: "Handcrafting · Marble Turning · Inlay · Engraving"
      },

      {
        label: "Applications",
        value: "Luxury Gifting · Hospitality Styling · Residential Decor"
      },

      {
        label: "Design Language",
        value: "Minimal Luxury · Collectible Objects · Architectural Decor"
      },

      {
        label: "Collection",
        value: "Curated Marble Lifestyle Artifacts"
      },

      {
        label: "Craft Origin",
        value: "MK Creations Atelier"
      }
    ],

    images: [
      {
        src: gift_1,
        caption:
          "Plate I — Marble Brass Tea Light Collection, balancing sculptural geometry with refined hospitality styling."
      },

      {
        src: gift_2,
        caption:
          "Plate II — Sacred Ornamental Clock, integrating devotional artistry within collectible heritage decor."
      },

      {
        src: gift_3,
        caption:
          "Plate III — Peacock Heritage Plate, handcrafted ornamental artistry inspired by traditional Indian decorative language."
      },

      {
        src: gift_4,
        caption:
          "Plate IV — Marble Peacock Sculpture, a contemporary collectible object carved through minimal sculptural elegance."
      },

      {
        src: gift_5,
        caption:
          "Plate V — Marble & Walnut Utility Collection, merging functional utility with architectural material refinement."
      },

      {
        src: gift_6,
        caption:
          "Plate VI — Marble Hand Card Holder, transforming workplace utility into sculptural tabletop artistry."
      },

      {
        src: gift_7,
        caption:
          "Plate VII — Sacred Cow & Calf Figurine, a devotional collectible object rendered through ornamental craftsmanship."
      },

      {
        src: gift_8,
        caption:
          "Plate VIII — Marble Inlay Coaster Collection, celebrating handcrafted floral stone inlay artistry through luxury tabletop design."
      },

      {
        src: gift_9,
        caption:
          "Plate IX — Floral Marble Coaster Set, refined engraved tabletop accessories designed for luxury hospitality environments."
      },

      {
        src: gift_10,
        caption:
          "Plate X — Walnut & Brass Deer Container, balancing sculptural form with collectible functional design."
      },

      {
        src: gift_11,
        caption:
          "Plate XI — Black Marble Vase Trio, minimalist architectural decor objects emphasizing material purity and silhouette."
      },

      {
        src: gift_12,
        caption:
          "Plate XII — Sacred Marble Face Artifact, a collectible devotional sculpture scaled for luxury shelf styling."
      },

      {
        src: gift_13,
        caption:
          "Plate XIII — Minimal Marble Goblet Artifact, exploring quiet sculptural geometry through handcrafted marble minimalism."
      }
    ]
  },
  {
    number: "VI",

    category: "Marble Furniture Collection",

    title: "Sculpted Living Forms",

    subtitle:
      "Architectural marble furniture crafted as collectible sculptural objects",

    year: "MMXXVI",

    location: "Luxury Residential · Hospitality · Gallery Interiors",

    architect: "MK Creations Atelier",

    intro:
      "Sculpted Living Forms explores the intersection of architecture, furniture, and stone artistry through handcrafted marble furniture pieces conceived as collectible sculptural forms.",

    body: [
      "Each object balances monolithic material presence with refined geometry, transforming furniture into architectural statements. From sculptural console tables and carved reception counters to pedestal side tables and collectible decor installations, the collection celebrates stone as both structure and art.",

      "The pieces preserve the authenticity of handcrafted marble craftsmanship while embracing contemporary editorial styling, luxury hospitality aesthetics, and gallery-inspired spatial composition.",

      "Designed for luxury residences, curated interiors, hospitality environments, and collectible design spaces, the chapter emphasizes tactile materiality, sculptural proportion, and timeless stone elegance."
    ],

    specs: [
      {
        label: "Medium",
        value: "Natural Marble · Handcrafted Stone · Sculptural Furniture"
      },

      {
        label: "Techniques",
        value: "Stone Carving · Marble Turning · Monolithic Fabrication"
      },

      {
        label: "Applications",
        value: "Luxury Residences · Hospitality · Gallery Interiors"
      },

      {
        label: "Design Language",
        value: "Architectural Minimalism · Sculptural Luxury"
      },

      {
        label: "Collection",
        value: "Collectible Marble Furniture Objects"
      },

      {
        label: "Craft Origin",
        value: "MK Creations Atelier"
      }
    ],

    images: [
      {
        src: furniture_1,
        caption:
          "Plate I — Sculptural Marble Console Table, balancing geometric leg compositions with collectible architectural styling."
      },

      {
        src: furniture_2,
        caption:
          "Plate II — Monolithic Black Marble Side Table, emphasizing sculptural silhouette and polished stone minimalism."
      },

      {
        src: furniture_3,
        caption:
          "Plate III — Raw Stone Reception Counter, preserving natural rock textures within contemporary hospitality furniture design."
      },

      {
        src: furniture_4,
        caption:
          "Plate IV — Architectural Marble Console Installation, integrating stacked geometric stone forms with collectible decor styling."
      },

      {
        src: furniture_5,
        caption:
          "Plate V — Sculptural Marble Handbag Objects, transforming luxury fashion iconography into collectible stone artifacts."
      },

      {
        src: furniture_6,
        caption:
          "Plate VI — Luxury Marble Handbag Sculpture, handcrafted as a collectible editorial decor statement."
      },

      {
        src: furniture_7,
        caption:
          "Plate VII — Pedestal Marble Table Collection, exploring sculptural proportions through contemporary collectible furniture forms."
      },

      {
        src: furniture_8,
        caption:
          "Plate VIII — Contemporary Marble Side Table Ensemble, balancing monolithic geometry with refined material elegance."
      }
    ]
  }
];

// For backward compatibility or other uses if any
export const allImages = chapters[0].images.map(img => img.src);


