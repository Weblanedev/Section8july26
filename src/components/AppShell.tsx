"use client";

import { useAuthStore } from "@/store/authStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className={isAuthenticated ? "signed-in-shell min-h-screen" : "min-h-screen mesh-bg"}>
      {children}
    </div>
  );
}
