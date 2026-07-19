"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { href: "/", label: "Home", index: "01" },
  { href: "/about", label: "About", index: "02" },
  { href: "/girish", label: "Girish", index: "03" },
  { href: "/sahith", label: "Sahith", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const items = overlay.querySelectorAll("[data-menu-item]");
    if (open) {
      document.documentElement.classList.add("overflow-hidden");
      gsap.set(overlay, { pointerEvents: "auto" });
      gsap.to(overlay, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "expo.inOut" });
      gsap.fromTo(
        items,
        { yPercent: 120 },
        { yPercent: 0, duration: 0.8, stagger: 0.06, delay: 0.25, ease: "expo.out" }
      );
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      gsap.to(overlay, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.55,
        ease: "expo.inOut",
        onComplete: () => gsap.set(overlay, { pointerEvents: "none" }),
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 md:px-10 md:py-6 mix-blend-difference text-porcelain">
        <Link href="/" className="font-display text-xl md:text-2xl tracking-tight" aria-label="SACHI home">
          SACHI<span className="text-saffron">.</span>
        </Link>
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent("sachi:menu"));
            setOpen((v) => !v);
          }}
          className="group flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.22em] cursor-pointer"
          aria-expanded={open}
          aria-controls="site-menu"
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className="relative block h-[10px] w-7">
            <span
              className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[4.5px] rotate-45" : "group-hover:-translate-y-[2px]"
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[4.5px] -rotate-45" : "group-hover:translate-y-[2px]"
              }`}
            />
          </span>
        </button>
      </header>

      <div
        id="site-menu"
        ref={overlayRef}
        className="fixed inset-0 z-[60] bg-ink text-porcelain pointer-events-none"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between px-5 pb-8 pt-24 md:px-10 md:pt-32">
          <nav>
            <ul className="space-y-1 md:space-y-2">
              {links.map((l) => (
                <li key={l.href} className="overflow-hidden">
                  <div data-menu-item>
                    <Link
                      href={l.href}
                      className="group flex items-baseline gap-4 md:gap-8"
                      tabIndex={open ? 0 : -1}
                    >
                      <span className="font-mono text-[0.6875rem] tracking-[0.22em] text-stone">
                        {l.index}
                      </span>
                      <span
                        className={`font-display text-[13vw] leading-[1.02] md:text-[6.5vw] transition-colors duration-300 group-hover:text-ultra ${
                          pathname === l.href ? "italic text-stone" : ""
                        }`}
                      >
                        {l.label}
                      </span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-porcelain/15 pt-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-stone">
              Visakhapatnam, India
            </p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-stone">
              Marketing agency
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
