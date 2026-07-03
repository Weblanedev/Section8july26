"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Product } from "@/types";
import { formatNaira } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import ProductImage from "@/components/ui/ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="card overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-surface-light">
          <ProductImage
            src={product.image}
            alt={product.name}
            className="transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <span className="badge absolute left-3 top-3 z-10 bg-accent/90 text-background">
              {product.badge}
            </span>
          )}
          {product.isBudget && !product.badge && (
            <span className="badge absolute left-3 top-3 z-10 bg-success/90 text-background">
              Budget
            </span>
          )}
        </div>

        <div className="p-4">
          {product.discount && (
            <span className="text-[10px] font-bold text-marketplace">-{product.discount}%</span>
          )}
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            {product.category}
          </p>
          <h3 className="font-semibold text-primary line-clamp-2 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted line-clamp-2 mt-1 mb-3">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-accent">
                {formatNaira(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="block text-xs text-muted line-through">
                  {formatNaira(product.originalPrice)}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-background"
            >
              + Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
