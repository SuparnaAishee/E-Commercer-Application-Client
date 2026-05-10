"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";
import { ProductGridSkeleton } from "@/src/components/UI/Skeleton";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useGetAllProducts([
    { name: "limit", value: 10 },
  ]);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
            Trending now
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
            Hand-picked items our customers loved this week.
          </p>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={10} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {products?.data?.slice(0, 10).map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center pt-10">
          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 rounded-full bg-gray-900 hover:bg-orange-500 px-6 py-3 text-sm font-medium text-white transition"
          >
            See all products
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
