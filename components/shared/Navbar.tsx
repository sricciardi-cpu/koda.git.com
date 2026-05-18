"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Track which section is currently in view to highlight its nav link.
  // We pick the section whose top is closest to (but past) the navbar offset.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const compute = () => {
      const offset = 100; // px from top, accounts for navbar height
      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          borderColor: useTransform(
            borderOpacity,
            (o) => `rgba(255,255,255,${o})`
          ),
        }}
      >
        <motion.div
          className="absolute inset-0 backdrop-blur-md bg-[#0a0a0a]"
          style={{ opacity: bgOpacity }}
        />
        <nav className="relative max-w-7xl mx-auto px-5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <a href="#" aria-label="Koda — inicio" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Koda"
              width={36}
              height={36}
              unoptimized
              className="object-contain select-none w-8 sm:w-10 h-8 sm:h-10"
            />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.slice(0, -1).map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors duration-200 ${
                    isActive
                      ? "text-[#A78BFA]"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="#contacto"
              className={`text-sm border px-4 py-2 transition-all duration-200 ${
                activeId === "contacto"
                  ? "text-[#A78BFA] border-[#A78BFA]/40 bg-[#A78BFA]/5"
                  : "border-[rgba(255,255,255,0.15)] hover:border-white/40 hover:bg-white/5"
              }`}
            >
              Contacto
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 text-white hover:text-[#A78BFA] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] bg-[#0a0a0a] md:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between px-5 h-14 border-b border-[rgba(255,255,255,0.08)]">
              <Image
                src="/logo.png"
                alt="Koda"
                width={32}
                height={32}
                unoptimized
                className="object-contain select-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-10 h-10 -mr-2 text-white hover:text-[#A78BFA] transition-colors duration-200"
                aria-label="Cerrar menú"
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            <motion.nav
              className="flex-1 flex flex-col justify-center px-8 gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
            >
              {links.map((link, i) => {
                const isActive = activeId === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-4xl font-black py-3 transition-colors duration-200 ${
                      isActive ? "text-[#A78BFA]" : "text-white hover:text-[#A78BFA]"
                    }`}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    <span className="text-[#A78BFA] text-sm font-medium tracking-widest mr-3 align-middle">
                      0{i + 1}
                    </span>
                    {link.label}
                  </motion.a>
                );
              })}
            </motion.nav>

            <div className="p-8 border-t border-[rgba(255,255,255,0.08)]">
              <p className="text-xs text-[#555555] uppercase tracking-widest">
                Koda — Desarrollo web
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
