import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, GoldLink } from "@/components/ui-gold";
import { stories } from "@/lib/content";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories & News — GIDIGBA" },
      { name: "description", content: "Stories, news and reflections from the GIDIGBA movement and its global community." },
      { property: "og:title", content: "Stories & News — GIDIGBA" },
      { property: "og:description", content: "Proof, in the living. Stories from the GIDIGBA movement." },
    ],
  }),
  component: Stories,
});

function Stories() {
  return (
    <>
      <PageHeader eyebrow="Stories & News" title="Proof, in the living." intro="Voices, moments and news from people standing firm across the world." />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-20 md:grid-cols-3">
        {stories.map((s) => (
          <article key={s.title} className="group border border-border bg-card p-8 transition-colors hover:border-primary">
            <p className="eyebrow">{s.tag} · {s.date}</p>
            <h2 className="mt-4 text-2xl font-bold group-hover:text-primary">{s.title}</h2>
            <p className="mt-3 text-muted-foreground">{s.excerpt}</p>
          </article>
        ))}
      </section>
      <div className="pb-20 text-center"><GoldLink to="/join">Get stories by email</GoldLink></div>
    </>
  );
}
