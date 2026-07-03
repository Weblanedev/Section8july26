"use client";

import Link from "next/link";
import HomePageSkeleton from "@/components/skeletons/HomePageSkeleton";
import SkeletonGate from "@/components/ui/SkeletonGate";
import HeroSection from "@/components/marketplace/HeroSection";
import PromoStrip from "@/components/marketplace/PromoStrip";
import FlashSaleBar from "@/components/marketplace/FlashSaleBar";
import ProductScroller from "@/components/marketplace/ProductScroller";
import CategoryBanners from "@/components/marketplace/CategoryBanners";
import { affiliatePackages } from "@/data/affiliate";
import {
  getHotDeals,
  getTopDeals,
  getProductsByCategory,
  getFeaturedProducts,
} from "@/data/products";
import { formatNaira } from "@/lib/format";

function HomeContent() {
  const hotDeals = getHotDeals(12);
  const topDeals = getTopDeals(12);
  const laptops = getProductsByCategory("laptops", 12);
  const office = getProductsByCategory("office", 12);
  const phones = getProductsByCategory("phones", 12);
  const budget = getProductsByCategory("budget", 12);
  const featured = getFeaturedProducts();

  return (
    <div className="bg-background">
      <HeroSection />
      <FlashSaleBar />
      <PromoStrip />

      {/* Stats marquee */}
      <section className="border-y border-surface-light/30 bg-surface/40 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-sm font-semibold text-muted">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12">
              <span>🚀 Wide Tech Selection</span>
              <span>💰 From ₦5,000</span>
              <span>🔒 Secure Checkout</span>
              <span>📦 Nationwide Delivery</span>
              <span>🔥 Daily Deals</span>
              <span>🤝 Affiliate Program</span>
              <span>⭐ Verified Sellers</span>
            </div>
          ))}
        </div>
      </section>

      <ProductScroller
        title="Hot Deals"
        subtitle="Biggest discounts right now"
        products={hotDeals}
        seeAllHref="/products?sort=deals"
      />

      <CategoryBanners />

      <ProductScroller
        title="Top Deals"
        subtitle="Best discounts right now"
        products={topDeals}
        seeAllHref="/products?sort=deals"
      />

      <ProductScroller
        title="Laptops & Computing"
        subtitle="Work, study and create"
        products={laptops}
        seeAllHref="/products?category=laptops"
      />

      <ProductScroller
        title="Computer Accessories"
        subtitle="Mice, keyboards, hubs and more"
        products={office}
        seeAllHref="/products?category=office"
      />

      {/* Affiliate CTA */}
      <section className="py-10 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-marketplace to-orange-600 p-8 md:p-12 text-white shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold mb-4">
                  EARN WITH US
                </span>
                <h2 className="text-3xl font-extrabold mb-3">Join Our Affiliate Program</h2>
                <p className="opacity-90 mb-6 max-w-md">
                  Resell our products and earn up to 15% commission. Packages from{" "}
                  {formatNaira(affiliatePackages[0].price)}.
                </p>
                <Link
                  href="/affiliate"
                  className="inline-flex rounded-lg bg-white px-6 py-3 font-bold text-marketplace hover:scale-105 transition-transform"
                >
                  View Packages →
                </Link>
              </div>
              <div className="grid gap-2">
                {affiliatePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="flex items-center justify-between rounded-xl bg-white/15 backdrop-blur px-4 py-3"
                  >
                    <div>
                      <p className="font-bold">{pkg.name}</p>
                      <p className="text-xs opacity-80">{pkg.commission} commission</p>
                    </div>
                    <p className="font-extrabold">{formatNaira(pkg.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductScroller
        title="Phones & Tablets"
        subtitle="Latest smartphones"
        products={phones}
        seeAllHref="/products?category=phones"
      />

      <ProductScroller
        title="Budget Tech Products Store"
        subtitle="Quality gadgets from ₦5,000"
        products={budget}
        seeAllHref="/products?category=budget"
      />

      <ProductScroller
        title="Featured Products"
        subtitle="Handpicked for quality"
        products={featured}
        seeAllHref="/products"
      />

      {/* Trust badges */}
      <section className="py-12 px-4 border-t border-surface-light/30 bg-surface/20">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔒", title: "Secure Payments", desc: "Card & bank transfer" },
            { icon: "🚀", title: "Fast Delivery", desc: "Nationwide shipping" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day policy" },
            { icon: "✅", title: "Quality Guaranteed", desc: "Verified products" },
          ].map((item) => (
            <div key={item.title} className="card p-5 text-center hover:border-marketplace/30 transition-colors">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-bold mt-2 text-sm">{item.title}</h3>
              <p className="text-xs text-muted mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <SkeletonGate skeleton={<HomePageSkeleton />}>
      <HomeContent />
    </SkeletonGate>
  );
}
