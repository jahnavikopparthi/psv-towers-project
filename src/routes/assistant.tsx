import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const Route = createFileRoute("/assistant")({
  head: () => ({ meta: [{ title: "AI Assistant — P.S.V Towers" }, { name: "description", content: "Chat with PSV Assistant for hostel & restaurant info." }] }),
  component: AssistantPage,
});

type Msg = { role: "user" | "bot"; text: string };

const knowledge: { q: string[]; a: string }[] = [
  { q: ["hostel","room","stay","accommodation"], a: "We offer 3 & 4 sharing rooms and AC rooms with attached washroom, study table, cupboard, RO water, WiFi and 24/7 security. Visit the Hostel page for details." },
  { q: ["food","menu","restaurant","biryani","veg","non veg"], a: "Our restaurant serves Veg & Non-Veg meals, biryani, curries, tiffins and beverages. Check the Menu page for items and prices." },
  { q: ["price","fees","cost","rent"], a: "Pricing varies by room type. Please submit an enquiry on the Admission Enquiry page or call 9550311361 for current rates." },
  { q: ["location","address","where","directions"], a: "We are at 27-18-127, Congress Office Road, Near Navarang Theater, Governorpet, Vijayawada — 520002." },
  { q: ["contact","phone","call","whatsapp"], a: "Call 9550311361 or 9052618020. WhatsApp: wa.me/919550311361." },
  { q: ["security","safety","cctv"], a: "Full CCTV surveillance, 24/7 security staff, and controlled entry keep our residents safe." },
];

function reply(text: string) {
  const t = text.toLowerCase();
  const hit = knowledge.find(k => k.q.some(w => t.includes(w)));
  return hit?.a ?? "I can help with hostel rooms, food menu, pricing, location and contact info. What would you like to know?";
}

function AssistantPage() {
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "bot", text: "👋 Hi! I'm PSV Assistant. Ask me about hostel rooms, food menu, pricing or location." }]);
  const [input, setInput] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const userText = input;
    setMsgs(m => [...m, { role: "user", text: userText }, { role: "bot", text: reply(userText) }]);
    setInput("");
  }

  return (
    <>
      <PageHero eyebrow="AI Assistant" title="PSV Assistant" subtitle="Get instant answers about our hostel and restaurant." />
      <section className="section-pad">
        <div className="container-page max-w-2xl">
          <div className="card-soft flex h-[60vh] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto p-5">
              {msgs.map((m, i) => (
                <div key={i} className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`grid size-8 shrink-0 place-items-center rounded-full ${m.role === "user" ? "bg-gold text-gold-foreground" : "bg-brand text-brand-foreground"}`}>
                    {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "bg-brand text-brand-foreground" : "bg-muted"}`}>{m.text}</div>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-4">
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything..." className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand" />
              <button className="grid size-10 place-items-center rounded-md bg-brand text-brand-foreground"><Send className="size-4" /></button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
