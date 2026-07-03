import { ProductCategory } from "@/types";

export const topPromoMessages = [
  { text: "Tech Week | UP TO 50% OFF Laptops & Accessories", cta: "Shop Now", href: "/products?category=laptops" },
  { text: "Budget Store | Phones from ₦45,000", cta: "Browse", href: "/products?category=budget" },
  { text: "Affiliate Program | Earn up to 15% Commission", cta: "Join", href: "/affiliate" },
];

export const categoryNav: { label: string; href: string; icon: string; category?: ProductCategory }[] = [
  { label: "Official Store", href: "/products?badge=official", icon: "⭐" },
  { label: "Phones & Tablets", href: "/products?category=phones", icon: "📱", category: "phones" },
  { label: "Laptops", href: "/products?category=laptops", icon: "💻", category: "laptops" },
  { label: "Computing", href: "/products?category=office", icon: "🖥️", category: "office" },
  { label: "Accessories", href: "/products?category=accessories", icon: "🔌", category: "accessories" },
  { label: "Gaming", href: "/products?category=gaming", icon: "🎮", category: "gaming" },
  { label: "Audio", href: "/products?category=audio", icon: "🎧", category: "audio" },
  { label: "Budget Tech", href: "/products?category=budget", icon: "💰", category: "budget" },
  { label: "Electronics", href: "/products", icon: "⚡" },
  { label: "Office & Home", href: "/products?category=office", icon: "🏠", category: "office" },
  { label: "Affiliate Hub", href: "/affiliate", icon: "🤝" },
  { label: "All Deals", href: "/products?sort=deals", icon: "🔥" },
];

export const heroSlides = [
  {
    id: 1,
    title: "Tech Week Live",
    subtitle: "Laptop & Computing Deals",
    discount: "UP TO 50% OFF",
    cta: "Discover",
    href: "/products?category=laptops",
    gradient: "from-cyan-900/80 via-blue-900/70 to-indigo-900/80",
    tint: "bg-cyan-900/20",
    image: "photo-1496181133206-80ce9b88a853",
  },
  {
    id: 2,
    title: "Premium Phones",
    subtitle: "iPhone & Samsung Collection",
    discount: "FROM ₦145,000",
    cta: "Shop Phones",
    href: "/products?category=phones",
    gradient: "from-violet-900/80 via-purple-900/70 to-fuchsia-900/80",
    tint: "bg-violet-900/20",
    image: "photo-1511707171634-5f897ff02aa9",
  },
  {
    id: 3,
    title: "Gaming Season",
    subtitle: "Controllers, Consoles & Gear",
    discount: "HOT DEALS",
    cta: "Play Now",
    href: "/products?category=gaming",
    gradient: "from-orange-900/80 via-red-900/70 to-rose-900/80",
    tint: "bg-orange-900/20",
    image: "photo-1606813907291-d86efa9b94db",
  },
  {
    id: 4,
    title: "Budget Tech Store",
    subtitle: "Quality gadgets from ₦5,000",
    discount: "BEST VALUE",
    cta: "Save Big",
    href: "/products?category=budget",
    gradient: "from-emerald-900/80 via-teal-900/70 to-cyan-900/80",
    tint: "bg-emerald-900/20",
    image: "photo-1523275335684-37898b6baf30",
  },
];

export const promoTiles = [
  { title: "Awoof Deals", subtitle: "Crazy prices", href: "/products?sort=deals", color: "bg-rose-500", emoji: "🔥" },
  { title: "₦5,000 Store", subtitle: "Under five K", href: "/products?category=budget", color: "bg-amber-500", emoji: "💵" },
  { title: "Office Essentials", subtitle: "Work from home", href: "/products?category=office", color: "bg-blue-500", emoji: "🏢" },
  { title: "Banger Deals", subtitle: "Limited stock", href: "/products?sort=deals", color: "bg-orange-500", emoji: "⚡" },
  { title: "Up to 50% Off", subtitle: "Top laptops", href: "/products?category=laptops", color: "bg-violet-500", emoji: "💻" },
  { title: "Clearance Sale", subtitle: "Up to 70% off", href: "/products?sort=deals", color: "bg-red-500", emoji: "🏷️" },
  { title: "Unlock Your Deal", subtitle: "Daily offers", href: "/products", color: "bg-cyan-500", emoji: "🎁" },
  { title: "Accessories", subtitle: "Complete your setup", href: "/products?category=accessories", color: "bg-emerald-500", emoji: "🔌" },
];

export const categoryBanners = [
  {
    title: "Laptops & Computing",
    href: "/products?category=laptops",
    image: "photo-1496181133206-80ce9b88a853",
  },
  {
    title: "Phones & Tablets",
    href: "/products?category=phones",
    image: "photo-1511707171634-5f897ff02aa9",
  },
  {
    title: "Office Accessories",
    href: "/products?category=office",
    image: "photo-1587829741301-dc798b83add3",
  },
  {
    title: "Gaming Gear",
    href: "/products?category=gaming",
    image: "photo-1606813907291-d86efa9b94db",
  },
];

export const shopSections = [
  { id: "limited", title: "Limited Stock Deals", subtitle: "Grab them before they're gone", sort: "deals" as const },
  { id: "top", title: "Top Deals", subtitle: "Best discounts right now", sort: "deals" as const },
  { id: "laptops", title: "Laptops", subtitle: "Work, study & create", category: "laptops" as const },
  { id: "accessories", title: "Computer Accessories", subtitle: "Mice, keyboards & more", category: "office" as const },
  { id: "phones", title: "Phones & Tablets", subtitle: "Latest smartphones", category: "phones" as const },
  { id: "budget", title: "Budget Tech", subtitle: "From ₦5,000", category: "budget" as const },
];
