
## Scope
Preserve all existing design, layout, colors, fonts, logo, and branding. Only implement the listed updates.

## 1. Rebrand "Hostel" → "Boys Hostel"
- Global text sweep across header nav, footer, hero copy, cards, page titles/meta, hostel page, about, contact, chatbot copy, reviews labels, dashboard.
- Keep route path `/hostel` (URL change would break links); update visible label to "Boys Hostel".
- Keep component/file names as-is (internal only).

## 2. Homepage hero image
- Save uploaded building photo (`WhatsApp_Image_2026-06-27_at_10.49.02_AM.jpeg`) as a Lovable asset and use it as the sole hero background image on `/`. Leave every other image untouched.

## 3. Reviews split by category
Data model in `src/lib/reviews-data.ts` already has `type: "hostel" | "restaurant"`.
- Regenerate the seeded reviews:
  - **Hostel reviews**: only realistic Indian male photos (curated `randomuser.me/api/portraits/men/*.jpg` IDs known to look South-Asian; use a fixed vetted ID list rather than random). Student/hostel-life language, mostly 5★ with a few 4★.
  - **Restaurant reviews**: mixed Indian men/women/students/families (curated IDs). Content about food, hygiene, service, ambience, taste.
- Store submitted reviews with a `source: "hostel" | "restaurant" | "home"` scope in `reviews-store.ts` (extending `NewReviewInput`).
- Filtering rules:
  - `/hostel` reviews section + `/reviews/hostel` page → only hostel-type reviews (seed + user submissions tagged hostel or home-hostel).
  - `/restaurant` reviews section + `/reviews/restaurant` page → only restaurant-type reviews.
  - Homepage carousel → mix of both.
- Add "Write a Review" dialog on Hostel and Restaurant pages that pre-locks the `type` to that category.
- Existing `/reviews` becomes an index that links to the two dedicated pages (or redirects). Add two new routes: `src/routes/reviews.hostel.tsx`, `src/routes/reviews.restaurant.tsx`.

## 4. Review carousel
Already implemented (auto-scroll, pause on hover, arrows, infinite, responsive) — reuse `ReviewMarquee` on all three surfaces, feeding it filtered arrays.

## 5. Enquiry button upgrade
- Convert the existing Enquiry CTA into a rich page section on `/enquiry` and add a modal variant reused site-wide:
  - Phone, WhatsApp, Email, Address, Working Hours
  - "Call Now" (`tel:`), "WhatsApp" (`wa.me/919550311361`), "Open in Google Maps" (maps link), "Get Directions"
  - Enquiry form: Name, Phone, Email, Message → on submit show "Thank you. We will contact you shortly." (toast + inline success state). Persist to localStorage for the Owner Dashboard.

## 6. AI Chatbot upgrade (`src/components/chat-widget.tsx`)
Keep the same visual widget; upgrade the intelligence layer only.
- **Knowledge base**: expand into a structured `site-knowledge.ts` module covering every question listed (rooms/sharing/AC/Wi-Fi/CCTV/hot water/laundry/parking/food/timings/docs/booking/address/nearby colleges/contact; today's special/menu/veg/non-veg/biryani/meals/breakfast/lunch/dinner/parcel/dine-in/table booking/family packs/combos/payments/hours; offers; reviews; contact; booking).
- **Bilingual matcher (English + Telugu-in-English/Tenglish)**: add keyword tokens like `unda`, `undha`, `entha`, `enti`, `chupinchu`, `chupinchandi`, `cheppandi`, `book cheyandi`, `ledu`, `kavali`, `special enti`, `menu chupinchu`, `fees entha`, `room unda`. Normalize text (lowercase, strip punctuation) and match against multi-language keyword arrays per intent.
- **Quick actions**: replace current 6 with the 9 requested (Book Room, Today's Special, Restaurant Menu, Hostel Fees, Offers, Reviews, Contact, Location, WhatsApp). Each triggers either a scripted answer or navigates via `router.navigate` (WhatsApp/Location open external links in a new tab).
- **Grounding & guardrails**: 
  - Every answer is composed only from the local knowledge base — no free-form generation, no external API.
  - Offers intent returns "There are currently no active offers…" when the offers list is empty.
  - Fallback for unknown/unrelated queries: "I can only help with P.S.V Towers Boys Hostel & Restaurant. For anything else please contact us." + Contact/Enquiry links.
  - Intent classifier restricted to hostel/restaurant/offers/reviews/contact/booking; anything else → fallback.
- **Navigation intents**: replies for "book room / reserve table / show reviews / menu / contact" include an inline button that routes to the relevant page.

## 7. Owner Dashboard
- Show enquiry submissions and user-submitted reviews split by source (Hostel / Restaurant / Home).

## Files to add
- `src/assets/hero-building-real.jpg.asset.json` (Lovable asset pointer for uploaded photo)
- `src/lib/site-knowledge.ts` (structured Q&A + Tenglish keywords)
- `src/components/enquiry-dialog.tsx` (reusable modal)
- `src/routes/reviews.hostel.tsx`
- `src/routes/reviews.restaurant.tsx`

## Files to edit
- `src/routes/index.tsx` — hero image swap + mixed reviews
- `src/routes/hostel.tsx` — "Boys Hostel" copy + hostel-only reviews section + write review (locked type)
- `src/routes/restaurant.tsx` — restaurant-only reviews section + write review (locked type)
- `src/routes/enquiry.tsx` — rich contact block + form success state
- `src/routes/reviews.tsx` — becomes index/redirect to the two dedicated pages
- `src/routes/dashboard.tsx` — enquiries + segmented reviews
- `src/components/site-header.tsx`, `site-footer.tsx` — "Boys Hostel" label
- `src/components/chat-widget.tsx` — new quick actions, intent engine, Tenglish support, navigation buttons
- `src/components/customer-reviews.tsx` — accept `filter` prop (all/hostel/restaurant)
- `src/components/review-form-dialog.tsx` — accept `lockedType` prop
- `src/lib/reviews-data.ts` — curated Indian male photos for hostel, mixed Indian photos for restaurant; rewritten review text
- `src/lib/reviews-store.ts` — add `source` and per-type selectors
- `src/routes/about.tsx`, `contact.tsx`, `gallery.tsx`, `menu.tsx`, `assistant.tsx` — text-only "Boys Hostel" rename where applicable
- `src/routes/__root.tsx` — update path check for the new reviews subroutes

## Explicitly unchanged
Design tokens, colors, typography, layouts, logo, business name, images other than the hero, and all other pages' structure.
