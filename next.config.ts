import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async redirects() {
    return [
      // El apex servía la misma página que www con código 200, así que había
      // dos URLs con el contenido idéntico. El canonical ya apuntaba a www,
      // pero Search Console igual reporta la versión sin www como "no
      // indexada" — que es literalmente lo que pasa: Google la descarta como
      // duplicado. Con un 301 queda una sola dirección real.
      {
        source: "/:path*",
        has: [{ type: "host", value: "kodagit.com" }],
        destination: "https://www.kodagit.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
