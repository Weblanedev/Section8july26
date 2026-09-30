import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description: "Manage your Section Eight account, orders and affiliate activity.",
  path: "/dashboard",
  noIndex: true,
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
