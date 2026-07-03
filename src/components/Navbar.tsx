"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useUserAccount } from "@/hooks/useUserAccount";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getTotalItems, openCart } = useCartStore();
  const { isSubscribed } = useUserAccount();
  const totalItems = getTotalItems();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/affiliate", label: "Affiliate" },
    { href: "/about", label: "About" },
    ...(isAuthenticated
      ? [
          { href: "/dashboard", label: "Dashboard" },
          ...(isSubscribed ? [{ href: "/affiliate/program", label: "My Affiliate" }] : []),
        ]
      : []),
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-surface-light/30 shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-marketplace font-bold text-white text-sm">
            S8
          </div>
          <span className="hidden sm:block text-lg font-bold">
            Section <span className="text-marketplace">Eight</span>
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands and categories"
            className="flex-1 rounded-l-lg border border-surface-light bg-surface px-4 py-2 text-sm focus:border-marketplace focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-marketplace px-5 py-2 text-sm font-bold text-white hover:bg-marketplace-dark transition-colors"
          >
            Search
          </button>
        </form>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {isAuthenticated && user && (
            <span className="signed-in-badge hidden lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              {user.name.split(" ")[0]}
            </span>
          )}

          <button onClick={openCart} className="relative btn-ghost" aria-label="Open cart">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-marketplace text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <button onClick={logout} className="btn-ghost text-sm hidden sm:inline-flex">
              Sign out
            </button>
          ) : (
            <>
              <Link href="/login" className="btn-ghost text-sm hidden sm:inline-flex">
                Account
              </Link>
              <Link href="/signup" className="rounded-lg bg-marketplace px-3 py-1.5 text-sm font-bold text-white hover:bg-marketplace-dark sm:px-4 sm:py-2">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-surface-light/20 bg-surface/50">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 scrollbar-thin">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-marketplace/15 text-marketplace"
                  : "text-muted hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/products?sort=deals" className="shrink-0 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-bold text-marketplace animate-pulse">
            🔥 Deals
          </Link>
        </div>
      </nav>
    </header>
  );
}
