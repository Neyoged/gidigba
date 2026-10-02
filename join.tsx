import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/gidigba-logo.jpg.asset.json";
import { JoinForm } from "@/components/JoinForm";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join GIDIGBA — Claim your place in the movement" },
      { name: "description", content: "Join GIDIGBA with your name, email, country and city. Be part of a global African-rooted movement." },
      { property: "og:title", content: "Join GIDIGBA" },
      { property: "og:description", content: "Stand. Build. Sustain. Claim your place in the GIDIGBA movement." },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  return (
    <section className="pattern-adire">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <img src={logo.url} alt="GIDIGBA crest" className="mx-auto w-48 rounded-full shadow-glow lg:w-full" />
        </div>
        <div className="border border-border bg-card p-6 sm:p-10 lg:col-span-3">
          <p className="eyebrow">Belonging is an action</p>
          <h1 className="mt-4 text-4xl font-bold text-gold-gradient sm:text-5xl">Plant your feet.</h1>
          <p className="mt-4 mb-8 text-muted-foreground">Join a global family standing firmly in who they are. Tell us where you live so we can find your people.</p>
          <JoinForm />
        </div>
      </div>
    </section>
  );
}
