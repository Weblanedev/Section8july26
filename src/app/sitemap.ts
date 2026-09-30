import type { MetadataRoute } from "next";
import { productsData } from "@/data/products";
import { absoluteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/products",
  "/about",
  "/contact",
  "/affiliate",
  "/privacy",
  "/refund-return",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" || path === "/products" ? "daily" : "weekly",
    priority: path === "/" ? 1 : path === "/products" ? 0.9 : 0.7,
  }));

  const products: MetadataRoute.Sitemap = productsData.map((product) => ({
    url: absoluteUrl(`/products/${product.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...pages, ...products];
}
