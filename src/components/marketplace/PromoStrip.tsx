"use client";

import Link from "next/link";
import { promoTiles } from "@/data/marketplace";

export default function PromoStrip() {
  return (
    <section className="bg-marketplace/10 border-y border-marketplace/20 py-4">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin snap-x snap-mandatory">
          {promoTiles.map((tile) => (
            <Link
              key={tile.title}
              href={tile.href}
              className={`snap-start shrink-0 w-36 sm:w-44 rounded-xl ${tile.color} p-4 text-white shadow-md hover:scale-105 hover:shadow-lg transition-all`}
            >
              <span className="text-2xl">{tile.emoji}</span>
              <p className="mt-2 text-sm font-bold leading-tight">{tile.title}</p>
              <p className="text-xs opacity-90 mt-0.5">{tile.subtitle}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
