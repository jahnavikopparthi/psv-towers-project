import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/enquiry")({
  head: () => ({ meta: [{ title: "Admission Enquiry — P.S.V Towers" }, { name: "description", content: "Apply for hostel admission at P.S.V Towers." }] }),
  component: EnquiryPage,
});

function EnquiryPage() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <>
        <PageHero eyebrow="Admission Enquiry" title="Thank You!" subtitle="We've received your enquiry and will contact you within 24 hours." />
        <section className="section-pad">
          <div className="container-page max-w-xl">
            <div className="card-soft p-8 text-center">
              <CheckCircle2 className="mx-auto size-14 text-brand" />
              <h2 className="mt-4 font-display text-2xl font-semibold">Enquiry Submitted</h2>
              <p className="mt-2 text-sm text-muted-foreground">For urgent queries call 9550311361.</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link to="/" className="btn-brand btn-brand-hover">Back to Home</Link>
                <Link to="/hostel" className="rounded-md border border-border px-4 py-2 text-sm">View Hostel</Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
  return (
    <>
      <PageHero eyebrow="Admission Enquiry" title="Apply for Hostel Admission" subtitle="Fill out the form and we'll get back to you with availability and pricing." />
      <section className="section-pad">
        <div className="container-page max-w-2xl">
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="card-soft grid gap-4 p-6 md:grid-cols-2">
            <F label="Full Name" req><input required className={inp} /></F>
            <F label="Phone Number" req><input required type="tel" className={inp} /></F>
            <F label="Email"><input type="email" className={inp} /></F>
            <F label="Parent / Guardian Contact"><input className={inp} /></F>
            <F label="College / Institution"><input className={inp} /></F>
            <F label="Course / Year"><input className={inp} /></F>
            <F label="Room Preference">
              <select className={inp}>
                <option>3 Sharing</option><option>4 Sharing</option><option>AC Room</option>
              </select>
            </F>
            <F label="Preferred Move-in Date"><input type="date" className={inp} /></F>
            <F label="Additional Notes" full><textarea rows={3} className={inp} /></F>
            <div className="md:col-span-2">
              <button className="btn-brand btn-brand-hover w-full justify-center">Submit Enquiry</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

const inp = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand";
function F({ label, children, req, full }: { label: string; children: React.ReactNode; req?: boolean; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}{req && <span className="text-brand"> *</span>}</span>
      {children}
    </label>
  );
}
