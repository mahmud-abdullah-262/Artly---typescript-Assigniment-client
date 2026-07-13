import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFetch } from "../../lib/action/core/useServerFetch";
import type { Banner } from "../../lib/types/Banner";

// --- Types ---
// এই টাইপগুলো তোমার lib/types/Banner.ts তে না থাকলে যোগ করে নিও।
// ধরে নিচ্ছি Banner টাইপে ইতিমধ্যে slides: BannerSlide[] এবং
// autoPlayIntervalMs: number ফিল্ড আছে।

export interface BannerCta {
  label: string;
  href: string;
}

export interface BannerSlide {
  id: string;
  image: string;
  alt: string;
  badge?: string;
  title: string;
  artist: string;
  medium: string;
  dimensions: string;
  price: number;
  currency: string;
  ctaPrimary: BannerCta;
  ctaSecondary?: BannerCta;
}

const DEFAULT_AUTOPLAY_MS = 6000;
const TRANSITION_S = 0.7; // seconds, crossfade duration

const formatPrice = (price: number, currency: string) => {
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

interface BannerProps {
  /** নেক্সট সেকশনের element id, "Explore" আইকনে ক্লিক করলে সেখানে স্মুথ স্ক্রল করবে */
  nextSectionId?: string;
}

const Banner = ({ nextSectionId }: BannerProps) => {
  const { data, loading } = useServerFetch<Banner[]>("/api/banner");
  const bannerConfig = data?.[0];
  const slides: BannerSlide[] = (bannerConfig as any)?.slides ?? [];
  const autoPlayIntervalMs =
    (bannerConfig as any)?.autoPlayIntervalMs ?? DEFAULT_AUTOPLAY_MS;

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

  // --- Autoplay ---
  useEffect(() => {
    if (!slides.length || isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, autoPlayIntervalMs);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayIntervalMs, isPaused, activeIndex]);

  // --- Touch swipe (mobile, যেহেতু ছোট স্ক্রিনে arrow বাটন নেই) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      deltaX > 0 ? handlePrev() : handleNext();
    }
    touchStartX.current = null;
  };

  const handleScrollNext = () => {
    if (!nextSectionId) return;
    document.getElementById(nextSectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center bg-bg-light">
        <Spinner color="primary" />
      </div>
    );
  }

  if (!slides.length) return null;

  const slide = slides[activeIndex];

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured artwork"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[420px] max-h-[800px] overflow-hidden bg-secondary"
    >
      {/* --- Image layer (crossfade + Ken Burns) --- */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.08 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: TRANSITION_S, ease: "easeInOut" },
            scale: { duration: autoPlayIntervalMs / 1000 + TRANSITION_S, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.alt}
            loading={activeIndex === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* --- Scrim for text legibility --- */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent" />

      {/* --- Content --- */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-10 md:px-16 md:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-11/12"
          >
            {slide.badge && (
              <span className="mb-4 inline-block rounded-md bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-bg-light">
                {slide.badge}
              </span>
            )}

            <h1 className="font-serif text-4xl font-bold leading-tight text-bg-light sm:text-5xl md:text-6xl ">
              {slide.title}
            </h1>

            <p className="mt-3 text-lg text-bg-light/90">{slide.artist}</p>
            <p className="mt-1 text-sm text-bg-light/60">
              {slide.medium} &middot; {slide.dimensions}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                as="a"
                href={slide.ctaPrimary.href}
                className="bg-primary font-semibold text-bg-light"
                endContent={<ChevronRightIcon />}
              >
                {slide.ctaPrimary.label}
              </Button>

              {slide.ctaSecondary && (
                <Button
                  as="a"
                  href={slide.ctaSecondary.href}
                  variant="bordered"
                  className="border-bg-light/70 font-semibold text-bg-light"
                >
                  {slide.ctaSecondary.label}
                </Button>
              )}

              <span className="text-xl font-bold text-bg-light">
                {formatPrice(slide.price, slide.currency)}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* --- Dots (interactive slider control) --- */}
        <div className="mt-8 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
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

      {/* --- Glassy nav arrows: md+ screens only --- */}
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

      {/* --- Visual flow to next section --- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-24 bg-gradient-to-b from-transparent to-bg-light/0" />
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
  );
};

export default Banner;