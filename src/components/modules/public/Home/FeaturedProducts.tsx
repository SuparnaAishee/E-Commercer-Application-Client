"use client";

import Link from "next/link";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";

const FeaturedProducts = () => {
  const { data: products } = useGetAllProducts([]);

  return (
    <div className="container pb-14 mt-12">
      <h2 className="text-[22px] sm:text-[32px] font-bold text-secondary text-center text-gray-900">
        Featured Product
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Browse our wide selection of products
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 ml-12 mr-12">
        {products?.data?.slice(0, 10).map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center pt-4">
        <Link
          href="/products"
          className="text-[15px] font-medium text-primary flex items-center gap-1 justify-center"
        >
          See More
          <svg width="15" height="15" viewBox="0 0 32 32">
            <path
              fill="currentColor"
              d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l.687-.719l-.687-.719z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
