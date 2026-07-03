"use client";

import { ReactNode } from "react";

interface SkeletonGateProps {
  skeleton?: ReactNode;
  children: ReactNode;
}

/** Renders children immediately. Route loading.tsx + ProductImage handle real loading states. */
export default function SkeletonGate({ children }: SkeletonGateProps) {
  return <>{children}</>;
}
