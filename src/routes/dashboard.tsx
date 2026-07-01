import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, UtensilsCrossed, Users, IndianRupee, BedDouble, ClipboardList, MessageSquare } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Owner Dashboard — P.S.V Towers" }, { name: "description", content: "Owner dashboard overview for P.S.V Towers." }] }),
  component: Dashboard,
});

const stats = [
  { i: Users, l: "Active Residents", v: "52", c: "text-brand" },
  { i: BedDouble, l: "Rooms Occupied", v: "18 / 22", c: "text-gold" },
  { i: UtensilsCrossed, l: "Today's Orders", v: "104", c: "text-brand" },
  { i: IndianRupee, l: "Monthly Revenue", v: "₹4.8L", c: "text-gold" },
];

const enquiries = [
  { n: "Rahul R.", p: "98**** 12", t: "Boys Hostel — 3 Sharing", d: "2 hours ago" },
  { n: "Arjun K.", p: "98**** 88", t: "Boys Hostel — AC Room", d: "Today" },
  { n: "Anjali M.", p: "99**** 41", t: "Restaurant Parcel", d: "Yesterday" },
];

function Dashboard() {
  return (
    <>
      <PageHero eyebrow="Owner Dashboard" title="P.S.V Towers Overview" subtitle="A quick snapshot of boys hostel occupancy, restaurant orders, and recent enquiries.">
        <div className="flex flex-wrap gap-3">
          <Link to="/enquiry" className="btn-brand btn-brand-hover">View Enquiries</Link>
          <Link to="/menu" className="btn-gold">Manage Menu</Link>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-page space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(s => (
              <div key={s.l} className="card-soft p-5">
                <s.i className={`size-6 ${s.c}`} />
                <div className="mt-3 font-display text-3xl font-bold">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-soft p-6 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold flex items-center gap-2"><ClipboardList className="size-5 text-brand" />Recent Enquiries</h3>
                <Link to="/enquiry" className="text-xs text-brand">View all →</Link>
              </div>
              <div className="mt-4 divide-y divide-border">
                {enquiries.map(e => (
                  <div key={e.n} className="flex items-center justify-between py-3 text-sm">
                    <div>
                      <div className="font-medium">{e.n}</div>
                      <div className="text-xs text-muted-foreground">{e.t} • {e.p}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{e.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-soft p-6">
              <h3 className="font-display text-xl font-semibold flex items-center gap-2"><Building2 className="size-5 text-brand" />Quick Actions</h3>
              <div className="mt-4 grid gap-2">
                <Link to="/menu" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-brand-soft">Update Restaurant Menu</Link>
                <Link to="/gallery" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-brand-soft">Manage Gallery</Link>
                <Link to="/contact" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-brand-soft">Update Contact Info</Link>
                <Link to="/assistant" className="rounded-md border border-border px-3 py-2 text-sm hover:bg-brand-soft flex items-center gap-2"><MessageSquare className="size-4" /> Open AI Assistant</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
