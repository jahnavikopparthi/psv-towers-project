import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-brand-soft">
      <div className="container-page py-14">
        {eyebrow && <div className="eyebrow eyebrow-dot mb-3">{eyebrow}</div>}
        <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-muted-foreground">{subtitle}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
