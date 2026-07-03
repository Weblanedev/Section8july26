import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Shop Tech Products",
  description:
    "Browse phones, laptops, accessories, gaming gear and budget tech. Deals from ₦5,000 with secure checkout.",
  path: "/products",
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
