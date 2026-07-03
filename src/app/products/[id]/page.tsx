"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import { getProductById } from "@/data/products";
import { formatNaira } from "@/lib/format";
import { useCartStore } from "@/store/cartStore";
import ProductImage from "@/components/ui/ProductImage";
import ProductDetailSkeleton from "@/components/skeletons/ProductDetailSkeleton";
import SkeletonGate from "@/components/ui/SkeletonGate";

function ProductDetailContent({
  id,
}: {
  id: string;
}) {
  const product = getProductById(id);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const [color, setColor] = useState(product?.color || "");
  const [size, setSize] = useState(product?.spec || "");

  if (!product) notFound();

  const handleAddToCart = () => {
    addItem(product, 1, color, size);
    toast.success("Added to cart!");
    openCart();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Link href="/products" className="text-sm text-muted hover:text-accent mb-6 inline-flex items-center gap-1">
        ← Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-light card">
          <ProductImage
            src={product.image}
            alt={product.name}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {product.badge && (
            <span className="badge absolute left-4 top-4 bg-accent text-background">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <p className="text-sm text-accent uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-accent mb-6">
            {formatNaira(product.price)}
          </p>
          <p className="text-muted mb-8 leading-relaxed">
            {product.detailedDescription || product.description}
          </p>

          {product.availableColors.length > 1 && (
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                      color === c
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-surface-light hover:border-accent/30"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.availableSizes && product.availableSizes.length > 1 && (
            <div className="mb-8">
              <label className="text-sm font-medium mb-2 block">Storage / Size</label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                      size === s
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-surface-light hover:border-accent/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={handleAddToCart} className="btn-primary flex-1">
              Add to Cart
            </button>
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="btn-secondary flex-1"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-8 card p-4 space-y-2 text-sm text-muted">
            <p>✓ Secure payment</p>
            <p>✓ Nationwide delivery</p>
            <p>✓ 7-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <SkeletonGate skeleton={<ProductDetailSkeleton />}>
      <ProductDetailContent id={id} />
    </SkeletonGate>
  );
}
