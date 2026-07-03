"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useUserAccount } from "@/hooks/useUserAccount";
import { usePersistHydration } from "@/hooks/usePersistHydration";
import { formatNaira } from "@/lib/format";
import { getAffiliatePackage } from "@/data/affiliate";
import DashboardShell, { DashboardSection } from "@/components/dashboard/DashboardShell";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import ProductImage from "@/components/ui/ProductImage";

export default function DashboardPage() {
  const router = useRouter();
  const hydrated = usePersistHydration();
  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItems = useCartStore((s) => s.getTotalItems());
  const cartTotal = useCartStore((s) => s.getTotalPrice());
  const { orders, transactions, affiliate, isSubscribed } = useUserAccount();
  const [section, setSection] = useState<DashboardSection>("overview");

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login?redirect=/dashboard");
    }
  }, [hydrated, isAuthenticated, router]);

  const handleSignOut = () => {
    logout();
    toast.success("Signed out");
    router.push("/");
  };

  if (!hydrated || !isAuthenticated || !user) {
    return <DashboardSkeleton />;
  }

  const pkg = affiliate ? getAffiliatePackage(affiliate.tier) : null;
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <DashboardShell
      user={user}
      active={section}
      onNavigate={setSection}
      onSignOut={handleSignOut}
    >
      {section === "overview" && (
        <OverviewSection
          user={user}
          cartItems={cartItems}
          cartTotal={cartTotal}
          orderCount={orders.length}
          totalSpent={totalSpent}
          isSubscribed={isSubscribed}
          affiliateTier={affiliate?.tier}
          onNavigate={setSection}
        />
      )}

      {section === "orders" && (
        <OrdersSection orders={orders} />
      )}

      {section === "transactions" && (
        <TransactionsSection transactions={transactions} />
      )}

      {section === "affiliate" && (
        <AffiliateSection
          isSubscribed={isSubscribed}
          affiliate={affiliate}
          pkgName={pkg?.name}
          commission={pkg?.commission}
        />
      )}

      {section === "profile" && (
        <ProfileSection user={user} onSignOut={handleSignOut} />
      )}
    </DashboardShell>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {subtitle && <p className="text-muted mt-1 text-sm">{subtitle}</p>}
    </div>
  );
}

function OverviewSection({
  user,
  cartItems,
  cartTotal,
  orderCount,
  totalSpent,
  isSubscribed,
  affiliateTier,
  onNavigate,
}: {
  user: { name: string };
  cartItems: number;
  cartTotal: number;
  orderCount: number;
  totalSpent: number;
  isSubscribed: boolean;
  affiliateTier?: string;
  onNavigate: (s: DashboardSection) => void;
}) {
  return (
    <>
      <SectionHeader
        title={`Welcome back, ${user.name.split(" ")[0]}!`}
        subtitle="Your account overview on this device"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <StatCard label="Orders" value={String(orderCount)} accent />
        <StatCard label="Total Spent" value={formatNaira(totalSpent)} />
        <StatCard
          label="Cart"
          value={cartItems > 0 ? `${cartItems} items` : "Empty"}
          hint={cartItems > 0 ? formatNaira(cartTotal) : undefined}
        />
        <StatCard
          label="Affiliate"
          value={isSubscribed ? (affiliateTier ?? "Active") : "Not joined"}
          hint={isSubscribed ? "Program active" : "Join to earn"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-bold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn-secondary text-sm">
              Browse Products
            </Link>
            {cartItems > 0 && (
              <Link href="/checkout" className="btn-primary text-sm">
                Checkout {formatNaira(cartTotal)}
              </Link>
            )}
            <button
              type="button"
              onClick={() => onNavigate("orders")}
              className="btn-secondary text-sm"
            >
              View Orders
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold mb-2">Saved on this browser</h2>
          <p className="text-sm text-muted mb-4">
            Your login, cart, orders, and affiliate data stay on this machine until you sign out.
            Close the browser and come back anytime - your credentials still work here.
          </p>
          <div className="signed-in-badge inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Session restored from local storage
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted mb-1">
        {label}
      </p>
      <p className={`text-2xl font-bold ${accent ? "text-accent" : ""}`}>{value}</p>
      {hint && <p className="text-xs text-muted mt-1">{hint}</p>}
    </div>
  );
}

function OrdersSection({
  orders,
}: {
  orders: ReturnType<typeof useUserAccount>["orders"];
}) {
  return (
    <>
      <SectionHeader
        title="My Orders"
        subtitle="Order history saved on this browser"
      />

      {orders.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-muted mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className="btn-primary text-sm">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-semibold">Order {order.reference}</p>
                  <p className="text-xs text-muted">
                    {new Date(order.createdAt).toLocaleString("en-NG")}
                    {order.deliveryCity ? ` · ${order.deliveryCity}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent">{formatNaira(order.total)}</p>
                  <span className="badge bg-accent/15 text-accent capitalize">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 border-t border-surface-light/50 pt-4">
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.id}`} className="flex items-center gap-3">
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                      containerClassName="h-10 w-10 shrink-0 rounded-lg"
                      sizes="40px"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-muted">Qty {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatNaira(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function TransactionsSection({
  transactions,
}: {
  transactions: ReturnType<typeof useUserAccount>["transactions"];
}) {
  return (
    <>
      <SectionHeader
        title="Transaction History"
        subtitle="Payments and subscriptions on this account"
      />

      {transactions.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-muted">No transactions yet.</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-light/50 text-left text-muted">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium">Reference</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-surface-light/30 last:border-0"
                  >
                    <td className="p-4 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString("en-NG")}
                    </td>
                    <td className="p-4 capitalize">{tx.description}</td>
                    <td className="p-4 font-mono text-xs text-muted">{tx.reference}</td>
                    <td className="p-4 font-semibold">{formatNaira(tx.amount)}</td>
                    <td className="p-4">
                      <span
                        className={`badge capitalize ${
                          tx.status === "success"
                            ? "bg-success/20 text-success"
                            : tx.status === "pending"
                            ? "bg-warning/20 text-warning"
                            : "bg-danger/20 text-danger"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

function AffiliateSection({
  isSubscribed,
  affiliate,
  pkgName,
  commission,
}: {
  isSubscribed: boolean;
  affiliate: ReturnType<typeof useUserAccount>["affiliate"];
  pkgName?: string;
  commission?: string;
}) {
  return (
    <>
      <SectionHeader
        title="Affiliate Program"
        subtitle="Your partnership status and earnings setup"
      />

      {isSubscribed && affiliate ? (
        <div className="space-y-4">
          <div className="card p-6">
            <div className="signed-in-badge inline-flex mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Active member
            </div>
            <h2 className="text-xl font-bold mb-1">{pkgName}</h2>
            <p className="text-muted text-sm mb-4">
              {commission} commission · Joined{" "}
              {new Date(affiliate.subscribedAt).toLocaleDateString("en-NG")}
            </p>
            <p className="text-sm">
              Referral code:{" "}
              <code className="rounded bg-surface-light px-2 py-0.5 text-accent">
                {affiliate.referralCode}
              </code>
            </p>
          </div>
          <Link href="/affiliate/program" className="btn-primary text-sm inline-flex">
            Open Affiliate Dashboard →
          </Link>
        </div>
      ) : (
        <div className="card p-10 text-center">
          <p className="text-muted mb-4">
            Join the Section Eight affiliate program and earn commission on every sale.
          </p>
          <Link href="/affiliate" className="btn-primary text-sm">
            View Affiliate Packages
          </Link>
        </div>
      )}
    </>
  );
}

function ProfileSection({
  user,
  onSignOut,
}: {
  user: {
    name: string;
    email: string;
    phone?: string;
    createdAt: string;
  };
  onSignOut: () => void;
}) {
  return (
    <>
      <SectionHeader title="Profile" subtitle="Your account information" />

      <div className="card p-6 max-w-lg space-y-5">
        <div>
          <p className="text-xs text-muted mb-1">Full name</p>
          <p className="font-medium">{user.name}</p>
        </div>
        <div>
          <p className="text-xs text-muted mb-1">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        {user.phone && (
          <div>
            <p className="text-xs text-muted mb-1">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>
        )}
        <div>
          <p className="text-xs text-muted mb-1">Member since</p>
          <p className="font-medium">
            {new Date(user.createdAt).toLocaleDateString("en-NG", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="pt-4 border-t border-surface-light/50">
          <button type="button" onClick={onSignOut} className="btn-secondary text-sm text-danger border-danger/30">
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}
