"use client";

import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";
import Link from "next/link";
import React from "react";

const RecentProducts = () => {
  const { data: products } = useGetAllProducts([
    { name: "searchTerm", value: "recentViewedProduct" },
  ]);

  return (
    <div className="container pt-14">
      <div className="flex items-start justify-between mb-[30px]">
        <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
          Recent Products
        </h2>
        <div className="pt-2">
          <Link
            href="/products"
            className="text-[15px] font-medium text-primary flex items-center gap-1"
          >
            See More
            <svg width="15" height="15" viewBox="0 0 32 32">
              <path
                fill="currentColor"
                d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l.687-.719l-.687-.719z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products?.data?.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentProducts;
