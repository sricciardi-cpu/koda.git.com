"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "hero";
  animate?: boolean;
}

export function Logo({ size = "md", animate = false }: LogoProps) {
  const sizeClasses = {
    sm: "text-2xl leading-none",
    md: "text-4xl leading-none",
    hero: "text-[clamp(5rem,10vw,9rem)] leading-none",
  };

  const letterSpacing = {
    sm: "0.3em",
    md: "0.4em",
    hero: "0.5em",
  };

  // letter-spacing adds trailing space after the last char, shifting the visual
  // block left. paddingLeft compensates so the glyphs appear truly centered.
  const compensate = { letterSpacing: letterSpacing[size], paddingLeft: letterSpacing[size] };

  if (!animate) {
    return (
      <div
        className={`font-black ${sizeClasses[size]} select-none`}
        style={compensate}
      >
        <div>KO</div>
        <div style={{ color: "#A78BFA" }}>DA</div>
      </div>
    );
  }

  return (
    <div
      className={`font-black ${sizeClasses[size]} select-none`}
      style={compensate}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        KO
      </motion.div>
      <motion.div
        style={{ color: "#A78BFA" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        DA
      </motion.div>
    </div>
  );
}
