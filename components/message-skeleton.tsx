import { Skeleton } from "./ui/skeleton";

export function MessageSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 lg:px-6">
      {/* Incoming message skeleton */}
      <div className="flex gap-3 flex-row">
        <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
        <div className="flex flex-col gap-1 items-start">
          <Skeleton className="h-[42px] w-[220px] rounded-2xl rounded-bl-md" />
          <Skeleton className="h-3 w-12 rounded" />
        </div>
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex gap-3 flex-row-reverse">
        <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
        <div className="flex flex-col gap-1 items-end">
          <Skeleton className="h-[42px] w-[180px] rounded-2xl rounded-br-md" />
          <Skeleton className="h-3 w-12 rounded" />
        </div>
      </div>

      {/* Incoming message skeleton */}
      <div className="flex gap-3 flex-row">
        <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
        <div className="flex flex-col gap-1 items-start">
          <Skeleton className="h-[56px] w-[260px] rounded-2xl rounded-bl-md" />
          <Skeleton className="h-3 w-12 rounded" />
        </div>
      </div>

      {/* Outgoing message skeleton */}
      <div className="flex gap-3 flex-row-reverse">
        <Skeleton className="h-8 w-8 flex-shrink-0 rounded-full" />
        <div className="flex flex-col gap-1 items-end">
          <Skeleton className="h-[42px] w-[200px] rounded-2xl rounded-br-md" />
          <Skeleton className="h-3 w-12 rounded" />
        </div>
      </div>
    </div>
  );
}
