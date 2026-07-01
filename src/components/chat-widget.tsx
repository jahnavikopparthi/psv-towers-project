import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, X, Send, Sparkles, Bed, IndianRupee, UtensilsCrossed, Star, Phone, MapPin, Bot, User, Tag, MessageSquare, PhoneCall } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string; time: string };

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// Quick action buttons
const quickActions = [
  { icon: Bed, label: "Book Room", key: "book_room" },
  { icon: Star, label: "Today's Special", key: "special" },
  { icon: UtensilsCrossed, label: "Restaurant Menu", key: "menu" },
  { icon: IndianRupee, label: "Hostel Fees", key: "fees" },
  { icon: Tag, label: "Offers", key: "offers" },
  { icon: MessageSquare, label: "Reviews", key: "reviews" },
  { icon: PhoneCall, label: "Contact", key: "contact" },
  { icon: MapPin, label: "Location", key: "location" },
  { icon: MessageCircle, label: "WhatsApp", key: "whatsapp" },
];

const quickReply: Record<string, string> = {
  book_room: "How can I book a room?",
  special: "What is today's special?",
  menu: "Show me the restaurant menu",
  fees: "What are the hostel fees?",
  offers: "Are there any current offers?",
  reviews: "Show me the latest reviews",
  contact: "How can I contact you?",
  location: "What is your address?",
  whatsapp: "WhatsApp number",
};

// ---------- Knowledge base ----------
type Intent = {
  keywords: string[];
  answer: string;
  cta?: { label: string; to?: string; href?: string; external?: boolean };
};

const knowledge: Intent[] = [
  // ---- GREETINGS ----
  { keywords: ["hi","hello","hey","namaste","namaskaram","namaskar","good morning","good evening","good afternoon","vanakkam"],
    answer: "👋 Namaste! Welcome to **P.S.V Towers Boys Hostel & Restaurant**. I can help with rooms, fees, food menu, today's special, offers, reviews, location and contact. Try a quick action below 👇" },
  { keywords: ["thank","thanks","ty","dhanyavad","dhanyavaadalu"],
    answer: "You're most welcome! 😊 Anything else I can help you with?" },

  // ---- BOYS HOSTEL: ROOMS ----
  { keywords: ["room available","room unda","room undha","room vacan","empty room","vacancy","admission open","seat unda","seats available","room dorakuna"],
    answer: "✅ **Rooms are currently available!**\n\n• 4-Sharing Non-AC — available\n• 3-Sharing Non-AC — limited seats\n• 2-Sharing Non-AC — very few left\n• AC Rooms — 2 seats left\n\nWant to book? Tap **Enquire Now**.",
    cta: { label: "Enquire Now", to: "/enquiry" } },
  { keywords: ["ac room","ac unda","ac available","air condition"],
    answer: "❄️ **AC Rooms:** Yes, we have AC rooms with attached washroom, study table, cupboard and premium comfort. Currently 2 seats left." },
  { keywords: ["non ac","non-ac","without ac","normal room","fan room"],
    answer: "🛏 **Non-AC Rooms:** Available in 2-sharing, 3-sharing and 4-sharing — all with fan, attached washroom, cupboard and study table." },
  { keywords: ["2 sharing","two sharing","double sharing","2-sharing"],
    answer: "👥 **2-Sharing Room:** Yes, we have limited 2-sharing rooms — extra spacious and quiet. Perfect for serious students." },
  { keywords: ["3 sharing","three sharing","triple sharing","3-sharing"],
    answer: "👥 **3-Sharing Room:** Popular choice — attached washroom, one cupboard and study table per bed. Best value." },
  { keywords: ["4 sharing","four sharing","quad sharing","4-sharing"],
    answer: "👥 **4-Sharing Room:** Most popular and budget-friendly — attached washroom, individual cupboards and study tables." },
  { keywords: ["room type","room types","kind of room","room options"],
    answer: "🛏 **Boys Hostel Room Types:**\n\n• 2-Sharing Non-AC\n• 3-Sharing Non-AC\n• 4-Sharing Non-AC\n• AC Rooms\n\nAll rooms include WiFi, RO water, CCTV and 24/7 security." },

  // ---- FEES ----
  { keywords: ["fee","fees","price","cost","rent","charge","tariff","entha","fees entha","cost entha","rate"],
    answer: "💰 **Boys Hostel Fees (per month, indicative):**\n\n• 4-Sharing Non-AC — ₹5,500\n• 3-Sharing Non-AC — ₹6,500\n• 2-Sharing Non-AC — ₹7,500\n• AC Room — ₹8,500\n\n*Includes 3 meals/day, WiFi, RO water and housekeeping.* For current rates and offers, tap **Enquire Now** or call 9550311361.",
    cta: { label: "Enquire Now", to: "/enquiry" } },

  // ---- FACILITIES ----
  { keywords: ["wifi","wi-fi","internet","net facility","net unda"],
    answer: "📶 **Free high-speed Wi-Fi** in every room — perfect for online classes and streaming." },
  { keywords: ["cctv","camera","surveillance","security camera"],
    answer: "📹 **CCTV surveillance** across every floor and entry point, plus a 24/7 security guard." },
  { keywords: ["hot water","geyser","hot water unda","warm water"],
    answer: "🚿 **Hot water** available daily — 6 AM to 10 AM and 6 PM to 10 PM." },
  { keywords: ["washing machine","laundry","clothes wash","wash machine","washer"],
    answer: "🧺 **Washing machine** available in the laundry area. Housekeeping also handles bedsheet changes weekly." },
  { keywords: ["parking","bike parking","two wheeler","cycle parking"],
    answer: "🅿️ **Two-wheeler parking** available inside the premises." },
  { keywords: ["food included","food with rent","meals included","meals with fees"],
    answer: "🍽 **Yes — 3 homely meals per day** (breakfast, lunch, dinner) are included with the hostel fees." },
  { keywords: ["veg food","vegetarian","pure veg","only veg"],
    answer: "🥗 Yes, **pure veg meals** are served daily along with non-veg options." },
  { keywords: ["non veg","non-veg","chicken","mutton","egg biryani"],
    answer: "🍗 **Non-veg specials:** Chicken curry, Mutton curry, Chicken Biryani, Mutton Biryani, Egg Biryani, Chicken 65, Fish Fry and more." },
  { keywords: ["hostel timing","hostel timings","curfew","in time","gate close","gate closing"],
    answer: "🕒 **Hostel Timings:** Main gate closes at 10:30 PM. Late entry with prior permission. Study hours 7 PM – 10 PM." },
  { keywords: ["document","documents","id proof","aadhaar","aadhar","certificate","what to bring"],
    answer: "📄 **Documents required:**\n\n• Aadhaar card (student & parent)\n• 2 passport-size photos\n• College/Institution ID\n• Parent contact number\n• Address proof" },
  { keywords: ["how to book","book room","book a room","admission process","room book cheyandi","room book","join hostel","how do i join","how to join","join process","apply hostel"],
    answer: "🎓 **How to Book a Room:**\n\n1. Tap **Enquire Now** or call 9550311361\n2. Visit for a quick room tour\n3. Submit ID proof + parent details\n4. Pay first month rent + refundable caution deposit\n5. Move in the same day!",
    cta: { label: "Enquire Now", to: "/enquiry" } },
  { keywords: ["nearby college","nearby colleges","colleges around","college distance","engineering college"],
    answer: "🎓 **Nearby Colleges:** Andhra Loyola, Siddhartha Engineering, KBN, Maris Stella, PB Siddhartha and NRI Medical College are all within 10–20 minutes." },

  // ---- RESTAURANT ----
  { keywords: ["today special","today's special","today special enti","spl today","today spl","special enti"],
    answer: "⭐ **Today's Specials:**\n\n• Hyderabadi Chicken Biryani — ₹220\n• Andhra Veg Meals (Unlimited) — ₹140\n• Ghee Pesarattu + Upma — ₹90\n• Gongura Mutton — ₹260\n\nServed hot 11 AM – 10 PM 🍛" },
  { keywords: ["show menu","menu chupinchu","menu cheppu","menu","food menu","full menu"],
    answer: "🍽 **Our Menu:** Tiffins, Veg & Non-Veg Meals, Biryani, Curries, Chinese, Beverages & Desserts. Tap **View Full Menu** for prices.",
    cta: { label: "View Full Menu", to: "/menu" } },
  { keywords: ["veg item","vegetarian item","veg dishes","veg items"],
    answer: "🥗 **Veg Items:** Idli, Dosa, Masala Dosa, Vada, Poori, Upma, Veg Meals, Veg Biryani, Paneer Butter Masala, Dal Tadka, Gobi Manchurian, Veg Fried Rice." },
  { keywords: ["non veg item","non-veg item","non veg items","non-veg items","non veg dishes"],
    answer: "🍗 **Non-Veg Items:** Chicken Biryani, Mutton Biryani, Egg Biryani, Chicken Curry, Mutton Curry, Chicken 65, Fish Fry, Gongura Mutton." },
  { keywords: ["chicken biryani price","biryani price","biryani rate","biryani entha"],
    answer: "🍛 **Chicken Biryani** — ₹220 (single). Family pack available on request." },
  { keywords: ["meals price","meals rate","thali price","meals entha"],
    answer: "🍽 **Meals:** Veg Meals (Unlimited) ₹120 · Non-Veg Meals ₹180 · Special Thali ₹200 · Curd Rice ₹80." },
  { keywords: ["breakfast menu","breakfast","tiffins","tiffin"],
    answer: "🌅 **Breakfast (7:00–10:30 AM):** Idli, Dosa, Masala Dosa, Vada, Poori, Upma, Pesarattu, filter coffee & tea." },
  { keywords: ["lunch menu","lunch"],
    answer: "🥘 **Lunch (11:30 AM – 3:30 PM):** Veg / Non-Veg Meals, Biryanis, Curries with rice and roti." },
  { keywords: ["dinner menu","dinner"],
    answer: "🌙 **Dinner (7:00 – 10:30 PM):** Full meals, Biryanis, Curries, Roti/Naan, Chinese specials." },
  { keywords: ["parcel","take away","takeaway","take-away","parcel available"],
    answer: "📦 **Yes — parcel & take-away available** for the entire menu. Call ahead to save time." },
  { keywords: ["dine in","dine-in","seating available","sit and eat"],
    answer: "🪑 **Dine-in available** — spacious, clean family seating area with AC section." },
  { keywords: ["table booking","reserve table","table reservation","book table"],
    answer: "📅 **Table booking** is not required for regular meals. For groups of 8+ or family events, please call 9550311361 to reserve.",
    cta: { label: "Call to Reserve", href: "tel:9550311361" } },
  { keywords: ["family pack","family packs","family biryani","large pack"],
    answer: "👨‍👩‍👧 **Family Packs available** — Biryani, Meals and Curries packed for 4/6/8 persons. Call to place an order." },
  { keywords: ["combo","combo meal","combo meals","combo offer"],
    answer: "🍱 **Combo Meals** at lunch: Meals + Sweet + Curd + Pickle — great value plates for the office and college crowd." },
  { keywords: ["payment","payment method","upi","card","cash","gpay","phonepe","paytm"],
    answer: "💳 **Payment methods accepted:** Cash, UPI (GPay / PhonePe / Paytm), Debit & Credit Cards." },
  { keywords: ["opening time","open time","open when","opens","start time"],
    answer: "🕒 **Restaurant Opens:** 7:00 AM daily. Hostel office 9:00 AM." },
  { keywords: ["closing time","close time","close when","closes","end time"],
    answer: "🕘 **Restaurant Closes:** 10:30 PM daily. Hostel office 9:00 PM." },
  { keywords: ["hour","time","open","close","timing","business hours"],
    answer: "🕒 **Business Hours:**\n\n• Restaurant: 7:00 AM – 10:30 PM (daily)\n• Boys Hostel Office: 9:00 AM – 9:00 PM\n• Take-away & Parcel: all day" },

  // ---- OFFERS ----
  { keywords: ["offer","offers","discount","current offer","student discount","weekend offer","festival offer","festival offers","family combo offer","birthday offer","hostel joining offer","hostel joining offers","promo","coupon"],
    answer: "🎁 **There are currently no active offers.** Please check back later or call 9550311361 for seasonal packages and hostel-joining benefits.",
    cta: { label: "Call Owner", href: "tel:9550311361" } },

  // ---- REVIEWS ----
  { keywords: ["hostel review","hostel reviews","boys hostel review","boys hostel reviews","show hostel review"],
    answer: "⭐ **Boys Hostel Reviews** — 4.8/5 average from 500+ residents. Tap below to read all.",
    cta: { label: "Open Boys Hostel Reviews", to: "/reviews/hostel" } },
  { keywords: ["restaurant review","restaurant reviews","food reviews","show restaurant review"],
    answer: "⭐ **Restaurant Reviews** — 4.8/5 from families, food lovers and students. Tap below.",
    cta: { label: "Open Restaurant Reviews", to: "/reviews/restaurant" } },
  { keywords: ["overall rating","average rating","total rating","star rating"],
    answer: "⭐ **Overall Rating: 4.8 / 5** based on 500+ happy customers across the boys hostel and restaurant." },
  { keywords: ["latest review","latest reviews","recent reviews","new review","review"],
    answer: "🆕 Read the **latest reviews** from our residents and diners on the Reviews page.",
    cta: { label: "See All Reviews", to: "/reviews" } },

  // ---- CONTACT ----
  { keywords: ["whatsapp","whatsapp number","whats app","wa number"],
    answer: "💬 **WhatsApp us:** +91 95503 11361. Tap below to open a chat.",
    cta: { label: "Open WhatsApp", href: "https://wa.me/919550311361", external: true } },
  { keywords: ["phone","phone number","call","mobile","contact number","phone no"],
    answer: "📞 **Phone Numbers:**\n\n• Owner: 9550311361\n• Office: 9052618020",
    cta: { label: "Call Now", href: "tel:9550311361" } },
  { keywords: ["email","mail","email address","email id"],
    answer: "📧 **Email:** info@psvtowers.com",
    cta: { label: "Send Email", href: "mailto:info@psvtowers.com" } },
  { keywords: ["address","location","where","direction","directions","map","google map","google maps"],
    answer: "📍 **Our Address:**\n\n27-18-127, Congress Office Road,\nNear Navarang Theater, Governorpet,\nVijayawada — 520002, Andhra Pradesh.",
    cta: { label: "Open in Google Maps", href: "https://www.google.com/maps/search/?api=1&query=P.S.V+Towers+Governorpet+Vijayawada", external: true } },
  { keywords: ["working hours","opening hours","closing hours","hours of operation"],
    answer: "🕒 **Working Hours:**\n\n• Restaurant: 7:00 AM – 10:30 PM (daily)\n• Boys Hostel Office: 9:00 AM – 9:00 PM" },
  { keywords: ["contact","reach","get in touch","enquiry","enquire","enquire now","enquiry form"],
    answer: "📩 Tap below to open the **Enquiry page** with all contact details and a message form.",
    cta: { label: "Open Enquiry Page", to: "/enquiry" } },
  { keywords: ["contact owner","reach owner","talk to owner","owner"],
    answer: "👤 **Owner Contact:** 9550311361. Also available on WhatsApp.",
    cta: { label: "Call Owner", href: "tel:9550311361" } },
];

function normalize(t: string): string {
  return t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

function answerFor(text: string): Intent {
  const t = normalize(text);
  // find best match by longest keyword hit
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of knowledge) {
    for (const kw of intent.keywords) {
      const k = normalize(kw);
      if (!k) continue;
      if (t.includes(k)) {
        const score = k.length;
        if (!best || score > best.score) best = { intent, score };
      }
    }
  }
  if (best) return best.intent;
  return {
    keywords: [],
    answer:
      "I can only help with **P.S.V Towers Boys Hostel & Restaurant** — rooms, fees, menu, offers, reviews, location and contact. For anything else, please reach out to us directly.",
    cta: { label: "Open Enquiry Page", to: "/enquiry" },
  };
}

export function ChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "👋 Hi! I'm **PSV Assistant**. Ask me anything about our **Boys Hostel** or **Restaurant** — in English or Telugu (e.g. \"room unda?\", \"today special enti?\", \"fees entha?\"). Try a quick action 👇",
      time: now(),
    },
  ]);
  const [lastCta, setLastCta] = useState<Intent["cta"] | undefined>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t, time: now() }]);
    setInput("");
    setTyping(true);
    const delay = 500 + Math.min(900, t.length * 20);
    setTimeout(() => {
      const intent = answerFor(t);
      setMsgs((m) => [...m, { role: "bot", text: intent.answer, time: now() }]);
      setLastCta(intent.cta);
      setTyping(false);
    }, delay);
  }

  function handleCta(cta: NonNullable<Intent["cta"]>) {
    if (cta.to) {
      navigate({ to: cta.to });
      setOpen(false);
    } else if (cta.href) {
      if (cta.external) {
        window.open(cta.href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = cta.href;
      }
    }
  }

  function renderText(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**") ? (
        <strong key={i}>{p.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{p}</span>
      ),
    );
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI assistant"
        className="fixed bottom-5 right-5 z-50 grid size-16 place-items-center rounded-full bg-brand text-brand-foreground shadow-elevated transition hover:scale-110"
        style={{ animation: open ? undefined : "psv-bounce 2.4s ease-in-out infinite" }}
      >
        <span className="absolute inset-0 rounded-full bg-brand opacity-60" style={{ animation: open ? undefined : "psv-ping 2s cubic-bezier(0,0,0.2,1) infinite" }} />
        <span className="relative grid size-16 place-items-center rounded-full bg-brand">
          {open ? <X className="size-6" /> : <MessageCircle className="size-7" />}
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-gold text-gold-foreground shadow">
            <Sparkles className="size-3.5" />
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl bg-card shadow-elevated"
          style={{ height: "min(78vh, 640px)", animation: "psv-rise 0.25s ease-out" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--color-brand)] to-[oklch(0.45_0.14_18)] px-4 py-3 text-brand-foreground">
            <div className="grid size-10 place-items-center rounded-full bg-gold text-gold-foreground">
              <Bot className="size-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold leading-tight">PSV Assistant</div>
              <div className="flex items-center gap-1.5 text-xs opacity-90">
                <span className="size-2 rounded-full bg-emerald-400" style={{ animation: "psv-pulse 1.6s ease-in-out infinite" }} />
                Online · Boys Hostel & Restaurant
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-cream)] px-3 py-4">
            {msgs.map((m, i) => {
              const isLast = i === msgs.length - 1;
              return (
                <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`} style={{ animation: "psv-rise 0.25s ease-out" }}>
                  <div className={`grid size-7 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-gold text-gold-foreground" : "bg-brand text-brand-foreground"}`}>
                    {m.role === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${m.role === "user" ? "rounded-br-sm bg-brand text-brand-foreground" : "rounded-bl-sm bg-white text-foreground border border-border"}`}>
                    <div className="whitespace-pre-line">{renderText(m.text)}</div>
                    {isLast && m.role === "bot" && lastCta && (
                      <button
                        onClick={() => handleCta(lastCta)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-brand-foreground shadow-sm hover:opacity-90"
                      >
                        {lastCta.label} →
                      </button>
                    )}
                    <div className={`mt-1 text-[10px] ${m.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</div>
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex items-end gap-2">
                <div className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground">
                  <Bot className="size-3.5" />
                </div>
                <div className="rounded-2xl rounded-bl-sm border border-border bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-brand/70" style={{ animation: "psv-typing 1.2s ease-in-out 0s infinite" }} />
                    <span className="size-2 rounded-full bg-brand/70" style={{ animation: "psv-typing 1.2s ease-in-out 0.2s infinite" }} />
                    <span className="size-2 rounded-full bg-brand/70" style={{ animation: "psv-typing 1.2s ease-in-out 0.4s infinite" }} />
                  </div>
                </div>
              </div>
            )}

            {msgs.length <= 1 && !typing && (
              <div className="pt-2">
                <div className="mb-2 px-1 text-xs font-medium text-muted-foreground">Quick actions</div>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((q) => (
                    <button
                      key={q.key}
                      onClick={() => {
                        if (q.key === "whatsapp") { window.open("https://wa.me/919550311361", "_blank", "noopener,noreferrer"); return; }
                        if (q.key === "location") { window.open("https://www.google.com/maps/search/?api=1&query=P.S.V+Towers+Governorpet+Vijayawada", "_blank", "noopener,noreferrer"); return; }
                        send(quickReply[q.key]);
                      }}
                      className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-left text-xs font-medium text-foreground transition hover:border-brand hover:bg-brand-soft hover:text-brand"
                    >
                      <q.icon className="size-4 text-brand" />
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Chip row (after first chat) */}
          {msgs.length > 1 && (
            <div className="flex gap-2 overflow-x-auto border-t border-border bg-white px-3 py-2">
              {quickActions.map((q) => (
                <button
                  key={q.key}
                  onClick={() => {
                    if (q.key === "whatsapp") { window.open("https://wa.me/919550311361", "_blank", "noopener,noreferrer"); return; }
                    if (q.key === "location") { window.open("https://www.google.com/maps/search/?api=1&query=P.S.V+Towers+Governorpet+Vijayawada", "_blank", "noopener,noreferrer"); return; }
                    send(quickReply[q.key]);
                  }}
                  className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:border-brand hover:bg-brand-soft hover:text-brand"
                >
                  <q.icon className="size-3.5 text-brand" />
                  {q.label}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border bg-white p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in English or Telugu…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-brand-foreground transition hover:scale-105 disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="size-4" />
            </button>
          </form>
          <div className="bg-white pb-2 text-center text-[10px] text-muted-foreground">
            <Phone className="mr-1 inline size-3" />
            Or call <span className="font-semibold text-brand">9550311361</span> · 24/7
          </div>
        </div>
      )}

      <style>{`
        @keyframes psv-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes psv-ping { 75%,100%{transform:scale(1.6);opacity:0} }
        @keyframes psv-pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes psv-rise { 0%{opacity:0;transform:translateY(8px)} 100%{opacity:1;transform:translateY(0)} }
        @keyframes psv-typing { 0%,60%,100%{transform:translateY(0);opacity:.5} 30%{transform:translateY(-4px);opacity:1} }
      `}</style>
    </>
  );
}
