"use client";

import Link from "next/link";
import { RevealBlock } from "@/components/Reveal";

const people = [
  {
    name: "Girish Kumar",
    role: "Co-founder — Brand Strategist",
    href: "/girish",
    line: "Built and scaled Chitti to 4,000+ students. Believes marketing is earned trust, not bought attention.",
    portrait: "/images/profile-images/girish-portrait.jpg",
  },
  {
    name: "Sahith Agraharapu",
    role: "Co-founder — Growth Strategist",
    href: "/sahith",
    line: "Sold out two drops of his own streetwear brand. Learned marketing by betting his own money on it.",
    portrait: "/images/profile-images/sahith-portrait.jpg",
  },
];

export default function Founders() {
  return (
    <section data-ribbon="hidden" data-scene="07" className="bg-paper px-5 py-28 md:px-10 md:py-44">
      <p className="text-scene-label mb-10 md:mb-16">Scene 07 / 08 — The people</p>
      <RevealBlock>
        <h2 className="headline-xl max-w-[18ch] text-[10vw] md:text-[5.2vw]">
          Every frame you just watched has{" "}
          <em className="font-[380] text-ultra">two names</em> behind it.
        </h2>
      </RevealBlock>
      <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft">
        SACHI is owned and run by two founders who built their own ventures
        before ever touching yours.
      </p>

      <div className="mt-20 grid gap-10 md:grid-cols-2 md:gap-14">
        {people.map((p, i) => (
          <RevealBlock key={p.name} delay={i * 0.12}>
            <Link href={p.href} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-line bg-porcelain">
                <img
                  src={p.portrait}
                  alt={`${p.name} — portrait`}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ultra opacity-0 transition-opacity duration-500 group-hover:opacity-[0.07]" />
                <span className="absolute bottom-4 right-4 rounded-full bg-paper/85 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-ink-soft backdrop-blur-sm transition-colors group-hover:text-ultra">
                  Read their story →
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-3xl font-[480] tracking-tight md:text-4xl group-hover:text-ultra transition-colors">
                  {p.name}
                </h3>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-stone">
                  {p.role}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
                {p.line}
              </p>
            </Link>
          </RevealBlock>
        ))}
      </div>
    </section>
  );
}
