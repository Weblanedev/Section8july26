import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "8px",
          fontSize: "18px",
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
