
import { work1, work2, work3, work4, work5, work6, pebble_1, pebble_2, pebble_3, pebble_4, pebble_5, sculpture1, sculpture2, sculpture3, sculpture4, sculpture5, sculpture6, sculpture7, sculpture8, sculpture9, sculpture10, sculpture11, sculpture12, engraving_1, engraving_2, engraving_3, engraving_4, engraving_5, engraving_6, engraving_7, engraving_8, engraving_9, engraving_10, engraving_11, engraving_12, engraving_13, engraving_14, engraving_15, gift_1, gift_2, gift_3, gift_4, gift_5, gift_6, gift_7, gift_8, gift_9, gift_10, gift_11, gift_12, gift_13, furniture_1, furniture_2, furniture_3, furniture_4, furniture_5, furniture_6, furniture_7, furniture_8, yantra_1, yantra_2, yantra_3, yantra_4, yantra_5, fluting_1, fluting_2, fluting_3, fluting_4 } from "../assets/assets.js";
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
    category: "Inlay Surface Art",
    title: "The Art of Surfaces",
    subtitle: "Stone inlays, Stone and wood Inlay , and Stone Brass Inlay",
    year: "2026",
    location: "Rajkot · Gujarat",
    architect: "MK Creations",

    intro:
      "Within the language of architecture, the floor is often treated as silence. At MK Creations, We deals with inlay work—a craft defined by precision, luxury, and heritage—the stone should feel premium, artistic, and deeply skilled.",

    body: [
      "At MK Creation, we believe that true luxury lies in the details. Driven by a passion for architectural artistry, we master the intricate craft of inlay work—hand-selecting, cutting, and fitting contrasting materials to form flawless, captivating patterns. From grand floor medallions to bespoke furniture accents, our creations honor the dedication of master artisans while complementing modern aesthetics. Discover the perfect fusion of patience, precision, and passion.",



      "Rather than treating surfaces as background elements, MK Creations positions them as the visual and emotional centerpiece of interior architecture — monumental yet restrained, luxurious yet deeply material in character."
    ],

    specs: [
      {
        label: "Medium",
        value: "Marble · Stone · Brass · Wood"
      },
      {
        label: "Techniques",
        value: "CNC Cutting · Hand Finishing · Precision Inlay"
      },
      {
        label: "Applications",
        value: "Luxury Residences · Hospitality · Architectural / Interiors Projects"
      },
      {
        label: "Design Language",
        value: "Geometric · Mandala Art · Contemporary Classic"
      },
      {
        label: "Craft Origin",
        value: "MK Creations _ More than art · Rajkot"
      },
      {
        label: "Timeline",
        value: "2026"
      }
    ],

    images: [
      {
        src: work1,
        caption:
          "Art. 1.1 — Mandala Inlay Art installed within a contemporary architectural foyer."
      },

      {
        src: work2,
        caption:
          "Art. 1.2 — Atmospheric spatial composition exploring light, geometry, and reflection."
      },

      {
        src: work3,
        caption:
          "Art. 1.3 — Geometric floor articulation inspired by navigational symmetry and architectural proportion."
      },

      {
        src: work4,
        caption:
          "Art. 1.4 — Material dialogue between polished marble, brass inlay, and handcrafted finishing."
      },

      {
        src: work5,
        caption:
          "Art. 1.5 — Shrreji 3d art on marble and granite inlay of the MK Creations architectural folio within a hospitality-inspired environment."
      },

      {
        src: work6,
        caption:
          "Art. 1.6 — Jaisalmer and Marble art form with contemporary architectural minimalism."
      }
    ]
  },
  {
    number: "II",
    category: "Art of natural pebbles",
    title: "Pebble Art Collection",
    subtitle: "Handcrafted Artistic work formed through Pebbles, balance & emotion",
    year: "2026",
    location: "Collectible Artisan Series",
    architect: "MK Creations",
    intro:
      "Every ordinary pebble holds an extraordinary story, shaped by time and water. Pebble stone art transforms these weathered fragments into minimalist masterpieces, proving that nature’s simplest creations can speak volumes when arranged with a creative touch.",

    body: [
      "Minimal in material yet monumental in emotion,Pebble art is the delicate practice of transforming raw, water-smoothed stones into minimalist narratives. By arranging varied shapes and textures, artists create evocative scenes that rely on the natural silhouette of the stone rather than intricate painted details.",

      "Presented within refined architectural environments, the collection celebrates craftsmanship, restraint, and the quiet luxury of handmade artistry. Each Frame becomes an encounter between texture, emotion, and timeless spatial calm.",
    ],

    specs: [
      { label: "Medium", value: "Natural Pebbles · Stone · Art" },
      { label: "Techniques", value: "Hand Composition · Nature Balance" },
      { label: "Collection", value: "Pebbles Art" },
      { label: "Art of Surfaces", value: "MK Creations" },
    ],

    images: [
      {
        src: pebble_1,
        caption:
          "Plate I — Unwind, disconnect and find your inner stillness.",
      },

      {
        src: pebble_2,
        caption:
          "Plate II — Because even the deepest thoughts require a solid foundation.",
      },

      {
        src: pebble_3,
        caption:
          "Plate III — The art of pure, uninterrupted contemplation.",
      },

      {
        src: pebble_4,
        caption:
          "Plate IV — Friends Narratives, handcrafted moments translated into sculptural pebble tableaux.",
      },

      // {
      //   src: pebble_5,
      //   caption:
      //     "Plate V — Nature's raw canvas, reimagined by design.",
      // },
    ],
  },
  {
    number: "III",

    category: "3D Stone Art",

    title: "Where raw nature meet deep contemplation",

    subtitle:
      "Collectible Artistic and spiritual 3D Works, where sculpting a new dimension into luxury",

    year: "2026",

    location: "Temple · Residential · Office, Hospitality and all Interior Projects",

    architect: "MK Creations",

    intro:
      "The Devotional Art of Surfaces explores the intersection of sacred symbolism, handcrafted sculpture, and architectural storytelling. Each work is conceived not merely as ornamentation, but as an emotional spiritual presence designed to inhabit refined contemporary interiors.",

    body: [
      "From intimate marble murtis and collectible devotional objects to monumental relief installations and ceremonial sculptural panels, the collection celebrates the timeless language of sacred craftsmanship through a contemporary editorial lens.",

      "Executed through hand carving, relief sculpting, marble finishing, and layered artisanal detailing, these works balance devotion with restraint — creating sculptural experiences suited for luxury residences, spiritual galleries, hospitality environments, and collectible interiors.",

      "Rather than reproducing traditional iconography mechanically, the art of surfaces approaches each composition as an architectural object: calm, balanced, materially rich, and emotionally resonant."
    ],

    specs: [
      {
        label: "Medium",
        value: "Marble · Stone Relief · Resin"
      },

      {
        label: "Techniques",
        value: "CNC Sculpture · Relief Carving · Marble Finishing"
      },

      {
        label: "Applications",
        value: "Luxury Residences · Interiors · Hospitality"
      },

      {
        label: "Design Language",
        value: "Sacred · Sculptural · Contemporary Devotional"
      },

      {
        label: "Craft Origin",
        value: "MK Creations"
      },

      {
        label: "Timeline",
        value: "2026"
      }
    ],

    images: [
      {
        src: sculpture1,
        caption:
          "Plate I — Lotus Mandala 3D Art, a sacred radial composition carved through layered sculptural geometry."
      },

      {
        src: sculpture2,
        caption:
          "Plate II — Lotus & Nandi Partition, integrating devotional symbolism within contemporary architectural space."
      },

      {
        src: sculpture3,
        caption:
          "Plate III — Portrait 3D Art with Fluted Panel, exploring texture, shadow, and ceremonial ornamentation."
      },

      {
        src: sculpture4,
        caption:
          "Plate IV — Equestrian 3D Panel, a Vastu related panel of motion translated through monumental sculptural depth."
      },

      {
        src: sculpture5,
        caption:
          "Plate V — Desert Narrative Wall, CNC crafted relief storytelling inspired by landscape and memory."
      },

      {
        src: sculpture6,
        caption:
          "Plate VI — Divine Art, balancing sacred serenity with architectural sculptural rhythm."
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
          "Plate IX — Royal Ganesha, combining ceremonial ornamentation with luxury marble craftsmanship."
      },

      {
        src: sculpture10,
        caption:
          "Plate X — Durga on Lion, a sacred sculptural tableau embodying power, protection, and divine energy."
      },

      {
        src: sculpture11,
        caption:
          "Plate XI — Ram Darbar Ensemble, presented as a Luxury Temple-grade devotional composition in carved marble."
      },

      {
        src: sculpture12,
        caption:
          "Plate XII — Lotus Throne Laxmiji, a serene collectible sculpture balancing divinity and sculptural elegance."
      }
    ]
  },
  {
    number: "IV",

    category: "Architectural Engraving & Sacred Surface Craft",

    title: "The Engraving Craft",

    subtitle:
      "Sacred inscriptions, geometric carvings & contemporary spiritual surfaces",

    year: "2026",

    location: "Temple · Residential · Ceremonial Architecture",

    architect: "MK Creations",

    intro:
      "The Engraved Art explores the refinement of sacred carving through architectural surfaces, ceremonial inscriptions, geometric symbolism, and devotional spatial detailing.",

    body: [
      "Etched in Stone, Remembered Forever.",

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
        value: "CNC Engraving · Relief Carving · Inlay"
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
        value: "MK Creations"
      }
    ],

    images: [
      {
        src: engraving_1,
        caption:
          "Plate I — Sanskrit Sloka Stone Inscription engraved through minimal sacred architectural composition."
      },

      {
        src: engraving_2,
        caption:
          "Plate II — Lotus Emblem Tile exploring symbolic floral geometry through carved stone surfaces."
      },

      {
        src: engraving_3,
        caption:
          "Plate III — Sacred SHREE Composition executed through handcrafted curvilinear engraving."
      },

      {
        src: engraving_4,
        caption:
          "Plate IV — Sri Yantra Engraving Panel balancing geometric precision with Devotional depth."
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
          "Plate IX — Umbra is a Symbolic Entrance combining sacred symbols with architectural material richness."
      },

      {
        src: engraving_10,
        caption:
          "Plate X — Floral Sacred Partition integrating perforated carving and symbolic devotional geometry."
      },

      {
        src: engraving_11,
        caption:
          "Plate XI — Govt. Takti Work presented through formal institutional sculptural language."
      },

      {
        src: engraving_12,
        caption:
          "Plate XII — Name Plate work Dedication Plaque executed in polished black granite with gold engraved typography."
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
          "Plate XV — Om Lotus Engrave Panel balancing minimal carving with meditative spatial symmetry."
      }
    ]
  },
  {
    number: "V",

    category: "Collectible Gift Articles",

    title: "Objects of Everyday Luxury",

    subtitle:
      "Handcrafted marble lifestyle objects, collectible decor & refined gifting artifacts",

    year: "2026",

    location: "Luxury Residential · Hospitality · Curated Gifting",

    architect: "MK Creations",

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
        value: "Marble · Brass · Stone Inlay"
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
        value: "MK Creations Art of Surfaces"
      }
    ],

    images: [
      {
        src: gift_1,
        caption:
          "Plate I — Marble and Copper Diya Collection, balancing sculptural geometry with refined hospitality styling."
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
          "Plate IX — Black Marble Vase Trio, minimalist architectural decor objects emphasizing material purity and silhouette.."
      },

      {
        src: gift_10,
        caption:
          "Plate X — Shreeji Marble Art, balancing sculptural form with collectible functional design."
      },

      {
        src: gift_11,
        caption:
          "Plate XI — Marble Glass, refined engraved tabletop accessories for luxury hospitality environments."
      },

      {
        src: gift_12,
        caption:
          "Plate XII — Sacred Marble Face Artifact, a collectible devotional sculpture scaled for luxury shelf styling."
      },

      // {
      //   src: gift_13,
      //   caption:
      //     "Plate XIII — Minimal wood inlay Goblet Artifact, exploring quiet sculptural geometry through handcrafted marble minimalism."
      // }
    ]
  },
  {
    number: "VI",

    category: "Marble Furniture Collection",

    title: "Luxurious Living Forms",

    subtitle:
      "Architectural marble furniture crafted as collectible sculptural objects",

    year: "MMXXVI",

    location: "Luxury Residential · Hospitality · Gallery Interiors",

    architect: "MK Creations Art of Surfaces",

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
        value: "MK Creations"
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
          "Plate VII — Center Table Marble Collection, exploring sculptural proportions through contemporary collectible furniture forms."
      },

      {
        src: furniture_8,
        caption:
          "Plate VIII — Contemporary Marble Side Table Ensemble, balancing monolithic geometry with refined material elegance."
      }
    ]
  },
  {
    number: "VII",

    category: "Divine Sri Yantra Collection",

    title: "Spiritual Architecture",

    subtitle:
      "Handcrafted Sri Yantra installations, sacred geometric reliefs & collectible spiritual objects",

    year: "2026",

    location: "Luxury Spiritual Residences · Meditation Spaces · Temple Interiors",

    architect: "MK Creations",

    intro:
      "Sacred Geometry & Spiritual Architecture explores the timeless visual language of the Sri Yantra through handcrafted marble reliefs, sacred installations, and collectible spiritual artworks conceived for contemporary luxury interiors.",

    body: [
      "Rooted in ancient sacred geometry and spiritual symbolism, each Sri Yantra work is executed through refined carving techniques, layered relief detailing, and architectural composition designed to elevate meditation spaces, luxury residences, hospitality sanctuaries, and devotional environments.",

      "Rather than functioning merely as decorative symbolism, the collection transforms sacred geometry into collectible architectural objects — balancing spiritual calmness with sculptural material richness and editorial spatial styling.",

      "The chapter celebrates precision craftsmanship, symmetry, layered geometry, and the meditative silence of handcrafted spiritual artistry through premium marble and carved sacred compositions."
    ],

    specs: [
      {
        label: "Medium",
        value: "White Marble · Sacred Relief Carving · Architectural Stone"
      },

      {
        label: "Techniques",
        value: "Hand Carving · Layered Relief · Sacred Geometric Engraving"
      },

      {
        label: "Applications",
        value: "Meditation Rooms · Temple Interiors · Luxury Spiritual Spaces"
      },

      {
        label: "Design Language",
        value: "Sacred Geometry · Spiritual Minimalism · Architectural Calmness"
      },

      {
        label: "Collection",
        value: "Collectible Sri Yantra Installations"
      },

      {
        label: "Craft Origin",
        value: "MK Creations"
      }
    ],

    images: [
      {
        src: yantra_1,
        caption:
          "Plate I — Sacred Marble Sri Yantra, handcrafted through layered sacred geometry and refined architectural carving."
      },

      {
        src: yantra_2,
        caption:
          "Plate II — Sri Yantra Macro Geometry Study, exploring carved depth, sacred symmetry, and meditative stone detailing."
      },

      {
        src: yantra_3,
        caption:
          "Plate III — Wooden Sri Yantra Sculpture, balancing artisan wood craftsmanship with timeless spiritual geometry."
      },

      {
        src: yantra_4,
        caption:
          "Plate IV — Divine Sri Yantra Installation, conceived as a luxury spiritual architectural centerpiece."
      },


    ]
  },
  {
    number: "VIII",

    category: "Architectural Fluting Collection",

    title: "Sculpted Surface Geometry",

    subtitle:
      "Luxury fluted marble walls, sculptural textured surfaces & contemporary architectural detailing",

    year: "2026",

    location:
      "Luxury Residences · Hospitality Interiors · Spa Spaces · Contemporary Architectural Projects",

    architect: "MK Creations",

    intro:
      "Sculpted Surface Geometry explores fluting as an architectural language of rhythm, shadow, texture, and dimensional elegance through handcrafted marble and contemporary surface craftsmanship.",

    body: [
      "The collection transforms static walls into sculptural architectural compositions using precision fluting, carved wave textures, layered stone geometry, and refined lighting integration. Each installation creates dynamic depth through light, shadow, and material interaction.",

      "From luxury environments and statement bathrooms to hospitality feature walls and contemporary residential interiors, the surfaces are conceived as immersive architectural experiences rather than decorative cladding.",

      "Executed through premium stone craftsmanship and modern fabrication techniques, the chapter celebrates tactile geometry, sculptural minimalism, and the timeless richness of architectural material expression."
    ],

    specs: [
      {
        label: "Medium",
        value:
          "Natural Marble · Fluted Stone Panels · Architectural Surface Systems"
      },

      {
        label: "Techniques",
        value:
          "Linear Fluting · Sculptural Relief Carving · CNC Surface Texturing"
      },

      {
        label: "Applications",
        value:
          "Bathrooms · Feature Walls · Hospitality Interiors · Luxury Residences"
      },

      {
        label: "Design Language",
        value:
          "Architectural Minimalism · Surface Rhythm · Sculptural Geometry"
      },

      {
        label: "Material Identity",
        value:
          "Textured Marble · Layered Stone Surfaces · Dimensional Finishes"
      },

      {
        label: "Craft Origin",
        value: "MK Creations"
      }
    ],

    images: [
      {
        src: fluting_1,
        caption:
          "Plate I — Fluted Marble Shower Architecture integrating sculptural curvature, concealed lighting, and minimalist luxury detailing."
      },

      {
        src: fluting_2,
        caption:
          "Plate II — Wave-Carved Black Marble Surface crafted through dimensional fluting and luxury hospitality-inspired geometry."
      },

      {
        src: fluting_3,
        caption:
          "Plate III — Sculptural Bedroom Feature Wall exploring rhythmic fluted textures and cinematic shadow depth."
      },

      {
        src: fluting_4,
        caption:
          "Plate IV — Contemporary Fluting Installation combining flowing linear geometry with architectural surface composition."
      }
    ]
  }
];

// For backward compatibility or other uses if any
export const allImages = chapters[0].images.map(img => img.src);


