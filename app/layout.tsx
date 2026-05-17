import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koda.git.com"),
  title: {
    default: "Koda — Desarrollo web para los que quieren más",
    template: "%s | Koda",
  },
  description:
    "Agencia de desarrollo web especializada en sitios a medida, e-commerce, aplicaciones web e identidad digital. Transformamos ideas en productos digitales de alto impacto.",
  keywords: [
    "desarrollo web",
    "agencia web",
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
    url: "https://koda.git.com",
    siteName: "Koda",
    title: "Koda — Desarrollo web para los que quieren más",
    description:
      "Agencia de desarrollo web especializada en sitios a medida, e-commerce, aplicaciones web e identidad digital.",
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
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Koda",
              url: "https://koda.git.com",
              description:
                "Agencia de desarrollo web especializada en sitios a medida, e-commerce, aplicaciones web e identidad digital.",
              sameAs: ["https://instagram.com/koda.git"],
            }),
          }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
