import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useState } from "react";
import { GoldLink } from "@/components/ui-gold";
import { statsQuery, type MapPoint } from "@/lib/stats";

const MovementMap = lazy(() => import("@/components/MovementMap"));

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — The GIDIGBA World Map" },
      { name: "description", content: "Explore where GIDIGBA members live around the world, and put your city on the map." },
      { property: "og:title", content: "The GIDIGBA World Map" },
      { property: "og:description", content: "One rhythm, every city. Put your city on the GIDIGBA map." },
    ],
  }),
  component: Community,
});

function Community() {
  const { data } = useQuery(statsQuery);
  const [mounted, setMounted] = useState(false);
  const [focus, setFocus] = useState<MapPoint | null>(null);
  const [q, setQ] = useState("");
  useEffect(() => setMounted(true), []);

  const points = data?.points ?? [];
  const list = points.filter((p) => `${p.city} ${p.country}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <section className="flex flex-col lg:h-[calc(100vh-4rem)] lg:flex-row">
      <aside className="flex flex-col border-b border-border bg-card lg:w-[380px] lg:border-r lg:border-b-0">
        <div className="border-b border-border p-6">
          <p className="eyebrow">Community</p>
          <h1 className="mt-3 text-3xl font-bold text-gold-gradient">Planted across the world.</h1>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[["Members", data?.members], ["Cities", data?.cities], ["Countries", data?.countries]].map(([l, v]) => (
              <div key={l as string} className="border border-border p-3 text-center">
                <p className="font-display text-2xl text-gold-gradient">{v ?? "—"}</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a city or country" className="mt-5 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" />
        </div>
        <ul className="max-h-72 flex-1 divide-y divide-border overflow-y-auto lg:max-h-none">
          {list.map((p) => (
            <li key={p.city + p.country}>
              <button onClick={() => setFocus({ ...p })} className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-primary/10">
                <span>
                  <span className="block font-semibold">{p.city}</span>
                  <span className="text-sm text-muted-foreground">{p.country}</span>
                </span>
                <span className="font-display text-lg text-primary">{p.n}</span>
              </button>
            </li>
          ))}
          {!list.length && <li className="px-6 py-8 text-muted-foreground">{points.length ? "No matches." : "Be the first city on the map."}</li>}
        </ul>
        <div className="border-t border-border p-6"><GoldLink to="/join" pulse>Add my city</GoldLink></div>
      </aside>
      <div className="relative h-[60vh] flex-1 lg:h-auto">
        {mounted && (
          <Suspense fallback={<div className="h-full w-full bg-background" />}>
            <MovementMap points={points} focus={focus} />
          </Suspense>
        )}
      </div>
    </section>
  );
}
