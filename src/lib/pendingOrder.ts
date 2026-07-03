import { CartItem, Order } from "@/types";
import { generateReference } from "@/lib/format";

const PENDING_ORDER_KEY = "section8-pending-order";

export function buildOrderFromCart(
  items: CartItem[],
  reference: string,
  deliveryCity?: string
): Order {
  return {
    id: `order_${Date.now()}`,
    reference,
    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    status: "processing",
    createdAt: new Date().toISOString(),
    deliveryCity,
  };
}

export function stashPendingOrder(order: Order) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(PENDING_ORDER_KEY, JSON.stringify(order));
}

export function popPendingOrder(): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_ORDER_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(PENDING_ORDER_KEY);
    return JSON.parse(raw) as Order;
  } catch {
    return null;
  }
}

export function newOrderReference(): string {
  return generateReference("ORD");
}
