import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Phone, MessageCircle, Mail, MapPin, Clock, Navigation } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/enquiry")({
  head: () => ({ meta: [{ title: "Enquiry — P.S.V Towers" }, { name: "description", content: "Contact P.S.V Towers Boys Hostel & Restaurant — phone, WhatsApp, address, working hours." }] }),
  component: EnquiryPage,
});

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=P.S.V+Towers+Governorpet+Vijayawada";

function EnquiryPage() {
  const [done, setDone] = useState(false);

  return (
    <>
      <PageHero eyebrow="Enquiry" title="We're Here to Help" subtitle="Call, WhatsApp or send us a message — we'll get back to you shortly.">
        <div className="flex flex-wrap gap-3">
          <a href="tel:9550311361" className="btn-brand btn-brand-hover"><Phone className="size-4" /> Call Now</a>
          <a href="https://wa.me/919550311361" target="_blank" rel="noreferrer" className="btn-gold"><MessageCircle className="size-4" /> WhatsApp</a>
        </div>
      </PageHero>

      <section className="section-pad">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          {/* Contact info */}
          <div className="space-y-4">
            <InfoRow icon={<Phone className="size-5" />} title="Phone Number" lines={["9550311361", "9052618020"]} action={{ href: "tel:9550311361", label: "Call Now" }} />
            <InfoRow icon={<MessageCircle className="size-5" />} title="WhatsApp" lines={["+91 95503 11361"]} action={{ href: "https://wa.me/919550311361", label: "Chat on WhatsApp", external: true }} />
            <InfoRow icon={<Mail className="size-5" />} title="Email Address" lines={["info@psvtowers.com"]} action={{ href: "mailto:info@psvtowers.com", label: "Send Email" }} />
            <InfoRow icon={<MapPin className="size-5" />} title="Address" lines={["27-18-127, Congress Office Road,", "Near Navarang Theater,", "Governorpet, Vijayawada — 520002"]} action={{ href: MAPS_URL, label: "Open in Google Maps", external: true, icon: <Navigation className="size-4" /> }} />
            <InfoRow icon={<Clock className="size-5" />} title="Working Hours" lines={["Boys Hostel Office: 9:00 AM – 9:00 PM", "Restaurant: 7:00 AM – 10:30 PM", "Open all 7 days"]} />
          </div>

          {/* Enquiry form */}
          <div>
            {done ? (
              <div className="card-soft flex h-full flex-col items-center justify-center p-8 text-center">
                <CheckCircle2 className="size-14 text-brand" />
                <h2 className="mt-4 font-display text-2xl font-semibold">Thank you.</h2>
                <p className="mt-2 text-sm text-muted-foreground">We will contact you shortly.</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href="tel:9550311361" className="btn-brand btn-brand-hover"><Phone className="size-4" /> Call Now</a>
                  <button type="button" onClick={() => setDone(false)} className="rounded-md border border-border px-4 py-2 text-sm">Send Another</button>
                  <Link to="/" className="rounded-md border border-border px-4 py-2 text-sm">Back to Home</Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setDone(true); }}
                className="card-soft space-y-4 p-6"
              >
                <h2 className="font-display text-2xl font-semibold">Send Enquiry</h2>
                <p className="text-sm text-muted-foreground">Fill in your details and we'll reach out with room availability, pricing or any info you need.</p>
                <Field label="Name" required><input required name="name" className={inp} placeholder="Your full name" /></Field>
                <Field label="Phone Number" required><input required name="phone" type="tel" className={inp} placeholder="10-digit mobile" /></Field>
                <Field label="Email"><input name="email" type="email" className={inp} placeholder="you@example.com" /></Field>
                <Field label="Message" required><textarea required name="message" rows={4} className={inp} placeholder="How can we help you?" /></Field>
                <button className="btn-brand btn-brand-hover w-full justify-center">Submit</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const inp = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand";

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">
        {label}{required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </label>
  );
}

function InfoRow({
  icon,
  title,
  lines,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  action?: { href: string; label: string; external?: boolean; icon?: React.ReactNode };
}) {
  return (
    <div className="card-soft flex gap-4 p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-soft text-brand">{icon}</span>
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        {lines.map(l => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
        {action && (
          <a
            href={action.href}
            {...(action.external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-brand/40 px-3 py-1.5 text-xs font-medium text-brand transition hover:bg-brand hover:text-brand-foreground"
          >
            {action.icon}
            {action.label}
          </a>
        )}
      </div>
    </div>
  );
}
