import { Skeleton } from "@/components/ui/Skeleton";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

export default function ProductsPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 animate-fade-in">
      <Skeleton className="h-9 w-48 mb-3" />
      <Skeleton className="h-5 w-64 mb-10" />

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-56 shrink-0">
          <div className="card p-4 space-y-4">
            <Skeleton className="h-4 w-20" />
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
            <Skeleton className="h-4 w-16 mt-4" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        </aside>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
