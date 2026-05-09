"use client";

import { motion } from "framer-motion";
import { useGetAllShop } from "@/src/hooks/shop";

const FeaturedShops = () => {
  const { data: shops } = useGetAllShop([]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Featured Shops</h2>
          <p className="mt-2 text-gray-600">
            Hand-picked vendors curating top picks across categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pl-4 pr-4">
          {shops?.data?.slice(0, 10).map((shop) => (
            <motion.div
              key={shop.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={shop.shopLogo || "/placeholder.svg"}
                alt={shop.shopName}
                className="max-h-20 mb-3 object-contain"
              />
              <p className="text-sm font-medium text-gray-700 text-center">
                {shop.shopName}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;
