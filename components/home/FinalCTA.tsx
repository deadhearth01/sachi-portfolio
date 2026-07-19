import Link from "next/link";
import { RevealBlock } from "@/components/Reveal";

export default function FinalCTA() {
  return (
    <section
      data-ribbon="right"
      data-scene="08"
      className="relative overflow-hidden px-5 py-32 md:px-10 md:py-56"
    >
      <p className="text-scene-label mb-10 md:mb-16">Scene 08 / 08 — Your turn</p>
      <RevealBlock>
        <h2 className="headline-xl max-w-[14ch] text-[12vw] md:text-[7vw]">
          Your brand has a story.{" "}
          <em className="font-[380] italic text-stone">Let&apos;s make it unforgettable.</em>
        </h2>
      </RevealBlock>
      <div className="mt-14 flex flex-wrap items-center gap-8">
        <Link href="/contact" className="btn-pill text-lg">
          Start a project <span aria-hidden>→</span>
        </Link>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone">
          Replies within 48 hours
        </p>
      </div>
    </section>
  );
}
