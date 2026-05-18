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
  badge?: string;
  span: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Camisetas Zeus",
    category: "E-commerce",
    description: "Tienda online de indumentaria deportiva.",
    url: "https://camisetaszeus.com",
    span: "col-span-1 md:col-span-2",
  },
  {
    id: 2,
    title: "Francisco Di Rago",
    category: "Sitio web profesional",
    description: "Asesor inmobiliario.",
    url: "https://francisco-di-rago-web.vercel.app/",
    span: "col-span-1",
  },
  {
    id: 3,
    title: "FeliRecetas",
    category: "Landing page",
    description: "Landing de recetas. Actualmente en producción.",
    url: null,
    badge: "En producción",
    span: "col-span-1 md:col-span-3",
  },
];

// Microlink — free tier (50 req/day per IP), no API key.
// embed=screenshot.url makes the endpoint return the PNG directly.
function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const hasLink = Boolean(project.url);

  const inner = (
    <>
      {/* Background — screenshot if link exists, abstract pattern otherwise */}
      {hasLink ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshotUrl(project.url!)}
          alt={`${project.title} preview`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 group-hover:opacity-70 transition-opacity duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <div className="w-24 h-24 border border-[rgba(255,255,255,0.06)] rounded-full" />
          <div className="absolute w-12 h-12 border border-[rgba(255,255,255,0.04)] rounded-full" />
        </div>
      )}

      {/* Dark gradient overlay for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"
        aria-hidden="true"
      />

      {/* Hover accent overlay */}
      <motion.div
        className="absolute inset-0 bg-[#A78BFA]/0 group-hover:bg-[#A78BFA]/5 transition-colors duration-300"
        aria-hidden="true"
      />

      {/* Badge top-right (only when no link) */}
      {project.badge && (
        <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/30 text-[#A78BFA] text-[10px] font-medium uppercase tracking-widest px-2.5 py-1">
          <Clock size={11} />
          {project.badge}
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

  const wrapperClass = `${project.span} relative group overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#111111] min-h-[240px] md:min-h-[320px] ${
    hasLink ? "cursor-pointer hover:border-[#A78BFA]/30" : "cursor-default"
  } transition-colors duration-300`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
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
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

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
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
