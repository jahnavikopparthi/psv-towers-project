import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/menu")({
  head: () => ({ meta: [{ title: "Restaurant Menu — P.S.V Towers" }, { name: "description", content: "Full restaurant menu — meals, biryani, tiffins, curries, beverages." }] }),
  component: MenuPage,
});

const menu = {
  Tiffins: [
    { n: "Idli (2 pcs)", p: 40 }, { n: "Dosa", p: 60 }, { n: "Masala Dosa", p: 80 },
    { n: "Vada (2 pcs)", p: 50 }, { n: "Poori (2 pcs)", p: 60 }, { n: "Upma", p: 50 },
  ],
  Meals: [
    { n: "Veg Meals (Unlimited)", p: 120 }, { n: "Non-Veg Meals", p: 180 },
    { n: "Special Thali", p: 200 }, { n: "Curd Rice", p: 80 },
  ],
  Biryani: [
    { n: "Chicken Biryani", p: 220 }, { n: "Mutton Biryani", p: 320 },
    { n: "Veg Biryani", p: 160 }, { n: "Egg Biryani", p: 180 },
  ],
  Curries: [
    { n: "Chicken Curry", p: 200 }, { n: "Mutton Curry", p: 320 },
    { n: "Paneer Butter Masala", p: 180 }, { n: "Dal Tadka", p: 120 },
  ],
  Beverages: [
    { n: "Tea", p: 20 }, { n: "Coffee", p: 30 }, { n: "Lassi", p: 50 }, { n: "Buttermilk", p: 30 },
  ],
};

function MenuPage() {
  const cats = Object.keys(menu) as (keyof typeof menu)[];
  const [active, setActive] = useState<(typeof cats)[number]>(cats[0]);
  return (
    <>
      <PageHero eyebrow="Restaurant Menu" title="Our Full Menu" subtitle="Veg & Non-Veg meals, biryanis, tiffins and more — call to order or visit us." />
      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-wrap gap-2">
            {cats.map(c => (
              <button key={c} onClick={() => setActive(c)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${active === c ? "bg-brand text-brand-foreground" : "bg-brand-soft text-brand hover:bg-brand/10"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {menu[active].map(item => (
              <div key={item.n} className="card-soft flex items-center justify-between p-5">
                <div>
                  <h3 className="font-semibold">{item.n}</h3>
                  <p className="text-xs text-muted-foreground">Freshly prepared • Hygienic</p>
                </div>
                <div className="text-lg font-display font-bold text-brand">₹{item.p}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="tel:9550311361" className="btn-brand btn-brand-hover">Call to Order</a>
            <a href="https://wa.me/919550311361" className="btn-gold">Order on WhatsApp</a>
            <Link to="/contact" className="rounded-md border border-border px-4 py-2 text-sm">Visit Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
