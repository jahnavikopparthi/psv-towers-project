import { createFileRoute, Link } from "@tanstack/react-router";
import { Bed, UtensilsCrossed, Shield, Utensils, Wifi, Camera, CheckCircle2, Building2, Smile } from "lucide-react";
import heroBuilding from "@/assets/hero-building.jpg";
import hostelRoom from "@/assets/hostel-room.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import diningArea from "@/assets/dining-area.jpg";
import building from "@/assets/building.jpg";
import foodDosa from "@/assets/food-dosa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P.S.V Towers — Girls Hostel & Family Restaurant in Vijayawada" },
      { name: "description", content: "Safe girls hostel and delicious family restaurant in Governorpet, Vijayawada. 24/7 security, hygienic food, WiFi, CCTV." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[oklch(0.18_0.02_30)] text-white">
        <img src={heroBuilding} alt="P.S.V Towers building" className="absolute inset-0 size-full object-cover opacity-55" width={1280} height={800} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.15_0.02_30)]/90 via-[oklch(0.15_0.02_30)]/60 to-transparent" />
        <div className="container-page relative grid gap-10 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-block rounded-md bg-brand/80 px-3 py-1 text-xs font-medium tracking-wide">Comfort | Safety | Taste</span>
            <h1 className="mt-4 font-display text-5xl font-bold leading-tight md:text-6xl">P.S.V Towers</h1>
            <p className="mt-2 text-2xl font-medium text-gold">Girls Hostel & Family Restaurant</p>
            <p className="mt-3 text-base text-white/85">Stay with Comfort, Eat with Taste</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-brand p-5 shadow-elevated">
                <div className="flex items-center gap-2 text-white"><Bed className="size-5" /><span className="font-semibold">Girls Hostel</span></div>
                <p className="mt-1 text-xs text-white/80">Safe, Secure & Comfortable</p>
                <Link to="/hostel" className="mt-4 block rounded-md bg-white py-2 text-center text-sm font-medium text-brand hover:bg-white/90">Explore Hostel</Link>
              </div>
              <div className="rounded-xl bg-gold p-5 text-gold-foreground shadow-elevated">
                <div className="flex items-center gap-2"><UtensilsCrossed className="size-5" /><span className="font-semibold">Restaurant</span></div>
                <p className="mt-1 text-xs opacity-80">Delicious Veg & Non Veg Food</p>
                <Link to="/restaurant" className="mt-4 block rounded-md bg-white py-2 text-center text-sm font-medium text-brand hover:bg-white/90">Explore Menu</Link>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2 rounded-xl bg-black/30 p-3 backdrop-blur">
              {[
                { i: Shield, l: "24/7 Security" },
                { i: Utensils, l: "Hygienic Food" },
                { i: Wifi, l: "Free WiFi" },
                { i: Camera, l: "CCTV Surveillance" },
              ].map(({ i: Icon, l }) => (
                <div key={l} className="flex flex-col items-center gap-1 text-center text-[11px]">
                  <Icon className="size-5 text-gold" /> {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FACILITIES */}
      <section className="section-pad">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <div className="eyebrow eyebrow-dot">Our Facilities</div>
              <h2 className="mt-2 font-display text-4xl font-bold">Everything You Need,<br />All Under <span className="text-gold">One Roof</span></h2>
            </div>
            <p className="text-muted-foreground">P.S.V Towers is the perfect blend of comfortable living and delicious dining for girls. Your safety, comfort, and satisfaction are our top priorities.</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <FacilityCard
              icon={<Bed className="size-6" />}
              tint="brand"
              title="Girls Hostel"
              items={["Spacious & Clean Rooms","24/7 Security & CCTV","WiFi & Study Environment","Nutritious Homemade Food","Laundry & Housekeeping","RO Water & Power Backup"]}
              image={hostelRoom}
              cta={{ to: "/hostel", label: "View Hostel Details" }}
            />
            <FacilityCard
              icon={<UtensilsCrossed className="size-6" />}
              tint="gold"
              title="Restaurant"
              items={["Veg & Non Veg Meals","Biryani, Curries, Tiffins","Hygienic & Quality Food","Affordable & Tasty","Parcel & Take Away","Special Discounts for Hostel Residents"]}
              image={foodBiryani}
              cta={{ to: "/menu", label: "View Menu & Order" }}
            />
          </div>
        </div>
      </section>

      {/* ABOUT + STATS */}
      <section className="section-pad bg-brand-soft/40">
        <div className="container-page grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <div className="eyebrow eyebrow-dot">About Us</div>
            <h2 className="mt-2 font-display text-4xl font-bold">A Place Where<br />Comfort Meets Care</h2>
            <p className="mt-4 text-sm text-muted-foreground">P.S.V Towers provides a safe and homely environment for girls to live and grow. Along with that, our restaurant serves delicious and <span className="font-semibold text-foreground">hygienic food</span> that feels like home.</p>
            <Link to="/about" className="btn-brand btn-brand-hover mt-6">Know More About Us</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat icon={<Building2 className="size-7" />} value="50+" label="Happy Residents" sub="Trust us for their comfortable stay" />
            <Stat icon={<Utensils className="size-7" />} value="100+" label="Daily Orders" sub="Delicious meals served every single day" />
            <Stat icon={<Smile className="size-7" />} value="100%" label="Satisfaction" sub="Our top priority is your satisfaction" />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section-pad">
        <div className="container-page">
          <h2 className="text-center font-display text-3xl font-bold">Gallery</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { src: hostelRoom, l: "Hostel Rooms" },
              { src: diningArea, l: "Dining Area" },
              { src: foodBiryani, l: "Delicious Food" },
              { src: building, l: "Building" },
              { src: foodDosa, l: "Food Variety" },
            ].map(g => (
              <Link key={g.l} to="/gallery" className="group overflow-hidden rounded-xl">
                <img src={g.src} alt={g.l} loading="lazy" className="aspect-square w-full object-cover transition group-hover:scale-105" />
                <div className="mt-2 text-center text-sm font-medium">{g.l}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FacilityCard({ icon, tint, title, items, image, cta }: { icon: React.ReactNode; tint: "brand"|"gold"; title: string; items: string[]; image: string; cta: { to: string; label: string } }) {
  const headColor = tint === "brand" ? "text-brand" : "text-gold";
  const btn = tint === "brand" ? "btn-brand btn-brand-hover" : "btn-gold";
  return (
    <div className={`card-soft p-6 ${tint === "brand" ? "bg-brand-soft/50" : "bg-gold-soft/60"}`}>
      <div className={`flex items-center gap-3 ${headColor}`}>
        <span className={`grid size-11 place-items-center rounded-lg ${tint === "brand" ? "bg-brand/10" : "bg-gold/20"}`}>{icon}</span>
        <h3 className="font-display text-2xl font-semibold">{title}</h3>
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <ul className="space-y-2 text-sm">
          {items.map(it => (
            <li key={it} className="flex items-start gap-2"><CheckCircle2 className={`mt-0.5 size-4 ${headColor}`} />{it}</li>
          ))}
        </ul>
        <img src={image} alt={title} loading="lazy" className="h-36 w-44 rounded-lg object-cover" />
      </div>
      <Link to={cta.to} className={`${btn} mt-6 w-full justify-center`}>{cta.label}</Link>
    </div>
  );
}

function Stat({ icon, value, label, sub }: { icon: React.ReactNode; value: string; label: string; sub: string }) {
  return (
    <div className="card-soft flex flex-col items-center p-6 text-center">
      <div className="text-brand">{icon}</div>
      <div className="mt-3 font-display text-3xl font-bold text-brand">{value}</div>
      <div className="text-sm font-semibold">{label}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
