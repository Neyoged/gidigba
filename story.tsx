import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import { PageHeader, GoldLink } from "@/components/ui-gold";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — GIDIGBA" },
      { name: "description", content: "GIDIGBA means rooted, solid, unshakeable. Discover the philosophy behind the African-rooted global movement." },
      { property: "og:title", content: "Our Story — GIDIGBA" },
      { property: "og:description", content: "Rooted. Solid. Unshakeable. The philosophy behind GIDIGBA." },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <>
      <PageHeader eyebrow="Our Story" title="Rooted. Solid. Unshakeable." intro="GIDIGBA is an African-rooted global movement about standing firmly in who you are, living fully, moving with purpose, and using your life, gifts and blessings to create something meaningful." />
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-2">
        <img src={hero} alt="Two people standing on red earth" width={1600} height={1008} loading="lazy" className="w-full rounded-sm object-cover shadow-glow" />
        <div className="space-y-6 text-lg text-muted-foreground">
          <p><span className="font-display text-foreground">Gidigba</span> is a Yoruba word for something firm — ground that holds, a person who does not bend to every wind.</p>
          <p>We carry it as a way of living. It is expressed through music, rhythm, culture, stories and community — from Lagos to London, Accra to Atlanta.</p>
          <p>This is not a label and not a storefront. It is a home for anyone ready to stand, build and sustain.</p>
        </div>
      </section>
      <section className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-3">
          {[["Legacy", "What we build should outlive us."], ["Mindset", "Firmness begins inside."], ["Purpose", "Every gift is meant to be used."]].map(([t, d]) => (
            <div key={t} className="bg-card p-10 text-center">
              <h2 className="text-3xl font-bold text-gold-gradient">{t}</h2>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="py-20 text-center"><GoldLink to="/join" pulse>Join the movement</GoldLink></div>
    </>
  );
}
