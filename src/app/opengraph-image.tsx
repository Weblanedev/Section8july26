import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #0B0F19 0%, #131A2B 50%, #0B0F19 100%)",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "16px",
              background: "#06B6D4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              fontWeight: 800,
              color: "#0B0F19",
            }}
          >
            S8
          </div>
          <span style={{ fontSize: "48px", fontWeight: 800 }}>Section Eight</span>
        </div>
        <p
          style={{
            fontSize: "36px",
            fontWeight: 600,
            lineHeight: 1.3,
            maxWidth: "900px",
            color: "#94A3B8",
          }}
        >
          Nigeria&apos;s smartest tech products marketplace - phones, laptops, accessories and more.
        </p>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "16px",
          }}
        >
          <span
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              background: "rgba(6, 182, 212, 0.15)",
              color: "#06B6D4",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            From NGN 5,000
          </span>
          <span
            style={{
              padding: "12px 24px",
              borderRadius: "999px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#10B981",
              fontSize: "22px",
              fontWeight: 600,
            }}
          >
            Secured checkout
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
