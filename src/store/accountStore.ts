import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AffiliateMode,
  AffiliateProfile,
  AffiliateTier,
  Order,
  PendingListing,
  Transaction,
  UserAccountData,
} from "@/types";
import { useAuthStore } from "@/store/authStore";

const emptyAccount = (): UserAccountData => ({
  orders: [],
  transactions: [],
  affiliate: null,
  pendingListings: [],
});

interface AccountState {
  byUser: Record<string, UserAccountData>;
  addOrder: (userId: string, order: Order) => void;
  addTransaction: (userId: string, transaction: Transaction) => void;
  subscribeAffiliate: (userId: string, tier: AffiliateTier) => void;
  setAffiliateMode: (userId: string, mode: AffiliateMode | null) => void;
  submitListing: (
    userId: string,
    listing: Omit<PendingListing, "id" | "status" | "submittedAt">
  ) => void;
  getReferralLink: (userId: string) => string;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      byUser: {},

      addOrder: (userId, order) =>
        set((state) => {
          const current = state.byUser[userId] ?? emptyAccount();
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                orders: [order, ...current.orders],
              },
            },
          };
        }),

      addTransaction: (userId, transaction) =>
        set((state) => {
          const current = state.byUser[userId] ?? emptyAccount();
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                transactions: [transaction, ...current.transactions],
              },
            },
          };
        }),

      subscribeAffiliate: (userId, tier) =>
        set((state) => {
          const current = state.byUser[userId] ?? emptyAccount();
          const code = `S8${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                affiliate: {
                  tier,
                  subscribedAt: new Date().toISOString(),
                  referralCode: code,
                },
              },
            },
          };
        }),

      setAffiliateMode: (userId, mode) =>
        set((state) => {
          const current = state.byUser[userId] ?? emptyAccount();
          if (!current.affiliate) return state;
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                affiliate: {
                  ...current.affiliate,
                  mode: mode ?? undefined,
                },
              },
            },
          };
        }),

      submitListing: (userId, listing) =>
        set((state) => {
          const current = state.byUser[userId] ?? emptyAccount();
          return {
            byUser: {
              ...state.byUser,
              [userId]: {
                ...current,
                pendingListings: [
                  ...current.pendingListings,
                  {
                    ...listing,
                    id: `listing_${Date.now()}`,
                    status: "pending",
                    submittedAt: new Date().toISOString(),
                  },
                ],
              },
            },
          };
        }),

      getReferralLink: (userId) => {
        const code = get().byUser[userId]?.affiliate?.referralCode;
        if (!code) return "";
        const base =
          typeof window !== "undefined"
            ? window.location.origin
            : "https://sectioneight.ng";
        return `${base}?ref=${code}`;
      },
    }),
    {
      name: "section8-account",
      partialize: (state) => ({ byUser: state.byUser }),
      onRehydrateStorage: () => (state) => {
        if (typeof window === "undefined" || !state) return;
        try {
          const raw = localStorage.getItem("section8-affiliate");
          if (!raw) return;
          const old = JSON.parse(raw) as {
            state?: {
              profile?: AffiliateProfile | null;
              pendingListings?: PendingListing[];
            };
          };
          const userId = useAuthStore.getState().user?.id;
          if (!userId || !old.state?.profile) return;
          const current = state.byUser[userId];
          if (current?.affiliate) return;
          state.byUser = {
            ...state.byUser,
            [userId]: {
              ...(current ?? emptyAccount()),
              affiliate: old.state.profile,
              pendingListings: old.state.pendingListings ?? [],
            },
          };
          localStorage.removeItem("section8-affiliate");
        } catch {
          /* ignore corrupt legacy data */
        }
      },
    }
  )
);

export function getUserAccount(userId: string | undefined): UserAccountData {
  if (!userId) return emptyAccount();
  return useAccountStore.getState().byUser[userId] ?? emptyAccount();
}

export function getCurrentUserId(): string | null {
  return useAuthStore.getState().user?.id ?? null;
}
