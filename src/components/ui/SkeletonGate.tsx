"use client";

import { ReactNode } from "react";
import { useMinSkeletonTime } from "@/hooks/useMinSkeletonTime";

interface SkeletonGateProps {
  skeleton: ReactNode;
  children: ReactNode;
  durationMs?: number;
}

export default function SkeletonGate({
  skeleton,
  children,
  durationMs,
}: SkeletonGateProps) {
  const isLoading = useMinSkeletonTime(durationMs);

  if (isLoading) return <>{skeleton}</>;
  return <>{children}</>;
}
