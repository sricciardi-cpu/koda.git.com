"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Each letter travels from its respective viewport edge to its grid slot.
// 60vw/60vh is more than enough to start fully off-screen on any device,
// while keeping the motion duration reasonable.
// K (top-left)  ← from top edge
// O (top-right) ← from right edge
// D (bot-left)  ← from bottom edge
// A (bot-right) ← from left edge
const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 1.4;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const letterVariants: Record<"K" | "O" | "D" | "A", Variants> = {
  K: {
    hidden: { y: "-60vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: DURATION, ease: SMOOTH_EASE },
    },
  },
  O: {
    hidden: { x: "60vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: DURATION, ease: SMOOTH_EASE },
    },
  },
  D: {
    hidden: { y: "60vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: DURATION, ease: SMOOTH_EASE },
    },
  },
  A: {
    hidden: { x: "-60vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: DURATION, ease: SMOOTH_EASE },
    },
  },
};

function AnimatedLogo() {
  // Tight font-weight + character-width based packing.
  // No grid cells = letters hug each other side-by-side.
  // leading 0.82 + -tracking pulls the two rows almost into contact.
  const letter =
    "font-black leading-[0.82] select-none text-[clamp(5.5rem,13vw,11rem)] tracking-[-0.04em]";

  return (
    <motion.div
      className="flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Koda"
      role="img"
    >
      <div className="flex">
        <motion.span variants={letterVariants.K} className={`${letter} text-white`}>
          K
        </motion.span>
        <motion.span variants={letterVariants.O} className={`${letter} text-white`}>
          O
        </motion.span>
      </div>
      <div className="flex">
        <motion.span variants={letterVariants.D} className={`${letter} text-[#A78BFA]`}>
          D
        </motion.span>
        <motion.span variants={letterVariants.A} className={`${letter} text-[#A78BFA]`}>
          A
        </motion.span>
      </div>
    </motion.div>
  );
}

export function Hero() {
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

      <div className="relative z-10 flex flex-col items-center gap-8">
        <AnimatedLogo />

        <motion.p
          className="text-[#888888] text-base md:text-lg font-light tracking-[0.2em] uppercase text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Desarrollo web para los que quieren más
        </motion.p>

        <motion.div
          className="flex gap-3 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.3 }}
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
