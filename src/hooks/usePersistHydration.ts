"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAccountStore } from "@/store/accountStore";
import { useCartStore } from "@/store/cartStore";

function allStoresHydrated() {
  return (
    useAuthStore.persist.hasHydrated() &&
    useAccountStore.persist.hasHydrated() &&
    useCartStore.persist.hasHydrated()
  );
}

/** Wait until persisted stores have loaded from localStorage */
export function usePersistHydration() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const markReady = () => {
      if (!cancelled && allStoresHydrated()) {
        setReady(true);
      }
    };

    markReady();

    const unsubs = [
      useAuthStore.persist.onFinishHydration(markReady),
      useAccountStore.persist.onFinishHydration(markReady),
      useCartStore.persist.onFinishHydration(markReady),
    ];

    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, []);

  return ready;
}
