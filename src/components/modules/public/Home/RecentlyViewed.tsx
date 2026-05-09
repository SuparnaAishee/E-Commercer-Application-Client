"use client";

import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";

const RecentlyViewed = () => {
  const { data: recentProducts } = useGetAllProducts([
    { name: "searchTerm", value: "recentViewedProduct" },
  ]);

  return (
    <section className="py-12 pl-8 pr-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Recently Viewed</h2>
          <p className="mt-2 text-gray-600">
            Products you&apos;ve checked out recently
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {recentProducts?.data?.slice(0, 5).map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
