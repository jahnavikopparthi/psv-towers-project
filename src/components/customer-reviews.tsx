import { Link } from "@tanstack/react-router";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_REVIEWS, avatarFor, REVIEW_STATS, type Review } from "@/lib/reviews-data";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${i < n ? "fill-gold text-gold" : "text-gold/30"}`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function ReviewCard({ r, compact = false }: { r: Review; compact?: boolean }) {
  return (
    <div className="card-soft flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        <img
          src={avatarFor(r.name)}
          alt={r.name}
          loading="lazy"
          className="size-11 rounded-full border border-gold/40 bg-gold-soft object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{r.name}</div>
          <div className="text-[11px] uppercase tracking-wider text-brand">
            {r.type} Customer
          </div>
        </div>
        <Quote className="size-5 text-gold/60" />
      </div>
      <div className="mt-3"><Stars n={r.rating} /></div>
      <p
        className={`mt-3 text-sm leading-relaxed text-muted-foreground ${
          compact ? "line-clamp-4" : ""
        }`}
      >
        {r.text}
      </p>
    </div>
  );
}

function SummaryHeader() {
  return (
    <div className="mx-auto mb-10 max-w-2xl rounded-2xl bg-brand-soft/50 p-6 text-center shadow-card">
      <div className="flex items-center justify-center gap-2 text-gold">
        <Star className="size-6 fill-gold text-gold" />
        <span className="font-display text-3xl font-bold text-brand">
          {REVIEW_STATS.average}/5
        </span>
        <span className="text-sm font-medium text-muted-foreground">Average Rating</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Based on <span className="font-semibold text-foreground">{REVIEW_STATS.totalLabel}</span> Happy Customers
      </p>
    </div>
  );
}

/** Auto-scrolling marquee carousel */
function ReviewMarquee({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused) {
        el.scrollLeft += (dt / 1000) * 40; // 40px/sec
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const loop = [...reviews, ...reviews];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((r, i) => (
          <div key={`${r.id}-${i}`} className="w-[300px] shrink-0 md:w-[340px]">
            <ReviewCard r={r} compact />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export function CustomerReviewsSection() {
  const carouselReviews = useMemo(() => ALL_REVIEWS.slice(0, 20), []);
  const gridReviews = useMemo(() => ALL_REVIEWS.slice(0, 6), []);

  return (
    <section className="section-pad bg-cream/40" aria-labelledby="reviews-heading">
      <div className="container-page">
        <div className="text-center">
          <div className="eyebrow eyebrow-dot justify-center">Customer Reviews</div>
          <h2
            id="reviews-heading"
            className="mt-2 font-display text-4xl font-bold"
          >
            What Our <span className="text-gold">Customers</span> Say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Trusted by Students &amp; Food Lovers
          </p>
        </div>

        <div className="mt-8">
          <SummaryHeader />
        </div>

        {/* Auto-scrolling carousel */}
        <ReviewMarquee reviews={carouselReviews} />

        {/* Grid */}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gridReviews.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/reviews" className="btn-brand btn-brand-hover">
            View All Reviews
          </Link>
          <Link to="/contact" className="btn-gold">
            Write a Review
          </Link>
        </div>
      </div>
    </section>
  );
}

export { Stars as ReviewStars };
export function PagerButton({
  onClick,
  disabled,
  dir,
}: {
  onClick: () => void;
  disabled?: boolean;
  dir: "prev" | "next";
}) {
  const Icon = dir === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-brand transition hover:bg-brand-soft disabled:opacity-40"
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <Icon className="size-4" />
    </button>
  );
}
