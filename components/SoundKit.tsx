"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SACHI sound kit — synthesized WebAudio UI sounds, no assets.
 * Soft tick on hover, warm tap on click, airy sweep for the menu,
 * a quiet page-turn tick when a new scene crosses the viewport.
 * Global toggle bottom-left, preference persisted.
 */

type SoundName = "hover" | "click" | "sweep" | "scene";

class Synth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private lastPlayed: Record<string, number> = {};
  private ambientGain: GainNode | null = null;
  private ambientTimer: ReturnType<typeof setTimeout> | null = null;

  private ensure() {
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    return { ctx: this.ctx, master: this.master! };
  }

  /* ---- ambient: sparse generative felt-piano notes over a soft pad ---- */

  private noteAt(freq: number, when: number, dur: number, vol: number) {
    const { ctx, master } = this.ensure();
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(vol, when + 0.09);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1400;
    lp.Q.value = 0.4;
    // felt-piano-ish voice: fundamental + soft octave + faint fifth
    const partials: Array<[number, number]> = [
      [1, 1],
      [2, 0.28],
      [2.997, 0.1],
    ];
    for (const [ratio, amp] of partials) {
      const o = ctx.createOscillator();
      o.type = ratio === 1 ? "triangle" : "sine";
      o.frequency.value = freq * ratio;
      const og = ctx.createGain();
      og.gain.value = amp;
      o.connect(og).connect(lp);
      o.start(when);
      o.stop(when + dur + 0.1);
    }
    // gentle echo
    const delay = ctx.createDelay(1.2);
    delay.delayTime.value = 0.42;
    const fb = ctx.createGain();
    fb.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    lp.connect(g);
    g.connect(master);
    g.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(master);
  }

  startAmbient() {
    const { ctx, master } = this.ensure();
    if (this.ambientTimer) return;
    if (!this.ambientGain) {
      this.ambientGain = ctx.createGain();
      this.ambientGain.gain.value = 1;
      this.ambientGain.connect(master);
    }
    // A-minor pentatonic, low register — calm, unhurried
    const scale = [220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
    let prev = 2;
    const schedule = () => {
      const t = ctx.currentTime + 0.05;
      // drift mostly to neighbouring degrees so it sings, never noodles
      const step = Math.floor(Math.random() * 3) - 1;
      prev = Math.min(scale.length - 1, Math.max(0, prev + step));
      this.noteAt(scale[prev], t, 3.6, 0.045);
      if (Math.random() < 0.3) {
        const low = scale[Math.max(0, prev - 3)] / 2;
        this.noteAt(low, t + 0.18, 4.4, 0.03);
      }
      this.ambientTimer = setTimeout(schedule, 2100 + Math.random() * 2600);
    };
    schedule();
  }

  stopAmbient() {
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  private throttled(name: string, ms: number) {
    const now = performance.now();
    if (now - (this.lastPlayed[name] || 0) < ms) return true;
    this.lastPlayed[name] = now;
    return false;
  }

  play(name: SoundName) {
    try {
      const { ctx, master } = this.ensure();
      const t = ctx.currentTime;

      if (name === "hover") {
        if (this.throttled("hover", 90)) return;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(1750, t);
        o.frequency.exponentialRampToValueAtTime(2350, t + 0.045);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.028, t + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + 0.09);
      }

      if (name === "click") {
        if (this.throttled("click", 120)) return;
        // warm low tap
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(240, t);
        o.frequency.exponentialRampToValueAtTime(110, t + 0.09);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.09, t + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
        o.connect(g).connect(master);
        o.start(t);
        o.stop(t + 0.16);
        // crisp top tick
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = "triangle";
        o2.frequency.setValueAtTime(2900, t);
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.02, t + 0.004);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
        o2.connect(g2).connect(master);
        o2.start(t);
        o2.stop(t + 0.06);
      }

      if (name === "sweep") {
        if (this.throttled("sweep", 350)) return;
        // airy filtered-noise rise
        const dur = 0.42;
        const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.Q.value = 1.6;
        f.frequency.setValueAtTime(300, t);
        f.frequency.exponentialRampToValueAtTime(2600, t + dur);
        const g = ctx.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.05, t + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        src.connect(f).connect(g).connect(master);
        src.start(t);
      }

      if (name === "scene") {
        if (this.throttled("scene", 700)) return;
        // paper-soft tick, barely there
        const dur = 0.06;
        const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++)
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const f = ctx.createBiquadFilter();
        f.type = "highpass";
        f.frequency.value = 2400;
        const g = ctx.createGain();
        g.gain.value = 0.035;
        src.connect(f).connect(g).connect(master);
        src.start(t);
      }
    } catch {
      // audio unavailable — stay silent
    }
  }
}

export default function SoundKit() {
  const [on, setOn] = useState(false);
  const synth = useRef<Synth | null>(null);
  const onRef = useRef(false);

  useEffect(() => {
    synth.current = new Synth();
    const stored = localStorage.getItem("sachi-sfx");
    const initial = stored !== "off";
    setOn(initial);
    onRef.current = initial;
  }, []);

  useEffect(() => {
    onRef.current = on;
  }, [on]);

  // ambient starts on the first real gesture (browser autoplay policy),
  // and follows the toggle afterwards
  useEffect(() => {
    const tryStart = () => {
      if (onRef.current) synth.current?.startAmbient();
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
      window.removeEventListener("wheel", tryStart);
      window.removeEventListener("touchstart", tryStart);
    };
    window.addEventListener("pointerdown", tryStart, { once: false });
    window.addEventListener("keydown", tryStart);
    window.addEventListener("wheel", tryStart, { passive: true });
    window.addEventListener("touchstart", tryStart, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
      window.removeEventListener("wheel", tryStart);
      window.removeEventListener("touchstart", tryStart);
      synth.current?.stopAmbient();
    };
  }, []);

  useEffect(() => {
    const isInteractive = (e: Event) =>
      (e.target as HTMLElement | null)?.closest?.("a, button") != null;

    const onEnter = (e: PointerEvent) => {
      if (onRef.current && e.pointerType === "mouse" && isInteractive(e))
        synth.current?.play("hover");
    };
    const onClick = (e: MouseEvent) => {
      if (onRef.current && isInteractive(e)) synth.current?.play("click");
    };
    document.addEventListener("pointerover", onEnter, true);
    document.addEventListener("click", onClick, true);

    // scene ticks — when a new [data-scene] crosses mid-viewport
    let lastScene = "";
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            const id = (en.target as HTMLElement).dataset.scene || "";
            if (id && id !== lastScene) {
              lastScene = id;
              if (onRef.current) synth.current?.play("scene");
            }
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    document
      .querySelectorAll<HTMLElement>("[data-scene]")
      .forEach((s) => io.observe(s));

    // menu sweep
    const onMenu = () => {
      if (onRef.current) synth.current?.play("sweep");
    };
    window.addEventListener("sachi:menu", onMenu);

    return () => {
      document.removeEventListener("pointerover", onEnter, true);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("sachi:menu", onMenu);
      io.disconnect();
    };
  }, []);

  const toggle = () => {
    const next = !on;
    setOn(next);
    localStorage.setItem("sachi-sfx", next ? "on" : "off");
    if (next) {
      synth.current?.play("click");
      synth.current?.startAmbient();
    } else {
      synth.current?.stopAmbient();
    }
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      className="fixed right-28 top-[1.15rem] z-[75] flex items-center gap-2.5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] mix-blend-difference text-porcelain md:right-36 md:top-6"
    >
      <span aria-hidden className="flex h-3 items-end gap-[2.5px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`w-[2px] rounded-full bg-current ${on ? "animate-sound-bar" : ""}`}
            style={{
              height: on ? undefined : "3px",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </span>
      <span className="hidden md:inline">{on ? "Sound" : "Muted"}</span>
    </button>
  );
}
