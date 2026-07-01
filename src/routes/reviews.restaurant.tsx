import { createFileRoute } from "@tanstack/react-router";
import { ReviewListPage } from "./reviews";

export const Route = createFileRoute("/reviews/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant Reviews — P.S.V Towers" },
      { name: "description", content: "Read reviews from families, food lovers and students at P.S.V Towers Restaurant, Vijayawada." },
    ],
  }),
  component: RestaurantReviewsPage,
});

function RestaurantReviewsPage() {
  return (
    <ReviewListPage
      title="Restaurant Reviews"
      eyebrow="Restaurant"
      subtitle="From families, food lovers and college students across Vijayawada."
      filter="Restaurant"
      metaTitle="Restaurant Reviews — P.S.V Towers"
      metaDesc="Read reviews from families, food lovers and students at P.S.V Towers Restaurant, Vijayawada."
    />
  );
}
