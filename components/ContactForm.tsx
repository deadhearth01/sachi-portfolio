"use client";

import { useState } from "react";

const budgets = ["Under ₹50K", "₹50K – ₹1L", "₹1L – ₹3L", "₹3L+"];

export default function ContactForm() {
  const [budget, setBudget] = useState<string | null>(null);

  return (
    <form
      className="space-y-8"
      action="mailto:hello@sachi.agency"
      method="post"
      encType="text/plain"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="text-scene-label">Your name</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Full name"
            className="mt-3 w-full border-b border-line bg-transparent pb-3 font-display text-xl font-[440] outline-none transition-colors placeholder:text-stone/50 focus:border-ultra"
          />
        </label>
        <label className="block">
          <span className="text-scene-label">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@business.com"
            className="mt-3 w-full border-b border-line bg-transparent pb-3 font-display text-xl font-[440] outline-none transition-colors placeholder:text-stone/50 focus:border-ultra"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-scene-label">Your business</span>
        <input
          type="text"
          name="business"
          placeholder="Brand name & what you do"
          className="mt-3 w-full border-b border-line bg-transparent pb-3 font-display text-xl font-[440] outline-none transition-colors placeholder:text-stone/50 focus:border-ultra"
        />
      </label>

      <label className="block">
        <span className="text-scene-label">The story so far</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Where are you now, and where do you want the brand to go?"
          className="mt-3 w-full resize-none border-b border-line bg-transparent pb-3 text-base leading-relaxed outline-none transition-colors placeholder:text-stone/50 focus:border-ultra"
        />
      </label>

      <fieldset>
        <legend className="text-scene-label mb-4">Monthly budget</legend>
        <div className="flex flex-wrap gap-3">
          {budgets.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBudget(b)}
              aria-pressed={budget === b}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                budget === b
                  ? "border-ultra bg-ultra text-porcelain"
                  : "border-line hover:border-ink"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <input type="hidden" name="budget" value={budget ?? ""} />
      </fieldset>

      <button type="submit" className="btn-pill text-lg">
        Send it <span aria-hidden>→</span>
      </button>
    </form>
  );
}
