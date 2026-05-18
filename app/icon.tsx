import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          paddingLeft: "4px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 26,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "8px",
          }}
        >
          KO
        </span>
        <span
          style={{
            color: "#A78BFA",
            fontSize: 26,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "8px",
            marginTop: 2,
          }}
        >
          DA
        </span>
      </div>
    ),
    { ...size }
  );
}
