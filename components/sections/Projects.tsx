"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { id: 1, title: "Proyecto próximamente", category: "Sitio web", span: "col-span-1 md:col-span-2 row-span-2" },
  { id: 2, title: "Proyecto próximamente", category: "E-commerce", span: "col-span-1 row-span-1" },
  { id: 3, title: "Proyecto próximamente", category: "App web", span: "col-span-1 row-span-1" },
  { id: 4, title: "Proyecto próximamente", category: "Identidad digital", span: "col-span-1 row-span-1" },
  { id: 5, title: "Proyecto próximamente", category: "Sitio web", span: "col-span-1 md:col-span-2 row-span-1" },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`${project.span} relative group overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#111111] cursor-pointer`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
    >
      {/* Placeholder visual */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border border-[rgba(255,255,255,0.06)] rounded-full" />
        <div className="absolute w-8 h-8 border border-[rgba(255,255,255,0.04)] rounded-full" />
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-[#FFE600]/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <p className="text-[#555555] text-xs font-medium uppercase tracking-widest mb-1">
            {project.category}
          </p>
          <h3 className="text-white font-semibold text-sm">{project.title}</h3>
        </div>
        <ArrowUpRight
          size={18}
          className="text-[#444444] group-hover:text-white transition-colors duration-200"
        />
      </div>
    </motion.div>
  );
}

export function Projects() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section
      id="proyectos"
      className="py-32 px-6 bg-[#111111]"
      aria-label="Proyectos"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-[#FFE600] text-xs font-semibold tracking-widest uppercase mb-4">
              Proyectos
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Trabajo real.
              <br />
              Resultados reales.
            </h2>
          </div>
          <p className="text-[#888888] text-sm max-w-xs leading-relaxed">
            Portafolio en construcción. Pronto vas a poder ver los proyectos que
            estamos desarrollando.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
