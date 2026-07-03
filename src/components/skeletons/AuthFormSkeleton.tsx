import { Skeleton } from "@/components/ui/Skeleton";

export default function AuthFormSkeleton() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 animate-fade-in">
      <div className="card p-8 space-y-4">
        <Skeleton className="h-8 w-40 mx-auto" />
        <Skeleton className="h-4 w-56 mx-auto" />
        <Skeleton className="h-12 w-full mt-6" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
