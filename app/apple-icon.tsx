import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#06111F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            color: "#B8860B",
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "serif",
            letterSpacing: "-2px",
          }}
        >
          IB
        </div>
      </div>
    ),
    { ...size }
  );
}
