import Link from "next/link";
import type { Founder } from "@/lib/founders";
import { RevealBlock } from "@/components/Reveal";
import Footer from "@/components/Footer";

export default function ProfileLayout({
  founder,
  other,
}: {
  founder: Founder;
  other: { name: string; href: string };
}) {
  return (
    <main>
      {/* opening */}
      <section className="relative flex min-h-svh flex-col justify-end px-5 pb-12 pt-32 md:px-10">
        <p className="text-scene-label mb-6">
          The people behind SACHI — {founder.roles.join(" · ")}
        </p>
        <h1 className="headline-xl text-[14vw] md:text-[9vw]">
          {founder.name.split(" ").map((part, i) => (
            <span key={i} className={`block ${i === 1 ? "font-[380] italic text-stone" : ""}`}>
              {part}
            </span>
          ))}
        </h1>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end">
          <RevealBlock>
            <p className="font-display max-w-[26ch] text-2xl font-[440] leading-snug tracking-tight md:text-4xl">
              {founder.hook}
            </p>
          </RevealBlock>
          {/* portrait placeholder — drop the photo in here */}
          <div className="relative aspect-[3/4] w-full max-w-xs justify-self-end overflow-hidden rounded-md border border-line bg-paper md:max-w-sm">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="font-display text-[8rem] font-[380] italic text-line">
                {founder.name.charAt(0)}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone">
                Portrait — arriving soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* intro */}
      <section className="border-t border-line px-5 py-20 md:px-10 md:py-28">
        <div className="max-w-3xl space-y-6 md:ml-[38%]">
          {founder.intro.map((p, i) => (
            <RevealBlock key={i}>
              <p className="text-lg leading-relaxed text-ink-soft md:text-xl">{p}</p>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* chapters */}
      {founder.chapters.map((ch, idx) => (
        <section key={ch.title} className="border-t border-line px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="text-scene-label mb-5">Chapter {String(idx + 1).padStart(2, "0")}</p>
              <RevealBlock>
                <h2 className="headline-xl text-[9vw] md:text-[3.4vw]">{ch.title}</h2>
              </RevealBlock>
            </div>
            <div className="space-y-6">
              {ch.paragraphs.map((p, i) => (
                <RevealBlock key={i}>
                  <p className="max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">{p}</p>
                </RevealBlock>
              ))}
              {ch.bullets && (
                <RevealBlock>
                  <ul className="max-w-2xl divide-y divide-line border-y border-line">
                    {ch.bullets.map((b, i) => (
                      <li key={b} className="flex items-baseline gap-5 py-3">
                        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-ultra">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm md:text-base">{b}</span>
                      </li>
                    ))}
                  </ul>
                </RevealBlock>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* impact */}
      <section className="bg-ink px-5 py-24 text-porcelain md:px-10 md:py-36">
        <p className="text-scene-label mb-12">Impact in numbers</p>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-md bg-porcelain/15 sm:grid-cols-2 lg:grid-cols-4">
          {founder.stats.map((s) => (
            <div key={s.label} className="bg-ink p-8 md:p-10">
              <dd className="font-display text-5xl font-[460] tracking-tight md:text-6xl">
                {s.value}
              </dd>
              <dt className="mt-3 text-sm text-porcelain/60">{s.label}</dt>
            </div>
          ))}
        </dl>
        <div className="mt-16">
          <p className="text-scene-label mb-6">What I do</p>
          <ul className="flex max-w-3xl flex-wrap gap-3">
            {founder.skills.map((s) => (
              <li
                key={s}
                className="rounded-full border border-porcelain/25 px-5 py-2 text-sm text-porcelain/85"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* closing */}
      <section className="px-5 py-28 md:px-10 md:py-44">
        <RevealBlock>
          <blockquote className="font-display max-w-[20ch] text-[9vw] font-[440] italic leading-[1.1] tracking-tight md:text-[4.4vw]">
            {founder.closing}
          </blockquote>
        </RevealBlock>
        {founder.closingNote && (
          <p className="mt-10 max-w-xl text-base leading-relaxed text-ink-soft md:ml-[38%] md:text-lg">
            {founder.closingNote}
          </p>
        )}
        <div className="mt-16 flex flex-wrap items-center gap-8">
          <Link href="/contact" className="btn-pill">
            Work with us <span aria-hidden>→</span>
          </Link>
          <Link
            href={other.href}
            className="link-line font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-stone"
          >
            Meet {other.name} →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
