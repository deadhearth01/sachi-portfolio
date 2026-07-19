"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/clients";
import { RevealBlock } from "@/components/Reveal";

gsap.registerPlugin(ScrollTrigger);

const ROW = 148; // px per step on the dial

/**
 * Scene 06 — the method as a dial. The section pins; the paper plane parks
 * beside a fixed pointer line and the seven steps roll past it like a
 * value wheel. The plane never moves — the story does.
 */
export default function Process() {
  const root = useRef<HTMLElement>(null);
  const wheel = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = root.current;
    const list = wheel.current;
    if (!el || !list) return;

    const rows = Array.from(list.querySelectorAll<HTMLElement>("[data-row]"));
    const n = rows.length;

    const setActive = (idx: number) => {
      rows.forEach((r, i) => {
        const d = Math.abs(i - idx);
        r.style.opacity = d === 0 ? "1" : d === 1 ? "0.35" : "0.14";
        r.style.transform = `translateX(${d === 0 ? 24 : 0}px) scale(${d === 0 ? 1 : 0.92})`;
        r.dataset.active = d === 0 ? "true" : "false";
      });
    };
    setActive(0);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const state = { p: 0 };
      gsap.to(state, {
        p: n - 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${(n - 1) * ROW * 2.2}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          snap: { snapTo: 1 / (n - 1), duration: 0.35, ease: "power2.out" },
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          gsap.set(list, { y: -state.p * ROW });
          setActive(Math.round(state.p));
        },
      });
      return () => {};
    });

    // mobile: no pin, simple fade-in rows, all fully visible
    mm.add("(max-width: 767px)", () => {
      rows.forEach((r) => {
        r.style.opacity = "1";
        r.style.transform = "none";
      });
      gsap.utils.toArray<HTMLElement>(rows).forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-ribbon="process"
      data-scene="06"
      className="relative overflow-hidden px-5 py-28 md:h-svh md:py-0"
    >
      <div className="flex h-full flex-col gap-14 md:flex-row md:items-center md:gap-0">
        {/* left: the thesis */}
        <div className="md:w-[38%] md:pr-8">
          <p className="text-scene-label mb-6">Scene 06 / 08 — The method</p>
          <RevealBlock>
            <h2 className="headline-xl text-[11vw] md:text-[4.2vw]">
              A system, <em className="font-[380] text-stone">not vibes.</em>
            </h2>
          </RevealBlock>
          <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-soft">
            Working with an agency shouldn&apos;t feel like chaos. Every SACHI
            project moves through the same seven rooms — keep scrolling and the
            plane will walk you through them.
          </p>
          <p className="mt-6 hidden font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone md:block">
            Scroll — the dial turns
          </p>
        </div>

        {/* right: the dial the plane points into */}
        <div className="relative md:h-full md:flex-1">
          {/* pointer line where the plane aims — the fixed slot */}
          <div
            aria-hidden
            className="absolute left-0 top-1/2 hidden w-16 -translate-y-1/2 border-t-2 border-ultra md:block"
          />
          <div className="md:absolute md:inset-0 md:overflow-hidden md:[mask-image:linear-gradient(to_bottom,transparent,black_28%,black_72%,transparent)]">
            <ol
              ref={wheel}
              className="space-y-8 md:absolute md:left-24 md:right-0 md:top-1/2 md:mt-[-74px] md:space-y-0"
            >
              {processSteps.map((s, i) => (
                <li
                  key={s.name}
                  data-row
                  className="transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:flex md:h-[148px] md:flex-col md:justify-center"
                >
                  <div className="flex items-center gap-5 md:gap-8">
                    <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-ultra">
                      {String(i + 1).padStart(2, "0")} / 07
                    </span>
                    <div>
                      <h3 className="font-display text-3xl font-[460] tracking-tight md:text-5xl">
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
        </div>
      </div>
    </section>
  );
}
