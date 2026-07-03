"use client";

import Link from "next/link";
import { Product } from "@/types";
import DealCard from "./DealCard";

interface ProductScrollerProps {
  title: string;
  subtitle?: string;
  products: Product[];
  seeAllHref?: string;
}

export default function ProductScroller({
  title,
  subtitle,
  products,
  seeAllHref = "/products",
}: ProductScrollerProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-primary">{title}</h2>
            {subtitle && <p className="text-sm text-muted mt-0.5">{subtitle}</p>}
          </div>
          <Link
            href={seeAllHref}
            className="text-sm font-semibold text-marketplace hover:underline"
          >
            See All →
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin snap-x snap-mandatory">
          {products.map((product) => (
            <DealCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
