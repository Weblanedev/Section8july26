"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatNaira } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import ProductImage from "@/components/ui/ProductImage";

interface DealCardProps {
  product: Product;
  compact?: boolean;
  className?: string;
}

export default function DealCard({ product, compact, className }: DealCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success("Added to cart");
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className={`group block rounded-xl bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden ${
        className ?? (compact ? "shrink-0 snap-start w-40 sm:w-44" : "shrink-0 snap-start w-48 sm:w-52")
      }`}
    >
      <div className="relative aspect-square bg-gray-50">
        <ProductImage
          src={product.image}
          alt={product.name}
          sizes="200px"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <span className="absolute left-2 top-2 rounded bg-marketplace px-1.5 py-0.5 text-[10px] font-bold text-white">
            -{product.discount}%
          </span>
        )}
        {product.badge && (
          <span className="absolute right-2 top-2 rounded bg-cyan-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-2.5 sm:p-3">
        <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem] group-hover:text-marketplace">
          {product.name}
        </h3>
        <div className="mt-1.5 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm font-bold text-marketplace">
            {formatNaira(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] text-gray-400 line-through">
              {formatNaira(product.originalPrice)}
            </span>
          )}
        </div>
        {product.rating && (
          <p className="mt-1 text-[10px] text-gray-500">
            ★ {product.rating.toFixed(1)} ({product.reviewCount?.toLocaleString()})
          </p>
        )}
        <button
          onClick={handleAdd}
          className="mt-2 w-full rounded-lg bg-marketplace/10 py-1.5 text-xs font-semibold text-marketplace hover:bg-marketplace hover:text-white transition-colors"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}
