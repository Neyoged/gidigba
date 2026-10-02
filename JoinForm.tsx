import { useEffect, useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShareButtons } from "./ShareButtons";

const SOURCES = ["Instagram", "TikTok", "YouTube", "Google", "DJ", "QR code", "Event", "Artist", "Creator", "A friend", "Other"];
const INTERESTS = ["Music", "Events", "Stories", "Culture", "Community"];

const schema = z.object({
  first_name: z.string().trim().min(1, "Tell us your first name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  country: z.string().trim().min(1, "Which country?").max(100),
  city: z.string().trim().min(1, "Which city?").max(100),
  source: z.string().max(50).optional(),
});

const field = "w-full rounded-sm border border-input bg-background/60 px-4 py-3.5 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const label = "mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground";

export function JoinForm() {
  const qc = useQueryClient();
  const [form, setForm] = useState({ first_name: "", email: "", country: "", city: "", source: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Partial<Record<"first_name" | "email" | "country" | "city" | "source", string>>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [serverError, setServerError] = useState("");

  // Pre-fill source from links like ?src=instagram or ?utm_source=tiktok
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const s = p.get("src") || p.get("utm_source") || p.get("ref");
    if (s) {
      const match = SOURCES.find((x) => x.toLowerCase().replace(" ", "") === s.toLowerCase().replace(/[-_ ]/g, ""));
      setForm((f) => ({ ...f, source: match ?? s.slice(0, 50) }));
    }
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<string, string>> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("saving");
    let lat: number | null = null;
    let lng: number | null = null;
    try {
      const q = encodeURIComponent(`${parsed.data.city}, ${parsed.data.country}`);
      const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${q}`, { headers: { "Accept-Language": "en" } });
      const j = (await r.json()) as { lat: string; lon: string }[];
      if (j[0]) { lat = parseFloat(j[0].lat); lng = parseFloat(j[0].lon); }
    } catch { /* map pin is optional */ }
    const { error } = await supabase.from("members").insert({
      ...parsed.data,
      email: parsed.data.email.toLowerCase(),
      source: parsed.data.source || null,
      interests,
      lat,
      lng,
    });
    if (error) {
      setStatus("idle");
      setServerError(error.code === "23505" ? "You're already part of the movement with this email. Welcome back." : "Something went wrong. Please try again.");
      return;
    }
    setStatus("done");
    qc.invalidateQueries({ queryKey: ["movement-stats"] });
  }

  if (status === "done") {
    return (
      <div className="animate-rise text-center">
        <p className="eyebrow">Welcome to the movement</p>
        <h3 className="mt-4 text-3xl font-bold text-gold-gradient sm:text-4xl">You stand with us, {form.first_name}.</h3>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          {form.city}, {form.country} is now on the GIDIGBA map. Bring your people with you.
        </p>
        <div className="mt-8 flex justify-center"><ShareButtons /></div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="first_name">First name</label>
          <input id="first_name" className={field} value={form.first_name} onChange={set("first_name")} placeholder="Bola" maxLength={100} />
          {errors.first_name && <p className="mt-1 text-sm text-destructive">{errors.first_name}</p>}
        </div>
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" type="email" className={field} value={form.email} onChange={set("email")} placeholder="you@example.com" maxLength={255} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label className={label} htmlFor="country">Country</label>
          <input id="country" className={field} value={form.country} onChange={set("country")} placeholder="Nigeria" maxLength={100} />
          {errors.country && <p className="mt-1 text-sm text-destructive">{errors.country}</p>}
        </div>
        <div>
          <label className={label} htmlFor="city">City</label>
          <input id="city" className={field} value={form.city} onChange={set("city")} placeholder="Lagos" maxLength={100} />
          {errors.city && <p className="mt-1 text-sm text-destructive">{errors.city}</p>}
        </div>
      </div>
      <div>
        <label className={label} htmlFor="source">How did you find GIDIGBA?</label>
        <select id="source" className={field} value={form.source} onChange={set("source")}>
          <option value="">Choose one</option>
          {SOURCES.map((s) => <option key={s}>{s}</option>)}
          {form.source && !SOURCES.includes(form.source) && <option>{form.source}</option>}
        </select>
      </div>
      <div>
        <p className={label}>What moves you?</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((i) => {
            const on = interests.includes(i);
            return (
              <button type="button" key={i} onClick={() => setInterests(on ? interests.filter((x) => x !== i) : [...interests, i])}
                className={`rounded-sm border px-4 py-2 text-sm transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-input text-muted-foreground hover:border-primary"}`}>
                {i}
              </button>
            );
          })}
        </div>
      </div>
      {serverError && <p className="text-sm text-primary">{serverError}</p>}
      <button type="submit" disabled={status === "saving"} className="w-full animate-beat rounded-sm bg-gold-gradient py-4 text-sm font-bold uppercase tracking-[0.25em] text-primary-foreground disabled:opacity-60">
        {status === "saving" ? "Planting your feet…" : "Join GIDIGBA"}
      </button>
      <p className="text-center text-xs text-muted-foreground">No spam. Only rhythm, stories and gatherings near you.</p>
    </form>
  );
}
