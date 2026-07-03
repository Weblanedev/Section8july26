import { Skeleton } from "@/components/ui/Skeleton";

export default function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 animate-fade-in">
      <Skeleton className="h-9 w-40 mb-8" />
      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <Skeleton className="h-6 w-36" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}
