import { Skeleton } from "@/components/ui/Skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="signed-in-shell min-h-[calc(100vh-4rem)] animate-fade-in">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-8">
        <aside className="lg:w-64 shrink-0">
          <Skeleton className="h-80 rounded-2xl" />
        </aside>
        <main className="flex-1 space-y-6">
          <div>
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-48 mt-2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-2xl" />
        </main>
      </div>
    </div>
  );
}
