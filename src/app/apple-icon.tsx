import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06B6D4",
          borderRadius: "36px",
          fontSize: "72px",
          fontWeight: 800,
          color: "#0B0F19",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        S8
      </div>
    ),
    { ...size }
  );
}
