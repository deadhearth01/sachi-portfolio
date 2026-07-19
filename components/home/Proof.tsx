"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealBlock } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: "K+", label: "People reached every month" },
  { value: 7, suffix: "", label: "Brands trusting us with their story" },
  { value: 250, suffix: "+", label: "Products sold through our own ventures" },
  { value: 4.8, suffix: "L+", prefix: "₹", label: "Revenue our ventures have generated", decimals: 1 },
];

export default function Proof() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((node) => {
        const target = parseFloat(node.dataset.count || "0");
        const decimals = parseInt(node.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
          onUpdate: () => {
            node.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-ribbon="right"
      data-scene="05"
      className="bg-ink px-5 py-28 text-porcelain md:px-10 md:py-44"
    >
      <p className="text-scene-label mb-10 md:mb-16">Scene 05 / 08 — Does it work?</p>
      <RevealBlock>
        <h2 className="headline-xl max-w-[16ch] text-[10vw] md:text-[5.5vw]">
          Pretty films are easy. We are measured by{" "}
          <em className="font-[380] text-ultra">what they move.</em>
        </h2>
      </RevealBlock>
      <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-porcelain/15 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink p-8 md:p-10">
            <dd className="font-display text-6xl font-[460] tracking-tight md:text-7xl">
              {s.prefix}
              <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                0
              </span>
              <span className="text-ultra">{s.suffix}</span>
            </dd>
            <dt className="mt-4 max-w-[24ch] text-sm leading-relaxed text-porcelain/60">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
      <p className="mt-8 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-porcelain/40">
        Numbers from businesses we run and brands we grow — not projections.
      </p>
    </section>
  );
}
