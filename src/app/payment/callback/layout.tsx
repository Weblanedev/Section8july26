import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Payment Status",
  description: "Confirm your Section Eight payment status.",
  path: "/payment/callback",
  noIndex: true,
});

export const dynamic = "force-dynamic";

export default function PaymentCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
