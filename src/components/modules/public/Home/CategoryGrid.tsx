"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGetAllCategory } from "@/src/hooks/category";

const CategoryGrid = () => {
  const { data: categories } = useGetAllCategory([]);

  return (
    <section className="py-12 pl-6 pr-6">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-600">
            Browse our wide selection of products by category
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {categories?.data?.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group"
            >
              <Link href={`/products?category=${category.id}`} className="block">
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={240}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
