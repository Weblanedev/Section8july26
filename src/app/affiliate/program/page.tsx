"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useUserAccount, useAffiliateActions } from "@/hooks/useUserAccount";
import { getAffiliatePackage } from "@/data/affiliate";
import { AffiliateMode } from "@/types";
import { usePersistHydration } from "@/hooks/usePersistHydration";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

export default function AffiliateProgramPage() {
  const router = useRouter();
  const hydrated = usePersistHydration();
  const { isAuthenticated } = useAuthStore();
  const { isSubscribed, affiliate, pendingListings } = useUserAccount();
  const { setMode, submitListing, getReferralLink } = useAffiliateActions();
  const profile = affiliate;

  const [listingForm, setListingForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "accessories",
  });

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login?redirect=/affiliate/program");
      return;
    }
    if (!isSubscribed) {
      router.replace("/affiliate");
    }
  }, [hydrated, isAuthenticated, isSubscribed, router]);

  if (!hydrated || !isAuthenticated || !isSubscribed || !profile) {
    return <DashboardSkeleton />;
  }

  const pkg = getAffiliatePackage(profile.tier);
  const referralLink = getReferralLink();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied!");
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingForm.name || !listingForm.price) {
      toast.error("Please fill in product name and price");
      return;
    }
    submitListing({
      name: listingForm.name,
      price: Number(listingForm.price),
      description: listingForm.description,
      category: listingForm.category,
    });
    setListingForm({ name: "", price: "", description: "", category: "accessories" });
    toast.success("Product submitted for review!");
  };

  const modes: { id: AffiliateMode; title: string; desc: string; icon: string }[] = [
    {
      id: "resell",
      title: "Resell Our Products",
      desc: "Share your referral link and earn commission on every sale through your link.",
      icon: "🔗",
    },
    {
      id: "list",
      title: "List Your Products",
      desc: "Submit your tech products for us to review and list on Section Eight. Get featured store pages.",
      icon: "📦",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8">
        <div className="signed-in-badge inline-flex mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Affiliate Member - {pkg?.name}
        </div>
        <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
        <p className="text-muted mt-1">
          {pkg?.commission} commission · Joined{" "}
          {new Date(profile.subscribedAt).toLocaleDateString("en-NG")}
        </p>
      </div>

      {/* Mode selection */}
      {!profile.mode && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4">What would you like to do?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  toast.success(`Mode set: ${m.title}`);
                }}
                className="card p-6 text-left hover:border-accent/40 transition-all hover:-translate-y-0.5"
              >
                <span className="text-3xl mb-3 block">{m.icon}</span>
                <h3 className="font-bold mb-2">{m.title}</h3>
                <p className="text-sm text-muted">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resell mode */}
      {profile.mode === "resell" && (
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-bold mb-4">Your Referral Link</h2>
            <div className="flex gap-2">
              <input
                readOnly
                value={referralLink}
                className="input-field flex-1 text-sm"
              />
              <button onClick={handleCopyLink} className="btn-primary shrink-0">
                Copy
              </button>
            </div>
            <p className="text-xs text-muted mt-2">
              Share this link. You earn {pkg?.commission} on every completed sale.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-bold mb-4">Quick Share</h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Shop tech products at Section Eight! ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Share on WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out Section Eight for affordable tech! ${referralLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                Share on X
              </a>
            </div>
          </div>

          <button
            onClick={() => setMode(null)}
            className="text-sm text-muted hover:text-accent"
          >
            ← Switch mode
          </button>
        </div>
      )}

      {/* List mode */}
      {profile.mode === "list" && (
        <div className="space-y-6">
          <form onSubmit={handleSubmitListing} className="card p-6 space-y-4">
            <h2 className="font-bold">Submit a Product for Listing</h2>
            <input
              type="text"
              placeholder="Product name *"
              value={listingForm.name}
              onChange={(e) => setListingForm({ ...listingForm, name: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="number"
              placeholder="Price in NGN *"
              value={listingForm.price}
              onChange={(e) => setListingForm({ ...listingForm, price: e.target.value })}
              className="input-field"
              required
            />
            <select
              value={listingForm.category}
              onChange={(e) => setListingForm({ ...listingForm, category: e.target.value })}
              className="input-field"
            >
              <option value="phones">Phones</option>
              <option value="laptops">Laptops</option>
              <option value="accessories">Accessories</option>
              <option value="gaming">Gaming</option>
              <option value="office">Office</option>
            </select>
            <textarea
              placeholder="Product description"
              value={listingForm.description}
              onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
              className="input-field min-h-[100px]"
              rows={3}
            />
            <button type="submit" className="btn-primary">
              Submit for Review
            </button>
          </form>

          {pendingListings.length > 0 && (
            <div className="card p-6">
              <h2 className="font-bold mb-4">Your Submissions</h2>
              <div className="space-y-3">
                {pendingListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center justify-between rounded-lg bg-surface-light/50 p-3"
                  >
                    <div>
                      <p className="font-medium text-sm">{listing.name}</p>
                      <p className="text-xs text-muted">
                        ₦{listing.price.toLocaleString()} · {listing.category}
                      </p>
                    </div>
                    <span
                      className={`badge ${
                        listing.status === "pending"
                          ? "bg-warning/20 text-warning"
                          : listing.status === "approved"
                          ? "bg-success/20 text-success"
                          : "bg-danger/20 text-danger"
                      }`}
                    >
                      {listing.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setMode(null)}
            className="text-sm text-muted hover:text-accent"
          >
            ← Switch mode
          </button>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link href="/dashboard" className="text-sm text-muted hover:text-accent">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
