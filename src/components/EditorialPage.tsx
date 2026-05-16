import { motion } from "framer-motion";
import type { Chapter } from "../data/chapters";

export default function EditorialPage({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="relative w-full h-full flex flex-col p-6 sm:p-10 md:p-14 overflow-hidden">
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
        className="font-serif-display text-[#1a1612] text-3xl sm:text-5xl md:text-6xl leading-[0.95] mb-3"
      >
        {chapter.title}
      </motion.h1>

      <motion.p
        key={`sub-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-serif italic text-[#3a3128] text-sm sm:text-base md:text-lg leading-snug mb-5 sm:mb-8 max-w-md"
      >
        {chapter.subtitle}
      </motion.p>

      <div className="rule mb-4 sm:mb-6 max-w-[120px]" />

      {/* Intro / pull-quote */}
      <motion.p
        key={`intro-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="font-serif italic text-[#2a221a] text-base sm:text-lg md:text-xl leading-snug mb-5 sm:mb-7 max-w-md"
      >
        &ldquo;{chapter.intro}&rdquo;
      </motion.p>

      {/* Body — drop cap on first paragraph */}
      <motion.div
        key={`body-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.65 }}
        className="space-y-3 sm:space-y-4 text-[#2a221a] text-[12px] sm:text-[13px] md:text-[14px] leading-[1.7] font-serif max-w-md flex-1 overflow-hidden"
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
        className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-[#8a6f48]/30 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-y-3 max-w-md"
      >
        {chapter.specs.map((s) => (
          <div key={s.label}>
            <p className="font-sans-lux text-[8px] sm:text-[9px] text-[#8a6f48] mb-0.5">{s.label}</p>
            <p className="font-serif text-[11px] sm:text-[13px] text-[#1a1612]">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-4 sm:mt-6 flex items-end justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48]">
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
