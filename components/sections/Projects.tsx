"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  url: string | null;
  /** Brand logo, centred with padding. */
  logo?: string;
  /** Artwork that fills the whole card, like a screenshot does. Wins over logo. */
  cover?: string;
  badge?: string;
  span: string;
};

// Bento layout on md+: 4 columns over 175px rows, filling 5 rows with no
// gaps. Everything that shows its actual site gets two rows — a screenshot
// squeezed into a single row lands as an unreadable strip — and the two
// logo cards close the grid. Order matters, the spans assume this exact
// sequence:
//   [ Zeus   Zeus   ][ Sill   Sill   ]
//   [ Zeus   Zeus   ][ Sill   Sill   ]
//   [ Rove   Rove   ][ Aseso  Aseso  ]
//   [ Rove   Rove   ][ Aseso  Aseso  ]
//   [ Vitals Vitals ][ Offs   Offs   ]
//   [ Vitals Vitals ][ Offs   Offs   ]
//   [ SWAP   SWAP   ][ DiRago DiRago ]
const projects: Project[] = [
  {
    id: 1,
    title: "Camisetas Zeus",
    category: "E-commerce",
    description: "Tienda online de indumentaria deportiva.",
    url: "https://camisetaszeus.com",
    cover: "/projects/zeus-cover.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 3,
    title: "Sillorno",
    category: "Landing page",
    description: "Blanquería y textiles para el hogar.",
    url: "https://sillorno-topaz.vercel.app/",
    cover: "/projects/sillorno-cover.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 4,
    title: "Rove",
    category: "E-commerce",
    description: "Tienda online de perfumes.",
    url: "https://roveperfumeria.com",
    cover: "/projects/rove-cover.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 6,
    title: "Asesoría La Plata",
    category: "Sitio web profesional",
    description: "Asesoría jurídica, administrativa y notarial.",
    url: "https://asesoria-laplata.vercel.app",
    cover: "/projects/asesoria-cover.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 7,
    title: "Koda Vitals",
    category: "Aplicación web",
    description: "Panel de glucosa, sueño y entrenamiento.",
    url: "https://kodavitals.vercel.app",
    cover: "/projects/vitals-cover.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 8,
    title: "Offside Store",
    category: "E-commerce",
    description: "Tienda de camisetas de fútbol.",
    // Sin link a propósito: todavía no está terminada, así que la tarjeta
    // muestra la portada pero no lleva a ningún lado.
    url: null,
    cover: "/projects/offside-cover.jpg",
    badge: "En proceso",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 5,
    title: "SWAP Podcast",
    category: "Landing page",
    description: "Podcast de conversaciones reales.",
    url: "https://swapodcast.com",
    logo: "/projects/swap.png",
    span: "md:col-span-2",
  },
  {
    id: 2,
    title: "Francisco Di Rago",
    category: "Sitio web profesional",
    description: "Asesor inmobiliario.",
    url: "https://francisco-di-rago-web.vercel.app/",
    logo: "/projects/dirago.png",
    span: "md:col-span-2",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "150px" });
  const hasLink = Boolean(project.url);
  // Lo que sigue en proceso va atenuado, con la etiqueta centrada encima;
  // lo terminado se muestra entero.
  const inProgress = Boolean(project.badge);

  const logoOpacity = inProgress
    ? "opacity-[0.22] group-hover:opacity-[0.35]"
    : "opacity-100";
  const shotOpacity = inProgress
    ? "opacity-50 group-hover:opacity-70"
    : "opacity-100";

  const inner = (
    <>
      {/* Background — the site's own artwork when there's a cover, else the
          brand logo, else an abstract pattern. Covers are captured once and
          committed on purpose: this used to fetch a live screenshot from
          Microlink on every page load, which burned through the free quota
          (50/day per IP) and timed out on heavier sites, leaving cards
          blank. */}
      {project.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${shotOpacity}`}
        />
      ) : project.logo ? (
        <div className="absolute inset-0 flex items-center justify-center p-5 pb-[86px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.logo}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`max-h-full max-w-[70%] object-contain transition-opacity duration-500 ${logoOpacity}`}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border border-[rgba(255,255,255,0.06)] rounded-full" />
          <div className="absolute w-12 h-12 border border-[rgba(255,255,255,0.04)] rounded-full" />
        </div>
      )}

      {/* Dark gradient overlay so the caption stays readable. Más marcado
          sobre lo que está en proceso, que ya va atenuado de por sí. */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent ${
          inProgress ? "via-[#0a0a0a]/70" : "via-[#0a0a0a]/50"
        }`}
        aria-hidden="true"
      />

      {/* Hover accent overlay */}
      <motion.div
        className="absolute inset-0 bg-[#A78BFA]/0 group-hover:bg-[#A78BFA]/5 transition-colors duration-300"
        aria-hidden="true"
      />

      {/* Etiqueta de estado, centrada sobre la portada atenuada */}
      {project.badge && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 bg-[#A78BFA]/10 border border-[#A78BFA]/30 text-[#A78BFA] text-[11px] font-medium uppercase tracking-widest px-4 py-2 backdrop-blur-sm">
            <Clock size={12} />
            {project.badge}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <p className="text-[#A78BFA] text-[10px] font-semibold uppercase tracking-widest">
            {project.category}
          </p>
          <h3 className="text-white font-bold text-lg md:text-xl truncate">
            {project.title}
          </h3>
          <p className="text-[#888888] text-xs leading-relaxed">
            {project.description}
          </p>
        </div>
        {hasLink && (
          <ArrowUpRight
            size={20}
            className="text-[#666666] group-hover:text-[#A78BFA] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
          />
        )}
      </div>
    </>
  );

  // The span classes must live on the grid's direct child (this motion.div),
  // not on the inner anchor, or the grid ignores them and every card
  // collapses to a single column.
  const wrapperClass = `relative group overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#111111] min-h-[200px] md:min-h-0 ${
    hasLink ? "cursor-pointer hover:border-[#A78BFA]/30" : "cursor-default"
  } transition-colors duration-300`;

  return (
    <motion.div
      ref={ref}
      className={project.span}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {hasLink ? (
        <a
          href={project.url!}
          target="_blank"
          rel="noopener noreferrer"
          className={wrapperClass + " block h-full"}
          aria-label={`Visitar ${project.title}`}
        >
          {inner}
        </a>
      ) : (
        <div className={wrapperClass + " h-full"} aria-label={project.title}>
          {inner}
        </div>
      )}
    </motion.div>
  );
}

export function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "150px" });

  return (
    <section
      id="proyectos"
      className="py-20 md:py-32 px-6 bg-[#111111]"
      aria-label="Proyectos"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-[#A78BFA] text-xs font-semibold tracking-widest uppercase mb-4">
              Proyectos
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
              Trabajo real.
              <br />
              Resultados reales.
            </h2>
          </div>
          <p className="text-[#888888] text-sm max-w-xs leading-relaxed">
            Algunos proyectos en los que estamos trabajando o que ya están en
            producción.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[175px] gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
