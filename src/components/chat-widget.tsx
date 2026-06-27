import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X, Send, Home, UtensilsCrossed, MapPin, HelpCircle } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const quick = [
  { icon: Home, label: "Hostel Information", reply: "Our girls hostel offers 3 & 4 sharing rooms with attached washrooms, 24/7 security, CCTV, WiFi, RO water and homely food. Visit /hostel for details." },
  { icon: UtensilsCrossed, label: "Restaurant / Menu", reply: "We serve Veg & Non-Veg meals, Biryani, Curries, Tiffins. Check our full menu at /menu." },
  { icon: MapPin, label: "Location & Contact", reply: "27-18-127, Congress Office Road, Near Navarang Theater, Governorpet, Vijayawada — 520002. Call 9550311361." },
  { icon: HelpCircle, label: "Other Questions", reply: "Tell us what you'd like to know — admissions, pricing, food orders, parcel & take-away." },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: "user", text }, { role: "bot", text: "Thanks! For full assistance please visit our AI Assistant page or call 9550311361." }]);
    setInput("");
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-card shadow-elevated card-soft">
          <div className="flex items-center justify-between bg-brand px-4 py-3 text-brand-foreground">
            <div>
              <div className="font-semibold">PSV Assistant</div>
              <div className="text-xs opacity-80">How can I help you today?</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close"><X className="size-4" /></button>
          </div>
          <div className="max-h-80 space-y-3 overflow-y-auto p-4">
            <div className="rounded-lg bg-muted px-3 py-2 text-sm">
              👋 Hello! Welcome to P.S.V Towers. I can help you with:
            </div>
            <div className="grid gap-2">
              {quick.map(q => (
                <button key={q.label} onClick={() => send(q.label)} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm hover:bg-brand-soft">
                  <q.icon className="size-4 text-brand" /> {q.label}
                </button>
              ))}
            </div>
            {msgs.map((m, i) => (
              <div key={i} className={`rounded-lg px-3 py-2 text-sm ${m.role === "user" ? "ml-8 bg-brand text-brand-foreground" : "mr-8 bg-muted"}`}>{m.text}</div>
            ))}
            <Link to="/assistant" className="block text-center text-xs text-brand underline">Open full AI Assistant →</Link>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-border p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand" />
            <button type="submit" className="grid size-9 place-items-center rounded-md bg-brand text-brand-foreground"><Send className="size-4" /></button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-brand text-brand-foreground shadow-elevated transition hover:scale-105"
      >
        {open ? <X className="size-6" /> : <MessageCircle className="size-6" />}
      </button>
    </>
  );
}
