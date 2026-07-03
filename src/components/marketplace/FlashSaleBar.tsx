"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function getNextFlashEnd(): Date {
  const now = new Date();
  const end = new Date(now);
  // Flash sale ends at 8PM WAT today, or tomorrow if already passed
  end.setHours(20, 0, 0, 0);
  if (now >= end) end.setDate(end.getDate() + 1);
  return end;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function FlashSaleBar() {
  const [end] = useState(getNextFlashEnd);
  const [left, setLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, end.getTime() - Date.now());
      setLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  return (
    <div className="bg-gradient-to-r from-red-600 via-marketplace to-amber-500 text-white">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="animate-pulse text-xl">⚡</span>
          <div>
            <p className="font-extrabold text-sm sm:text-base uppercase tracking-wide">
              Flash Sale - Ends Tonight
            </p>
            <p className="text-xs opacity-90 hidden sm:block">
              Up to 70% off laptops, phones & accessories
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 font-mono text-sm font-bold">
            {[
              { label: "HRS", value: left.h },
              { label: "MIN", value: left.m },
              { label: "SEC", value: left.s },
            ].map((unit) => (
              <div key={unit.label} className="text-center">
                <span className="block rounded bg-black/25 px-2 py-1 min-w-[2.5rem]">
                  {pad(unit.value)}
                </span>
                <span className="text-[9px] opacity-80">{unit.label}</span>
              </div>
            ))}
          </div>
          <Link
            href="/products?sort=deals"
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-marketplace hover:scale-105 transition-transform shrink-0"
          >
            Shop Deals
          </Link>
        </div>
      </div>
    </div>
  );
}
