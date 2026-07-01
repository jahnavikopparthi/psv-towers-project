import { useEffect, useState } from "react";
import { Star, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { addReview } from "@/lib/reviews-store";
import { detectGender, type Gender, type ReviewType } from "@/lib/reviews-data";

interface ReviewFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When provided, users cannot switch review type — used from Hostel / Restaurant pages. */
  lockedType?: ReviewType;
}

export function ReviewFormDialog({ open, onOpenChange, lockedType }: ReviewFormDialogProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState<ReviewType>(lockedType ?? "Hostel");
  const [gender, setGender] = useState<Gender | "auto">("auto");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (lockedType) setType(lockedType);
  }, [lockedType, open]);

  function reset() {
    setName("");
    setRating(5);
    setTitle("");
    setText("");
    setType(lockedType ?? "Hostel");
    setGender("auto");
    setErrors({});
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Please enter your full name.";
    if (name.length > 60) e.name = "Name must be under 60 characters.";
    if (!title.trim() || title.trim().length < 3) e.title = "Add a short review title.";
    if (title.length > 80) e.title = "Title must be under 80 characters.";
    if (!text.trim() || text.trim().length < 10) e.text = "Review must be at least 10 characters.";
    if (text.length > 600) e.text = "Review must be under 600 characters.";
    if (rating < 1 || rating > 5) e.rating = "Please select a rating.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      // Boys Hostel reviews are male-only
      const finalGender: Gender =
        type === "Hostel"
          ? "male"
          : gender === "auto"
            ? detectGender(name)
            : gender;
      addReview({
        name: name.trim(),
        rating,
        title: title.trim(),
        text: text.trim(),
        type,
        gender: finalGender,
      });
      setSubmitting(false);
      toast.success("Thank you! Your review has been added successfully.");
      reset();
      onOpenChange(false);
    }, 350);
  }

  const typeLabel = type === "Hostel" ? "Boys Hostel" : "Restaurant";

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="max-w-lg border-brand/20 bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-brand">
            Write a {lockedType ? typeLabel : ""} Review
          </DialogTitle>
          <DialogDescription>
            Share your honest experience — it helps other families and food lovers.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="rv-name">Full Name</Label>
            <Input
              id="rv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rahul Reddy"
              maxLength={60}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Review For</Label>
              {lockedType ? (
                <div className="rounded-md border border-brand bg-brand px-3 py-1.5 text-center text-xs font-medium uppercase tracking-wider text-brand-foreground">
                  {typeLabel}
                </div>
              ) : (
                <div className="flex gap-2">
                  {(["Hostel", "Restaurant"] as ReviewType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`flex-1 rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition ${
                        type === t
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-brand"
                      }`}
                    >
                      {t === "Hostel" ? "Boys Hostel" : "Restaurant"}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {type === "Restaurant" && (
              <div className="space-y-1.5">
                <Label>Profile Photo</Label>
                <div className="flex gap-1.5">
                  {(["auto", "female", "male"] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 rounded-md border px-2 py-1.5 text-[11px] font-medium capitalize transition ${
                        gender === g
                          ? "border-brand bg-brand text-brand-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-brand"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Rating</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => {
                const active = (hoverRating || rating) >= n;
                return (
                  <button
                    key={n}
                    type="button"
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(n)}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="rounded p-1 transition hover:scale-110"
                  >
                    <Star
                      className={`size-7 transition ${
                        active ? "fill-gold text-gold" : "text-gold/30"
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                );
              })}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                {rating}/5
              </span>
            </div>
            {errors.rating && <p className="text-xs text-destructive">{errors.rating}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rv-title">Review Title</Label>
            <Input
              id="rv-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Felt like a second home"
              maxLength={80}
            />
            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rv-text">Review Message</Label>
            <Textarea
              id="rv-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tell us what made your experience special…"
              rows={4}
              maxLength={600}
            />
            <div className="flex justify-between text-[11px] text-muted-foreground">
              <span>{errors.text || ""}</span>
              <span>{text.length}/600</span>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-brand btn-brand-hover inline-flex items-center gap-2 disabled:opacity-60"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              {submitting ? "Submitting…" : "Submit Review"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
