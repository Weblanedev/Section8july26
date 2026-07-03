import { NextResponse } from "next/server";

// Optional: enrich catalog from Fake Store API (free, no key required)
// Maps electronics-related categories to our product format
export async function GET() {
  try {
    const res = await fetch("https://fakestoreapi.com/products/category/electronics", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("API unavailable");

    const data = await res.json();
    const mapped = data.slice(0, 6).map(
      (item: {
        id: number;
        title: string;
        price: number;
        description: string;
        image: string;
        category: string;
      }) => ({
        id: `api-${item.id}`,
        name: item.title.slice(0, 60),
        description: item.description.slice(0, 120),
        price: Math.round(item.price * 1500), // rough USD→NGN for display
        image: item.image,
        category: "accessories" as const,
        source: "fakestoreapi",
      })
    );

    return NextResponse.json({ products: mapped, source: "fakestoreapi.com" });
  } catch {
    return NextResponse.json(
      { products: [], source: "local", message: "Using local catalog" },
      { status: 200 }
    );
  }
}
