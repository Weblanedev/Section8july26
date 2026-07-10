"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { popPendingOrder } from "@/lib/pendingOrder";
import { recordOrderForUser, recordTransactionForUser } from "@/hooks/useUserAccount";
import { Spinner } from "@/components/ui/Spinner";
import { Skeleton } from "@/components/ui/Skeleton";

function SuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const clearCart = useCartStore((s) => s.clearCart);
  const userId = useAuthStore((s) => s.user?.id);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!reference) return;

    fetch(`/api/payment/verify?reference=${reference}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "success") {
          const pending = popPendingOrder();
          if (pending && userId) {
            recordOrderForUser(userId, pending);
            recordTransactionForUser(userId, {
              id: `tx_${Date.now()}`,
              type: "order",
              amount: pending.total,
              status: "success",
              reference: pending.reference,
              description: `Order - ${pending.items.length} item(s)`,
              createdAt: new Date().toISOString(),
            });
          }
          setVerified(true);
          clearCart();
        }
      });
  }, [reference, clearCart, userId]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="card p-10">
        {verified ? (
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
          {verified ? "Payment Successful!" : "Verifying Payment..."}
        </h1>
        <p className="text-muted mb-4">
          {verified
            ? "Thank you for your order. We'll send a confirmation to your email."
            : "Please wait while we confirm your payment."}
        </p>
        {reference && (
          <p className="text-xs text-muted mb-6">
            Reference: <code className="text-accent">{reference}</code>
          </p>
        )}
        <div className="flex gap-3 justify-center">
          {verified ? (
            <>
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
            </>
          ) : (
            <Skeleton className="h-12 w-48 mx-auto rounded-xl" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
