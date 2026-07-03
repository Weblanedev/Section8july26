"use client";

import { useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import DealCard from "@/components/marketplace/DealCard";
import ProductScroller from "@/components/marketplace/ProductScroller";
import FlashSaleBar from "@/components/marketplace/FlashSaleBar";
import PromoStrip from "@/components/marketplace/PromoStrip";
import ProductsPageSkeleton from "@/components/skeletons/ProductsPageSkeleton";
import SkeletonGate from "@/components/ui/SkeletonGate";
import {
  productsData,
  categoryLabels,
  getTopDeals,
  getHotDeals,
} from "@/data/products";
import { categoryNav } from "@/data/marketplace";

function ProductsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";

  const filtered = useMemo(() => {
    let result = [...productsData];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search)
      );
    }

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "deals") {
      result.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    }

    return result;
  }, [search, category, sort]);

  const categories = Object.keys(categoryLabels);
  const categoryTitle = categoryLabels[category] || "All Products";
  const showMarketplaceSections = !search && category === "all" && sort === "default";

  return (
    <div>
      {/* Breadcrumb & header bar */}
      <div className="bg-marketplace/10 border-b border-marketplace/20">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <p className="text-xs text-muted">
            <Link href="/" className="hover:text-marketplace">Home</Link>
            {" / "}
            <span className="text-primary font-medium">{categoryTitle}</span>
          </p>
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h1 className="text-2xl font-extrabold">
              {search ? `Results for "${search}"` : categoryTitle}
            </h1>
            <div className="flex items-center gap-3">
              <a
                href="tel:+2349096361527"
                className="rounded-lg bg-marketplace px-4 py-2 text-sm font-bold text-white hover:bg-marketplace-dark"
              >
                📞 Call to Order
              </a>
            </div>
          </div>
        </div>
      </div>

      {showMarketplaceSections && (
        <>
          <FlashSaleBar />
          <PromoStrip />
          <ProductScroller
            title="Hot Deals"
            subtitle="Biggest discounts right now"
            products={getHotDeals(12)}
            seeAllHref="/products?sort=deals"
          />
          <ProductScroller
            title="Top Deals"
            products={getTopDeals(12)}
            seeAllHref="/products?sort=deals"
          />
        </>
      )}

      {/* Category quick links */}
      <section className="border-b border-surface-light/30 py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categoryNav.slice(0, 10).map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="shrink-0 rounded-full border border-surface-light bg-surface px-4 py-1.5 text-xs font-medium hover:border-marketplace hover:text-marketplace transition-colors"
              >
                {cat.icon} {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="card p-4 sticky top-36 space-y-6">
              <div>
                <h3 className="font-bold mb-3 text-sm uppercase tracking-wider">Category</h3>
                <div className="space-y-0.5">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href={`/products?category=${cat}${search ? `&search=${search}` : ""}${sort !== "default" ? `&sort=${sort}` : ""}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        category === cat
                          ? "bg-marketplace/15 text-marketplace font-semibold"
                          : "text-muted hover:text-primary hover:bg-surface-light"
                      }`}
                    >
                      {categoryLabels[cat]}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 text-sm uppercase tracking-wider">Sort by</h3>
                <div className="space-y-0.5">
                  {[
                    { value: "default", label: "Popularity" },
                    { value: "deals", label: "Top Deals" },
                    { value: "price-asc", label: "Price: Low to High" },
                    { value: "price-desc", label: "Price: High to Low" },
                  ].map((opt) => (
                    <a
                      key={opt.value}
                      href={`/products?category=${category}&sort=${opt.value}${search ? `&search=${search}` : ""}`}
                      className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                        sort === opt.value
                          ? "bg-marketplace/15 text-marketplace font-semibold"
                          : "text-muted hover:text-primary"
                      }`}
                    >
                      {opt.label}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 text-sm uppercase tracking-wider">Discount</h3>
                <div className="space-y-1 text-sm text-muted">
                  <p>50% or more</p>
                  <p>30% or more</p>
                  <p>20% or more</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {showMarketplaceSections && (
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Shop By Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(["laptops", "phones", "office", "gaming"] as const).map((cat) => (
                    <Link
                      key={cat}
                      href={`/products?category=${cat}`}
                      className="card p-4 text-center hover:border-marketplace/40 hover:scale-[1.02] transition-all"
                    >
                      <span className="text-2xl block mb-1">
                        {cat === "laptops" ? "💻" : cat === "phones" ? "📱" : cat === "office" ? "🖱️" : "🎮"}
                      </span>
                      <p className="text-sm font-semibold">{categoryLabels[cat]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-muted">No products found. Try a different search or category.</p>
                <Link href="/products" className="btn-secondary mt-4 inline-flex">
                  View all products
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold mb-4">
                  {sort === "deals" ? "All Deals" : "All Products"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {filtered.map((product) => (
                    <DealCard key={product.id} product={product} className="w-full" />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SEO content block */}
      {showMarketplaceSections && (
        <section className="border-t border-surface-light/30 bg-surface/20 py-12 px-4">
          <div className="mx-auto max-w-4xl prose prose-invert prose-sm">
            <h2 className="text-xl font-bold text-primary">Buy Tech Products Online in Nigeria</h2>
            <p className="text-muted leading-relaxed mt-3">
              Section Eight is Nigeria&apos;s modern tech products marketplace - phones, laptops, gaming gear,
              office accessories and budget gadgets. Shop with secure checkout, nationwide delivery,
              and deals updated daily. From ₦5,000 accessories to premium MacBooks, find everything
              you need in one place.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <SkeletonGate skeleton={<ProductsPageSkeleton />}>
        <ProductsContent />
      </SkeletonGate>
    </Suspense>
  );
}
