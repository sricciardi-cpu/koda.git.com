"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

// Use fixed pixel offsets instead of vh/vw — Safari iOS has known issues
// applying viewport units inside transforms during early page lifecycle,
// which can cause the animation to silently skip. 1200px is enough to
// guarantee off-screen start on all phones and tablets.
const OFFSET = 1200;

function makeVariants(duration: number): Record<"K" | "O" | "D" | "A", Variants> {
  return {
    K: {
      hidden: { y: -OFFSET, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration, ease: SMOOTH_EASE } },
    },
    O: {
      hidden: { x: OFFSET, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration, ease: SMOOTH_EASE } },
    },
    D: {
      hidden: { y: OFFSET, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration, ease: SMOOTH_EASE } },
    },
    A: {
      hidden: { x: -OFFSET, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration, ease: SMOOTH_EASE } },
    },
  };
}

function AnimatedLogo({ fast, play }: { fast: boolean; play: boolean }) {
  const duration = fast ? 1.3 : 1.4;
  const stagger = fast ? 0.11 : 0.12;
  const delayChildren = fast ? 0.15 : 0.2;
  const letterVariants = makeVariants(duration);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };

  const letter =
    "font-black leading-[0.82] select-none text-[clamp(5.5rem,13vw,11rem)] tracking-[-0.04em]";

  return (
    <motion.div
      className="flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate={play ? "visible" : "hidden"}
      aria-label="Koda"
      role="img"
    >
      <div className="flex">
        <motion.span variants={letterVariants.K} className={`${letter} text-white`}>K</motion.span>
        <motion.span variants={letterVariants.O} className={`${letter} text-white`}>O</motion.span>
      </div>
      <div className="flex">
        <motion.span variants={letterVariants.D} className={`${letter} text-[#A78BFA]`}>D</motion.span>
        <motion.span variants={letterVariants.A} className={`${letter} text-[#A78BFA]`}>A</motion.span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const isMobile = useIsMobile();

  // Wait until after hydration to start the animation. This guarantees the
  // animation plays even on slow Safari iOS loads (where the page might
  // paint the SSR'd "hidden" state first, then JS attaches late), and also
  // avoids switching variants mid-animation when useIsMobile resolves.
  const [play, setPlay] = useState(false);
  useEffect(() => {
    // requestAnimationFrame defers to the next paint so the browser shows
    // the hidden state for at least one frame before transitioning.
    const id = requestAnimationFrame(() => setPlay(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const subtitleDelay = isMobile ? 1.8 : 1.7;
  const buttonsDelay = isMobile ? 2.0 : 1.9;
  const scrollDelay = isMobile ? 2.3 : 2.3;
  const fadeDuration = isMobile ? 0.6 : 0.7;

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      aria-label="Inicio"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
        style={{ background: "#A78BFA" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-xs sm:max-w-md">
        <AnimatedLogo fast={isMobile} play={play} />

        <motion.p
          className="text-[#888888] text-xs sm:text-base md:text-lg font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: fadeDuration, delay: subtitleDelay, ease: [0.22, 1, 0.36, 1] }}
        >
          Desarrollo web para los que quieren más
        </motion.p>

        <motion.div
          className="flex gap-3 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: fadeDuration, delay: buttonsDelay, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href="#contacto"
            className="flex-1 inline-flex items-center justify-center bg-[#A78BFA] text-black text-sm font-semibold py-3 hover:bg-[#A78BFA]/90 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Hablemos
          </a>
          <a
            href="#servicios"
            className="flex-1 inline-flex items-center justify-center border border-[rgba(255,255,255,0.15)] text-white text-sm py-3 hover:border-white/40 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Ver servicios
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#444444]"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: scrollDelay }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
