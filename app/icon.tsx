import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            color: "#B8860B",
            fontSize: 14,
            fontWeight: 900,
            fontFamily: "serif",
            letterSpacing: "-0.5px",
          }}
        >
          IB
        </div>
      </div>
    ),
    { ...size }
  );
}
