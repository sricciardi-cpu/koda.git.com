import Image from "next/image";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/whatsapp";

const nav = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative border-t border-[rgba(255,255,255,0.08)] bg-[#0a0a0a]"
      aria-label="Pie de página"
    >
      {/* Top section: brand + nav + social */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <a href="#" aria-label="Koda — inicio" className="w-fit">
              <Image
                src="/logo.png"
                alt="Koda"
                width={56}
                height={56}
                unoptimized
                className="object-contain select-none"
              />
            </a>
            <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
              Construimos presencia digital que importa. Sitios a medida,
              e-commerce y aplicaciones web para los que quieren más.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://instagram.com/koda.git"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Koda en Instagram"
                className="group w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] hover:border-[#A78BFA]/40 transition-colors duration-200"
              >
                <InstagramIcon
                  size={18}
                  className="text-[#888888] group-hover:text-[#A78BFA] transition-colors duration-200"
                />
              </a>
              <a
                href={whatsappLink(
                  "Hola Koda! Me interesa hablar con ustedes sobre un proyecto."
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="group w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] hover:border-[#25D366]/40 transition-colors duration-200"
              >
                <WhatsAppIcon
                  size={18}
                  className="text-[#888888] group-hover:text-[#25D366] transition-colors duration-200"
                />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-3 lg:col-start-7 flex flex-col gap-4">
            <h3 className="text-xs text-[#555555] uppercase tracking-widest font-semibold">
              Navegación
            </h3>
            <ul className="flex flex-col gap-2.5">
              {nav.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#888888] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h3 className="text-xs text-[#555555] uppercase tracking-widest font-semibold">
              Contacto
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={whatsappLink(
                    "Hola Koda! Me interesa hablar con ustedes sobre un proyecto."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors duration-200"
                >
                  <WhatsAppIcon size={14} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/koda.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-white transition-colors duration-200"
                >
                  <InstagramIcon size={14} />
                  @koda.git
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-[#555555]">
            © {year} Koda. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#555555]">Hecho con ♥ en Argentina</p>
        </div>
      </div>
    </footer>
  );
}
