"use client";

import { useAuthStore } from "@/store/authStore";
import { usePersistHydration } from "@/hooks/usePersistHydration";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const hydrated = usePersistHydration();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const signedIn = hydrated && isAuthenticated;

  return (
    <div className={signedIn ? "signed-in-shell min-h-screen" : "min-h-screen mesh-bg"}>
      {children}
    </div>
  );
}
