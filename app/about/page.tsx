import type { Metadata } from "next";
import Link from "next/link";
import { RevealBlock } from "@/components/Reveal";
import { processSteps, clients } from "@/lib/clients";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — SACHI",
  description:
    "SACHI is a marketing agency in Visakhapatnam run by two founders who built their own ventures first.",
};

const beliefs = [
  {
    title: "Trust over attention",
    body: "Attention is a commodity. Trust is a moat. We optimise for the second one, and the first follows.",
  },
  {
    title: "Founders, not freelancers",
    body: "We've run our own ventures — sold products, burned budgets, felt the risk. We treat your business the way we treat ours.",
  },
  {
    title: "Craft over churn",
    body: "Seven brands, not seventy. We take on work we can obsess over, because volume is the enemy of taste.",
  },
  {
    title: "Numbers on the table",
    body: "Every month ends with a report — what worked, what didn't, and what we sharpen next. No hiding behind vibes.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="flex min-h-svh flex-col justify-end px-5 pb-14 pt-32 md:px-10">
        <p className="text-scene-label mb-6">About SACHI</p>
        <h1 className="headline-xl text-[13vw] md:text-[8.5vw]">
          A marketing agency
          <span className="block font-[380] italic text-stone">that acts like a founder.</span>
        </h1>
        <div className="mt-10 max-w-xl md:ml-auto">
          <RevealBlock>
            <p className="font-display text-2xl font-[440] leading-snug tracking-tight md:text-3xl">
              SACHI exists because most marketing looks the same, sounds the
              same, and gets skipped the same.
            </p>
          </RevealBlock>
        </div>
      </section>

      <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <div className="max-w-3xl space-y-6 md:ml-[38%]">
          <RevealBlock>
            <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
              We started SACHI in Visakhapatnam after building our own ventures —
              a student startup that reached 100,000 people a month, and a
              streetwear brand that sold out two drops. We learned marketing by
              betting on ourselves first.
            </p>
          </RevealBlock>
          <RevealBlock>
            <p className="text-lg leading-relaxed text-ink-soft md:text-xl">
              Today we work with hospitality icons, heritage bakeries, jewellery
              houses and technology startups — businesses with real stories that
              deserve better than template content.
            </p>
          </RevealBlock>
        </div>
      </section>

      <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <p className="text-scene-label mb-12">What we stand on</p>
        <div className="grid gap-px overflow-hidden rounded-md bg-line sm:grid-cols-2">
          {beliefs.map((b, i) => (
            <RevealBlock key={b.title} delay={i * 0.08}>
              <div className="h-full bg-porcelain p-8 md:p-12">
                <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-ultra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-display mt-4 text-3xl font-[460] tracking-tight md:text-4xl">
                  {b.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">{b.body}</p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-porcelain md:px-10 md:py-36">
        <p className="text-scene-label mb-10">How a project moves</p>
        <ol className="grid gap-px overflow-hidden rounded-md bg-porcelain/15 md:grid-cols-7">
          {processSteps.map((s, i) => (
            <li key={s.name} className="bg-ink p-6 md:p-7">
              <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ultra">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-3 text-xl font-[460]">{s.name}</h3>
              <p className="mt-2 text-xs leading-relaxed text-porcelain/55">{s.note}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-md text-sm text-porcelain/60">
          Seven rooms, one direction. You always know where your project stands
          and what happens next.
        </p>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-36">
        <p className="text-scene-label mb-10">Brands in the family</p>
        <ul className="divide-y divide-line border-y border-line">
          {clients.map((c) => (
            <li key={c.slug} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
              <span className="font-display text-3xl font-[460] tracking-tight md:text-5xl">
                {c.name}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-stone">
                {c.sector}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-16 flex flex-wrap items-center gap-8">
          <Link href="/contact" className="btn-pill">
            Become the next one <span aria-hidden>→</span>
          </Link>
          <Link
            href="/"
            className="link-line font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-stone"
          >
            Watch the work →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
