"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { usePersistHydration } from "@/hooks/usePersistHydration";
import { formatNaira } from "@/lib/format";
import {
  buildOrderFromCart,
  newOrderReference,
  stashPendingOrder,
} from "@/lib/pendingOrder";
import { isNigeria } from "@/data/locations";
import ProductImage from "@/components/ui/ProductImage";
import { Spinner, SpinnerOverlay } from "@/components/ui/Spinner";
import CheckoutSkeleton from "@/components/skeletons/CheckoutSkeleton";
import DeliveryLocationFields, {
  type DeliveryFormValues,
} from "@/components/forms/DeliveryLocationFields";
import { openKoraCheckout } from "@/lib/korapayClient";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const hydrated = usePersistHydration();
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DeliveryFormValues>({
    defaultValues: {
      phone: user?.phone || "",
      address: "",
      country: "NG",
      state: "",
      city: "",
    },
  });

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login?redirect=/checkout");
    }
  }, [hydrated, isAuthenticated, router]);

  useEffect(() => {
    if (user?.phone) {
      setValue("phone", user.phone);
    }
  }, [user?.phone, setValue]);

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

  const onSubmit = async (delivery: DeliveryFormValues) => {
    if (!isNigeria(delivery.country)) {
      toast.error("We currently deliver within Nigeria only");
      return;
    }

    if (!user?.email || !user?.name) {
      toast.error("Please sign in again to continue checkout");
      return;
    }

    setLoading(true);
    try {
      const reference = newOrderReference();
      const deliveryLabel = `${delivery.city}, ${delivery.state}`;
      const order = buildOrderFromCart(items, reference, deliveryLabel);
      stashPendingOrder(order);

      await openKoraCheckout({
        reference,
        amount: total,
        customer: {
          name: user.name,
          email: user.email,
        },
        narration: "Section Eight Order Payment",
        metadata: {
          type: "order",
          phone: delivery.phone,
          state: delivery.state,
          city: delivery.city,
          items: String(items.length),
        },
        onSuccess: (result) => {
          const paidReference = result.reference || reference;
          router.push(
            `/payment/callback/order?reference=${encodeURIComponent(paidReference)}`
          );
        },
        onFailed: () => {
          toast.error("Payment failed. Please try again.");
          setLoading(false);
        },
        onClose: () => {
          setLoading(false);
        },
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {loading && <SpinnerOverlay message="Opening secure checkout..." />}
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

        <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
          <h2 className="text-lg font-semibold">Delivery Details</h2>

          <DeliveryLocationFields
            register={register}
            control={control}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          <div className="rounded-xl bg-accent/5 border border-accent/20 p-4 text-sm">
            <p className="font-medium text-accent mb-1">Secure Payment</p>
            <p className="text-muted text-xs">
              Pay with card, bank transfer, or pay-with-bank. Secure Kora checkout opens in a modal.
            </p>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full text-lg">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Spinner size="sm" />
                Opening checkout...
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
