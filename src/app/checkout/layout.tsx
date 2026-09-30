import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Checkout",
  description: "Complete your Section Eight order with secure payment.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
