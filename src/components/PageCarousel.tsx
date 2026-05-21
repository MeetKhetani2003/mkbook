import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Keyboard } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { motion } from "framer-motion";

type ImageItem = { src: string; caption: string };

export default function PageCarousel({
  images,
  onAdvanceBook,
  onPrevBook,
  plateLabel,
  onInteractionStart,
  onInteractionEnd,
  isNear = true,
}: {
  images: ImageItem[];
  onAdvanceBook: () => void;
  onPrevBook?: () => void;
  plateLabel: string;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
  isNear?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperClass | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hint, setHint] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const advancedRef = useRef(false);

  const handleReachEnd = () => {
    setHint(true);
  };

  const handleSlideChangeTransitionEnd = (s: SwiperClass) => {
    setActiveIdx(s.activeIndex);
    if (s.activeIndex < images.length - 1) {
      setHint(false);
    }
  };

  const handleTouchStart = (_s: SwiperClass, e: any) => {
    onInteractionStart?.();
    const ev = e as TouchEvent | MouseEvent;
    const x =
      "touches" in ev && ev.touches.length
        ? ev.touches[0].clientX
        : (ev as MouseEvent).clientX;
    touchStartX.current = x;
  };

  // Detect edge swipes to switch chapters smoothly
  const handleTouchEnd = (s: SwiperClass, e: any) => {
    setTimeout(() => onInteractionEnd?.(), 100);
    const ev = e as TouchEvent | MouseEvent;
    let endX: number | null = null;
    if ("changedTouches" in ev && ev.changedTouches.length) {
      endX = ev.changedTouches[0].clientX;
    } else if ("clientX" in ev) {
      endX = (ev as MouseEvent).clientX;
    }

    if (touchStartX.current != null && endX != null) {
      const dx = endX - touchStartX.current;

      // Swipe left (next chapter) on the last slide
      if (s.isEnd && dx < -45) {
        if (!advancedRef.current) {
          advancedRef.current = true;
          setTimeout(() => onAdvanceBook(), 120);
          setTimeout(() => {
            advancedRef.current = false;
          }, 1000);
        }
      }
      // Swipe right (previous chapter) on the first slide
      else if (s.activeIndex === 0 && dx > 45) {
        if (!advancedRef.current) {
          advancedRef.current = true;
          setTimeout(() => onPrevBook?.(), 120);
          setTimeout(() => {
            advancedRef.current = false;
          }, 1000);
        }
      }
    }
    touchStartX.current = null;
  };

  return (
    <div ref={containerRef} className="relative w-full h-full select-none">
      <Swiper
        modules={[EffectCreative, Pagination, Keyboard]}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: ["-20%", 0, -200],
            opacity: 0,
            scale: 0.95,
          },
          next: {
            translate: ["100%", 0, 0],
            opacity: 1,
          },
        }}
        speed={750}
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        grabCursor
        onSwiper={(s) => (swiperRef.current = s)}
        onReachEnd={handleReachEnd}
        onSlideChangeTransitionEnd={handleSlideChangeTransitionEnd}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="lux-swiper"
      >
        {images.map((img, i) => {
          // Preload more adjacent slides (3) to prevent "still loading" flashes when swiping
          const isNearActive = isNear && Math.abs(i - activeIdx) <= 3;

          return (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full bg-[#fbf9f6]">
                {isNearActive ? (
                  <motion.img
                    key={`${i}-${activeIdx === i}`}
                    src={img.src}
                    alt={img.caption}
                    initial={{ scale: 1.08, opacity: 0.85 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    draggable={false}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#f5f0e6]/30 font-sans-lux text-[10px] text-[#8a6f48]/40 shimmer-text">
                    Art of Surfaces · Folio
                  </div>
                )}

                {/* Top frame */}
                <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-start justify-between text-[10px] sm:text-xs font-sans-lux text-[#e8c896]/80 z-10">
                  <span>{plateLabel}</span>
                  <span>
                    {String(i + 1).padStart(2, "0")}{" "}
                    <span className="opacity-50">/</span>{" "}
                    {String(images.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 pb-12 sm:pb-16 z-10">
                  <motion.p
                    key={`cap-${i}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.25,
                      duration: 0.9,
                      ease: [0.2, 0.7, 0.2, 1],
                    }}
                    className="font-serif italic text-[#ebe6dc] text-sm sm:text-lg leading-snug max-w-xl"
                  >
                    {img.caption}
                  </motion.p>
                  <div className="rule mt-3 sm:mt-4 max-w-[180px]" />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Hint to swipe to next chapter */}
      {hint && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#c9a875]/40">
            <span className="text-[10px] sm:text-xs font-sans-lux text-[#e8c896]">
              Next Chapter
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#e8c896]"
            >
              →
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

