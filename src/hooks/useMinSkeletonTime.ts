"use client";

import { useEffect, useState } from "react";

export const MIN_SKELETON_MS = 3000;

/** Returns true while the minimum skeleton display time has not elapsed. */
export function useMinSkeletonTime(durationMs = MIN_SKELETON_MS): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs]);

  return isLoading;
}
