import { createFileRoute } from "@tanstack/react-router";
import drum from "@/assets/drum.jpg";
import { PageHeader, GoldLink } from "@/components/ui-gold";
import { ShareButtons } from "@/components/ShareButtons";
import { tracks } from "@/lib/content";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — GIDIGBA" },
      { name: "description", content: "Music is the doorway into GIDIGBA. Rhythm-led songs about legacy, mindset and purpose." },
      { property: "og:title", content: "Music — GIDIGBA" },
      { property: "og:description", content: "Listen to the rhythm of the GIDIGBA movement." },
    ],
  }),
  component: Music,
});

function Music() {
  return (
    <>
      <PageHeader eyebrow="The doorway" title="The Music" intro="Every song is an invitation. Listen, feel the ground under you, then come stand with us." />
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <p className="eyebrow">Now playing</p>
        <h2 className="mt-3 text-3xl font-bold text-gold-gradient sm:text-4xl">GIDIGBA — Source &amp; Sustainer</h2>
        <p className="mt-2 text-muted-foreground">By Abimbola Bakare</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-5">
          <div className="aspect-video overflow-hidden border border-border shadow-glow lg:col-span-3">
            <iframe className="h-full w-full" src="https://www.youtube.com/embed/xBIGwr1_TI0" title="GIDIGBA source and sustainer" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2">
            <iframe className="w-full rounded-xl" height={352} src="https://open.spotify.com/embed/track/5sCkoTGSI8coN6eCpq5bRu" title="GIDIGBA source & sustainer on Spotify" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
            <div className="flex flex-wrap gap-3">
              <a href="https://open.spotify.com/track/5sCkoTGSI8coN6eCpq5bRu" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.2em] text-primary hover:underline">Open in Spotify →</a>
              <a href="https://www.youtube.com/@Gidigba55" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-[0.2em] text-primary hover:underline">YouTube channel →</a>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-5">
        <img src={drum} alt="Hands on a drum" width={1024} height={1280} loading="lazy" className="w-full rounded-sm object-cover shadow-glow lg:col-span-2" />
        <div className="lg:col-span-3">
          <ul className="divide-y divide-border border-y border-border">
            {tracks.map((t) => (
              <li key={t.n} className="flex items-center gap-5 py-6">
                <span className="font-display text-2xl text-primary">{t.n}</span>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{t.title}</p>
                  <p className="text-sm text-muted-foreground">{t.note}</p>
                </div>
                <span className="text-sm text-muted-foreground">{t.length}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">Streaming links coming soon. Join to hear new releases first.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <GoldLink to="/join">Hear it first</GoldLink>
            <ShareButtons text="Listen to GIDIGBA — music for standing firm in who you are." />
          </div>
        </div>
      </section>
    </>
  );
}
