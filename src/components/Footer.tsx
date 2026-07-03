"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Please consent to receive newsletters");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
    setConsent(false);
  };

  return (
    <footer>
      {/* Newsletter band */}
      <div className="bg-surface border-t border-surface-light/30">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-marketplace font-bold text-white text-lg">
                S8
              </div>
              <div>
                <p className="font-bold text-lg">Section Eight</p>
                <p className="text-sm text-muted">Nigeria&apos;s tech marketplace</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                New to Section Eight?
              </h3>
              <p className="text-sm text-muted mb-3">
                Subscribe for deals, new arrivals, and exclusive offers. Read our{" "}
                <Link href="/privacy" className="text-marketplace hover:underline">
                  Privacy Policy
                </Link>.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label className="flex items-start gap-2 text-xs text-muted">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 accent-marketplace"
                  />
                  I consent to Section Eight processing my data to send newsletters.
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="input-field flex-1 !bg-background"
                    required
                  />
                  <button type="submit" className="btn-primary shrink-0 !bg-marketplace hover:!bg-marketplace-dark">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
                Download Our App
              </h3>
              <p className="text-sm text-muted mb-3">Get access to exclusive offers!</p>
              <div className="flex gap-2">
                <span className="rounded-lg border border-surface-light px-4 py-2 text-xs font-semibold text-muted">
                  App Store
                </span>
                <span className="rounded-lg border border-surface-light px-4 py-2 text-xs font-semibold text-muted">
                  Google Play
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="bg-[#1a2235] text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <h4 className="text-sm font-bold uppercase text-white mb-4">Need Help?</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-marketplace">Contact Us</Link></li>
                <li><Link href="/refund-return" className="hover:text-marketplace">Returns & Refunds</Link></li>
                <li><a href="tel:+2349096361527" className="hover:text-marketplace">Call to Order</a></li>
                <li><Link href="/contact" className="hover:text-marketplace">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-white mb-4">Useful Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="hover:text-marketplace">How to Shop</Link></li>
                <li><Link href="/refund-return" className="hover:text-marketplace">Delivery & Returns</Link></li>
                <li><Link href="/about" className="hover:text-marketplace">About Section Eight</Link></li>
                <li><Link href="/affiliate" className="hover:text-marketplace">Sell on Section Eight</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-marketplace">About Us</Link></li>
                <li><Link href="/affiliate" className="hover:text-marketplace">Affiliate Program</Link></li>
                <li><Link href="/products?sort=deals" className="hover:text-marketplace">Top Deals</Link></li>
                <li><Link href="/products?category=budget" className="hover:text-marketplace">Budget Store</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-white mb-4">Privacy</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-marketplace">Privacy Policy</Link></li>
                <li><Link href="/privacy" className="hover:text-marketplace">Cookie Notice</Link></li>
                <li><Link href="/refund-return" className="hover:text-marketplace">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase text-white mb-4">Make Money</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/affiliate" className="hover:text-marketplace">Become an Affiliate</Link></li>
                <li><Link href="/affiliate/program" className="hover:text-marketplace">Vendor Hub</Link></li>
                <li><Link href="/signup" className="hover:text-marketplace">Create Account</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© 2026 Section Eight. All rights reserved.</p>
            <p>12, Thomas Olaniyan Street, Anthony Village, Lagos</p>
            <div className="flex gap-3">
              <span className="rounded bg-gray-800 px-2 py-1 text-xs">Card</span>
              <span className="rounded bg-gray-800 px-2 py-1 text-xs">Bank Transfer</span>
              <span className="rounded bg-gray-800 px-2 py-1 text-xs">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
