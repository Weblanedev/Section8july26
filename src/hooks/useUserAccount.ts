"use client";

import { useAuthStore } from "@/store/authStore";
import { getUserAccount, useAccountStore } from "@/store/accountStore";
import { AffiliateTier } from "@/types";

/** Per-user affiliate + orders + transactions (persisted in this browser) */
export function useUserAccount() {
  const userId = useAuthStore((s) => s.user?.id);
  const byUser = useAccountStore((s) => s.byUser);
  const account = userId ? byUser[userId] : undefined;

  return {
    userId,
    orders: account?.orders ?? [],
    transactions: account?.transactions ?? [],
    affiliate: account?.affiliate ?? null,
    pendingListings: account?.pendingListings ?? [],
    isSubscribed: Boolean(account?.affiliate),
  };
}

export function useAffiliateActions() {
  const subscribeAffiliate = useAccountStore((s) => s.subscribeAffiliate);
  const setAffiliateMode = useAccountStore((s) => s.setAffiliateMode);
  const submitListing = useAccountStore((s) => s.submitListing);
  const getReferralLink = useAccountStore((s) => s.getReferralLink);
  const userId = useAuthStore((s) => s.user?.id);

  return {
    subscribe: (tier: AffiliateTier) => {
      if (!userId) return;
      subscribeAffiliate(userId, tier);
    },
    setMode: (mode: Parameters<typeof setAffiliateMode>[1]) => {
      if (!userId) return;
      setAffiliateMode(userId, mode);
    },
    submitListing: (
      listing: Parameters<typeof submitListing>[1]
    ) => {
      if (!userId) return;
      submitListing(userId, listing);
    },
    getReferralLink: () => (userId ? getReferralLink(userId) : ""),
  };
}

export function recordOrderForUser(
  userId: string,
  order: Parameters<ReturnType<typeof useAccountStore.getState>["addOrder"]>[1]
) {
  useAccountStore.getState().addOrder(userId, order);
}

export function recordTransactionForUser(
  userId: string,
  tx: Parameters<ReturnType<typeof useAccountStore.getState>["addTransaction"]>[1]
) {
  useAccountStore.getState().addTransaction(userId, tx);
}

export { getUserAccount };
