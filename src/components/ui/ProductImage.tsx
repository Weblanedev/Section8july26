"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/cn";

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  containerClassName?: string;
}

function ImagePlaceholder({ alt }: { alt: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-surface-light text-muted"
      aria-label={alt}
    >
      <svg
        className="h-10 w-10 opacity-40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
      <span className="mt-2 text-xs opacity-60">Image unavailable</span>
    </div>
  );
}

export default function ProductImage({
  src,
  alt,
  fill = true,
  className,
  sizes,
  priority,
  containerClassName,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const markLoaded = useCallback(() => setLoaded(true), []);
  const markError = useCallback(() => setError(true), []);

  if (error) {
    return (
      <div
        className={cn(
          "relative size-full overflow-hidden",
          containerClassName
        )}
      >
        <ImagePlaceholder alt={alt} />
      </div>
    );
  }

  return (
    <div
      className={cn("relative size-full overflow-hidden", containerClassName)}
    >
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-none pointer-events-none" />
      )}
      <Image
        key={src}
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
        onLoad={markLoaded}
        onError={markError}
      />
    </div>
  );
}
