import { ProductCategory } from "@/types";
import { unsplashPhoto } from "@/lib/images";

/**
 * Product images use curated Unsplash photo ids (same result as pasting full URLs).
 *
 * Why some cards looked wrong:
 * 1. Extra catalog items fell back to picsum.photos seeds → random landscapes, not tech.
 * 2. A few base ids pointed at valid but semantically wrong photos (e.g. shoe for iPhone).
 *
 * Fix: explicit per-product map + category/keyword pools. No picsum for products.
 */

/** Hand-picked overrides for base catalog items */
const BASE_PHOTO_MAP: Record<string, string> = {
  iphone17: "photo-1695048133142-1a20484d2569",
  iphone16: "photo-1592750475338-74b7b21085ab",
  macbookm4: "photo-1517336714731-489689fd1ca8",
  macbookm1: "photo-1593642632823-8f785ba67e45",
  ps5: "photo-1606813907291-d86efa9b94db",
  airpodpro: "photo-1606220945770-b5b6c2c55bf1",
  applewatch9: "photo-1434493789847-2f02dc6ca35d",
  "itel-a70": "photo-1511707171634-5f897ff02aa9",
  "tecno-spark-20": "photo-1556656793-08538906a9f8",
  "hp-250-g9": "photo-1496181133206-80ce9b88a853",
  "lenovo-ideapad-1": "photo-1588872657578-7efd1f1555ed",
  "wireless-mouse": "photo-1527864550417-7fd91fc51a46",
  "usb-keyboard": "photo-1587829741301-dc798b83add3",
  "bluetooth-earbuds": "photo-1590658268037-6bf12165a8df",
  "power-bank-20k": "photo-1609091839311-d5365f9ff1c5",
  "hdmi-cable": "photo-1544197150-b99a580bb7a8",
  "usb-hub": "photo-1484788984921-03950022c9ef",
  "webcam-hd": "photo-1531297484001-80022131f5a1",
  "gaming-pad": "photo-1572569511254-d8f925fe2cbb",
  "ssd-256": "photo-1756836857559-4c8161fe07f3",
  "monitor-24": "photo-1527443224154-c4a3942d3acf",
  "router-wifi6": "photo-1633356122544-f134324a6cee",
  macbookcharger: "photo-1484788984921-03950022c9ef",
  gamepadpro: "photo-1512941937669-90a1b58e7e9c",
};

/** Extra catalog items that must not share a generic pool */
const EXTRA_PHOTO_MAP: Record<string, string> = {
  "usb-flash-128gb": "photo-1477949331575-2763034b5fb5",
  "usb-flash-1tb": "photo-1493946947703-a0e68b050bee",
  "sandisk-128gb-usb": "photo-1477949331575-2763034b5fb5",
  "seagate-1tb-hdd": "photo-1739742473151-d73df9c2a7b9",
  "sandisk-64gb-sd": "photo-1550751827-4bd374c3f58b",
  "laptop-bag-15": "photo-1553062407-98eeb64c6a62",
  "usb-c-hub-4in1": "photo-1484788984921-03950022c9ef",
  "kaspersky-standard": "photo-1550751827-4bd374c3f58b",
  "norton-360-premium": "photo-1550751827-4bd374c3f58b",
  "apple-magic-keyboard": "photo-1618384887929-16ec33fab9ef",
};

const PHONE_PHOTOS = [
  "photo-1695048133142-1a20484d2569",
  "photo-1592750475338-74b7b21085ab",
  "photo-1511707171634-5f897ff02aa9",
  "photo-1556656793-08538906a9f8",
  "photo-1544244015-0df4b3ffc6b0",
] as const;

const LAPTOP_PHOTOS = [
  "photo-1496181133206-80ce9b88a853",
  "photo-1588872657578-7efd1f1555ed",
  "photo-1517336714731-489689fd1ca8",
  "photo-1593642632823-8f785ba67e45",
  "photo-1531297484001-80022131f5a1",
  "photo-1468495244123-6c6c332eeece",
] as const;

const MOUSE_PHOTOS = [
  "photo-1527864550417-7fd91fc51a46",
  "photo-1527814050087-3793815479db",
] as const;

const KEYBOARD_PHOTOS = [
  "photo-1587829741301-dc798b83add3",
] as const;

const MONITOR_PHOTOS = [
  "photo-1527443224154-c4a3942d3acf",
  "photo-1523275335684-37898b6baf30",
] as const;

const AUDIO_PHOTOS = [
  "photo-1606220945770-b5b6c2c55bf1",
  "photo-1590658268037-6bf12165a8df",
  "photo-1505740420928-5e560c06d30e",
  "photo-1631049307264-da0ec9d70304",
  "photo-1608043152269-423dbba4e7e1",
] as const;

const GAMING_PHOTOS = [
  "photo-1606813907291-d86efa9b94db",
  "photo-1572569511254-d8f925fe2cbb",
  "photo-1512941937669-90a1b58e7e9c",
  "photo-1603302576837-37561b2e2302",
  "photo-1625842268584-8f3296236761",
] as const;

const ACCESSORY_PHOTOS = [
  "photo-1493946947703-a0e68b050bee",
  "photo-1477949331575-2763034b5fb5",
  "photo-1756836857559-4c8161fe07f3",
  "photo-1739742473151-d73df9c2a7b9",
  "photo-1609091839311-d5365f9ff1c5",
  "photo-1544197150-b99a580bb7a8",
  "photo-1484788984921-03950022c9ef",
  "photo-1553062407-98eeb64c6a62",
] as const;

const USB_FLASH_PHOTOS = [
  "photo-1493946947703-a0e68b050bee",
  "photo-1477949331575-2763034b5fb5",
] as const;

const STORAGE_PHOTOS = [
  "photo-1756836857559-4c8161fe07f3",
  "photo-1739742473151-d73df9c2a7b9",
] as const;

const CABLE_PHOTOS = [
  "photo-1544197150-b99a580bb7a8",
  "photo-1550751827-4bd374c3f58b",
] as const;

const CHARGER_PHOTOS = [
  "photo-1609091839311-d5365f9ff1c5",
  "photo-1484788984921-03950022c9ef",
] as const;

const BAG_PHOTOS = [
  "photo-1553062407-98eeb64c6a62",
] as const;

const HUB_PHOTOS = [
  "photo-1484788984921-03950022c9ef",
  "photo-1544197150-b99a580bb7a8",
] as const;

const OFFICE_PHOTOS = [
  "photo-1633356122544-f134324a6cee",
  "photo-1527864550417-7fd91fc51a46",
  "photo-1587829741301-dc798b83add3",
  "photo-1503602642458-232111445657",
] as const;

const POOLS = {
  phone: PHONE_PHOTOS,
  laptop: LAPTOP_PHOTOS,
  mouse: MOUSE_PHOTOS,
  keyboard: KEYBOARD_PHOTOS,
  monitor: MONITOR_PHOTOS,
  audio: AUDIO_PHOTOS,
  gaming: GAMING_PHOTOS,
  accessory: ACCESSORY_PHOTOS,
  office: OFFICE_PHOTOS,
  usbFlash: USB_FLASH_PHOTOS,
  storage: STORAGE_PHOTOS,
  cable: CABLE_PHOTOS,
  charger: CHARGER_PHOTOS,
  bag: BAG_PHOTOS,
  hub: HUB_PHOTOS,
} as const;

type PoolKey = keyof typeof POOLS;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickFromPool(poolKey: PoolKey, productId: string): string {
  const pool = POOLS[poolKey];
  const photo = pool[hashString(productId) % pool.length];
  return unsplashPhoto(photo);
}

function resolvePoolKey(productId: string, category: ProductCategory): PoolKey {
  const id = productId.toLowerCase();

  if (/mouse|mousepad|mouse-pad|mice/.test(id)) return "mouse";
  if (/keyboard/.test(id)) return "keyboard";
  if (/monitor|display|webcam|camera|aio/.test(id)) return "monitor";
  if (/router|wifi|repeater/.test(id)) return "office";
  if (/hub|otg|adapter/.test(id)) return "hub";
  if (/bag|backpack/.test(id)) return "bag";
  if (/flash|sandisk|cruzer|usb-flash/.test(id)) return "usbFlash";
  if (/ssd|hdd|seagate|storage|nand/.test(id)) return "storage";
  if (/cable|hdmi/.test(id)) return "cable";
  if (/charger|charging|power-bank|powerbank/.test(id)) return "charger";
  if (/headset|headphone|earbud|airpod|speaker|audio|jbl|sony|logitech-h/.test(id)) {
    return "audio";
  }
  if (/ps5|xbox|gaming|gamepad|controller/.test(id)) return "gaming";
  if (
    /laptop|macbook|vivobook|zenbook|dell|hp-|lenovo|elitebook|latitude|ideapad/.test(
      id
    )
  ) {
    return "laptop";
  }
  if (
    /iphone|samsung|galaxy|redmi|tecno|infinix|spark|phone|smartphone|itel/.test(
      id
    )
  ) {
    return "phone";
  }
  if (/usb/.test(id)) return "usbFlash";

  const byCategory: Record<ProductCategory, PoolKey> = {
    phones: "phone",
    budget: "phone",
    laptops: "laptop",
    gaming: "gaming",
    audio: "audio",
    office: "office",
    accessories: "accessory",
  };

  return byCategory[category] ?? "office";
}

export function getProductPhotoUrl(
  productId: string,
  category: ProductCategory = "accessories"
): string {
  const explicit = BASE_PHOTO_MAP[productId] ?? EXTRA_PHOTO_MAP[productId];
  if (explicit) return unsplashPhoto(explicit);

  const poolKey = resolvePoolKey(productId, category);
  return pickFromPool(poolKey, productId);
}

export function getBannerUrl(photoId: string): string {
  return unsplashPhoto(photoId, 1200, 500);
}
