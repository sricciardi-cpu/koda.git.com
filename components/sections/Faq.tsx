// Server component a propósito: las respuestas viajan en el HTML, así Google
// las lee sin ejecutar JavaScript. <details> nativo da el acordeón accesible
// sin librerías ni estado de cliente.

export const faqs = [
  {
    q: "¿Cuánto cuesta hacer una página web?",
    a: "Depende de lo que necesites: no cuesta lo mismo una landing de una página que una tienda online con pagos y stock. Escribinos por WhatsApp contándonos qué vendés y te pasamos un número cerrado, sin vueltas y sin costos que aparecen después.",
  },
  {
    q: "¿Cuánto tarda en estar lista?",
    a: "Una landing suele estar en una o dos semanas. Una tienda online lleva más, porque hay que cargar productos y dejar los medios de pago andando. Antes de empezar te damos una fecha y la cumplimos.",
  },
  {
    q: "Vendo por Instagram, ¿para qué quiero una web?",
    a: "Porque la cuenta de Instagram no es tuya y la web sí. Si mañana te la hackean o te la suspenden, perdés las fotos, los clientes y la forma de vender de golpe. Además tu web aparece en Google cuando alguien busca lo que vendés, y un perfil de Instagram no.",
  },
  {
    q: "¿La página queda a mi nombre?",
    a: "Sí. El dominio se registra a tu nombre y el sitio es tuyo. No pagás un abono de plataforma para poder seguir usándolo, ni te cobramos comisión por cada venta que hagas.",
  },
  {
    q: "¿Hacen tiendas online con pagos y envíos?",
    a: "Sí. Integramos Mercado Pago y los medios de envío que uses. Tené en cuenta que la comisión del medio de pago la cobra Mercado Pago en cualquier tienda, sea a medida o de plantilla: eso no depende de quién haga el sitio.",
  },
  {
    q: "¿Trabajan solo en La Plata?",
    a: "Estamos en La Plata y trabajamos mucho con comercios de City Bell, Gonnet, Villa Elisa, Berisso y Ensenada, que es donde nos podemos juntar a tomar un café. Pero el trabajo es remoto, así que atendemos clientes de todo el país.",
  },
];

export function Faq() {
  return (
    <section id="preguntas" className="py-20 md:py-32 px-6" aria-label="Preguntas frecuentes">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <p className="text-[#A78BFA] text-xs font-semibold tracking-widest uppercase mb-4">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight max-w-lg">
            Lo que todos preguntan.
          </h2>
        </div>

        <div className="max-w-3xl flex flex-col">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border-b border-[rgba(255,255,255,0.08)] py-5"
            >
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none text-white font-semibold text-base sm:text-lg hover:text-[#A78BFA] transition-colors duration-200 focus-visible:outline-none focus-visible:text-[#A78BFA]">
                <h3 className="font-semibold">{f.q}</h3>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[#A78BFA] text-xl leading-none transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-[#888888] text-sm leading-relaxed mt-3 pr-10">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
