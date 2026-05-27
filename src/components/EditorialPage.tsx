import { motion } from "framer-motion";
import type { Chapter } from "../data/chapters";

export default function EditorialPage({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <div className="relative w-full h-full flex flex-col p-4 sm:p-10 md:p-14 overflow-hidden">
      {/* Top meta bar */}
      <div className="flex items-start justify-between text-[11px] sm:text-[12px] font-sans-lux text-[#8a6f48]">
        <span>MK Creations · Folio {chapter.number}</span>
        <span>{chapter.year}</span>
      </div>

      <div className="rule my-2 sm:my-3" />

      {/* Category */}
      <motion.p
        key={`cat-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-sans-lux text-[11px] sm:text-[12px] text-[#8a6f48] mb-1 sm:mb-2"
      >
        Chapter {chapter.number} — {chapter.category}
      </motion.p>

      {/* Title */}
      <motion.h1
        key={`title-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="
    font-serif-display
    text-[12px]
    sm:text-[14px]
    md:text-[18px]
    leading-[1.1]
    mb-2
    sm:mb-3
    whitespace-pre-line
    text-[#1a1612]
  "
      >
        {chapter.title}
      </motion.h1>

      <motion.p
        key={`sub-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-serif text-[#3a3128] text-[12px] sm:text-[13px] md:text-[14px] leading-tight mb-1 sm:mb-2 max-w-md"
      >
        {chapter.subtitle}
      </motion.p>

      <div className="rule mb-1 sm:mb-2 max-w-[120px]" />

      {/* Intro / pull-quote */}
      <motion.p
        key={`intro-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="font-serif text-[#2a221a] text-[13px] sm:text-[14px] md:text-[15px] leading-tight mb-1 sm:mb-2 max-w-md"
      >
        &ldquo;{chapter.intro}&rdquo;
      </motion.p>

      {/* Body — drop cap on first paragraph */}
      <motion.div
        key={`body-${index}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.65 }}
        className="space-y-1 text-[#2a221a] text-[11px] sm:text-[12px] md:text-[13px] leading-[1.3] sm:leading-[1.4] font-serif max-w-md flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 pb-1"
        onWheel={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
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
        className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-[#8a6f48]/30 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:gap-y-1 max-w-md"
      >
        {chapter.specs.map((s) => (
          <div key={s.label}>
            <p className="font-sans-lux text-[9px] sm:text-[10px] text-[#8a6f48] mb-0">{s.label}</p>
            <p className="font-serif text-[12px] sm:text-[13px] text-[#1a1612] leading-tight">{s.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Footer */}
      <div className="mt-1 sm:mt-2 flex items-end justify-between text-[11px] sm:text-[12px] font-sans-lux text-[#8a6f48] pb-2 sm:pb-4">
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
