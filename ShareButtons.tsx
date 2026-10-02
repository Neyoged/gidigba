import { useState } from "react";

export function ShareButtons({ text = "I just joined GIDIGBA — a global African-rooted movement. Stand firm with me." }: { text?: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const t = encodeURIComponent(text);
  const u = encodeURIComponent(url);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-primary/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary hover:bg-primary/10">
          {l.label}
        </a>
      ))}
      <button
        onClick={async () => {
          if (navigator.share) {
            try { await navigator.share({ title: "GIDIGBA", text, url }); } catch { /* cancelled */ }
          } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        }}
        className="rounded-sm border border-primary/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary hover:bg-primary/10"
      >
        {copied ? "Copied" : "Share"}
      </button>
    </div>
  );
}
