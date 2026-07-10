"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useAffiliateActions, recordTransactionForUser } from "@/hooks/useUserAccount";
import { getAffiliatePackage } from "@/data/affiliate";
import { AffiliateTier } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const { subscribe } = useAffiliateActions();
  const userId = useAuthStore((s) => s.user?.id);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!reference || done) return;

    fetch(`/api/payment/verify?reference=${reference}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "success") {
          const tier = sessionStorage.getItem("pendingAffiliateTier") as AffiliateTier;
          if (tier && userId) {
            subscribe(tier);
            const pkg = getAffiliatePackage(tier);
            recordTransactionForUser(userId, {
              id: `tx_${Date.now()}`,
              type: "affiliate",
              amount: pkg?.price ?? 0,
              status: "success",
              reference,
              description: `${pkg?.name ?? tier} affiliate subscription`,
              createdAt: new Date().toISOString(),
            });
            sessionStorage.removeItem("pendingAffiliateTier");
            setDone(true);
            toast.success("Affiliate subscription activated!");
          }
        }
      });
  }, [reference, subscribe, done, userId]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="card p-10">
        {done ? (
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
            <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : (
          <div className="mx-auto mb-8 flex justify-center py-4">
            <Spinner size="xl" />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-2">
          {done ? "Subscription Active!" : "Activating subscription..."}
        </h1>
        <p className="text-muted mb-6">
          {done
            ? "Welcome to the Section Eight Affiliate Program. Start earning today."
            : "Please wait while we confirm your payment."}
        </p>
        {done ? (
          <Link href="/affiliate/program" className="btn-primary">
            Go to Affiliate Dashboard
          </Link>
        ) : (
          <Skeleton className="h-12 w-56 mx-auto rounded-xl" />
        )}
      </div>
    </div>
  );
}

export default function AffiliateSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
