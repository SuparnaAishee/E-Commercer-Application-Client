import Skeleton from "./Skeleton";

export { Skeleton };

export const ProductCardSkeleton = () => (
  <div className="rounded-2xl bg-white ring-1 ring-gray-100 overflow-hidden">
    <Skeleton className="aspect-square w-full" rounded="sm" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center justify-between pt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-8" rounded="full" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ShopCardSkeleton = () => (
  <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white ring-1 ring-gray-100">
    <Skeleton className="h-16 w-16" rounded="2xl" />
    <Skeleton className="h-3 w-24" />
    <Skeleton className="h-2 w-12" />
    <Skeleton className="h-7 w-7" rounded="full" />
  </div>
);

export const ShopGridSkeleton = ({ count = 5 }: { count?: number }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <ShopCardSkeleton key={i} />
    ))}
  </div>
);

export const SectionHeaderSkeleton = () => (
  <div className="flex flex-col items-center text-center mb-10 gap-3">
    <Skeleton className="h-5 w-24" rounded="full" />
    <Skeleton className="h-8 w-72 max-w-full" />
    <Skeleton className="h-4 w-96 max-w-full" />
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="space-y-3">
        <Skeleton className="aspect-square w-full" rounded="lg" />
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="aspect-square" />
          ))}
        </div>
      </div>
      <div className="space-y-5">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-3">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </div>
    </div>
  </div>
);

export const OrderRowSkeleton = () => (
  <div className="flex items-center gap-4 border rounded-lg p-5 bg-white">
    <Skeleton className="h-20 w-20" rounded="lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-3 w-1/3" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-9 w-32" />
    </div>
  </div>
);

export const OrderListSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <OrderRowSkeleton key={i} />
    ))}
  </div>
);

export const ProfileHeaderSkeleton = () => (
  <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl p-8 flex items-start gap-6">
    <Skeleton className="h-24 w-24 md:h-32 md:w-32" rounded="full" />
    <div className="flex-1 space-y-3">
      <Skeleton className="h-8 w-56 bg-white/30 ring-white/20" />
      <Skeleton className="h-4 w-40 bg-white/30 ring-white/20" />
      <div className="flex gap-3">
        <Skeleton className="h-7 w-20 bg-white/30 ring-white/20" rounded="full" />
        <Skeleton className="h-7 w-32 bg-white/30 ring-white/20" rounded="full" />
      </div>
    </div>
  </div>
);

export const StatsRowSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-5 ring-1 ring-gray-100 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-3 w-32" />
      </div>
    ))}
  </div>
);
