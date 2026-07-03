"use client";

import Link from "next/link";
import { User } from "@/types";

export type DashboardSection =
  | "overview"
  | "orders"
  | "transactions"
  | "affiliate"
  | "profile";

const NAV: { id: DashboardSection; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "◉" },
  { id: "orders", label: "My Orders", icon: "📦" },
  { id: "transactions", label: "Transactions", icon: "💳" },
  { id: "affiliate", label: "Affiliate", icon: "🔗" },
  { id: "profile", label: "Profile", icon: "👤" },
];

interface DashboardShellProps {
  user: User;
  active: DashboardSection;
  onNavigate: (section: DashboardSection) => void;
  onSignOut: () => void;
  children: React.ReactNode;
}

export default function DashboardShell({
  user,
  active,
  onNavigate,
  onSignOut,
  children,
}: DashboardShellProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="signed-in-shell min-h-[calc(100vh-4rem)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-8">
        <aside className="lg:w-64 shrink-0">
          <div className="card sticky top-24 overflow-hidden">
            <div className="border-b border-surface-light/50 bg-accent/5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-sm font-bold text-accent">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="p-3 space-y-1">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    active === item.id
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:bg-surface-light/50 hover:text-primary"
                  }`}
                >
                  <span className="text-base w-5 text-center">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="border-t border-surface-light/50 p-3 space-y-1">
              <Link
                href="/products"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted hover:bg-surface-light/50 hover:text-primary"
              >
                <span className="w-5 text-center">🛍</span>
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger/10"
              >
                <span className="w-5 text-center">↪</span>
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
