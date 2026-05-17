import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Koda — Desarrollo web para los que quieren más";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            color: "white",
            fontSize: 160,
            fontWeight: 900,
            letterSpacing: "0.5em",
            lineHeight: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>KO</span>
          <span>DA</span>
        </div>

        {/* Tagline */}
        <p
          style={{
            color: "#888888",
            fontSize: 20,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginTop: 32,
          }}
        >
          Desarrollo web para los que quieren más
        </p>
      </div>
    ),
    { ...size }
  );
}
