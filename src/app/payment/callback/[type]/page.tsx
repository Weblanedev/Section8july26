"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { popPendingOrder } from "@/lib/pendingOrder";
import {
  recordOrderForUser,
  recordTransactionForUser,
  useAffiliateActions,
} from "@/hooks/useUserAccount";
import { getAffiliatePackage } from "@/data/affiliate";
import { AffiliateTier } from "@/types";
import { Spinner } from "@/components/ui/Spinner";

type PaymentStatus = "checking" | "success";

function PaymentCallbackContent() {
  const router = useRouter();
  const params = useParams<{ type?: string }>();
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const type =
    params.type === "affiliate" || searchParams.get("type") === "affiliate"
      ? "affiliate"
      : "order";

  const clearCart = useCartStore((s) => s.clearCart);
  const userId = useAuthStore((s) => s.user?.id);
  const { subscribe } = useAffiliateActions();
  const [status, setStatus] = useState<PaymentStatus>("checking");
  const [message, setMessage] = useState("Confirming your payment...");

  useEffect(() => {
    const goShop = () => {
      toast.error("Payment was not completed.");
      router.replace(
        type === "affiliate"
          ? "/affiliate?payment=cancelled"
          : "/products?payment=cancelled"
      );
    };

    if (!reference) {
      goShop();
      return;
    }

    // Checkout Standard onSuccess is the confirmation signal — finalize locally.
    if (type === "affiliate") {
      const tier = sessionStorage.getItem(
        "pendingAffiliateTier"
      ) as AffiliateTier | null;
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
        toast.success("Affiliate subscription activated!");
      }
      setStatus("success");
      setMessage(
        "Welcome to the Section Eight Affiliate Program. Start earning today."
      );
      return;
    }

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
    clearCart();
    setStatus("success");
    setMessage(
      "Thank you for your order. We'll send a confirmation to your email."
    );
  }, [reference, type, clearCart, userId, subscribe, router]);

  if (status === "checking") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <div className="card p-10">
          <div className="mx-auto mb-8 flex justify-center py-4">
            <Spinner size="xl" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Confirming Payment...</h1>
          <p className="text-muted mb-4">{message}</p>
          {reference && (
            <p className="text-xs text-muted">
              Reference: <code className="text-accent">{reference}</code>
            </p>
          )}
        </div>
      </div>
    );
  }

  const title =
    type === "affiliate" ? "Subscription Active!" : "Payment Successful!";

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="card p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
          <svg
            className="h-8 w-8 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted mb-4">{message}</p>

        {reference && (
          <p className="text-xs text-muted mb-6">
            Reference: <code className="text-accent">{reference}</code>
          </p>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          {type === "order" && (
            <>
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                Dashboard
              </Link>
            </>
          )}
          {type === "affiliate" && (
            <Link href="/affiliate/program" className="btn-primary">
              Go to Affiliate Dashboard
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <div className="card p-10">
            <div className="mx-auto mb-8 flex justify-center py-4">
              <Spinner size="xl" />
            </div>
            <p className="text-muted">Loading payment status...</p>
          </div>
        </div>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}
