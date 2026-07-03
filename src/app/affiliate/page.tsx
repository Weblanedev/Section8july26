"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { affiliatePackages } from "@/data/affiliate";
import { useAuthStore } from "@/store/authStore";
import { useUserAccount } from "@/hooks/useUserAccount";
import { formatNaira } from "@/lib/format";
import { AffiliateTier } from "@/types";
import { Spinner, SpinnerOverlay } from "@/components/ui/Spinner";
import AffiliatePageSkeleton from "@/components/skeletons/AffiliatePageSkeleton";
import SkeletonGate from "@/components/ui/SkeletonGate";

function AffiliateContent() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { isSubscribed } = useUserAccount();
  const [selected, setSelected] = useState<AffiliateTier | null>(null);
  const [loading, setLoading] = useState(false);

  if (isSubscribed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">You&apos;re already an affiliate!</h1>
        <Link href="/affiliate/program" className="btn-primary">
          Go to Affiliate Dashboard
        </Link>
      </div>
    );
  }

  const handleSubscribe = async (tier: AffiliateTier) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/affiliate`);
      return;
    }

    const pkg = affiliatePackages.find((p) => p.id === tier);
    if (!pkg) return;

    setSelected(tier);
    setLoading(true);

    try {
      const res = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: pkg.price,
          email: user?.email,
          name: user?.name,
          type: "affiliate",
          metadata: { tier },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.checkoutUrl.includes("demo=true")) {
        sessionStorage.setItem("pendingAffiliateTier", tier);
        router.push(`/affiliate/success?reference=${data.reference}&demo=true`);
        return;
      }

      sessionStorage.setItem("pendingAffiliateTier", tier);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
      setSelected(null);
    }
  };

  return (
    <div>
      {loading && <SpinnerOverlay message="Processing subscription..." />}
      {/* Hero */}
      <section className="px-4 py-20 text-center mesh-bg">
        <div className="mx-auto max-w-3xl">
          <span className="badge bg-warning/20 text-warning mb-4">Affiliate Program</span>
          <h1 className="text-4xl font-bold mb-4">
            Earn Money with <span className="gradient-text">Section Eight</span>
          </h1>
          <p className="text-muted text-lg">
            Resell our tech products and earn commission, or list your own products on our platform.
            Choose a package that fits your goals.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 border-b border-surface-light/30">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choose a Package",
                desc: "Pick Starter, Pro, or Enterprise based on your goals and budget.",
              },
              {
                step: "2",
                title: "Pay & Activate",
                desc: "Complete payment to activate your affiliate account instantly.",
              },
              {
                step: "3",
                title: "Start Earning",
                desc: "Resell our products or submit yours for listing on Section Eight.",
              },
            ].map((item) => (
              <div key={item.step} className="card p-6 text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-background font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-center mb-10">Affiliate Packages</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {affiliatePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`card p-6 flex flex-col relative ${
                  pkg.popular ? "border-accent/40 ring-1 ring-accent/20" : ""
                }`}
              >
                {pkg.popular && (
                  <span className="badge absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-background">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-3xl font-bold text-accent mt-2">
                  {formatNaira(pkg.price)}
                </p>
                <p className="text-sm text-muted mt-1">{pkg.commission} commission</p>
                <p className="text-sm text-muted mt-3 mb-6">{pkg.description}</p>

                <ul className="space-y-2 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <svg className="h-4 w-4 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(pkg.id)}
                  disabled={loading && selected === pkg.id}
                  className={`w-full ${pkg.popular ? "btn-primary" : "btn-secondary"}`}
                >
                  {loading && selected === pkg.id ? (
                    <span className="inline-flex items-center justify-center gap-2">
                      <Spinner size="sm" />
                      Processing...
                    </span>
                  ) : isAuthenticated ? (
                    `Subscribe - ${formatNaira(pkg.price)}`
                  ) : (
                    "Sign in to Subscribe"
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-16 px-4 bg-surface/20">
        <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-3">🛒 Resell Our Products</h3>
            <p className="text-muted text-sm">
              Get your unique referral link and earn commission on every sale.
              Share on WhatsApp, Instagram, or your website. We handle fulfillment.
            </p>
          </div>
          <div className="card p-8">
            <h3 className="text-xl font-bold mb-3">📦 List Your Products</h3>
            <p className="text-muted text-sm">
              Have tech products to sell? Submit them for review and we&apos;ll list them
              on Section Eight. Enterprise partners get featured store pages.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AffiliatePage() {
  return (
    <SkeletonGate skeleton={<AffiliatePageSkeleton />}>
      <AffiliateContent />
    </SkeletonGate>
  );
}
