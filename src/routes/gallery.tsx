import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import hostelRoom from "@/assets/hostel-room.jpg";
import diningArea from "@/assets/dining-area.jpg";
import foodBiryani from "@/assets/food-biryani.jpg";
import foodDosa from "@/assets/food-dosa.jpg";
import building from "@/assets/building.jpg";
import heroBuilding from "@/assets/hero-building.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — P.S.V Towers" }, { name: "description", content: "Photos of hostel rooms, dining area, food, and building." }] }),
  component: GalleryPage,
});

const images = [
  { src: hostelRoom, l: "Hostel Rooms" },
  { src: diningArea, l: "Dining Area" },
  { src: foodBiryani, l: "Biryani & Curries" },
  { src: building, l: "Building Exterior" },
  { src: foodDosa, l: "South Indian Tiffins" },
  { src: heroBuilding, l: "Entrance" },
];

function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="A Glimpse Inside P.S.V Towers" subtitle="Our hostel, restaurant, and the moments that make us home." />
      <section className="section-pad">
        <div className="container-page grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(img => (
            <figure key={img.l} className="group overflow-hidden rounded-2xl card-soft">
              <img src={img.src} alt={img.l} loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
              <figcaption className="p-4 text-sm font-medium">{img.l}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
