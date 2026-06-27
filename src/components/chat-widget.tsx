import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Bed, IndianRupee, UtensilsCrossed, Star, Phone, GraduationCap, Bot, User } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string; time: string };

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const quickActions = [
  { icon: Bed, label: "Room Availability", key: "availability" },
  { icon: IndianRupee, label: "Hostel Fees", key: "fees" },
  { icon: UtensilsCrossed, label: "View Menu", key: "menu" },
  { icon: Star, label: "Today's Special", key: "special" },
  { icon: Phone, label: "Contact Owner", key: "contact" },
  { icon: GraduationCap, label: "Admission Help", key: "admission" },
];

const knowledge: { match: (t: string) => boolean; answer: string }[] = [
  {
    match: (t) => /availab|vacan|room.*(free|empty)|empty room/.test(t),
    answer:
      "✅ **Rooms are currently available!**\n\n• 3-Sharing Non-AC — limited seats\n• 4-Sharing Non-AC — available\n• AC Rooms — 2 seats left\n\nWould you like to reserve a room? Tap **Admission Help** to apply.",
  },
  {
    match: (t) => /room.*(type|kind|option)|sharing|ac room|non.?ac/.test(t),
    answer:
      "🛏 **Room Types at P.S.V Towers**\n\n• **3-Sharing Non-AC** — spacious, attached washroom\n• **4-Sharing Non-AC** — budget-friendly, fully furnished\n• **AC Rooms** — premium comfort, study table & wardrobe\n\nAll rooms include WiFi, RO water, CCTV & 24/7 security.",
  },
  {
    match: (t) => /fee|price|cost|rent|charge|tariff/.test(t),
    answer:
      "💰 **Hostel Fees (per month)**\n\n• 4-Sharing Non-AC — ₹5,500\n• 3-Sharing Non-AC — ₹6,500\n• AC Room — ₹8,500\n\n*Includes 3 meals/day, WiFi, RO water, laundry area & housekeeping.*\nCall **9550311361** for current offers.",
  },
  {
    match: (t) => /facilit|amenit|wifi|security|laundry|cctv/.test(t),
    answer:
      "🏠 **Facilities**\n\n• 24/7 CCTV & security guard\n• High-speed WiFi\n• RO drinking water\n• Hot water supply\n• Study tables & wardrobes\n• Power backup\n• Housekeeping & laundry area\n• Homely 3 meals a day",
  },
  {
    match: (t) => /admiss|join|apply|enrol|enroll|how to book/.test(t),
    answer:
      "🎓 **Admission Process**\n\n1. Visit the **Enquiry Now** page or call us\n2. Schedule a quick room visit\n3. Submit ID & address proof\n4. Pay first month rent + caution deposit\n5. Move in the same day!\n\nTap **Enquiry Now** in the menu to start.",
  },
  {
    match: (t) => /document|id proof|aadhaar|aadhar|certificate/.test(t),
    answer:
      "📄 **Documents Required**\n\n• Aadhaar card (student & parent)\n• 2 passport-size photos\n• College/Institution ID\n• Parent contact number\n• Address proof",
  },
  {
    match: (t) => /special|today/.test(t),
    answer:
      "⭐ **Today's Specials**\n\n• Hyderabadi Chicken Biryani — ₹220\n• Andhra Veg Meals (Unlimited) — ₹140\n• Ghee Pesarattu + Upma — ₹90\n• Gongura Mutton — ₹260\n\nServed hot 11 AM – 10 PM 🍛",
  },
  {
    match: (t) => /menu|food|dish|tiffin|biryani|curry/.test(t),
    answer:
      "🍽 **Our Menu Includes**\n\n• Tiffins — Idli, Dosa, Vada, Upma\n• Veg & Non-Veg Meals\n• Biryanis — Chicken, Mutton, Veg\n• Curries — Andhra style\n• Chinese & Tandoori\n• Beverages & Desserts\n\nTap **View Menu** for full pricing.",
  },
  {
    match: (t) => /veg|non.?veg|vegetarian/.test(t),
    answer: "🥗 Yes! We serve both **Pure Veg** and **Non-Veg** dishes — cooked fresh daily in separate kitchens.",
  },
  {
    match: (t) => /hour|time|open|close|timing/.test(t),
    answer:
      "🕒 **Business Hours**\n\n• Restaurant: 7:00 AM – 10:30 PM (daily)\n• Hostel Office: 9:00 AM – 9:00 PM\n• Take-away & Parcel: All day",
  },
  {
    match: (t) => /location|address|where|direction|map/.test(t),
    answer:
      "📍 **Our Location**\n\n27-18-127, Congress Office Road,\nNear Navarang Theater, Governorpet,\nVijayawada — 520002, Andhra Pradesh.",
  },
  {
    match: (t) => /contact|owner|call|phone|whatsapp|reach/.test(t),
    answer:
      "📞 **Contact P.S.V Towers**\n\n• Owner: **9550311361**\n• Office: **9052618020**\n• WhatsApp: wa.me/919550311361\n• Email: psvtowers@gmail.com",
  },
  {
    match: (t) => /hi|hello|hey|namaste|good (morning|evening|afternoon)/.test(t),
    answer: "👋 Hello! Welcome to **P.S.V Towers**. I'm your AI assistant — ask me about rooms, fees, menu, or admissions!",
  },
  {
    match: (t) => /thank|thanks|ty/.test(t),
    answer: "You're most welcome! 😊 Is there anything else I can help you with?",
  },
];

function answerFor(text: string): string {
  const t = text.toLowerCase();
  const hit = knowledge.find((k) => k.match(t));
  return (
    hit?.answer ??
    "I can help with **hostel rooms, fees, food menu, today's special, location and admission**. Try one of the quick actions below, or call **9550311361**."
  );
}

const quickReply: Record<string, string> = {
  availability: "Do you have rooms available?",
  fees: "What are the hostel fees?",
  menu: "Show me the restaurant menu",
  special: "What's today's special?",
  contact: "How can I contact the owner?",
  admission: "How does admission work?",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "👋 Hi! I'm **PSV Assistant**. Ask me anything about our hostel, restaurant, or admissions. Try a quick action below 👇",
      time: now(),
    },
  ]);
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
    const delay = 600 + Math.min(1400, t.length * 25);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: answerFor(t), time: now() }]);
      setTyping(false);
    }, delay);
  }

  function renderText(text: string) {
    // simple **bold** support
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
          style={{ height: "min(78vh, 620px)", animation: "psv-rise 0.25s ease-out" }}
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
                Online · Replies instantly
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-1 hover:bg-white/10">
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[var(--color-cream)] px-3 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`} style={{ animation: "psv-rise 0.25s ease-out" }}>
                <div className={`grid size-7 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-gold text-gold-foreground" : "bg-brand text-brand-foreground"}`}>
                  {m.role === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                </div>
                <div className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm ${m.role === "user" ? "rounded-br-sm bg-brand text-brand-foreground" : "rounded-bl-sm bg-white text-foreground border border-border"}`}>
                  <div className="whitespace-pre-line">{renderText(m.text)}</div>
                  <div className={`mt-1 text-[10px] ${m.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}

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
                      onClick={() => send(quickReply[q.key])}
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
                  onClick={() => send(quickReply[q.key])}
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
              placeholder="Ask about rooms, fees, menu..."
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
            Powered by <span className="font-semibold text-brand">PSV AI</span> · Instant answers 24/7
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
