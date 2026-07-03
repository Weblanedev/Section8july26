"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatNaira } from "@/lib/format";
import ProductImage from "@/components/ui/ProductImage";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  if (!isOpen) return null;

  const total = getTotalPrice();
  const count = getTotalItems();

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface border-l border-surface-light animate-slide-up shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-light p-4">
          <h2 className="text-lg font-bold">
            Cart <span className="text-muted font-normal">({count})</span>
          </h2>
          <button onClick={closeCart} className="btn-ghost !p-2" aria-label="Close cart">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="h-16 w-16 text-muted/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="text-muted">Your cart is empty</p>
              <button onClick={closeCart} className="btn-secondary mt-4 text-sm">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} className="flex gap-3 rounded-xl bg-surface-light/50 p-3">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    containerClassName="h-16 w-16 flex-shrink-0 rounded-lg"
                    sizes="64px"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-xs text-muted">{item.selectedColor}</p>
                    <p className="text-sm font-semibold text-accent mt-0.5">
                      {formatNaira(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-6 w-6 rounded-md bg-surface flex items-center justify-center text-sm hover:bg-accent/20"
                      >
                        −
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-6 w-6 rounded-md bg-surface flex items-center justify-center text-sm hover:bg-accent/20"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs text-danger hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-surface-light p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-accent">{formatNaira(total)}</span>
            </div>

            {!isAuthenticated && (
              <p className="text-xs text-muted text-center">
                Sign in required to checkout
              </p>
            )}

            <Link
              href={isAuthenticated ? "/checkout" : "/login?redirect=/checkout"}
              onClick={closeCart}
              className="btn-primary w-full text-center"
            >
              Pay Now - {formatNaira(total)}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
