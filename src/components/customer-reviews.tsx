import { Link } from "@tanstack/react-router";
import { Star, Quote, ChevronLeft, ChevronRight, PenLine } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { avatarFor, REVIEW_STATS, type Review, type ReviewType } from "@/lib/reviews-data";
import { useAllReviews } from "@/lib/reviews-store";
import { ReviewFormDialog } from "./review-form-dialog";

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

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Date.now() - t;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return "Just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min${min > 1 ? "s" : ""} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr > 1 ? "s" : ""} ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day} day${day > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function ReviewCard({ r, compact = false }: { r: Review; compact?: boolean }) {
  const [imgOk, setImgOk] = useState(true);
  const initials = r.name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const typeLabel = r.type === "Hostel" ? "Boys Hostel" : "Restaurant";

  return (
    <div className="card-soft flex h-full flex-col p-5">
      <div className="flex items-center gap-3">
        {imgOk ? (
          <img
            src={avatarFor(r.name, r.gender)}
            alt={r.name}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="size-11 rounded-full border border-gold/40 object-cover"
          />
        ) : (
          <div className="flex size-11 items-center justify-center rounded-full border border-gold/40 bg-brand-soft text-sm font-semibold text-brand">
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{r.name}</div>
          <div className="text-[11px] uppercase tracking-wider text-brand">
            {typeLabel} Customer
          </div>
        </div>
        <Quote className="size-5 text-gold/60" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Stars n={r.rating} />
        <span className="text-[11px] text-muted-foreground">{relativeTime(r.date)}</span>
      </div>
      {r.title && (
        <h4 className="mt-3 line-clamp-1 font-display text-base font-semibold text-foreground">
          {r.title}
        </h4>
      )}
      <p
        className={`mt-2 text-sm leading-relaxed text-muted-foreground ${
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

/** Auto-scrolling marquee carousel with arrows, pause-on-hover, infinite loop */
export function ReviewMarquee({ reviews }: { reviews: Review[] }) {
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
      if (el && !paused) {
        el.scrollLeft += (dt / 1000) * 40;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half;
        if (el.scrollLeft < 0) el.scrollLeft += half;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused, reviews.length]);

  const nudge = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(320, Math.round(el.clientWidth * 0.6));
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  const loop = [...reviews, ...reviews];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="overflow-hidden">
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
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent md:w-24" />

      <button
        type="button"
        onClick={() => nudge("prev")}
        aria-label="Previous reviews"
        className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 p-2 text-brand shadow-card backdrop-blur transition hover:bg-brand hover:text-brand-foreground md:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => nudge("next")}
        aria-label="Next reviews"
        className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/90 p-2 text-brand shadow-card backdrop-blur transition hover:bg-brand hover:text-brand-foreground md:flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

interface CustomerReviewsSectionProps {
  filter?: ReviewType;
  viewAllHref?: string;
  heading?: string;
  eyebrow?: string;
  subheading?: string;
}

export function CustomerReviewsSection({
  filter,
  viewAllHref = "/reviews",
  heading,
  eyebrow = "Customer Reviews",
  subheading,
}: CustomerReviewsSectionProps = {}) {
  const allReviews = useAllReviews(filter);
  const [formOpen, setFormOpen] = useState(false);

  const carouselReviews = useMemo(() => allReviews.slice(0, 24), [allReviews]);
  const gridReviews = useMemo(() => allReviews.slice(0, 6), [allReviews]);

  const defaultHeading = filter === "Hostel"
    ? "What Our Boys Hostel Residents Say"
    : filter === "Restaurant"
      ? "What Our Restaurant Guests Say"
      : "What Our Customers Say";
  const defaultSub = filter === "Hostel"
    ? "Real experiences from students at P.S.V Towers Boys Hostel"
    : filter === "Restaurant"
      ? "Loved by families, students and food lovers across Vijayawada"
      : "Trusted by Students & Food Lovers";

  return (
    <section className="section-pad bg-cream/40" aria-labelledby="reviews-heading">
      <div className="container-page">
        <div className="text-center">
          <div className="eyebrow eyebrow-dot justify-center">{eyebrow}</div>
          <h2 id="reviews-heading" className="mt-2 font-display text-4xl font-bold">
            {heading ?? defaultHeading.replace("Our", "Our ").replace(" Our ", " ")}
          </h2>
          <p className="mt-2 text-muted-foreground">{subheading ?? defaultSub}</p>
        </div>

        <div className="mt-8">
          <SummaryHeader />
        </div>

        <ReviewMarquee reviews={carouselReviews} />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {gridReviews.map((r) => (
            <ReviewCard key={r.id} r={r} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to={viewAllHref} className="btn-brand btn-brand-hover">
            View All Reviews
          </Link>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="btn-gold inline-flex items-center gap-2"
          >
            <PenLine className="size-4" />
            Write a Review
          </button>
        </div>
      </div>

      <ReviewFormDialog open={formOpen} onOpenChange={setFormOpen} lockedType={filter} />
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
