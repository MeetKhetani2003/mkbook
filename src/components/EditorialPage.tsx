import { motion } from "framer-motion";
import type { Chapter } from "../data/chapters";

export default function EditorialPage({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="relative w-full h-full flex flex-col p-4 sm:p-10 md:p-14 overflow-hidden">
      {/* Top meta bar */}
      <div className="flex items-start justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48]">
        <span>MK Creations · Folio {chapter.number}</span>
        <span>{chapter.year}</span>
      </div>

      <div className="rule my-3 sm:my-5" />

      {/* Category */}
      <motion.p
        key={`cat-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-sans-lux text-[10px] sm:text-xs text-[#8a6f48] mb-3"
      >
        Chapter {chapter.number} — {chapter.category}
      </motion.p>

      {/* Title */}
      <motion.h1
        key={`title-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="font-serif-display text-[#1a1612] text-2xl sm:text-3xl md:text-4xl leading-[1.05] mb-1 sm:mb-2"
      >
        {chapter.title}
      </motion.h1>

      <motion.p
        key={`sub-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-serif italic text-[#3a3128] text-[12px] sm:text-sm md:text-base leading-snug mb-2 sm:mb-4 max-w-md"
      >
        {chapter.subtitle}
      </motion.p>

      <div className="rule mb-2 sm:mb-4 max-w-[120px]" />

      {/* Intro / pull-quote */}
      <motion.p
        key={`intro-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="font-serif italic text-[#2a221a] text-[13px] sm:text-[15px] md:text-base leading-snug mb-2 sm:mb-4 max-w-md"
      >
        &ldquo;{chapter.intro}&rdquo;
      </motion.p>

      {/* Body — drop cap on first paragraph */}
      <motion.div
        key={`body-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.65 }}
        className="space-y-1 sm:space-y-2 text-[#2a221a] text-[10px] sm:text-[12px] md:text-[13px] leading-[1.5] sm:leading-[1.6] font-serif max-w-md flex-1 min-h-0 overflow-y-auto pr-2 pb-2"
      >
        <p className="dropcap">{chapter.body[0]}</p>
        {chapter.body[1] && <p className="hidden sm:block">{chapter.body[1]}</p>}
      </motion.div>

      {/* Specs */}
      <motion.div
        key={`specs-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.85 }}
        className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-[#8a6f48]/30 grid grid-cols-2 gap-x-4 gap-y-1 sm:gap-y-2 max-w-md"
      >
        {chapter.specs.map((s) => (
          <div key={s.label}>
            <p className="font-sans-lux text-[7px] sm:text-[8px] text-[#8a6f48] mb-0.5">{s.label}</p>
            <p className="font-serif text-[10px] sm:text-[11px] text-[#1a1612]">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-2 sm:mt-4 flex items-end justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48] pb-4 sm:pb-6">
        <span>{chapter.location}</span>
        <span>{chapter.architect}</span>
      </div>

      {/* Page number */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 font-serif italic text-[10px] sm:text-xs text-[#8a6f48]">
        — {String(index * 2 + 2).padStart(3, "0")} —
      </div>
    </div>
  );
}
