import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IBCB Model CLF Team";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #06111F 0%, #0E2237 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#B8860B",
            fontSize: 20,
            fontFamily: "serif",
            marginBottom: 16,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          DAY-NRLM · IBCB Initiative
        </div>
        <div
          style={{
            color: "white",
            fontSize: 64,
            fontFamily: "serif",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Building Community Institutions for a Viksit Bharat
        </div>
        <div style={{ color: "#B8D4C8", fontSize: 24 }}>
          34,000 CLFs · 32 States · 2047
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 80,
            color: "#D4A017",
            fontSize: 48,
            fontWeight: 900,
            fontFamily: "serif",
            letterSpacing: "-1px",
          }}
        >
          IBCB
        </div>
      </div>
    ),
    { ...size }
  );
}
