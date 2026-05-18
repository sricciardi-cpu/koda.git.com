"use client";

import { motion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Each letter slides in from its outer edge toward the center 2x2 grid.
// K (top-left)  ← falls from above
// O (top-right) ← comes from the right
// D (bot-left)  ← rises from below
// A (bot-right) ← comes from the left
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const letterVariants: Record<"K" | "O" | "D" | "A", Variants> = {
  K: {
    hidden: { y: "-120%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  O: {
    hidden: { x: "120%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  D: {
    hidden: { y: "120%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
  A: {
    hidden: { x: "-120%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
};

function AnimatedLogo() {
  const letterClasses =
    "flex items-center justify-center font-black leading-none select-none";
  const fontSize = "text-[clamp(5rem,11vw,9.5rem)]";

  return (
    <motion.div
      className="grid grid-cols-2 grid-rows-2 gap-0 overflow-hidden"
      style={{ width: "clamp(200px, 28vw, 380px)", aspectRatio: "1" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Koda"
      role="img"
    >
      <div className="overflow-hidden flex items-center justify-center">
        <motion.span
          variants={letterVariants.K}
          className={`${letterClasses} ${fontSize} text-white`}
        >
          K
        </motion.span>
      </div>
      <div className="overflow-hidden flex items-center justify-center">
        <motion.span
          variants={letterVariants.O}
          className={`${letterClasses} ${fontSize} text-white`}
        >
          O
        </motion.span>
      </div>
      <div className="overflow-hidden flex items-center justify-center">
        <motion.span
          variants={letterVariants.D}
          className={`${letterClasses} ${fontSize} text-[#A78BFA]`}
        >
          D
        </motion.span>
      </div>
      <div className="overflow-hidden flex items-center justify-center">
        <motion.span
          variants={letterVariants.A}
          className={`${letterClasses} ${fontSize} text-[#A78BFA]`}
        >
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
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Desarrollo web para los que quieren más
        </motion.p>

        <motion.div
          className="flex gap-3 w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
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
        transition={{ duration: 0.8, delay: 1.2 }}
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
