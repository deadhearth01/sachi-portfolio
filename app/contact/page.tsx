import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — SACHI",
  description: "Start a project with SACHI. Tell us about your business — we reply within 48 hours.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="flex min-h-svh flex-col justify-end px-5 pb-14 pt-32 md:px-10">
        <p className="text-scene-label mb-6">Contact</p>
        <h1 className="headline-xl text-[13vw] md:text-[9vw]">
          Tell us your story<span className="text-ultra">.</span>
          <span className="block font-[380] italic text-stone">we&apos;ll make it travel.</span>
        </h1>
        <div className="mt-10 grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ContactForm />
          <aside className="space-y-10 md:pt-4">
            <div>
              <p className="text-scene-label mb-3">Write to us</p>
              <a href="mailto:hello@sachi.agency" className="link-line font-display text-2xl font-[460] md:text-3xl">
                hello@sachi.agency
              </a>
            </div>
            <div>
              <p className="text-scene-label mb-3">Based in</p>
              <p className="font-display text-2xl font-[460] md:text-3xl">Visakhapatnam, India</p>
              <p className="mt-2 text-sm text-ink-soft">Working with brands anywhere.</p>
            </div>
            <div>
              <p className="text-scene-label mb-3">Promise</p>
              <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                Every enquiry is read by a founder — not a form inbox. You hear
                back within 48 hours.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
