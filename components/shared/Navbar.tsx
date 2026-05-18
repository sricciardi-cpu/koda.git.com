"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottomColor: borderOpacity.get()
          ? `rgba(255,255,255,${borderOpacity.get() * 0.08})`
          : "transparent",
      }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-md bg-[#0a0a0a]"
        style={{ opacity: bgOpacity }}
      />
      <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" aria-label="Koda — inicio">
          <Image
            src="/logo.png"
            alt="Koda"
            width={40}
            height={40}
            className="object-contain select-none"
          />
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#servicios"
            className="text-sm text-[#888888] hover:text-white transition-colors duration-200 hidden md:block"
          >
            Servicios
          </a>
          <a
            href="#proyectos"
            className="text-sm text-[#888888] hover:text-white transition-colors duration-200 hidden md:block"
          >
            Proyectos
          </a>
          <a
            href="#proceso"
            className="text-sm text-[#888888] hover:text-white transition-colors duration-200 hidden md:block"
          >
            Proceso
          </a>
          <a
            href="#contacto"
            className="text-sm border border-[rgba(255,255,255,0.15)] px-4 py-2 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
          >
            Contacto
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
