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
    hero: "text-[clamp(8rem,18vw,20rem)] leading-none",
  };

  const letterSpacing = {
    sm: "0.3em",
    md: "0.4em",
    hero: "0.5em",
  };

  if (!animate) {
    return (
      <div
        className={`font-black ${sizeClasses[size]} select-none`}
        style={{ letterSpacing: letterSpacing[size] }}
      >
        <div>KO</div>
        <div>DA</div>
      </div>
    );
  }

  return (
    <div
      className={`font-black ${sizeClasses[size]} select-none`}
      style={{ letterSpacing: letterSpacing[size] }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        KO
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        DA
      </motion.div>
    </div>
  );
}
