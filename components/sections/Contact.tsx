"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AtSign, Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validations";

const projectTypes = [
  { value: "sitio-web", label: "Sitio web" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "app-web", label: "Aplicación web" },
  { value: "identidad", label: "Identidad digital" },
  { value: "otro", label: "Otro" },
];

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    projectType: "sitio-web",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const [key, messages] of Object.entries(
        parsed.error.flatten().fieldErrors
      )) {
        fieldErrors[key as keyof ContactFormData] = (messages as string[])[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full bg-[#111111] border border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#444444] text-sm px-4 py-3 focus:outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors duration-200";

  return (
    <section
      id="contacto"
      className="py-32 px-6 bg-[#111111]"
      aria-label="Contacto"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[#A78BFA] text-xs font-semibold tracking-widest uppercase mb-4">
            Contacto
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Empecemos a trabajar.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-12">
                <CheckCircle size={40} className="text-[#A78BFA]" />
                <h3 className="text-2xl font-bold">Mensaje enviado.</h3>
                <p className="text-[#888888]">
                  Te vamos a responder en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs text-[#888888] mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.name ? "border-red-500/50" : ""}`}
                      placeholder="Tu nombre"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-400 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs text-[#888888] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.email ? "border-red-500/50" : ""}`}
                      placeholder="tu@email.com"
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="projectType"
                    className="block text-xs text-[#888888] mb-2"
                  >
                    Tipo de proyecto
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer`}
                  >
                    {projectTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs text-[#888888] mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputBase} resize-none ${errors.message ? "border-red-500/50" : ""}`}
                    placeholder="Contame sobre tu proyecto..."
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-red-400 text-xs mt-1"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle size={16} />
                    <span>Algo salió mal. Intentá de nuevo.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 bg-[#A78BFA] text-black text-sm font-semibold px-7 py-3 hover:bg-[#A78BFA]/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] self-start"
                >
                  {status === "loading" ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar mensaje
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="flex flex-col gap-10 lg:pl-12 lg:border-l lg:border-[rgba(255,255,255,0.08)]"
            initial={{ opacity: 0, x: 20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <h3 className="text-white font-semibold mb-3">
                ¿Preferís el directo?
              </h3>
              <a
                href="https://instagram.com/koda.git"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[#888888] hover:text-white transition-colors duration-200 group"
                aria-label="Contactar por Instagram"
              >
                <div className="w-10 h-10 border border-[rgba(255,255,255,0.08)] flex items-center justify-center group-hover:border-white/30 transition-colors duration-200">
                  <AtSign size={18} />
                </div>
                <span className="text-sm">@koda.git</span>
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold">Tiempos de respuesta</h3>
              <p className="text-[#888888] text-sm leading-relaxed">
                Respondemos todos los mensajes en menos de 24 horas hábiles.
                Para proyectos urgentes, escribinos por Instagram.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-white font-semibold">¿Qué pasa después?</h3>
              <ol className="flex flex-col gap-2 text-sm text-[#888888]">
                <li className="flex items-start gap-3">
                  <span className="text-[#A78BFA] font-semibold text-xs mt-0.5 shrink-0">01</span>
                  Leemos tu mensaje y lo analizamos.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A78BFA] font-semibold text-xs mt-0.5 shrink-0">02</span>
                  Coordinamos una llamada de 30 minutos.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#A78BFA] font-semibold text-xs mt-0.5 shrink-0">03</span>
                  Enviamos propuesta con alcance y presupuesto.
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
