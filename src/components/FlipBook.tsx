import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
// @ts-ignore - module ships without proper types
import HTMLFlipBook from "react-pageflip";
import EditorialPage from "./EditorialPage";
import PageCarousel from "./PageCarousel";
import { chapters } from "../data/chapters";
import { logo, instagramqr, locationqr } from "../assets/assets";

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
  const [current, setCurrent] = useState(0);
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(true);

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

  const retreat = () => {
    const pf = bookRef.current?.pageFlip();
    if (!pf) return;
    pf.flipPrev();
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
      key={isMobile ? "mobile" : "desktop"}
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
      flippingTime={650} // Snappy page animation
      usePortrait={isMobile}
      startZIndex={0}
      autoSize={false}
      clickEventForward={true}
      useMouseEvents={!isMobile && isSwipeEnabled} // Disable buggy built-in gestures on mobile entirely
      swipeDistance={80} // Stable, intentional swipe gestures
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


          <div className="flex flex-col items-center">
            <img src={logo} alt="MK Creations" className="h-32 sm:h-48 mb-8 object-contain drop-shadow-xl opacity-90" />
            <div className="gold-line h-px w-24 sm:w-40 my-6 sm:my-10" />

            <div className="font-serif-display text-[#2c2926] text-2xl sm:text-4xl md:text-5xl mt-4 sm:mt-6 leading-tight">
              Folio of Arts
            </div>
            <div className="font-serif italic text-[#8a6f48] text-xs sm:text-sm mt-2">
              Volume 1 · 2026
            </div>
          </div>


        </div>
      </HardPage>

      <Page className="page-right">
        <div className="w-full h-full flex flex-col p-6 sm:p-10 md:p-14">
          <p className="font-sans-lux text-[10px] sm:text-xs text-[#8a6f48] mb-6 sm:mb-10">The Vision</p>
          <h2 className="font-serif-display text-[#1a1612] text-3xl sm:text-5xl md:text-6xl leading-tight mb-6 sm:mb-10">
            Crafting the <em className="font-serif italic">unseen</em> details.
          </h2>
          <div className="rule max-w-[120px] mb-6 sm:mb-8" />
          <div 
            className="flex-1 min-h-0 overflow-y-auto pr-2 pb-2 custom-scrollbar"
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-[#3a3128] text-sm sm:text-xl leading-snug mb-4 sm:mb-6 max-w-md">
              MK Creation is a brand focus on the Architectural art. We believe
              that the ground we walk on and the walls that surround us are more than functional
              boundaries _ they are canvases for Art Expression.
            </p>
            <p className="font-serif text-[#2a221a] text-[11px] sm:text-sm leading-[1.8] max-w-md dropcap">
              This digital brochure showcases our recent works in bespoke marble inlays, waterjet precision
              cutting, and sculptural surface artworks. From monumental luxury residences to high-end
              hospitality projects, we bridge the gap between traditional stonemasonry and contemporary
              architectural design.
            </p>
          </div>
          <div className="mt-4 pt-4 sm:pt-10 flex items-end justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48]">
            <span>MK Creations Art of Surfaces</span>
            <span>— 001 —</span>
          </div>
        </div>
      </Page>

      {/* === CHAPTERS === */}
      {chapters.map((ch, i) => {
        // Left page index is 2*i + 2, Right page index is 2*i + 3.
        // We track if this chapter is nearby to lazy-load its images
        const leftPageIndex = 2 * i + 2;
        const rightPageIndex = 2 * i + 3;
        const isChapterNearby = Math.abs(current - leftPageIndex) <= 3 || Math.abs(current - rightPageIndex) <= 3;

        return [
          <Page key={`l-${i}`} className="page-left">
            <EditorialPage chapter={ch} index={i} />
          </Page>,
          <Page key={`r-${i}`} className="page-right">
            <PageCarousel
              images={ch.images}
              onAdvanceBook={advance}
              onPrevBook={retreat}
              plateLabel={`Folio ${ch.number} · Plates`}
              onInteractionStart={() => setIsSwipeEnabled(false)}
              onInteractionEnd={() => setIsSwipeEnabled(true)}
              isNear={isChapterNearby}
            />
          </Page>
        ];
      })}

      <Page className="page-left">
        <div className="w-full h-full flex flex-col p-6 sm:p-10 md:p-14">
          <p className="font-sans-lux text-[10px] sm:text-xs text-[#8a6f48] mb-6 sm:mb-10">Collaborations</p>
          <h2 className="font-serif-display text-[#1a1612] text-3xl sm:text-5xl leading-tight mb-6 sm:mb-10">
            Bring your vision to reality.
          </h2>
          <div className="rule max-w-[120px] mb-6 sm:mb-8" />
          <div 
            className="space-y-3 sm:space-y-4 text-[#2a221a] text-[11px] sm:text-sm leading-[1.8] font-serif max-w-md flex-1 min-h-0 overflow-y-auto pr-2 pb-2 custom-scrollbar"
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p>
              Every surface we create is a result of a deep dialogue between the architect, the
              designer, and our artisans. We specialize in transforming complex geometric concepts
              into tactile, permanent architectural statements.
            </p>
            <p>
              Our services include material consultancy, waterjet precision cutting, hand-finishing,
              and on-site installation oversight for global commissions.
            </p>
            <p className="italic">
              For inquiries regarding commissions, material samples, or technical specifications,
              please reach out to our Rajkot office.
            </p>
          </div>
          <div className="mt-4 pt-4 sm:pt-10 flex items-end justify-between text-[10px] sm:text-xs font-sans-lux text-[#8a6f48]">
            <span>mkcreations.artofsurfaces</span>
            <span className="mx-2 opacity-50">•</span>
            <span>surfaces@mkcreations.com</span>
          </div>
        </div>
      </Page>

      {/* === BACK COVER === */}
      <HardPage className="book-cover">
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-14 text-center">
          <img src={logo} alt="MK Creations" className="h-16 sm:h-24 mb-6 object-contain opacity-80" />
          <div className="gold-line h-px w-16 sm:w-24 my-4 sm:my-6" />

          <div className="flex flex-col items-center gap-4 sm:gap-6 mt-2">
            <div className="font-sans-lux text-[9px] sm:text-[10px] text-[#c9a875]/80 max-w-sm leading-relaxed">
              <strong className="block mb-2 text-xs sm:text-sm text-[#c9a875]">MK Creation</strong>
              RADHE KRISHNA PARK -2<br />
              Infront of Rameshwaram Party Lawns,<br />KALAWAD ROAD NEAR COSMOPLEX CINEMA, MOTA MAVA<br />
              Rajkot-360005, Gujarat
            </div>

            <div className="font-sans-lux text-[9px] sm:text-[10px] text-[#c9a875]/80">
              <span className="block mb-1 text-[#c9a875]">Contact:-</span>
              9558787870<br />
              9274787870
            </div>

            <div className="flex items-center gap-8 mt-2">
              <div className="flex flex-col items-center gap-1 sm:gap-2 shrink-0">
                <img src={instagramqr} alt="Instagram QR" width="80" height="80" className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md shadow-sm shrink-0" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                <span className="font-sans-lux text-[8px] sm:text-[9px] text-[#c9a875]/60">Instagram</span>
              </div>
              <div className="flex flex-col items-center gap-1 sm:gap-2 shrink-0">
                <img src={locationqr} alt="Location QR" width="80" height="80" className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md shadow-sm shrink-0" style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }} />
                <span className="font-sans-lux text-[8px] sm:text-[9px] text-[#c9a875]/60">Location</span>
              </div>
            </div>
          </div>
        </div>
      </HardPage>
    </HTMLFlipBook>
  );
});

FlipBook.displayName = "FlipBook";
export default FlipBook;
