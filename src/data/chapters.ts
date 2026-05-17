
import { work1, work2, work3, work4, work5, work6, pebble_1, pebble_2, pebble_3, pebble_4, pebble_5, sculpture1, sculpture2, sculpture3, sculpture4, sculpture5, sculpture6, sculpture7, sculpture8, sculpture9, sculpture10, sculpture11, sculpture12 } from "../assets/assets.js";
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
  }
];

// For backward compatibility or other uses if any
export const allImages = chapters[0].images.map(img => img.src);


