"use client";

import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";

const RecentlyViewed = () => {
  const { data: recentProducts } = useGetAllProducts([
    { name: "searchTerm", value: "recentViewedProduct" },
  ]);

  if (!recentProducts?.data?.length) return null;

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
            Just for you
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Recently Viewed
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
            Pick up where you left off.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {recentProducts.data.slice(0, 5).map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
