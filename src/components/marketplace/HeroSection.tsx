"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { categoryNav, heroSlides } from "@/data/marketplace";
import { getBannerUrl } from "@/data/productPhotos";

export default function HeroSection() {
  const [slide, setSlide] = useState(0);

  const goToSlide = (index: number) => {
    setSlide((index + heroSlides.length) % heroSlides.length);
  };

  const goPrev = () => goToSlide(slide - 1);
  const goNext = () => goToSlide(slide + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[slide];

  return (
    <section className="bg-marketplace px-3 py-4 sm:px-4">
      <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-[220px_1fr_220px]">
        <aside className="hidden lg:block rounded-lg bg-white shadow-lg overflow-hidden animate-slide-up">
          <div className="bg-marketplace px-4 py-2.5 text-sm font-bold text-white">
            Shop by Category
          </div>
          <nav className="max-h-[360px] overflow-y-auto scrollbar-thin">
            {categoryNav.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex items-center gap-3 border-b border-gray-100 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-marketplace transition-colors"
              >
                <span className="text-base">{cat.icon}</span>
                <span className="font-medium">{cat.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] rounded-lg overflow-hidden shadow-lg animate-slide-up">
          <div className="absolute inset-0 z-0">
            <Image
              key={current.image}
              src={getBannerUrl(current.image)}
              alt={current.subtitle}
              fill
              priority
              className="object-cover transition-opacity duration-700"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div
            className={`absolute inset-0 z-[1] bg-gradient-to-r from-black/75 via-black/45 to-black/15 ${current.tint}`}
          />

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:left-4 sm:h-11 sm:w-11"
            aria-label="Previous banner"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:right-4 sm:h-11 sm:w-11"
            aria-label="Next banner"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative z-10 flex h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[360px] flex-col justify-between p-6 sm:p-8 text-white">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider opacity-90">
                {current.title}
              </p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold leading-tight drop-shadow-lg">
                {current.subtitle}
              </h2>
              <p className="mt-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-bold backdrop-blur">
                {current.discount}
              </p>
            </div>
            <div className="flex justify-end">
              <Link
                href={current.href}
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-gray-900 shadow-lg hover:scale-105 transition-transform"
              >
                {current.cta}
              </Link>
            </div>
          </div>
          <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <aside className="hidden lg:flex flex-col gap-3">
          <div className="rounded-lg bg-white p-4 shadow-lg flex-1 animate-slide-up">
            <p className="text-xs font-bold uppercase text-marketplace">Call to Order</p>
            <a href="tel:+2349096361527" className="mt-1 block text-lg font-bold text-gray-900 hover:text-marketplace">
              +234 909 636 1527
            </a>
            <div className="mt-4 space-y-3 border-t pt-3">
              <Link href="/affiliate" className="flex items-center gap-2 text-sm text-gray-700 hover:text-marketplace">
                <span>🤝</span> Sell on Section Eight
              </Link>
              <Link href="/contact" className="flex items-center gap-2 text-sm text-gray-700 hover:text-marketplace">
                <span>📦</span> Track Your Order
              </Link>
              <Link href="/products?category=budget" className="flex items-center gap-2 text-sm text-gray-700 hover:text-marketplace">
                <span>💰</span> Budget Store
              </Link>
            </div>
          </div>
          <Link
            href="/affiliate"
            className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 p-4 text-white shadow-lg hover:scale-[1.02] transition-transform animate-slide-up"
          >
            <p className="text-xs font-bold uppercase opacity-90">Section Eight</p>
            <p className="text-lg font-extrabold">AFFILIATE FORCE</p>
            <p className="mt-1 text-xs opacity-80">From ₦49,999 - earn up to 15%</p>
            <span className="mt-3 inline-block rounded bg-white/20 px-3 py-1 text-xs font-bold">
              JOIN NOW →
            </span>
          </Link>
        </aside>
      </div>
    </section>
  );
}
