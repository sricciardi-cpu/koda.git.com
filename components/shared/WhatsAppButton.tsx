"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";
import { useIsMobile } from "@/hooks/useIsMobile";

export function WhatsAppButton() {
  const isMobile = useIsMobile();

  return (
    <motion.a
      href={whatsappLink(
        "Hola Koda! Me interesa hablar con ustedes sobre un proyecto."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#A78BFA] text-black shadow-[0_8px_30px_rgba(167,139,250,0.35)] hover:shadow-[0_8px_40px_rgba(167,139,250,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isMobile ? 1.5 : 2.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#A78BFA]"
        animate={{ scale: [1, 1.4, 1.4], opacity: [0.4, 0, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative w-6 h-6 sm:w-7 sm:h-7" />
    </motion.a>
  );
}
