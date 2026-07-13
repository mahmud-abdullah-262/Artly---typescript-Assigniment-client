import { useCallback, useEffect, useRef, useState } from "react";
import {  Link, Spinner } from "@heroui/react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFetch } from "../../lib/action/core/useServerFetch";
import type { Banner, Slide } from "../../lib/types/Banner";

import { Truck, ShieldCheck, PackageCheck, Leaf } from "lucide-react";
 
interface Feature {
  icon: React.ElementType;
  label: string;
}
 
const features: Feature[] = [
  { icon: Truck, label: "Free shipping over 5000৳" },
  { icon: ShieldCheck, label: "Authenticity guaranteed" },
  { icon: PackageCheck, label: "Secure art packaging" },
  { icon: Leaf, label: "Carbon-neutral delivery" },
];




const DEFAULT_AUTOPLAY_MS = 6000;
const TRANSITION_S = 0.7;

const formatPrice = (price?: number, currency?: string) => {
  if (price === undefined || !currency) return null;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return `${price} ${currency}`;
  }
};


const ChevronLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);



const BannerSection = ({ nextSectionId }: { nextSectionId?: string }) => {
  const { data, loading } = useServerFetch<Banner[]>("/api/banner");
  const bannerConfig = data?.[0];
  const slides: Slide[] = bannerConfig?.slides ?? [];
  const autoPlayIntervalMs = bannerConfig?.autoPlayIntervalMs ?? DEFAULT_AUTOPLAY_MS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (!slides.length) return;
      const next = ((index % slides.length) + slides.length) % slides.length;
      setActiveIndex(next);
    },
    [slides.length]
  );

  const handlePrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const handleNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!slides.length || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, autoPlayIntervalMs);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayIntervalMs, isPaused, activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    touchStartX.current = null;
  };

  const handleScrollNext = () => {
    if (!nextSectionId) return;
    document.getElementById(nextSectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-bg-light">
        <Spinner/>
      </div>
    );
  }

  if (!slides.length) return null;

  const slide = slides[activeIndex];
  const slideKey = slide.id ?? String(activeIndex); // id optional হওয়ায় fallback

  return (
    <>
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured artwork"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-105 max-h-200 overflow-hidden bg-secondary"
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slideKey}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: TRANSITION_S, ease: "easeInOut" },
            scale: { duration: autoPlayIntervalMs / 1000 + TRANSITION_S, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          {slide.image && (
            <img
              src={slide.image}
              alt={slide.alt ?? slide.title ?? ""}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-secondary/90 via-secondary/40 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-10 md:px-16 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideKey}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-full"
          >
            {slide.badge && (
              <span className="mb-4 inline-block rounded-md bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-bg-light">
                {slide.badge}
              </span>
            )}

            {slide.title && (
              <h1
                className="font-serif font-bold leading-tight text-bg-light whitespace-nowrap truncate"
                style={{ fontSize: "clamp(1.75rem, 5vw, 3.75rem)" }}
              >
                {slide.title}
              </h1>
            )}

            {slide.artist && <p className="mt-3 text-lg text-bg-light/90">{slide.artist}</p>}
            {(slide.medium || slide.dimensions) && (
              <p className="mt-1 text-sm text-bg-light/60">
                {[slide.medium, slide.dimensions].filter(Boolean).join(" · ")}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {slide.ctaPrimary && (
                <Link
                
                  href={'/explore'}
                  className="bg-primary font-semibold text-bg-light py-1 px-4 flex justify-center items-center"
                 
                >
               {slide.ctaPrimary.label}
                </Link>
              )}

              {slide.ctaSecondary && (
                <Link
               
                  href={slide.ctaSecondary.href}
               
                  className="border-bg-light/70 font-semibold text-bg-light"
                >
                  {slide.ctaSecondary.label}
                </Link>
              )}

              {formatPrice(slide.price, slide.currency) && (
                <span className="text-xl font-bold text-bg-light">
                  {formatPrice(slide.price, slide.currency)}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id ?? i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-primary" : "w-2 bg-bg-light/40 hover:bg-bg-light/70"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-bg-light/30 bg-bg-light/10 p-2 text-bg-light backdrop-blur-md transition-colors hover:bg-bg-light/20 md:flex"
      >
        <ChevronLeftIcon />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-bg-light/30 bg-bg-light/10 p-2 text-bg-light backdrop-blur-md transition-colors hover:bg-bg-light/20 md:flex"
      >
        <ChevronRightIcon />
      </button>

      {nextSectionId && (
        <button
          onClick={handleScrollNext}
          aria-label="Scroll to next section"
          className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-bg-light/80 transition-colors hover:text-bg-light"
        >
          <span className="text-[10px] uppercase tracking-widest">Explore</span>
          <span className="animate-bounce">
            <ChevronDownIcon />
          </span>
        </button>
      )}
       
    </section>
    <section className="w-full bg-primary py-4 px-1">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  text-center items-center justify-center gap-x-10 gap-y-3 sm:justify-between ">
        {features.map(({ icon: Icon, label }, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 text-bg-light/90 justify-center"
          >
            <Icon
              size={18}
              strokeWidth={1.5}
              className="text-accent shrink-0"
            />
            <span className="text-sm font-regular whitespace-nowrap">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
    </>
    
  );
};

export default BannerSection;