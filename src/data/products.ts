import { Product } from "@/types";
import { getProductPhotoUrl } from "@/data/productPhotos";
import { extraProducts } from "./extraProducts";

const baseProducts: Product[] = [
  // Premium - retained from legacy
  {
    id: "iphone17",
    name: "iPhone 17",
    description: "The latest iPhone with cutting-edge technology.",
    detailedDescription:
      "A18 Pro chip, advanced camera system, 6.7-inch Super Retina XDR display, Ceramic Shield, 5G, Face ID, iOS 18.",
    price: 2500000,
    color: "Space Black",
    spec: "256GB",
    image: getProductPhotoUrl("iphone17"),
    category: "phones",
    availableColors: ["Space Black", "Titanium Blue", "Natural Titanium", "White"],
    availableSizes: ["128GB", "256GB", "512GB", "1TB"],
    badge: "Premium",
  },
  {
    id: "iphone16",
    name: "iPhone 16",
    description: "Powerful performance meets elegant design.",
    price: 2100000,
    color: "Blue",
    spec: "128GB",
    image: getProductPhotoUrl("iphone16"),
    category: "phones",
    availableColors: ["Blue", "Pink", "Yellow", "Green", "Black"],
    availableSizes: ["128GB", "256GB", "512GB"],
    badge: "Premium",
  },
  {
    id: "macbookm4",
    name: "MacBook Pro M4",
    description: "Ultimate performance with the M4 chip.",
    price: 3200000,
    color: "Space Gray",
    spec: "16-inch, 512GB",
    image: getProductPhotoUrl("macbookm4"),
    category: "laptops",
    availableColors: ["Space Gray", "Silver"],
    availableSizes: ["14-inch", "16-inch"],
    badge: "Premium",
  },
  {
    id: "macbookm1",
    name: "MacBook Air M1",
    description: "Lightweight design with powerful M1 chip.",
    price: 1200000,
    color: "Space Gray",
    spec: "13-inch, 256GB",
    image: getProductPhotoUrl("macbookm1"),
    category: "laptops",
    availableColors: ["Space Gray", "Silver", "Gold"],
    availableSizes: ["13-inch"],
  },
  {
    id: "ps5",
    name: "PlayStation 5",
    description: "Next-gen gaming with stunning graphics.",
    price: 650000,
    color: "White",
    spec: "825GB SSD",
    image: getProductPhotoUrl("ps5"),
    category: "gaming",
    availableColors: ["White"],
  },
  {
    id: "airpodpro",
    name: "AirPods Pro",
    description: "Active Noise Cancellation and spatial audio.",
    price: 220000,
    color: "White",
    spec: "2nd Gen",
    image: getProductPhotoUrl("airpodpro"),
    category: "audio",
    availableColors: ["White"],
  },
  {
    id: "applewatch9",
    name: "Apple Watch Series 9",
    description: "Advanced health and fitness features.",
    price: 580000,
    color: "Midnight",
    spec: "GPS + Cellular",
    image: getProductPhotoUrl("applewatch9"),
    category: "accessories",
    availableColors: ["Midnight", "Starlight", "Pink"],
    availableSizes: ["41mm", "45mm"],
  },

  // Budget tech - Nigerian market friendly prices
  {
    id: "itel-a70",
    name: "Itel A70 Smartphone",
    description: "Affordable 4G smartphone for everyday use.",
    detailedDescription:
      "6.6-inch HD+ display, 4GB RAM, 128GB storage, 5000mAh battery. Perfect entry-level phone for students and first-time smartphone users.",
    price: 45000,
    color: "Starlight Black",
    spec: "4GB/128GB",
    image: getProductPhotoUrl("itel-a70"),
    category: "budget",
    availableColors: ["Starlight Black", "Glacier Green", "Azure Blue"],
    isBudget: true,
    badge: "Best Value",
  },
  {
    id: "tecno-spark-20",
    name: "Tecno Spark 20",
    description: "Stylish budget phone with great camera.",
    price: 50000,
    color: "Magic Skin Green",
    spec: "4GB/128GB",
    image: getProductPhotoUrl("tecno-spark-20"),
    category: "budget",
    availableColors: ["Magic Skin Green", "Gravity Black", "Neon Gold"],
    isBudget: true,
    badge: "Popular",
  },
  {
    id: "hp-250-g9",
    name: "HP 250 G9 Laptop",
    description: "Reliable laptop for work and study.",
    detailedDescription:
      "Intel Celeron, 4GB RAM, 256GB SSD, 15.6-inch HD display. Ideal for office work, browsing, and online classes.",
    price: 350000,
    color: "Dark Ash Silver",
    spec: "4GB/256GB SSD",
    image: getProductPhotoUrl("hp-250-g9"),
    category: "laptops",
    availableColors: ["Dark Ash Silver"],
    isBudget: true,
    badge: "Office Pick",
  },
  {
    id: "lenovo-ideapad-1",
    name: "Lenovo IdeaPad 1",
    description: "Compact laptop for everyday computing.",
    price: 280000,
    color: "Cloud Grey",
    spec: "4GB/128GB",
    image: getProductPhotoUrl("lenovo-ideapad-1"),
    category: "laptops",
    availableColors: ["Cloud Grey"],
    isBudget: true,
  },
  {
    id: "wireless-mouse",
    name: "Logitech M170 Wireless Mouse",
    description: "Reliable wireless mouse for office and home.",
    price: 8500,
    color: "Black",
    spec: "2.4GHz USB",
    image: getProductPhotoUrl("wireless-mouse"),
    category: "office",
    availableColors: ["Black", "Blue", "Red"],
    isBudget: true,
  },
  {
    id: "usb-keyboard",
    name: "USB Wired Keyboard",
    description: "Durable full-size keyboard for office use.",
    price: 12000,
    color: "Black",
    spec: "104 Keys",
    image: getProductPhotoUrl("usb-keyboard"),
    category: "office",
    availableColors: ["Black"],
    isBudget: true,
  },
  {
    id: "bluetooth-earbuds",
    name: "Oraimo FreePods Lite",
    description: "Quality wireless earbuds at an unbeatable price.",
    price: 15000,
    color: "Black",
    spec: "Bluetooth 5.0",
    image: getProductPhotoUrl("bluetooth-earbuds"),
    category: "audio",
    availableColors: ["Black", "White"],
    isBudget: true,
    badge: "Hot Deal",
  },
  {
    id: "power-bank-20k",
    name: "Oraimo 20000mAh Power Bank",
    description: "Fast-charging power bank for all devices.",
    price: 18000,
    color: "Black",
    spec: "20000mAh, 22.5W",
    image: getProductPhotoUrl("power-bank-20k"),
    category: "accessories",
    availableColors: ["Black", "Blue"],
    isBudget: true,
  },
  {
    id: "hdmi-cable",
    name: "Premium HDMI 2.0 Cable",
    description: "4K HDMI cable for monitors and TVs.",
    price: 5000,
    color: "Black",
    spec: "2m, 4K@60Hz",
    image: getProductPhotoUrl("hdmi-cable"),
    category: "accessories",
    availableColors: ["Black"],
    isBudget: true,
  },
  {
    id: "usb-hub",
    name: "7-in-1 USB-C Hub",
    description: "Expand your laptop ports instantly.",
    price: 20000,
    color: "Space Grey",
    spec: "USB-C, HDMI, SD",
    image: getProductPhotoUrl("usb-hub"),
    category: "office",
    availableColors: ["Space Grey"],
    isBudget: true,
  },
  {
    id: "webcam-hd",
    name: "1080p HD Webcam",
    description: "Crystal clear video for meetings and streaming.",
    price: 25000,
    color: "Black",
    spec: "1080p, Built-in Mic",
    image: getProductPhotoUrl("webcam-hd"),
    category: "office",
    availableColors: ["Black"],
    isBudget: true,
  },
  {
    id: "gaming-pad",
    name: "Wireless Gaming Controller",
    description: "Ergonomic controller for PC and mobile gaming.",
    price: 10000,
    color: "Black",
    spec: "Bluetooth",
    image: getProductPhotoUrl("gaming-pad"),
    category: "gaming",
    availableColors: ["Black", "White", "Red"],
    isBudget: true,
  },
  {
    id: "ssd-256",
    name: "Kingston 256GB SSD",
    description: "Upgrade your laptop storage affordably.",
    price: 35000,
    color: "Black",
    spec: "SATA III, 256GB",
    image: getProductPhotoUrl("ssd-256"),
    category: "accessories",
    availableColors: ["Black"],
    isBudget: true,
  },
  {
    id: "monitor-24",
    name: "24-inch LED Monitor",
    description: "Full HD monitor for home office setup.",
    price: 85000,
    color: "Black",
    spec: "1080p, HDMI/VGA",
    image: getProductPhotoUrl("monitor-24"),
    category: "office",
    availableColors: ["Black"],
    isBudget: true,
    badge: "Office Essential",
  },
  {
    id: "router-wifi6",
    name: "TP-Link WiFi 6 Router",
    description: "Fast and reliable home internet router.",
    price: 45000,
    color: "White",
    spec: "AX1800, Dual Band",
    image: getProductPhotoUrl("router-wifi6"),
    category: "office",
    availableColors: ["White", "Black"],
    isBudget: true,
  },
  {
    id: "macbookcharger",
    name: "MacBook USB-C Charger",
    description: "Official-style 96W fast charger.",
    price: 45000,
    color: "White",
    spec: "96W USB-C",
    image: getProductPhotoUrl("macbookcharger"),
    category: "accessories",
    availableColors: ["White"],
  },
  {
    id: "gamepadpro",
    name: "Pro Gaming Controller",
    description: "Professional controller with customizable buttons.",
    price: 85000,
    color: "Black",
    spec: "Wireless",
    image: getProductPhotoUrl("gamepadpro"),
    category: "gaming",
    availableColors: ["Black", "White", "Red", "Blue"],
  },
];

export const productsData: Product[] = [...baseProducts, ...extraProducts];

export const categoryLabels: Record<string, string> = {
  all: "All Products",
  budget: "Budget Tech",
  phones: "Phones",
  laptops: "Laptops",
  accessories: "Accessories",
  gaming: "Gaming",
  audio: "Audio",
  office: "Office & Home",
};

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id);
}

export function getBudgetProducts(): Product[] {
  return productsData.filter((p) => p.isBudget);
}

export function getFeaturedProducts(): Product[] {
  return productsData.filter((p) => p.badge).slice(0, 12);
}

export function getTopDeals(limit = 12): Product[] {
  return [...productsData]
    .filter((p) => p.discount && p.discount >= 20)
    .sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0))
    .slice(0, limit);
}

export function getLimitedStockDeals(limit = 12): Product[] {
  return [...productsData]
    .filter((p) => p.discount && p.discount >= 30)
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}

export function getProductsByCategory(category: string, limit = 12): Product[] {
  if (category === "all") return productsData.slice(0, limit);
  return productsData.filter((p) => p.category === category).slice(0, limit);
}

export function getProductCount(): number {
  return productsData.length;
}
