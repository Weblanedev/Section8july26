export type ProductCategory =
  | "phones"
  | "laptops"
  | "accessories"
  | "gaming"
  | "audio"
  | "office"
  | "budget";

export interface Product {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  seller?: string;
  color: string;
  spec: string;
  image: string;
  category: ProductCategory;
  availableColors: string[];
  availableSizes?: string[];
  isBudget?: boolean;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export type AffiliateTier = "starter" | "pro" | "enterprise";

export interface AffiliatePackage {
  id: AffiliateTier;
  name: string;
  price: number;
  description: string;
  features: string[];
  commission: string;
  popular?: boolean;
}

export type AffiliateMode = "resell" | "list";

export interface AffiliateProfile {
  tier: AffiliateTier;
  subscribedAt: string;
  mode?: AffiliateMode;
  referralCode: string;
}

export interface PendingListing {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  reference: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryCity?: string;
}

export type TransactionType = "order" | "affiliate" | "refund";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: "success" | "pending" | "failed";
  reference: string;
  description: string;
  createdAt: string;
}

export interface UserAccountData {
  orders: Order[];
  transactions: Transaction[];
  affiliate: AffiliateProfile | null;
  pendingListings: PendingListing[];
}
