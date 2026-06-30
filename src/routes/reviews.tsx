import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Star, PenLine } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ReviewCard, ReviewStars, PagerButton } from "@/components/customer-reviews";
import { ReviewFormDialog } from "@/components/review-form-dialog";
import { ALL_REVIEWS, REVIEW_STATS, type Review } from "@/lib/reviews-data";
import { useAllReviews } from "@/lib/reviews-store";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — P.S.V Towers" },
      {
        name: "description",
        content:
          "Read 500+ reviews from hostel residents and restaurant guests at P.S.V Towers, Vijayawada.",
      },
    ],
  }),
  component: ReviewsPage,
});

type Filter = "All" | "Hostel" | "Restaurant" | "Latest" | "Highest";

const PAGE_SIZE = 12;

function applyFilter(list: Review[], filter: Filter, q: string) {
  let out = list;
  if (filter === "Hostel" || filter === "Restaurant") {
    out = out.filter((r) => r.type === filter);
  }
  if (q.trim()) {
    const needle = q.trim().toLowerCase();
    out = out.filter(
      (r) =>
        r.name.toLowerCase().includes(needle) ||
        r.text.toLowerCase().includes(needle) ||
        r.type.toLowerCase().includes(needle),
    );
  }
  if (filter === "Latest") {
    out = [...out].sort((a, b) => b.date.localeCompare(a.date));
  } else if (filter === "Highest") {
    out = [...out].sort((a, b) => b.rating - a.rating || b.date.localeCompare(a.date));
  }
  return out;
}

function ReviewsPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [formOpen, setFormOpen] = useState(false);

  const allReviews = useAllReviews();
  const filtered = useMemo(() => applyFilter(allReviews, filter, q), [allReviews, filter, q]);
  const shown = filtered.slice(0, visible);

  const filters: Filter[] = ["All", "Hostel", "Restaurant", "Latest", "Highest"];


  return (
    <>
      <PageHero
        eyebrow="Customer Reviews"
        title="Loved by Students & Food Lovers"
        subtitle="Honest experiences from our hostel residents and restaurant guests."
      />

      <section className="section-pad">
        <div className="container-page">
          {/* Summary */}
          <div className="mx-auto mb-10 grid max-w-3xl gap-4 rounded-2xl bg-brand-soft/50 p-6 text-center shadow-card sm:grid-cols-3">
            <div>
              <div className="flex items-center justify-center gap-1 text-gold">
                <Star className="size-5 fill-gold text-gold" />
                <span className="font-display text-3xl font-bold text-brand">
                  {REVIEW_STATS.average}/5
                </span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Overall Rating
              </p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-brand">
                {REVIEW_STATS.totalLabel}
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Happy Customers
              </p>
            </div>
            <div>
              <div className="font-display text-3xl font-bold text-brand">
                {allReviews.length}+
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Written Reviews
              </p>
            </div>
          </div>

          {/* Write a review CTA */}
          <div className="mb-6 flex justify-center">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="btn-gold inline-flex items-center gap-2"
            >
              <PenLine className="size-4" />
              Write a Review
            </button>
          </div>



          {/* Search + filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setVisible(PAGE_SIZE);
                }}
                placeholder="Search reviews…"
                className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm shadow-sm outline-none focus:border-brand"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setVisible(PAGE_SIZE);
                  }}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
                    filter === f
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-brand hover:text-brand"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Results meta */}
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
              {shown.map((r) => (
                <ReviewCard key={r.id} r={r} />
              ))}
            </div>
          )}

          {/* Load more / pager */}
          {visible < filtered.length && (
            <div className="mt-10 flex flex-col items-center gap-3">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="btn-brand btn-brand-hover"
              >
                Load More Reviews
              </button>
              <div className="flex items-center gap-2">
                <PagerButton
                  dir="prev"
                  onClick={() => setVisible((v) => Math.max(PAGE_SIZE, v - PAGE_SIZE))}
                  disabled={visible <= PAGE_SIZE}
                />
                <span className="text-xs text-muted-foreground">
                  Page {Math.ceil(visible / PAGE_SIZE)} of{" "}
                  {Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}
                </span>
                <PagerButton
                  dir="next"
                  onClick={() =>
                    setVisible((v) => Math.min(filtered.length, v + PAGE_SIZE))
                  }
                  disabled={visible >= filtered.length}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <ReviewFormDialog open={formOpen} onOpenChange={setFormOpen} />
    </>
  );
}

