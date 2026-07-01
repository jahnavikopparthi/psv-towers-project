import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, PenLine } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ReviewCard, ReviewStars, PagerButton, ReviewMarquee } from "@/components/customer-reviews";
import { ReviewFormDialog } from "@/components/review-form-dialog";
import { REVIEW_STATS, type Review, type ReviewType } from "@/lib/reviews-data";
import { useAllReviews } from "@/lib/reviews-store";

interface ReviewListPageProps {
  title: string;
  eyebrow: string;
  subtitle: string;
  filter: ReviewType;
  metaTitle: string;
  metaDesc: string;
}

const PAGE_SIZE = 12;

export function ReviewListPage({ title, eyebrow, subtitle, filter }: ReviewListPageProps) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"Latest" | "Highest">("Latest");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);
  const reviews = useAllReviews(filter);

  const filtered = useMemo(() => {
    let out = reviews;
    const needle = q.trim().toLowerCase();
    if (needle) {
      out = out.filter((r: Review) =>
        r.name.toLowerCase().includes(needle) ||
        r.text.toLowerCase().includes(needle) ||
        (r.title ?? "").toLowerCase().includes(needle),
      );
    }
    if (sort === "Latest") out = [...out].sort((a, b) => b.date.localeCompare(a.date));
    else out = [...out].sort((a, b) => b.rating - a.rating || b.date.localeCompare(a.date));
    return out;
  }, [reviews, q, sort]);

  const shown = filtered.slice(0, visible);
  const carousel = reviews.slice(0, 20);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <section className="section-pad">
        <div className="container-page">
          {/* Summary */}
          <div className="mx-auto mb-10 grid max-w-3xl gap-4 rounded-2xl bg-brand-soft/50 p-6 text-center shadow-card sm:grid-cols-3">
            <div>
              <div className="flex items-center justify-center gap-1 text-gold">
                <Star className="size-5 fill-gold text-gold" />
                <span className="font-display text-3xl font-bold text-brand">{REVIEW_STATS.average}/5</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Overall Rating</p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-brand">{REVIEW_STATS.totalLabel}</div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-brand">{reviews.length}+</div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Written Reviews</p>
            </div>
          </div>

          {/* Carousel */}
          <ReviewMarquee reviews={carousel} />

          {/* Write review */}
          <div className="mt-10 mb-6 flex justify-center">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="btn-gold inline-flex items-center gap-2"
            >
              <PenLine className="size-4" />
              Write a Review
            </button>
          </div>

          {/* Search + sort */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => { setQ(e.target.value); setVisible(PAGE_SIZE); }}
                placeholder="Search reviews…"
                className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-brand"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["Latest", "Highest"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => { setSort(f); setVisible(PAGE_SIZE); }}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
                    sort === f
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-brand hover:text-brand"
                  }`}
                >
                  {f} Rated
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing <span className="font-semibold text-foreground">{shown.length}</span> of{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span> reviews
            </span>
            <ReviewStars n={Math.round(REVIEW_STATS.average)} />
          </div>

          {filtered.length === 0 ? (
            <div className="card-soft py-16 text-center text-sm text-muted-foreground">
              No reviews match your search.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((r) => <ReviewCard key={r.id} r={r} />)}
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="btn-brand btn-brand-hover"
              >
                Load More Reviews
              </button>
              <div className="flex items-center gap-2">
                <PagerButton dir="prev" onClick={() => setVisible((v) => Math.max(PAGE_SIZE, v - PAGE_SIZE))} disabled={visible <= PAGE_SIZE} />
                <span className="text-xs text-muted-foreground">
                  Page {Math.ceil(visible / PAGE_SIZE)} of {Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}
                </span>
                <PagerButton dir="next" onClick={() => setVisible((v) => Math.min(filtered.length, v + PAGE_SIZE))} disabled={visible >= filtered.length} />
              </div>
            </div>
          )}
        </div>
      </section>

      <ReviewFormDialog open={formOpen} onOpenChange={setFormOpen} lockedType={filter} />
    </>
  );
}

// Index route (kept for backward compat) — links to the two dedicated pages.
import { Link } from "@tanstack/react-router";
import { Bed, UtensilsCrossed } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — P.S.V Towers" },
      { name: "description", content: "Read reviews from Boys Hostel residents and Restaurant guests at P.S.V Towers, Vijayawada." },
    ],
  }),
  component: ReviewsIndexPage,
});

function ReviewsIndexPage() {
  return (
    <>
      <PageHero eyebrow="Customer Reviews" title="Loved by Students & Food Lovers" subtitle="Choose a category to read all reviews." />
      <section className="section-pad">
        <div className="container-page grid max-w-4xl gap-6 mx-auto md:grid-cols-2">
          <Link to="/reviews/hostel" className="card-soft flex items-center gap-4 p-6 transition hover:border-brand">
            <span className="grid size-14 place-items-center rounded-xl bg-brand text-brand-foreground"><Bed className="size-7" /></span>
            <div>
              <h2 className="font-display text-xl font-semibold">Boys Hostel Reviews</h2>
              <p className="text-sm text-muted-foreground">Real experiences from residents</p>
            </div>
          </Link>
          <Link to="/reviews/restaurant" className="card-soft flex items-center gap-4 p-6 transition hover:border-brand">
            <span className="grid size-14 place-items-center rounded-xl bg-gold text-gold-foreground"><UtensilsCrossed className="size-7" /></span>
            <div>
              <h2 className="font-display text-xl font-semibold">Restaurant Reviews</h2>
              <p className="text-sm text-muted-foreground">From families & food lovers</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
