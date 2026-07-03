"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { usePersistHydration } from "@/hooks/usePersistHydration";
import { formatNaira } from "@/lib/format";
import { buildOrderFromCart, stashPendingOrder } from "@/lib/pendingOrder";
import { recordOrderForUser, recordTransactionForUser } from "@/hooks/useUserAccount";
import ProductImage from "@/components/ui/ProductImage";
import { Spinner, SpinnerOverlay } from "@/components/ui/Spinner";
import CheckoutSkeleton from "@/components/skeletons/CheckoutSkeleton";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const hydrated = usePersistHydration();
  const [loading, setLoading] = useState(false);
  const [delivery, setDelivery] = useState({
    address: "",
    city: "",
    state: "",
    phone: "",
  });

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login?redirect=/checkout");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) return <CheckoutSkeleton />;

  const total = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push("/products")} className="btn-primary">
          Continue Shopping
        </button>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!delivery.address || !delivery.city || !delivery.state || !delivery.phone) {
      toast.error("Please fill in all delivery details");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          email: user?.email,
          name: user?.name,
          type: "order",
          metadata: {
            items: String(items.length),
            city: delivery.city,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const order = buildOrderFromCart(items, data.reference, delivery.city);

      const saveOrder = () => {
        if (!user?.id) return;
        recordOrderForUser(user.id, order);
        recordTransactionForUser(user.id, {
          id: `tx_${Date.now()}`,
          type: "order",
          amount: total,
          status: "success",
          reference: data.reference,
          description: `Order - ${items.length} item(s)`,
          createdAt: new Date().toISOString(),
        });
      };

      // Demo mode redirects back with reference
      if (data.checkoutUrl.includes("demo=true")) {
        toast.success("Demo payment successful!");
        saveOrder();
        clearCart();
        router.push(`/checkout/success?reference=${data.reference}&demo=true`);
        return;
      }

      stashPendingOrder(order);

      window.location.href = data.checkoutUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {loading && <SpinnerOverlay message="Redirecting to secure checkout..." />}
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 card p-3">
                <ProductImage
                  src={item.image}
                  alt={item.name}
                  containerClassName="h-16 w-16 shrink-0 rounded-lg"
                  sizes="64px"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted">Qty: {item.quantity}</p>
                  <p className="text-sm text-accent font-semibold">
                    {formatNaira(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xl font-bold border-t border-surface-light pt-4">
            <span>Total</span>
            <span className="text-accent">{formatNaira(total)}</span>
          </div>
        </div>

        <form onSubmit={handlePay} className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Delivery Details</h2>
          <input
            type="tel"
            placeholder="Phone number *"
            value={delivery.phone}
            onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
            className="input-field"
            required
          />
          <input
            type="text"
            placeholder="Street address *"
            value={delivery.address}
            onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
            className="input-field"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City *"
              value={delivery.city}
              onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="State *"
              value={delivery.state}
              onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 text-sm">
            <p className="font-medium text-accent mb-1">Secure Payment</p>
            <p className="text-muted text-xs">
              Pay with card, bank transfer, or pay-with-bank. You&apos;ll be redirected to secure checkout.
            </p>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full text-lg">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" />
                Redirecting to checkout...
              </span>
            ) : (
              `Pay Now - ${formatNaira(total)}`
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
