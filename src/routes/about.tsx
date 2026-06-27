import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Users, Award } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import building from "@/assets/building.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About Us — P.S.V Towers" }, { name: "description", content: "Learn about P.S.V Towers — girls hostel and family restaurant in Vijayawada." }] }),
  component: AboutPage,
});

const values = [
  { i: Heart, t: "Care", d: "We treat every resident like family." },
  { i: ShieldCheck, t: "Safety", d: "24/7 security, CCTV, and a vigilant staff." },
  { i: Users, t: "Community", d: "A warm and supportive environment for students." },
  { i: Award, t: "Quality", d: "Hygienic food, clean rooms, dependable service." },
];

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Us" title="Comfort Meets Care" subtitle="P.S.V Towers is a girls hostel and family restaurant in Governorpet, Vijayawada — built on safety, hygiene and heartfelt hospitality." />
      <section className="section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <img src={building} alt="Building" loading="lazy" className="rounded-2xl shadow-elevated" />
          <div>
            <h2 className="font-display text-3xl font-bold">Our Story</h2>
            <p className="mt-3 text-muted-foreground">P.S.V Towers was founded with a simple promise — give girls a safe, homely place to stay while studying, and serve food that tastes like home. From our hostel rooms to our family restaurant, every detail is designed with care.</p>
            <p className="mt-3 text-muted-foreground">Located near Navarang Theater in the heart of Vijayawada, we welcome students, families and food lovers every day.</p>
            <Link to="/contact" className="btn-brand btn-brand-hover mt-6">Get in Touch</Link>
          </div>
        </div>
      </section>
      <section className="section-pad bg-brand-soft/40">
        <div className="container-page">
          <div className="text-center"><div className="eyebrow eyebrow-dot justify-center">Our Values</div><h2 className="mt-2 font-display text-3xl font-bold">What We Stand For</h2></div>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {values.map(v => (
              <div key={v.t} className="card-soft p-6 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-brand text-brand-foreground"><v.i className="size-6" /></div>
                <h3 className="mt-3 font-display text-xl font-semibold">{v.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
