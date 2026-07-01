import { createFileRoute, Link } from "@tanstack/react-router";
import { UtensilsCrossed, Leaf, Drumstick, Clock, BadgePercent } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CustomerReviewsSection } from "@/components/customer-reviews";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodDosa from "@/assets/food-dosa.jpg";
import diningArea from "@/assets/dining-area.jpg";

export const Route = createFileRoute("/restaurant")({
  head: () => ({ meta: [{ title: "Family Restaurant — P.S.V Towers" }, { name: "description", content: "Veg and Non-Veg meals, biryani, curries, tiffins in Vijayawada." }] }),
  component: RestaurantPage,
});

const highlights = [
  { i: Leaf, t: "Pure Veg Options", d: "Fresh, hygienic vegetarian curries, tiffins and meals." },
  { i: Drumstick, t: "Non-Veg Specialties", d: "Famous biryanis, chicken & mutton curries." },
  { i: Clock, t: "All-Day Service", d: "Breakfast, lunch, dinner & parcel/take-away." },
  { i: BadgePercent, t: "Hostel Discounts", d: "Special pricing for boys hostel residents." },
];

function RestaurantPage() {
  return (
    <>
      <PageHero eyebrow="Family Restaurant" title="Delicious Veg & Non-Veg Meals" subtitle="Hygienic, tasty and affordable — every meal feels like home.">
        <div className="flex flex-wrap gap-3">
          <Link to="/menu" className="btn-brand btn-brand-hover">View Menu & Order</Link>
          <Link to="/contact" className="btn-gold">Visit Us</Link>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-page grid gap-6 md:grid-cols-4">
          {highlights.map(h => (
            <div key={h.t} className="card-soft p-5">
              <span className="grid size-10 place-items-center rounded-md bg-gold-soft text-gold"><h.i className="size-5" /></span>
              <h3 className="mt-3 font-display text-lg font-semibold">{h.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-brand-soft/40">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {[foodBiryani, diningArea, foodDosa].map((s, i) => (
            <img key={i} src={s} alt="Restaurant" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card" />
          ))}
        </div>
        <div className="container-page mt-10 text-center">
          <h2 className="font-display text-3xl font-bold">Ready to Order?</h2>
          <p className="mt-2 text-muted-foreground">Browse our full menu — dine in, parcel or take-away.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link to="/menu" className="btn-brand btn-brand-hover"><UtensilsCrossed className="size-4" /> View Full Menu</Link>
            <a href="tel:9550311361" className="btn-gold">Call to Order</a>
          </div>
        </div>
      </section>

      {/* Restaurant only reviews */}
      <CustomerReviewsSection filter="Restaurant" viewAllHref="/reviews/restaurant" />
    </>
  );
}
