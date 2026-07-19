import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-porcelain">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16 px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <p className="font-display text-[18vw] leading-none tracking-tight md:text-[11rem]">
            SACHI<span className="text-saffron">.</span>
          </p>
          <nav className="grid grid-cols-2 gap-x-16 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-stone md:text-right">
            <Link className="link-line hover:text-porcelain" href="/">Home</Link>
            <Link className="link-line hover:text-porcelain" href="/about">About</Link>
            <Link className="link-line hover:text-porcelain" href="/girish">Girish</Link>
            <Link className="link-line hover:text-porcelain" href="/sahith">Sahith</Link>
            <Link className="link-line hover:text-porcelain" href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-3 border-t border-porcelain/15 pt-6 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-stone md:flex-row">
          <p>© {new Date().getFullYear()} SACHI — Visakhapatnam, India</p>
          <p>Marketing agency</p>
          <p>Fin.</p>
        </div>
      </div>
    </footer>
  );
}
