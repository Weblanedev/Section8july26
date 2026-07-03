import Link from "next/link";
import Image from "next/image";
import { categoryBanners } from "@/data/marketplace";
import { getBannerUrl } from "@/data/productPhotos";

export default function CategoryBanners() {
  return (
    <section className="py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categoryBanners.map((banner) => (
            <Link
              key={banner.title}
              href={banner.href}
              className="group relative h-36 sm:h-44 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:scale-[1.01]"
            >
              <Image
                src={getBannerUrl(banner.image)}
                alt={banner.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wide">
                {banner.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
