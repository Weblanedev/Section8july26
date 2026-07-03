import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 animate-fade-in">
      <Skeleton className="h-4 w-28 mb-6" />
      <div className="grid lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-square rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-3 pt-4">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 flex-1 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
