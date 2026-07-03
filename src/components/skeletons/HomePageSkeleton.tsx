import { Skeleton } from "@/components/ui/Skeleton";
import ProductGridSkeleton from "@/components/skeletons/ProductGridSkeleton";

export default function HomePageSkeleton() {
  return (
    <div className="animate-fade-in">
      <section className="px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl text-center space-y-6">
          <Skeleton className="h-8 w-64 mx-auto rounded-full" />
          <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-16 w-full max-w-xl mx-auto" />
          <Skeleton className="h-6 w-full max-w-lg mx-auto" />
          <Skeleton className="h-12 w-full max-w-xl mx-auto rounded-xl" />
        </div>
      </section>

      <section className="border-y border-surface-light/30 py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center space-y-2">
              <Skeleton className="h-8 w-16 mx-auto" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="h-9 w-48 mb-10" />
          <ProductGridSkeleton count={4} />
        </div>
      </section>
    </div>
  );
}
