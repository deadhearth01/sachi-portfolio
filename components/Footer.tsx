"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const peopleLinks = [
  { href: "/girish", label: "Girish Kumar" },
  { href: "/sahith", label: "Sahith Agraharapu" },
];

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://linkedin.com", label: "LinkedIn" },
  { href: "https://youtube.com", label: "YouTube" },
];

function Clock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time} IST</span>;
}

export default function Footer() {
  return (
    <footer data-ribbon="hidden" className="relative overflow-hidden bg-ink text-porcelain">
      {/* optional generated backdrop — drops in from AI-PROMPTS.md §7 */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "url(/images/generated/footer-tide.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, transparent, black 60%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 pt-20 md:px-10 md:pt-28">
        {/* invitation */}
        <div className="flex flex-col gap-6 border-b border-porcelain/15 pb-14 md:flex-row md:items-end md:justify-between md:pb-20">
          <div>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-stone">
              One last thing
            </p>
            <a
              href="mailto:hello@sachi.agency"
              className="group mt-4 block font-display text-[7.5vw] font-[440] leading-[1.04] tracking-tight md:text-[4vw]"
            >
              Tell us your story —{" "}
              <span className="italic text-stone transition-colors duration-300 group-hover:text-ultra">
                hello@sachi.agency
              </span>
              <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-2 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="btn-pill btn-pill--invert self-start whitespace-nowrap md:self-auto"
          >
            Back to the top <span aria-hidden>↑</span>
          </button>
        </div>

        {/* menu */}
        <div className="grid gap-12 py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-20">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-[440] leading-snug">
              A marketing agency in Visakhapatnam, building brands people
              remember.
            </p>
            <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.22em] leading-loose text-stone">
              17.6868° N, 83.2185° E
              <br />
              <Clock />
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <nav aria-label="Site">
              <p className="text-scene-label mb-5">Site</p>
              <ul className="space-y-3">
                {siteLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-line text-[0.9375rem] text-porcelain/85 hover:text-porcelain">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="People">
              <p className="text-scene-label mb-5">People</p>
              <ul className="space-y-3">
                {peopleLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-line text-[0.9375rem] text-porcelain/85 hover:text-porcelain">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Elsewhere">
              <p className="text-scene-label mb-5">Elsewhere</p>
              <ul className="space-y-3">
                {socialLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-line text-[0.9375rem] text-porcelain/85 hover:text-porcelain"
                    >
                      {l.label} <span aria-hidden className="text-stone">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* meta */}
        <div className="flex flex-col justify-between gap-3 border-t border-porcelain/15 py-6 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone md:flex-row">
          <p>© {new Date().getFullYear()} SACHI — All stories reserved</p>
          <p>Marketing agency, Visakhapatnam</p>
          <p>
            Crafted with love by{" "}
            <a
              href="https://www.theavni.studio/"
              target="_blank"
              rel="noreferrer"
              className="link-line text-porcelain/70 hover:text-porcelain"
            >
              Avni Studio
            </a>
          </p>
        </div>
      </div>

      {/* the wordmark rolls off the bottom edge like an end title */}
      <p
        aria-hidden
        className="relative select-none px-5 text-center font-display text-[24vw] font-[480] leading-[0.72] tracking-tight text-porcelain/[0.07] md:px-10"
      >
        SACHI
      </p>
    </footer>
  );
}
