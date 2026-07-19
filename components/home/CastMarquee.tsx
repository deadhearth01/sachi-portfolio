import { clients } from "@/lib/clients";

export default function CastMarquee() {
  const row = [...clients, ...clients];
  return (
    <section
      aria-label="Our clients"
      data-ribbon="center-far"
      data-scene="03"
      className="border-y border-line py-10 md:py-14"
    >
      <p className="text-scene-label mb-8 px-5 md:px-10">Scene 03 / 08 — The cast</p>
      <div className="overflow-hidden" aria-hidden>
        <div className="marquee-track items-baseline gap-[5vw] pr-[5vw]" style={{ ["--marquee-speed" as string]: "46s" }}>
          {row.map((c, i) => (
            <span key={i} className="flex items-baseline gap-[5vw] whitespace-nowrap">
              <span className="font-display text-[9vw] font-[440] tracking-tight md:text-[5.5vw]">
                {c.name}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone">
                {c.sector}
              </span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        {clients.map((c) => `${c.name} — ${c.sector}`).join("; ")}
      </p>
    </section>
  );
}
