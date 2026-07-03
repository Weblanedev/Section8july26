import { Metadata } from "next";
import { getProductById } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";
import { formatNaira } from "@/lib/format";

type LayoutProps = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return createPageMetadata({
      title: "Product Not Found",
      description: "This product could not be found on Section Eight.",
      path: `/products/${id}`,
    });
  }

  return createPageMetadata({
    title: product.name,
    description: `${product.description} Shop now at ${formatNaira(product.price)}.`,
    path: `/products/${id}`,
    image: product.image,
    imageAlt: product.name,
  });
}

export default function ProductDetailLayout({ children }: Pick<LayoutProps, "children">) {
  return children;
}
