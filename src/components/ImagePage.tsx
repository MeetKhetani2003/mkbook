import { motion } from "framer-motion";

type ImagePageProps = {
  img: { src: string; caption: string };
  index: number;
  totalImages: number;
  plateLabel: string;
};

export default function ImagePage({ img, index, totalImages, plateLabel }: ImagePageProps) {
  return (
    <div className="relative w-full h-full bg-[#fbf9f6] select-none overflow-hidden">
      <img
        src={img.src}
        alt={img.caption}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* Top frame */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-start justify-between text-[11px] sm:text-[13px] font-sans-lux text-[#e8c896]/90 z-10 drop-shadow-md">
        <span>{plateLabel}</span>
        <span>
          {String(index + 1).padStart(2, "0")} <span className="opacity-50">/</span> {String(totalImages).padStart(2, "0")}
        </span>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 pb-12 sm:pb-16 z-10">
        <p className="font-serif italic text-[#ebe6dc] text-[15px] sm:text-[19px] leading-snug max-w-xl drop-shadow-md">
          {img.caption}
        </p>
        <div className="rule mt-2 sm:mt-3 max-w-[180px] bg-[#ebe6dc]/50" />
      </div>
    </div>
  );
}
