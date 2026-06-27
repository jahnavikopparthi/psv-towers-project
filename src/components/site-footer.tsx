import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, Facebook, Instagram, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <>
      <section className="bg-brand text-brand-foreground">
        <div className="container-page flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold">Interested in Our Services?</h3>
            <p className="mt-1 text-sm opacity-90">For admissions, room availability, or food orders — we're just a call away!</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="tel:9550311361" className="inline-flex items-center gap-2 rounded-md border border-white/40 px-4 py-2 text-sm hover:bg-white/10">
                <Phone className="size-4" /> Call Now
              </a>
              <a href="https://wa.me/919550311361" className="inline-flex items-center gap-2 rounded-md border border-white/40 px-4 py-2 text-sm hover:bg-white/10">
                <MessageCircle className="size-4" /> WhatsApp Us
              </a>
            </div>
          </div>
          <a href="tel:9550311361" className="flex items-center gap-3 rounded-lg border border-white/30 px-5 py-3">
            <Phone className="size-5" />
            <div className="text-left">
              <div className="text-base font-semibold">9550311361</div>
              <div className="text-base font-semibold">9052618020</div>
            </div>
          </a>
        </div>
      </section>
      <footer className="border-t border-border bg-background">
        <div className="container-page grid gap-8 py-12 md:grid-cols-4">
          <div>
            <h4 className="font-display text-xl font-bold text-brand">P.S.V Towers</h4>
            <p className="mt-2 text-sm text-muted-foreground">Girls Hostel & Family Restaurant.<br />Comfortable Stay. Delicious Food. Happy You.</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold">Quick Links</h5>
            <ul className="mt-3 grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-brand">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand">About Us</Link></li>
              <li><Link to="/hostel" className="hover:text-brand">Hostel</Link></li>
              <li><Link to="/gallery" className="hover:text-brand">Gallery</Link></li>
              <li><Link to="/restaurant" className="hover:text-brand">Restaurant</Link></li>
              <li><Link to="/contact" className="hover:text-brand">Contact</Link></li>
              <li><Link to="/menu" className="hover:text-brand">Menu</Link></li>
              <li><Link to="/assistant" className="hover:text-brand">AI Assistant</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-semibold">Contact Information</h5>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
              27-18-127, Congress Office Road, Near Navarang Theater, Governorpet, Vijayawada — 520002.
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="size-4 text-brand" /> 9550311361, 9052618020
            </p>
          </div>
          <div>
            <h5 className="text-sm font-semibold">Follow Us</h5>
            <div className="mt-3 flex gap-3">
              <a href="#" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand"><Facebook className="size-4" /></a>
              <a href="#" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand"><Instagram className="size-4" /></a>
              <a href="https://wa.me/919550311361" aria-label="WhatsApp" className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand"><MessageCircle className="size-4" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
          © 2024 P.S.V Towers. All Rights Reserved.
        </div>
      </footer>
    </>
  );
}
