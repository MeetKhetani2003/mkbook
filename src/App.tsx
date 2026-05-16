import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import FlipBook, { type FlipBookHandle } from "./components/FlipBook";
import { logo } from "./assets/assets";

function useViewport() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);
  return size;
}

export default function App() {
  const { w, h } = useViewport();
  const isMobile = w < 820;
  const bookRef = useRef<FlipBookHandle>(null);

  // Book sizing — landscape spread feel. On mobile we use portrait single-page.
  const PAGE_RATIO = 1.35; // height / width per page
  let pageWidth: number;
  let pageHeight: number;

  if (isMobile) {
    pageWidth = Math.min(w - 20, 500);
    pageHeight = Math.min(h - 100, pageWidth * PAGE_RATIO);
  } else {
    // landscape spread: two pages side by side
    const availW = Math.min(w - 60, 1600); // More width
    const availH = Math.min(h - 100, 950); // More height
    // book total width = 2 * pageWidth, height = pageHeight; aim ratio ~ (2/PAGE_RATIO):1
    let bookW = availW;
    let bookH = (bookW / 2) * PAGE_RATIO;
    if (bookH > availH) {
      bookH = availH;
      bookW = (bookH * 2) / PAGE_RATIO;
    }
    pageWidth = Math.floor(bookW / 2);
    pageHeight = Math.floor(bookH);
  }

  // Intro state
  const [showIntro, setShowIntro] = useState(false);
  const [bookEntered, setBookEntered] = useState(true);
  const [pageInfo, setPageInfo] = useState({ page: 0, total: 0 });
  const stageRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  // GSAP cinematic intro
  useLayoutEffect(() => {
    if (!showIntro) return;
    const ctx = gsap.context(() => {
      gsap.from(".intro-line", {
        yPercent: 110,
        duration: 1.4,
        stagger: 0.12,
        ease: "expo.out",
        delay: 0.2,
      });
      gsap.from(".intro-rule", { scaleX: 0, duration: 1.6, ease: "expo.out", delay: 0.6 });
      gsap.from(".intro-meta", { opacity: 0, y: 12, duration: 1, ease: "power3.out", delay: 1.2, stagger: 0.1 });
      gsap.from(".intro-cta", { opacity: 0, y: 14, duration: 1, ease: "power3.out", delay: 1.6 });
    });
    return () => ctx.revert();
  }, [showIntro]);

  // Cinematic book entrance
  useLayoutEffect(() => {
    if (showIntro) return;
    const ctx = gsap.context(() => {
      gsap.from(bookContainerRef.current, {
        opacity: 0,
        scale: 0.9,
        rotateX: 18,
        y: 30,
        duration: 1.6,
        ease: "expo.out",
        onComplete: () => setBookEntered(true),
      });
      gsap.from(".chrome-top, .chrome-bottom", {
        opacity: 0,
        y: -10,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
    }, stageRef);
    return () => ctx.revert();
  }, [showIntro]);

  // Keyboard navigation
  useEffect(() => {
    if (showIntro) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") bookRef.current?.next();
      else if (e.key === "ArrowLeft") bookRef.current?.prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showIntro]);

  // Parallax on book based on pointer
  useEffect(() => {
    if (!bookEntered) return;
    const el = bookContainerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = ((e.clientY - cy) / cy) * -2.2; // tilt X
      const ry = ((e.clientX - cx) / cx) * 2.8;  // tilt Y
      gsap.to(el, {
        rotateX: rx,
        rotateY: ry,
        duration: 1.4,
        ease: "power3.out",
        transformPerspective: 2200,
        transformOrigin: "center center",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [bookEntered]);

  const handlePageChange = (page: number, total: number) => {
    setPageInfo({ page, total });
  };

  const progress = pageInfo.total > 1 ? (pageInfo.page / (pageInfo.total - 1)) * 100 : 0;

  return (
    <div ref={stageRef} className="relative w-screen h-screen overflow-hidden">
      {/* Ambient backdrop layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff] via-[#f8f5f0] to-[#e8e1d5]" />
        <div
          className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[140vmax] h-[140vmax] rounded-full opacity-[0.4]"
          style={{
            background:
              "radial-gradient(circle, rgba(181,154,109,0.15) 0%, rgba(181,154,109,0.05) 25%, transparent 60%)",
          }}
        />
      </div>

      {/* ===== INTRO ===== */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.7, 0, 0.3, 1] } }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="overflow-hidden">
              <p className="intro-line font-sans-lux text-[10px] sm:text-xs text-[#c9a875]/80">
                MK CREATIONS · MMXXVI
              </p>
            </div>
            <div className="overflow-hidden mt-4 sm:mt-6">
              <h1 className="intro-line font-serif-display text-[#ebe6dc] text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
                The <span className="gold-foil italic">Folio</span>
              </h1>
            </div>
            <div className="overflow-hidden mt-1 sm:mt-2">
              <h1 className="intro-line font-serif-display text-[#ebe6dc] text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
                of Surfaces.
              </h1>
            </div>

            <div className="intro-rule gold-line h-px w-40 sm:w-64 my-6 sm:my-10 origin-center" />

            <p className="intro-meta font-serif italic text-[#ebe6dc]/70 text-sm sm:text-lg max-w-md leading-snug">
              An interactive monograph of six architectural surfaces, conceived for the slow
              pleasure of the page.
            </p>

            <button
              onClick={() => setShowIntro(false)}
              className="intro-cta lux-btn mt-8 sm:mt-12 px-8 sm:px-12 py-3 sm:py-4 font-sans-lux text-[10px] sm:text-xs rounded-full"
            >
              Open the Book
            </button>

            <p className="intro-meta absolute bottom-6 sm:bottom-10 font-sans-lux text-[9px] sm:text-[10px] text-[#c9a875]/50">
              Best experienced fullscreen · with sound off
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== TOP CHROME ===== */}
        <div className="chrome-top absolute top-0 left-0 right-0 z-40 px-5 sm:px-10 pt-5 sm:pt-7 flex items-start justify-between pointer-events-none">
          <div className="pointer-events-auto">
            <img src={logo} alt="MK Creations" className="h-10 sm:h-14 w-auto object-contain brightness-110" />
            <div className="font-sans-lux text-[7px] sm:text-[8px] text-[#8a6f48] mt-1 tracking-[0.2em]">
              ATELIER · FOLIO IX · MMXXVI
            </div>
          </div>
          <div className="pointer-events-auto text-right">
            <div className="font-sans-lux text-[9px] sm:text-[10px] text-[#8a6f48]">
              {String(pageInfo.page + 1).padStart(2, "0")}
              <span className="opacity-50"> / </span>
              {String(Math.max(pageInfo.total, 1)).padStart(2, "0")}
            </div>
            <div className="mt-2 w-32 sm:w-48 h-px bg-[#8a6f48]/20 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#8a6f48] to-[#e8c896]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              />
            </div>
          </div>
        </div>

      {/* ===== BOOK STAGE ===== */}
        <div className="book-stage absolute inset-0 flex items-center justify-center">
          <div
            ref={bookContainerRef}
            className="relative no-select"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Soft floor reflection */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -bottom-10 sm:-bottom-16 w-[90%] h-12 sm:h-20 rounded-[50%] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(0,0,0,0.7), transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <FlipBook
              ref={bookRef}
              width={pageWidth}
              height={pageHeight}
              isMobile={isMobile}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

      {/* ===== BOTTOM CHROME ===== */}
        <div className="chrome-bottom absolute bottom-0 left-0 right-0 z-40 px-5 sm:px-10 pb-5 sm:pb-7 flex items-end justify-between pointer-events-none">
          <div className="pointer-events-auto hidden sm:block">
            <p className="font-serif italic text-[#8a6f48]/70 text-xs max-w-xs leading-snug">
              Drag the page corner. Swipe the photographs. The book will turn itself when there is
              nothing left to see.
            </p>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 mx-auto sm:mx-0">
            <button
              onClick={() => bookRef.current?.prev()}
              className="lux-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              aria-label="Previous page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="font-sans-lux text-[9px] sm:text-[10px] text-[#8a6f48]/70 px-2 hidden sm:block">
              TURN
            </div>
            <button
              onClick={() => bookRef.current?.next()}
              className="lux-btn w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              aria-label="Next page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="pointer-events-auto hidden sm:block text-right">
            <p className="font-sans-lux text-[9px] text-[#2c2926]/50">
              RAJKOT · MILANO · GLOBAL
            </p>
          </div>
        </div>

      <div className="vignette" />
      <div className="grain" />
    </div>
  );
}
