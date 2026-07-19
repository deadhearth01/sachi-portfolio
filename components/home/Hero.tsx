"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SilkCanvas from "@/components/SilkCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-word]",
        { yPercent: 118 },
        { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.07, delay: 0.15 }
      );
      gsap.fromTo(
        "[data-hero-fade]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.9 }
      );
      // slow drift out as you leave the scene
      gsap.to("[data-hero-inner]", {
        yPercent: -12,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      data-ribbon="right"
      data-scene="01"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      {/* generated silk still sits under the live shader — and carries the
          scene alone when the shader is off (reduced motion / no WebGL) */}
      <img
        src="/images/generated/hero-silk.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <SilkCanvas className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-porcelain/0 via-porcelain/0 to-porcelain" />

      <div data-hero-inner className="relative px-5 pb-10 md:px-10 md:pb-14">
        <p data-hero-fade className="text-scene-label mb-6 md:mb-10" style={{ visibility: "hidden" }}>
          Scene 01 / 08 — Marketing agency, Visakhapatnam
        </p>

        <h1 className="headline-xl text-[14vw] md:text-[9.8vw]">
          <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
            <span data-hero-word className="block will-change-transform">
              Every brand
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
            <span data-hero-word className="block will-change-transform">
              has a story<span className="text-ultra">.</span>
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.06em]">
            <span data-hero-word className="block font-display italic font-[380] text-stone will-change-transform">
              Few tell it well.
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-md text-base leading-relaxed text-ink-soft md:text-lg" style={{ visibility: "hidden" }}>
            SACHI is a marketing agency that turns businesses into brands people
            remember — through work made with intent, not noise.
          </p>
          <div data-hero-fade className="flex items-center gap-8" style={{ visibility: "hidden" }}>
            <a href="#work" className="btn-pill">
              Watch the work
              <span aria-hidden>↓</span>
            </a>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone">
              Scroll to begin
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
