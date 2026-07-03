import { AffiliatePackage } from "@/types";

export const affiliatePackages: AffiliatePackage[] = [
  {
    id: "starter",
    name: "Starter Affiliate",
    price: 49999,
    description: "Perfect for individuals starting their reselling journey.",
    commission: "5%",
    features: [
      "5% commission on every sale",
      "Access to budget product catalog",
      "Personal referral link",
      "Monthly payout via bank transfer",
      "Basic sales dashboard",
    ],
  },
  {
    id: "pro",
    name: "Pro Affiliate",
    price: 74999,
    description: "For serious resellers who want higher earnings.",
    commission: "10%",
    popular: true,
    features: [
      "10% commission on every sale",
      "Access to full product catalog",
      "Priority listing for your products",
      "Weekly payout via bank transfer",
      "Advanced analytics dashboard",
      "Dedicated WhatsApp support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Partner",
    price: 99999,
    description: "For businesses listing products on our platform.",
    commission: "15%",
    features: [
      "15% commission on affiliate sales",
      "List unlimited products on Section Eight",
      "Featured store page on our platform",
      "Bi-weekly payout",
      "API access for inventory sync",
      "Account manager support",
      "Co-branded marketing materials",
    ],
  },
];

export function getAffiliatePackage(id: string): AffiliatePackage | undefined {
  return affiliatePackages.find((p) => p.id === id);
}
