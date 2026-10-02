import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import hero from "@/assets/hero.jpg";
import drum from "@/assets/drum.jpg";
import logo from "@/assets/gidigba-logo.jpg.asset.json";
import { GoldLink, GhostLink } from "@/components/ui-gold";
import { JoinForm } from "@/components/JoinForm";
import { statsQuery } from "@/lib/stats";
import { tracks } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GIDIGBA — Stand firm in who you are" },
      { name: "description", content: "GIDIGBA is an African-rooted global movement expressed through music, rhythm, culture, stories and community. Join the movement." },
      { property: "og:title", content: "GIDIGBA — Stand firm in who you are" },
      { property: "og:description", content: "An African-rooted global movement. Legacy. Mindset. Purpose. Join GIDIGBA." },
    ],
  }),
  component: Home,
});

const pillars = [
  { word: "Stand", text: "Stand firmly in who you are — your roots, your name, your story." },
  { word: "Build", text: "Use your life, gifts and blessings to create something meaningful." },
  { word: "Sustain", text: "Live fully, move with purpose, and leave a legacy that lasts." },
];

function Home() {
  const { data: stats } = useQuery(statsQuery);
  const cities = stats?.top_cities?.length ? stats.top_cities.map((c) => c.city) : ["Lagos", "Accra", "London", "Houston", "Toronto", "Nairobi", "Johannesburg", "Paris"];

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <img src={hero} alt="Two people standing firm on red earth at night" width={1600} height={1008} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-5 pb-20">
          <p className="eyebrow animate-rise">An African-rooted global movement</p>
          <h1 className="mt-5 max-w-4xl animate-rise text-5xl font-bold leading-[1.05] text-gold-gradient sm:text-7xl lg:text-8xl">Stand firm in who you are.</h1>
          <p className="mt-6 max-w-xl animate-rise text-lg text-foreground/80">
            GIDIGBA is a movement about living fully, moving with purpose, and using your gifts to create something meaningful — through music, rhythm, culture, stories and community.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 animate-rise">
            <GoldLink to="/join" pulse>Join GIDIGBA</GoldLink>
            <GhostLink to="/music">Hear the rhythm</GhostLink>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-border bg-card py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap font-display text-lg tracking-[0.3em] text-muted-foreground">
          {[0, 1].map((k) => (
            <div key={k} className="flex">
              {cities.map((c) => (
                <span key={c + k} className="px-6">{c.toUpperCase()} <span className="pl-6 text-primary">✦</span></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <p className="eyebrow text-center">Legacy · Mindset · Purpose</p>
        <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.word} className="bg-background p-8 sm:p-10">
              <h2 className="text-3xl font-bold text-gold-gradient">{p.word}.</h2>
              <p className="mt-4 text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pattern-adire border-y border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
          <img src={drum} alt="Hands playing a drum" width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full rounded-sm object-cover shadow-glow" />
          <div>
            <p className="eyebrow">The doorway</p>
            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Music is how the movement speaks.</h2>
            <ul className="mt-10 divide-y divide-border border-y border-border">
              {tracks.slice(0, 3).map((t) => (
                <li key={t.n} className="flex items-center gap-5 py-5">
                  <span className="font-display text-xl text-primary">{t.n}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm text-muted-foreground">{t.note}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.length}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8"><GhostLink to="/music">All music</GhostLink></div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
        <div>
          <p className="eyebrow">The movement, live</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Planted across the world.</h2>
          <p className="mt-5 max-w-md text-muted-foreground">Every member puts their city on the GIDIGBA map — so one day we can bring our people together, city by city.</p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[["Members", stats?.members], ["Cities", stats?.cities], ["Countries", stats?.countries]].map(([l, v]) => (
              <div key={l as string} className="border border-border p-4">
                <p className="font-display text-4xl text-gold-gradient">{v ?? "—"}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <Link to="/community" className="mt-8 inline-block text-sm uppercase tracking-[0.2em] text-primary hover:underline">See the map →</Link>
        </div>
        <img src={logo.url} alt="GIDIGBA crest — Legacy, Mindset, Purpose" loading="lazy" className="mx-auto w-full max-w-md rounded-full shadow-glow" />
      </section>

      <section id="join" className="border-t border-border bg-card">
        <div className="mx-auto max-w-2xl px-5 py-24">
          <p className="eyebrow text-center">Belonging is an action</p>
          <h2 className="mt-4 text-center text-4xl font-bold text-gold-gradient sm:text-5xl">Join GIDIGBA</h2>
          <p className="mx-auto mt-4 mb-10 max-w-md text-center text-muted-foreground">Tell us who you are and where you stand. We'll bring the movement to your city.</p>
          <JoinForm />
        </div>
      </section>
    </>
  );
}
