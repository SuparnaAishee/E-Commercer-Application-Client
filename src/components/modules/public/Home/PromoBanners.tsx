"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const BANNERS = [
  {
    href: "/products?collection=summer",
    title: "Summer Collection",
    copy: "Up to 30% off on selected items",
    image:
      "https://img.freepik.com/premium-vector/summer-sale-banner-template-promotion-with-product-display-cylindrical-shape-beach-background_255246-2414.jpg",
    from: "left" as const,
  },
  {
    href: "/products?new=true",
    title: "New Arrivals",
    copy: "Check out our latest products",
    image:
      "https://img.freepik.com/premium-photo/modern-smartwatch-wireless-earbuds-smartphone-black-desk_1346134-17718.jpg",
    from: "right" as const,
  },
];

const PromoBanners = () => {
  return (
    <section className="py-12 pl-6 pr-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANNERS.map((banner) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, x: banner.from === "left" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg h-64 group"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60" />
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                <p className="mb-4">{banner.copy}</p>
                <Link
                  href={banner.href}
                  className="inline-block bg-white text-gray-900 py-2 px-4 rounded-full text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors w-max"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
