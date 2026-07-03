import { Skeleton } from "@/components/ui/Skeleton";

export default function AffiliatePageSkeleton() {
  return (
    <div className="animate-fade-in">
      <section className="px-4 py-20 text-center space-y-4">
        <Skeleton className="h-6 w-32 mx-auto rounded-full" />
        <Skeleton className="h-10 w-full max-w-lg mx-auto" />
        <Skeleton className="h-6 w-full max-w-md mx-auto" />
      </section>
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
