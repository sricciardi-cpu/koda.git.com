"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Conversamos",
    description:
      "Escuchamos tu idea, entendemos tu negocio y definimos objetivos claros.",
  },
  {
    number: "02",
    title: "Diseñamos",
    description:
      "Wireframes, prototipos y sistema visual alineado con tu identidad de marca.",
  },
  {
    number: "03",
    title: "Desarrollamos",
    description:
      "Código limpio, performante y escalable. Sin atajos ni deudas técnicas.",
  },
  {
    number: "04",
    title: "Lanzamos",
    description:
      "Deploy, QA y monitoreo. Tu producto vive y escala sin fricciones.",
  },
];

export function Process() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="proceso" className="py-32 px-6" aria-label="Proceso">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[#A78BFA] text-xs font-semibold tracking-widest uppercase mb-4">
            Proceso
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Cómo trabajamos.
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          {/* Line */}
          <div className="absolute top-7 left-0 right-0 h-px bg-[rgba(255,255,255,0.08)]" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden flex flex-col gap-0">
          {steps.map((step, index) => (
            <MobileStepCard
              key={step.number}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative pt-8 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Dot on timeline */}
      <div className="absolute -top-[0.4rem] left-0 w-3 h-3 bg-[#A78BFA] rounded-full border-2 border-[#0a0a0a]" />
      <span className="text-[#A78BFA] text-xs font-semibold tracking-widest">
        {step.number}
      </span>
      <h3 className="text-white font-bold text-xl">{step.title}</h3>
      <p className="text-[#888888] text-sm leading-relaxed">{step.description}</p>
    </motion.div>
  );
}

function MobileStepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="flex gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Line + dot */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 bg-[#A78BFA] rounded-full shrink-0 border-2 border-[#0a0a0a] mt-1" />
        {!isLast && (
          <div className="w-px flex-1 bg-[rgba(255,255,255,0.08)] my-3" />
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-2 ${isLast ? "pb-0" : "pb-10"}`}>
        <span className="text-[#A78BFA] text-xs font-semibold tracking-widest">
          {step.number}
        </span>
        <h3 className="text-white font-bold text-xl">{step.title}</h3>
        <p className="text-[#888888] text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
