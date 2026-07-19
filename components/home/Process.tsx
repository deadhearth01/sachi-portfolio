"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/clients";
import { RevealBlock } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-ribbon="hidden"
      data-scene="06"
      className="px-5 py-28 md:px-10 md:py-44"
    >
      <div className="grid gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-10">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="text-scene-label mb-6">Scene 06 / 08 — The method</p>
          <RevealBlock>
            <h2 className="headline-xl text-[11vw] md:text-[4.6vw]">
              A system, <em className="font-[380] text-stone">not vibes.</em>
            </h2>
          </RevealBlock>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-soft">
            Working with an agency shouldn&apos;t feel like chaos. Every SACHI
            project moves through the same seven rooms — you always know which
            one we&apos;re in.
          </p>
        </div>
        <ol className="border-t border-line">
          {processSteps.map((s, i) => (
            <li key={s.name} data-step className="border-b border-line py-7 md:py-9" style={{ visibility: "hidden" }}>
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-ultra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-[460] tracking-tight md:text-4xl">
                    {s.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft md:text-base">
                    {s.note}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
