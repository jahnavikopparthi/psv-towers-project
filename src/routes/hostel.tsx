import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, Wifi, Utensils, Droplets, Camera, Sparkles, BedDouble, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { CustomerReviewsSection } from "@/components/customer-reviews";
import hostelRoom from "@/assets/hostel-room.jpg";
import building from "@/assets/building.jpg";

export const Route = createFileRoute("/hostel")({
  head: () => ({ meta: [{ title: "Boys Hostel — P.S.V Towers" }, { name: "description", content: "Safe, secure boys hostel with 24/7 security, WiFi, CCTV, homely food in Vijayawada." }] }),
  component: HostelPage,
});

const amenities = [
  { i: Shield, t: "24/7 Security & CCTV" },
  { i: Wifi, t: "Free High-Speed WiFi" },
  { i: Utensils, t: "Nutritious Homely Food" },
  { i: Droplets, t: "RO Water & Power Backup" },
  { i: Camera, t: "CCTV Surveillance" },
  { i: Sparkles, t: "Daily Housekeeping & Laundry" },
];

const rooms = [
  { t: "3 Sharing Room", price: "Best Value", features: ["Attached Washroom","Cupboard for each","Study Table","Fan & Lights"] },
  { t: "4 Sharing Room", price: "Most Popular", features: ["Attached Washroom","Cupboard for each","Study Table","Fan & Lights"] },
  { t: "AC Room", price: "Premium", features: ["AC Comfort","Attached Washroom","Cupboard for each","Study Table"] },
];

function HostelPage() {
  return (
    <>
      <PageHero eyebrow="Boys Hostel" title="Safe, Secure & Comfortable Living" subtitle="A homely environment for boys to live, study and grow — with 24/7 security and all modern amenities.">
        <div className="flex flex-wrap gap-3">
          <Link to="/enquiry" className="btn-brand btn-brand-hover">Apply for Admission</Link>
          <Link to="/contact" className="btn-gold">Visit Us</Link>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <img src={hostelRoom} alt="Boys Hostel room" className="rounded-2xl shadow-elevated" loading="lazy" />
          <div>
            <div className="eyebrow eyebrow-dot">Why Choose Us</div>
            <h2 className="mt-2 font-display text-3xl font-bold">Everything a Student Needs</h2>
            <p className="mt-3 text-muted-foreground">From safety to study-friendly rooms and home-cooked meals — we take care of everything so parents can be at peace.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {amenities.map(a => (
                <li key={a.t} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm">
                  <span className="grid size-9 place-items-center rounded-md bg-brand-soft text-brand"><a.i className="size-4" /></span>
                  {a.t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-soft/40">
        <div className="container-page">
          <div className="text-center">
            <div className="eyebrow eyebrow-dot justify-center">Room Options</div>
            <h2 className="mt-2 font-display text-3xl font-bold">Choose Your Room Type</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {rooms.map(r => (
              <div key={r.t} className="card-soft p-6">
                <div className="flex items-center gap-2 text-brand"><BedDouble className="size-5" /><h3 className="font-display text-xl font-semibold">{r.t}</h3></div>
                <div className="mt-1 text-xs font-medium text-gold">{r.price}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {r.features.map(f => <li key={f} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-brand" />{f}</li>)}
                </ul>
                <Link to="/enquiry" className="btn-brand btn-brand-hover mt-6 w-full justify-center">Enquire Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold">Prime Location in Governorpet</h2>
            <p className="mt-3 text-muted-foreground">Located near Navarang Theater, Vijayawada — close to colleges, transport, hospitals and markets. Easy access to everything you need.</p>
            <Link to="/contact" className="btn-brand btn-brand-hover mt-5">Get Directions</Link>
          </div>
          <img src={building} alt="Building" className="rounded-2xl shadow-elevated" loading="lazy" />
        </div>
      </section>

      {/* Boys Hostel only reviews */}
      <CustomerReviewsSection filter="Hostel" viewAllHref="/reviews/hostel" />
    </>
  );
}
