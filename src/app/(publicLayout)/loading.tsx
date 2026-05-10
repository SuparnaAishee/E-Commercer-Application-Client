import {
  ProductGridSkeleton,
  SectionHeaderSkeleton,
  Skeleton,
} from "@/src/components/UI/Skeleton";

export default function PublicLoading() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10 space-y-12">
        <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 p-10 md:p-14 ring-1 ring-orange-100/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <Skeleton className="h-5 w-28" rounded="full" />
              <Skeleton className="h-12 w-full max-w-md" />
              <Skeleton className="h-4 w-full max-w-sm" />
              <Skeleton className="h-4 w-3/4 max-w-sm" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-12 w-36" rounded="full" />
                <Skeleton className="h-12 w-32" rounded="full" />
              </div>
            </div>
            <Skeleton className="aspect-[4/3] w-full" rounded="2xl" />
          </div>
        </div>

        <div className="space-y-6">
          <SectionHeaderSkeleton />
          <ProductGridSkeleton count={5} />
        </div>
      </div>
    </div>
  );
}
