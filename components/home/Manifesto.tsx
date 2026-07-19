"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // one quiet entrance, then the text is simply there to be read
      gsap.fromTo(
        "[data-mfade]",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 74%", once: true },
        }
      );
      // the keyline draws itself while you read — motion beside the text, not on it
      gsap.fromTo(
        "[data-mline]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 70%", scrub: 0.8 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-ribbon="left"
      data-scene="02"
      className="relative px-5 py-32 md:px-10 md:py-52"
    >
      <p className="text-scene-label mb-10 md:mb-16">Scene 02 / 08 — What we believe</p>
      <div
        data-mline
        className="mb-10 h-px w-full max-w-xl origin-left bg-ultra md:mb-14"
      />
      <blockquote
        data-mfade
        style={{ visibility: "hidden" }}
        className="font-display max-w-[22ch] text-[8.5vw] font-[460] leading-[1.06] tracking-tight md:text-[4.6vw]"
      >
        We build brands people remember — not content people scroll past.
        <em className="text-stone"> Attention is cheap. Trust is earned.</em>{" "}
        Our work earns it.
      </blockquote>
      <p
        data-mfade
        style={{ visibility: "hidden" }}
        className="mt-12 max-w-sm text-base leading-relaxed text-ink-soft md:ml-[38%]"
      >
        Strategy first, camera second, vanity metrics never. Everything we make
        exists to move a real business forward.
      </p>
    </section>
  );
}
