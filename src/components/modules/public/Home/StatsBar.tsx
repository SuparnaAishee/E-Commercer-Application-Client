"use client";

import { motion } from "framer-motion";
import { Package, Store, Star, Truck } from "lucide-react";
import { useGetAllProducts } from "@/src/hooks/product";
import { useGetAllShop } from "@/src/hooks/shop";
import { useGetAllCategory } from "@/src/hooks/category";

const StatsBar = () => {
  const { data: products } = useGetAllProducts([
    { name: "limit", value: 1 },
  ]);
  const { data: shops } = useGetAllShop([]);
  const { data: categories } = useGetAllCategory([]);

  const productCount = products?.meta?.total ?? 0;
  const shopCount = shops?.data?.length ?? 0;
  const categoryCount = categories?.data?.length ?? 0;

  const stats = [
    {
      label: "Products",
      value: productCount > 0 ? `${productCount}+` : "—",
      Icon: Package,
    },
    {
      label: "Partner shops",
      value: shopCount > 0 ? `${shopCount}` : "—",
      Icon: Store,
    },
    {
      label: "Categories",
      value: categoryCount > 0 ? `${categoryCount}` : "—",
      Icon: Star,
    },
    {
      label: "Day returns",
      value: "30",
      Icon: Truck,
    },
  ];

  return (
    <section className="px-4 md:px-6 lg:px-8 -mt-2">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 ring-1 ring-gray-800/60 px-6 py-6 md:px-8 md:py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="grid place-items-center h-11 w-11 rounded-xl bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/20">
                <stat.Icon size={20} />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-semibold text-white tabular-nums leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-400 mt-1.5 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
