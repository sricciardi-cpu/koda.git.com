import { ChevronDown } from "lucide-react";

// Server component on purpose: the entrance animation is pure CSS
// (see globals.css "Hero entrance"), so it starts on the very first
// paint without waiting for any JavaScript — critical on mobile where
// hydration used to delay the animation by seconds or skip it entirely.

const letter =
  "font-black leading-[0.82] select-none text-[clamp(5.5rem,13vw,11rem)] tracking-[-0.04em] hero-letter";

function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center" aria-label="Koda" role="img">
      <div className="flex">
        <span className={`${letter} hero-letter-k text-white`}>K</span>
        <span className={`${letter} hero-letter-o text-white`}>O</span>
      </div>
      <div className="flex">
        <span className={`${letter} hero-letter-d text-[#A78BFA]`}>D</span>
        <span className={`${letter} hero-letter-a text-[#A78BFA]`}>A</span>
      </div>
    </div>
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

      {/* Accent glow. A radial-gradient rather than a blurred circle: a
          100px filter blur is one of the most expensive things you can ask
          mobile Safari to composite, and this looks the same for free. */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.10) 0%, rgba(167,139,250,0.04) 45%, rgba(167,139,250,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 w-full max-w-xs sm:max-w-md">
        <AnimatedLogo />

        <p className="hero-fade hero-subtitle text-[#888888] text-xs sm:text-base md:text-lg font-light tracking-[0.15em] sm:tracking-[0.2em] uppercase text-center px-2">
          Desarrollo web para los que quieren más
        </p>

        <div className="hero-fade hero-buttons flex gap-3 w-full">
          <a
            href="#proyectos"
            className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#A78BFA] text-black text-sm font-semibold py-3 hover:bg-[#A78BFA]/90 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Ver proyectos
          </a>
          <a
            href="#servicios"
            className="flex-1 inline-flex items-center justify-center rounded-xl border border-[rgba(255,255,255,0.15)] text-white text-sm py-3 hover:border-white/40 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            Ver servicios
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-hint absolute bottom-10 left-1/2 -translate-x-1/2 text-[#444444]"
        aria-hidden="true"
      >
        <div className="hero-hint-bounce">
          <ChevronDown size={18} strokeWidth={1.5} />
        </div>
      </div>
    </section>
  );
}
