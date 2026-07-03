import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Affiliate Program",
  description:
    "Join Section Eight's affiliate program. Earn up to 15% commission. Packages from ₦49,999.",
  path: "/affiliate",
});

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
