"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BANNERS = [
  {
    href: "/products?collection=summer",
    eyebrow: "Summer drop",
    title: "Up to 30% off",
    copy: "Cool fits, warm tones — limited stock.",
    image:
      "https://img.freepik.com/premium-vector/summer-sale-banner-template-promotion-with-product-display-cylindrical-shape-beach-background_255246-2414.jpg",
    from: "left" as const,
  },
  {
    href: "/products?new=true",
    eyebrow: "New arrivals",
    title: "Fresh in this week",
    copy: "The latest tech and lifestyle picks.",
    image:
      "https://img.freepik.com/premium-photo/modern-smartwatch-wireless-earbuds-smartphone-black-desk_1346134-17718.jpg",
    from: "right" as const,
  },
];

const PromoBanners = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BANNERS.map((banner) => (
            <motion.div
              key={banner.title}
              initial={{ opacity: 0, x: banner.from === "left" ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl h-72 group ring-1 ring-gray-200/60"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/85 via-gray-900/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                <span className="inline-flex items-center w-max rounded-full bg-white/15 backdrop-blur ring-1 ring-white/20 px-3 py-1 text-[11px] font-medium tracking-wider uppercase">
                  {banner.eyebrow}
                </span>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                  {banner.title}
                </h3>
                <p className="mt-1 text-sm text-white/80 max-w-xs">
                  {banner.copy}
                </p>
                <Link
                  href={banner.href}
                  className="group/btn mt-4 inline-flex w-max items-center gap-1.5 rounded-full bg-white text-gray-900 hover:bg-orange-500 hover:text-white px-5 py-2 text-sm font-medium transition"
                >
                  Shop now
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover/btn:translate-x-0.5"
                  />
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
