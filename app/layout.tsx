import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { faqs } from "@/components/sections/Faq";

// No `weight` list on purpose: that pins static cuts, and the site uses
// 300/500/600 too, which were being synthesised. Omitting it pulls Inter's
// variable font — one file, every weight.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kodagit.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Koda — Desarrollo web en La Plata | Sitios a medida y tiendas online",
    template: "%s | Koda",
  },
  description:
    "Agencia de desarrollo web en La Plata. Hacemos sitios a medida, tiendas online y aplicaciones web para comercios y profesionales de City Bell, Gonnet, Berisso y alrededores. Sin plantillas y sin abono de plataforma.",
  keywords: [
    "desarrollo web La Plata",
    "diseño web La Plata",
    "páginas web La Plata",
    "tienda online La Plata",
    "agencia web City Bell",
    "desarrollo web",
    "sitios a medida",
    "e-commerce",
    "aplicaciones web",
    "diseño web",
    "Argentina",
  ],
  authors: [{ name: "Koda" }],
  creator: "Koda",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://www.kodagit.com",
    siteName: "Koda",
    title: "Koda — Desarrollo web en La Plata",
    description:
      "Sitios a medida, tiendas online y aplicaciones web para comercios y profesionales de La Plata y alrededores.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koda — Desarrollo web para los que quieren más",
    description:
      "Agencia de desarrollo web especializada en sitios a medida, e-commerce, aplicaciones web e identidad digital.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script below adds `js` / `hero-go`
    // to this element before React hydrates, so the server and client class
    // lists legitimately differ.
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Starts the hero intro one frame after the first paint instead of
            letting it run off the document timeline — see globals.css. Runs
            synchronously so `js` lands before anything is drawn; the timeout
            is a backstop in case rAF never fires (e.g. background tab). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.classList.add('js');" +
              "var g=function(){d.classList.add('hero-go')};" +
              "requestAnimationFrame(function(){requestAnimationFrame(g)});" +
              "setTimeout(g,1200);",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // ProfessionalService en vez de Organization: le dice a Google que
              // esto es un negocio que atiende una zona, no una marca global.
              "@type": "ProfessionalService",
              name: "Koda",
              url: "https://www.kodagit.com",
              description:
                "Agencia de desarrollo web en La Plata. Sitios a medida, tiendas online, aplicaciones web e identidad digital.",
              image: "https://www.kodagit.com/icon.png",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "La Plata",
                addressRegion: "Buenos Aires",
                addressCountry: "AR",
              },
              areaServed: [
                { "@type": "City", name: "La Plata" },
                { "@type": "City", name: "City Bell" },
                { "@type": "City", name: "Gonnet" },
                { "@type": "City", name: "Berisso" },
                { "@type": "City", name: "Ensenada" },
              ],
              knowsLanguage: "es-AR",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios",
                itemListElement: [
                  "Desarrollo de sitios web a medida",
                  "Tiendas online",
                  "Aplicaciones web",
                  "Identidad digital",
                ].map((n) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: n },
                })),
              },
              sameAs: ["https://instagram.com/koda.git"],
            }),
          }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
