
import { work1, work2, work3, work4, work5, work6 } from "../assets/assets.js";
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
  }
];

// For backward compatibility or other uses if any
export const allImages = chapters[0].images.map(img => img.src);


