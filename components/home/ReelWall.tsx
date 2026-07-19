"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clients } from "@/lib/clients";

gsap.registerPlugin(ScrollTrigger);

function ReelCard({
  c,
  index,
  soundOn,
  onSound,
}: {
  c: (typeof clients)[number];
  index: number;
  soundOn: boolean;
  onSound: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = !soundOn;
  }, [soundOn]);

  return (
    <figure
      className="group relative w-[72vw] shrink-0 md:w-[21vw]"
      style={{ transform: `rotate(${index % 2 === 0 ? 1.6 : -1.8}deg)` }}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-md bg-paper shadow-[0_30px_80px_-30px_rgba(18,16,12,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-[1.015]">
        <video
          ref={videoRef}
          src={c.video}
          poster={c.poster}
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
        <button
          onClick={onSound}
          className="absolute bottom-3 right-3 rounded-full border border-porcelain/60 bg-ink/45 px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-porcelain backdrop-blur-sm transition-colors hover:bg-ultra"
          aria-label={soundOn ? `Mute ${c.name} film` : `Play ${c.name} film with sound`}
        >
          {soundOn ? "Sound on" : "Sound"}
        </button>
        <span className="absolute left-3 top-3 font-mono text-[0.625rem] tracking-[0.18em] text-porcelain/90">
          {c.duration}
        </span>
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-3">
        <span className="font-display text-xl font-[460] md:text-2xl">{c.name}</span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-stone">
          {c.sector}
        </span>
      </figcaption>
      <p className="mt-1 max-w-[36ch] text-sm leading-relaxed text-ink-soft">{c.line}</p>
    </figure>
  );
}

export default function ReelWall() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [soundIdx, setSoundIdx] = useState<number | null>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const getDist = () => tr.scrollWidth - window.innerWidth;
      gsap.to(tr, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${getDist()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      id="work"
      data-ribbon="hidden"
      data-scene="04"
      className="relative overflow-hidden bg-paper"
    >
      <div className="flex h-auto min-h-svh flex-col justify-center py-16 md:h-svh md:justify-end md:pb-8 md:pt-0">
        <div className="mb-8 flex items-end justify-between px-5 md:px-10">
          <div>
            <p className="text-scene-label mb-4">Scene 04 / 08 — The work</p>
            <h2 className="headline-xl text-[11vw] md:text-[4.2vw]">
              Films for <em className="font-[380] text-ultra">real</em> businesses
            </h2>
          </div>
          <p className="hidden font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone md:block">
            Scroll — the reel moves
          </p>
        </div>

        <div
          ref={track}
          className="flex touch-pan-x gap-[6vw] overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:gap-[4vw] md:overflow-x-visible md:px-10 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          {clients.map((c, i) => (
            <ReelCard
              key={c.slug}
              c={c}
              index={i}
              soundOn={soundIdx === i}
              onSound={() => setSoundIdx(soundIdx === i ? null : i)}
            />
          ))}
          <div className="flex w-[60vw] shrink-0 items-center justify-center md:w-[28vw]">
            <a href="/contact" className="btn-pill">
              Your film next <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
