"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useGetAllShop } from "@/src/hooks/shop";

const FeaturedShops = () => {
  const { data: shops } = useGetAllShop([]);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50/30">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
            Vendors
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Featured Shops
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
            Hand-picked vendors curating top picks across every category.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {shops?.data?.slice(0, 10).map((shop, i) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/shops/${shop.id}`}
                className="group flex flex-col items-center justify-center text-center gap-3 p-6 rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-orange-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_rgba(255,165,0,0.4)] transition-all"
              >
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 ring-1 ring-orange-100/60 grid place-items-center">
                  <img
                    src={shop.shopLogo || "/placeholder.svg"}
                    alt={shop.shopName}
                    className="max-h-12 max-w-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {shop.shopName}
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Visit shop
                  </p>
                </div>
                <span className="grid place-items-center h-7 w-7 rounded-full bg-gray-100 text-gray-500 group-hover:bg-orange-500 group-hover:text-white transition">
                  <ArrowUpRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedShops;
