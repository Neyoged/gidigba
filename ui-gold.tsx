import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function GoldLink({ to, children, pulse }: { to: "/join" | "/music" | "/story" | "/community" | "/stories"; children: ReactNode; pulse?: boolean }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 rounded-sm bg-gold-gradient px-7 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.03] ${pulse ? "animate-beat" : ""}`}
    >
      {children}
    </Link>
  );
}

export function GhostLink({ to, children }: { to: "/join" | "/music" | "/story" | "/community" | "/stories"; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 rounded-sm border border-primary/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/10"
    >
      {children}
    </Link>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="pattern-adire border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:py-28">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-5 animate-rise text-4xl font-bold text-gold-gradient sm:text-6xl">{title}</h1>
        {intro && <p className="mx-auto mt-6 max-w-2xl animate-rise text-lg text-muted-foreground">{intro}</p>}
      </div>
    </section>
  );
}
