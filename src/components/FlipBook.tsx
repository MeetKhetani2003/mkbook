import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
// @ts-ignore - module ships without proper types
import HTMLFlipBook from "react-pageflip";
import EditorialPage from "./EditorialPage";
import PageCarousel from "./PageCarousel";
import { chapters } from "../data/chapters";
import { logo } from "../assets/assets";

export type FlipBookHandle = {
  next: () => void;
  prev: () => void;
  goTo: (p: number) => void;
};

// Page wrapper — ref-forwarding required by react-pageflip
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} className={`luxury-page ${className}`}>
      {children}
      <span className="corner-hint" />
    </div>
  )
);
Page.displayName = "Page";

const HardPage = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = "" }, ref) => (
    <div ref={ref} className={className} data-density="hard">
      {children}
    </div>
  )
);
HardPage.displayName = "HardPage";

type Props = {
  width: number;
  height: number;
  isMobile: boolean;
  onPageChange?: (page: number, total: number) => void;
};

const FlipBook = forwardRef<FlipBookHandle, Props>(({ width, height, isMobile, onPageChange }, ref) => {
  const bookRef = useRef<any>(null);
  const [, setCurrent] = useState(0);

  useImperativeHandle(ref, () => ({
    next: () => bookRef.current?.pageFlip()?.flipNext(),
    prev: () => bookRef.current?.pageFlip()?.flipPrev(),
    goTo: (p: number) => bookRef.current?.pageFlip()?.flip(p),
  }));

  const advance = () => {
    const pf = bookRef.current?.pageFlip();
    if (!pf) return;
    pf.flipNext();
  };

  useEffect(() => {
    // Notify parent of initial state once the book mounts
    const t = setTimeout(() => {
      const pf = bookRef.current?.pageFlip?.();
      if (pf && onPageChange) {
        onPageChange(pf.getCurrentPageIndex?.() ?? 0, pf.getPageCount?.() ?? 0);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [onPageChange]);

  // Build pages: [Cover, ...for each chapter: [editorial, carousel], BackCover]
  const totalPagesEstimate = 2 + chapters.length * 2;

  return (
    <HTMLFlipBook
      ref={bookRef}
      width={width}
      height={height}
      size="fixed"
      minWidth={280}
      maxWidth={1400}
      minHeight={380}
      maxHeight={1000}
      maxShadowOpacity={0.6}
      showCover={true}
      mobileScrollSupport={true}
      drawShadow={true}
      flippingTime={1100}
      usePortrait={isMobile}
      startZIndex={0}
      autoSize={false}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={30}
      showPageCorners={true}
      disableFlipByClick={false}
      startPage={0}
      style={{}}
      className=""
      onFlip={(e: any) => {
        setCurrent(e.data);
        onPageChange?.(e.data, totalPagesEstimate);
      }}
    >
      {/* === FRONT COVER === */}
      <HardPage className="book-cover">
        <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 md:p-14 text-center">
          <div className="font-sans-lux text-[10px] sm:text-xs text-[#c9a875]/80">
            Established · MMXII · Atelier
          </div>

          <div className="flex flex-col items-center">
            <img src={logo} alt="MK Creations" className="h-32 sm:h-48 mb-8 object-contain drop-shadow-xl opacity-90" />
            <div className="gold-line h-px w-24 sm:w-40 my-6 sm:my-10" />
            <div className="font-serif italic text-[#6b645e] text-sm sm:text-lg max-w-xs">
              An Architectural Atelier
            </div>
            <div className="font-serif-display text-[#2c2926] text-2xl sm:text-4xl md:text-5xl mt-4 sm:mt-6 leading-tight">
              Folio of Surfaces
            </div>
            <div className="font-serif italic text-[#8a6f48] text-xs sm:text-sm mt-2">
              Volume IX · MMXXVI
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="gold-line h-px w-16" />
            <div className="font-sans-lux text-[9px] sm:text-[10px] text-[#c9a875]/70">
              Private Edition · No. 014 of 250
            </div>
          </div>
        </div>
      </HardPage>

      {/* === INSIDE FRONT — Foreword === */}
      <Page className="page-right">
        <div className="w-full h-full flex flex-col p-6 sm:p-10 md:p-14">
          <p className="font-sans-lux text-[10px] sm:text-xs text-[#8a6f48] mb-6 sm:mb-10">Foreword</p>
          <h2 className="font-serif-display text-[#1a1612] text-3xl sm:text-5xl md:text-6xl leading-tight mb-6 sm:mb-10">
            On the matter of <em className="font-serif italic">surface</em>.
          </h2>
          <div className="rule max-w-[120px] mb-6 sm:mb-8" />
          <p className="font-serif italic text-[#3a3128] text-base sm:text-xl leading-snug mb-4 sm:mb-6 max-w-md">
            A house is not built of walls. It is built of the surfaces those walls become — the
            floors one walks across without thinking, the reliefs one passes daily, the inlays
            that hold the morning light.
          </p>
          <p className="font-serif text-[#2a221a] text-[13px] sm:text-sm leading-[1.8] max-w-md dropcap">
            This volume gathers six commissions completed by the atelier during the past
            twenty-four months. Each is presented as a chapter — an editorial study on the
            facing page, and a sequence of photographic plates opposite. The reader is invited
            to linger, to turn at their own pace, and to swipe through each plate until the
            book itself proposes the next chapter.
          </p>
          <div className="mt-auto pt-6 sm:pt-10 flex items-end justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48]">
            <span>The Editors</span>
            <span>— 001 —</span>
          </div>
        </div>
      </Page>

      {/* === CHAPTERS === */}
      {chapters.map((ch, i) => [
        <Page key={`l-${i}`} className="page-left">
          <EditorialPage chapter={ch} index={i} />
        </Page>,
        <Page key={`r-${i}`} className="page-right">
          <PageCarousel
            images={ch.images}
            onAdvanceBook={advance}
            plateLabel={`Folio ${ch.number} · Plates`}
          />
        </Page>,
      ])}

      {/* === COLOPHON === */}
      <Page className="page-left">
        <div className="w-full h-full flex flex-col p-6 sm:p-10 md:p-14">
          <p className="font-sans-lux text-[10px] sm:text-xs text-[#8a6f48] mb-6 sm:mb-10">Colophon</p>
          <h2 className="font-serif-display text-[#1a1612] text-3xl sm:text-5xl leading-tight mb-6 sm:mb-10">
            A note on the making of this book.
          </h2>
          <div className="rule max-w-[120px] mb-6 sm:mb-8" />
          <div className="space-y-3 sm:space-y-4 text-[#2a221a] text-[12px] sm:text-sm leading-[1.8] font-serif max-w-md">
            <p>
              Set in <em>Italiana</em> and <em>Cormorant Garamond</em>, with sans-serif notes in
              Inter. Printed in two-colour offset on 170gsm Munken Pure, bound in linen with a
              gold-foil stamped cover.
            </p>
            <p>
              All photography commissioned exclusively for this volume. Photographic direction
              by the atelier. Editorial &amp; design by Studio Marenco, Milan.
            </p>
            <p className="italic">
              No part of this book may be reproduced without the written consent of the publisher.
            </p>
          </div>
          <div className="mt-auto pt-6 sm:pt-10 flex items-end justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48]">
            <span>MK Creations · Rajkot</span>
            <span>— 014 —</span>
          </div>
        </div>
      </Page>

      {/* === BACK COVER === */}
      <HardPage className="book-cover">
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-14 text-center">
          <img src={logo} alt="MK Creations" className="h-16 sm:h-24 mb-6 object-contain opacity-80" />
          <div className="gold-line h-px w-16 sm:w-24 my-4 sm:my-6" />
          <div className="font-sans-lux text-[9px] sm:text-[10px] text-[#c9a875]/70 max-w-xs">
            Atelier of Architectural Surfaces<br />
            Rajkot · Milano
          </div>
          <div className="absolute bottom-6 sm:bottom-10 font-sans-lux text-[8px] sm:text-[9px] text-[#c9a875]/40">
            mkcreations.atelier
          </div>
        </div>
      </HardPage>
    </HTMLFlipBook>
  );
});

FlipBook.displayName = "FlipBook";
export default FlipBook;
