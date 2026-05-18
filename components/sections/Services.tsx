"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, ShoppingBag, Layers, Palette } from "lucide-react";
import { Card } from "@/components/ui/Card";

const services = [
  {
    number: "01",
    title: "Sitios web a medida",
    description:
      "Diseñamos y desarrollamos sitios únicos que reflejan tu identidad de marca y convierten visitantes en clientes.",
    icon: Globe,
  },
  {
    number: "02",
    title: "E-commerce",
    description:
      "Tiendas online optimizadas para la conversión, con experiencia de compra fluida y gestión simplificada.",
    icon: ShoppingBag,
  },
  {
    number: "03",
    title: "Aplicaciones web",
    description:
      "Productos digitales escalables: dashboards, plataformas SaaS y herramientas internas con UX profesional.",
    icon: Layers,
  },
  {
    number: "04",
    title: "Identidad digital",
    description:
      "Branding digital coherente: sistema de diseño, guía de estilos y activos gráficos que escalan con tu negocio.",
    icon: Palette,
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "150px" });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Card hoverable className="h-full flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <span className="text-[#333333] text-5xl font-black leading-none select-none">
            {service.number}
          </span>
          <Icon
            size={22}
            strokeWidth={1.5}
            className="text-[#555555] group-hover:text-[#A78BFA] transition-colors duration-300 mt-1"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-lg">{service.title}</h3>
          <p className="text-[#888888] text-sm leading-relaxed">
            {service.description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}

export function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "150px" });

  return (
    <section id="servicios" className="py-20 md:py-32 px-6" aria-label="Servicios">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="text-[#A78BFA] text-xs font-semibold tracking-widest uppercase mb-4">
            ¿Qué hacemos?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight max-w-md">
            Construimos presencia digital que importa.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
