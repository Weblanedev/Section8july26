"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAccountStore } from "@/store/accountStore";

/** Wait until persisted stores have loaded from localStorage */
export function usePersistHydration() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const markReady = () => {
      if (
        !cancelled &&
        useAuthStore.persist.hasHydrated() &&
        useAccountStore.persist.hasHydrated()
      ) {
        setReady(true);
      }
    };

    markReady();
    if (cancelled) return;

    const unsubs = [
      useAuthStore.persist.onFinishHydration(markReady),
      useAccountStore.persist.onFinishHydration(markReady),
    ];

    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, []);

  return ready;
}
