import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/checkout",
          "/checkout/",
          "/payment/",
          "/dashboard",
          "/login",
          "/signup",
          "/api/",
        ],
      },
    ],
    sitemap: `${siteConfig.url.replace(/\/$/, "")}/sitemap.xml`,
    host: siteConfig.url.replace(/\/$/, ""),
  };
}
