import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/icons";

// No framer-motion here on purpose. Both the entrance and the pulse ring
// used to be JS-driven, which meant a style write per frame on the main
// thread — the pulse visibly stuttered on phones whenever that thread was
// busy. As plain CSS (transform + opacity only) they run on the compositor
// and stay smooth regardless. See globals.css.
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(
        "Hola Koda! Me interesa hablar con ustedes sobre un proyecto."
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="wa-button fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#A78BFA] text-black shadow-[0_8px_30px_rgba(167,139,250,0.35)] hover:shadow-[0_8px_40px_rgba(167,139,250,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      {/* Subtle pulse ring */}
      <span
        className="wa-pulse absolute inset-0 rounded-full bg-[#A78BFA]"
        aria-hidden="true"
      />
      <WhatsAppIcon className="relative w-6 h-6 sm:w-7 sm:h-7" />
    </a>
  );
}
