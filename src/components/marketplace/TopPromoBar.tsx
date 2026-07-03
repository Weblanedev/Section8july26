"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { topPromoMessages } from "@/data/marketplace";

export default function TopPromoBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % topPromoMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const promo = topPromoMessages[index];

  return (
    <div className="bg-marketplace text-white text-xs sm:text-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <p className="truncate font-medium animate-fade-in" key={promo.text}>
          {promo.text}
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={promo.href}
            className="rounded bg-white/20 px-3 py-1 font-semibold hover:bg-white/30 transition-colors"
          >
            {promo.cta}
          </Link>
          <a href="tel:+2349096361527" className="hidden sm:inline hover:underline">
            Call: +234 909 636 1527
          </a>
        </div>
      </div>
    </div>
  );
}
