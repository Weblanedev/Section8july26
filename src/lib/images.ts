/**
 * Remote image helpers - paste any Unsplash photo path or full URL.
 *
 * Unsplash: copy the photo id from the URL, e.g.
 *   https://unsplash.com/photos/abc123 → photo-abc123
 *   or use: unsplashPhoto("photo-1517336714731-489689fd1ca8")
 *
 * Picsum is NOT used for product cards (random scenery). Use category pools instead.
 */

const UNSPLASH_HOST = "https://images.unsplash.com";

/** Build a cropped Unsplash URL from a photo id or full URL */
export function unsplashPhoto(
  photo: string,
  width = 600,
  height = 600
): string {
  const id = photo.includes("unsplash.com")
    ? photo.split("/").pop()?.split("?")[0] ?? photo
    : photo.replace(/^\//, "");
  return `${UNSPLASH_HOST}/${id}?w=${width}&h=${height}&fit=crop&q=80&auto=format`;
}

/** Unique image per product seed - great when you need 1:1 product photos */
export function picsumPhoto(seed: string, width = 600, height = 600): string {
  return `https://picsum.photos/seed/section8-${encodeURIComponent(seed)}/${width}/${height}`;
}

/** Wide banner image for hero / category blocks */
export function bannerPhoto(photo: string, width = 1200, height = 500): string {
  return unsplashPhoto(photo, width, height);
}

/** Verified working Unsplash photo ids (tested) */
export const UNSPLASH_POOL = [
  "photo-1695048133142-1a20484d2569",
  "photo-1560343090-f0409e92791a",
  "photo-1593642632823-8f785ba67e45",
  "photo-1517336714731-489689fd1ca8",
  "photo-1496181133206-80ce9b88a853",
  "photo-1606813907291-d86efa9b94db",
  "photo-1606220945770-b5b6c2c55bf1",
  "photo-1434493789847-2f02dc6ca35d",
  "photo-1511707171634-5f897ff02aa9",
  "photo-1556656793-08538906a9f8",
  "photo-1588872657578-7efd1f1555ed",
  "photo-1527864550417-7fd91fc51a46",
  "photo-1587829741301-dc798b83add3",
  "photo-1590658268037-6bf12165a8df",
  "photo-1609091839311-d5365f9ff1c5",
  "photo-1558618666-fcd25c85cd64",
  "photo-1633356122544-f134324a6cee",
  "photo-1526170375885-4d8ecf77b99f",
  "photo-1572569511254-d8f925fe2cbb",
  "photo-1597872200969-2b65d56bd16b",
  "photo-1527443224154-c4a3942d3acf",
  "photo-1625842268584-8f3296236761",
  "photo-1505740420928-5e560c06d30e",
  "photo-1512941937669-90a1b58e7e9c",
  "photo-1484788984921-03950022c9ef",
  "photo-1468495244123-6c6c332eeece",
  "photo-1531297484001-80022131f5a1",
  "photo-1544244015-0df4b3ffc6b0",
  "photo-1592750475338-74b7b21085ab",
  "photo-1631049307264-da0ec9d70304",
  "photo-1523275335684-37898b6baf30",
  "photo-1503602642458-232111445657",
  "photo-1550751827-4bd374c3f58b",
  "photo-1608043152269-423dbba4e7e1",
] as const;

const usedPhotos = new Set<string>();

/** Assign a unique Unsplash photo from the tech pool; avoids picsum scenery */
export function uniqueProductPhoto(productId: string, preferredIndex?: number): string {
  if (preferredIndex !== undefined && preferredIndex < UNSPLASH_POOL.length) {
    const photo = UNSPLASH_POOL[preferredIndex];
    usedPhotos.add(photo);
    return unsplashPhoto(photo);
  }
  for (const photo of UNSPLASH_POOL) {
    if (!usedPhotos.has(photo)) {
      usedPhotos.add(photo);
      return unsplashPhoto(photo);
    }
  }
  const idx = productId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return unsplashPhoto(UNSPLASH_POOL[idx % UNSPLASH_POOL.length]);
}

/** Reset pool tracking (call once at module init per data file) */
export function resetPhotoPool(): void {
  usedPhotos.clear();
}
