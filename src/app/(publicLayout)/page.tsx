"use client";

import Hero from "@/src/components/modules/public/Home/Hero";
import CategoryCard from "@/src/components/UI/CategoryCard/CategoryCard";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllCategory } from "@/src/hooks/category";
import { useGetAllFlashSale } from "@/src/hooks/flashSale";
import { useGetAllProducts } from "@/src/hooks/product";
import Link from "next/link";

export default function Home() {
  const { data: products } = useGetAllProducts([]);
  const { data: categories } = useGetAllCategory([]);
  const { data } = useGetAllFlashSale();

  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <Hero />

      {/* Recommended for You Section */}
      <div className="container pb-14 ">
        <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary text-center mb-6">
          Recommended For You
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-12 mr-12">
          {products?.data?.map((product) => (
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
              ></path>
            </svg>
          </Link>
        </div>
      </div>
      {/* Shop By Category Section */}
      <div className="container pb-14 ">
        <h2 className="text-[28px] sm:text-[32px] font-medium text-secondary text-center mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ml-12 mr-12 ">
          {categories?.data?.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center group">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className="container pb-14 ">
        <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary text-center mb-6">
          Flash Sale
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-12 mr-12">
          {data?.data?.map((product) => (
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
                d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l-.687-.719l-.687-.719z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
      
    </section>
  );
}
