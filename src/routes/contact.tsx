import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact Us — P.S.V Towers" }, { name: "description", content: "Visit, call or message P.S.V Towers in Governorpet, Vijayawada." }] }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact Us" title="We'd Love to Hear From You" subtitle="Reach out for admissions, room availability, food orders or any questions." />
      <section className="section-pad">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <InfoRow icon={<MapPin className="size-5" />} title="Address" lines={["27-18-127, Congress Office Road,", "Near Navarang Theater,", "Governorpet, Vijayawada — 520002"]} />
            <InfoRow icon={<Phone className="size-5" />} title="Phone" lines={["9550311361", "9052618020"]} />
            <InfoRow icon={<Mail className="size-5" />} title="Email" lines={["info@psvtowers.com"]} />
            <div className="flex flex-wrap gap-3 pt-2">
              <a href="tel:9550311361" className="btn-brand btn-brand-hover"><Phone className="size-4" /> Call Now</a>
              <a href="https://wa.me/919550311361" className="btn-gold"><MessageCircle className="size-4" /> WhatsApp</a>
              <Link to="/enquiry" className="rounded-md border border-border px-4 py-2 text-sm">Admission Enquiry</Link>
            </div>
          </div>
          <form
            className="card-soft space-y-4 p-6"
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <h2 className="font-display text-2xl font-semibold">Send a Message</h2>
            <Field label="Your Name"><input required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand" /></Field>
            <Field label="Phone"><input required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand" /></Field>
            <Field label="Message"><textarea required rows={4} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand" /></Field>
            <button className="btn-brand btn-brand-hover w-full justify-center">Send Message</button>
            {sent && <p className="text-center text-sm text-brand">Thanks! We'll get back to you shortly.</p>}
          </form>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="card-soft flex gap-4 p-5">
      <span className="grid size-10 place-items-center rounded-md bg-brand-soft text-brand">{icon}</span>
      <div>
        <div className="font-semibold">{title}</div>
        {lines.map(l => <div key={l} className="text-sm text-muted-foreground">{l}</div>)}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>{children}</label>;
}
