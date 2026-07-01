import { createFileRoute } from "@tanstack/react-router";
import { ReviewListPage } from "./reviews";

export const Route = createFileRoute("/reviews/hostel")({
  head: () => ({
    meta: [
      { title: "Boys Hostel Reviews — P.S.V Towers" },
      { name: "description", content: "Honest reviews from students staying at P.S.V Towers Boys Hostel, Vijayawada." },
    ],
  }),
  component: HostelReviewsPage,
});

function HostelReviewsPage() {
  return (
    <ReviewListPage
      title="Boys Hostel Reviews"
      eyebrow="Boys Hostel"
      subtitle="Honest experiences from students staying at P.S.V Towers Boys Hostel."
      filter="Hostel"
      metaTitle="Boys Hostel Reviews — P.S.V Towers"
      metaDesc="Honest reviews from students staying at P.S.V Towers Boys Hostel, Vijayawada."
    />
  );
}
