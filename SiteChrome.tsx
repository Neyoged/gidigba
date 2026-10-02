import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/gidigba-logo.jpg.asset.json";
import { ShareButtons } from "./ShareButtons";

const nav = [
  { to: "/story", label: "Our Story" },
  { to: "/music", label: "Music" },
  { to: "/stories", label: "Stories" },
  { to: "/community", label: "Community" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo.url} alt="GIDIGBA crest" className="size-10 rounded-full object-cover" />
          <span className="font-display text-lg font-bold tracking-[0.2em] text-gold-gradient">GIDIGBA</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/join" className="rounded-sm bg-gold-gradient px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground">
            Join
          </Link>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="text-primary md:hidden">
            <span className="block h-0.5 w-6 bg-primary" />
            <span className="mt-1.5 block h-0.5 w-6 bg-primary" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-5 py-5 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="font-display tracking-widest text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <img src={logo.url} alt="GIDIGBA crest" className="size-20 rounded-full object-cover" />
          <p className="mt-4 text-sm text-muted-foreground">Legacy. Mindset. Purpose.<br />Stand. Build. Sustain.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="eyebrow mb-2">Explore</p>
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-muted-foreground hover:text-primary">{n.label}</Link>
          ))}
          <Link to="/join" className="text-primary">Join GIDIGBA</Link>
        </div>
        <div>
          <p className="eyebrow mb-4">Spread the word</p>
          <ShareButtons />
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs tracking-[0.2em] text-muted-foreground">© 2026 GIDIGBA · AN AFRICAN-ROOTED GLOBAL MOVEMENT</p>
    </footer>
  );
}
