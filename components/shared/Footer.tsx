import { AtSign } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <Logo size="sm" />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-sm text-[#888888]">
          <a
            href="https://instagram.com/koda.git"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors duration-200"
            aria-label="Koda en Instagram"
          >
            <AtSign size={16} />
            @koda.git
          </a>
          <a
            href="#servicios"
            className="hover:text-white transition-colors duration-200"
          >
            Servicios
          </a>
          <a
            href="#proyectos"
            className="hover:text-white transition-colors duration-200"
          >
            Proyectos
          </a>
          <a
            href="#contacto"
            className="hover:text-white transition-colors duration-200"
          >
            Contacto
          </a>
        </div>
        <p className="text-sm text-[#555555]">
          © {year} Koda. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
