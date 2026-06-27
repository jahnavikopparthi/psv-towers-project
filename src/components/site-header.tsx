import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/hostel", label: "Hostel" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="font-display text-2xl font-bold text-brand">P.S.V Towers</span>
          <span className="text-[11px] text-muted-foreground">Girls Hostel & Family Restaurant</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition hover:text-brand"
              activeProps={{ className: "text-brand font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/enquiry" className="btn-brand btn-brand-hover hidden sm:inline-flex text-sm">
            <Phone className="size-4" /> Enquiry Now
          </Link>
          <button className="md:hidden p-2" aria-label="Menu" onClick={() => setOpen(o => !o)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="container-page flex flex-col py-3">
            {nav.map(n => (
              <Link key={n.to} to={n.to} className="py-2 text-sm" onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
            <Link to="/enquiry" className="btn-brand btn-brand-hover mt-2 w-fit text-sm" onClick={() => setOpen(false)}>
              <Phone className="size-4" /> Enquiry Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
