"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useGetAllProducts } from "@/src/hooks/product";
import type { IProduct } from "@/src/types";

type CollectionDef = {
  key: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  href: string;
  match: (p: IProduct) => boolean;
  surface: string;
  textOnDark?: boolean;
};

const COLLECTIONS: CollectionDef[] = [
  {
    key: "tech",
    eyebrow: "Tech & gear",
    title: "For deep-work mornings",
    subtitle: "Laptops, headphones, and the desk basics that get you in flow.",
    href: "/products?category=electronics",
    match: (p) =>
      ["Electronics", "Computers & Laptops", "Audio & Headphones"].includes(
        p.category?.name ?? "",
      ),
    surface: "from-gray-900 to-gray-800",
    textOnDark: true,
  },
  {
    key: "home",
    eyebrow: "Home & kitchen",
    title: "Cozy home picks",
    subtitle: "Small upgrades that make the space feel intentional.",
    href: "/products?category=home-kitchen",
    match: (p) => p.category?.name === "Home & Kitchen",
    surface: "from-orange-100 via-amber-50 to-rose-50",
  },
  {
    key: "beauty",
    eyebrow: "Beauty & wellness",
    title: "Glow this season",
    subtitle: "Skincare and self-care, hand-picked.",
    href: "/products?category=beauty",
    match: (p) =>
      ["Beauty & Personal Care", "Health & Wellness"].includes(
        p.category?.name ?? "",
      ),
    surface: "from-rose-100 via-orange-50 to-amber-50",
  },
  {
    key: "active",
    eyebrow: "Sports & outdoors",
    title: "Stay active",
    subtitle: "Gear up for the run, ride, or weekend trail.",
    href: "/products?category=sports",
    match: (p) => p.category?.name === "Sports & Outdoor",
    surface: "from-orange-500 to-amber-500",
    textOnDark: true,
  },
];

const Collections = () => {
  const { data: products } = useGetAllProducts([
    { name: "limit", value: 200 },
  ]);

  const tiles = COLLECTIONS.map((collection) => {
    const items = (products?.data ?? []).filter(collection.match).slice(0, 4);
    return { ...collection, items };
  });

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
            Editor&apos;s picks
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Curated collections
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
            Hand-grouped sets across the catalog — start with one of these.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              <Link
                href={tile.href}
                className={`group relative block overflow-hidden rounded-3xl ring-1 ring-black/5 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] transition-all bg-gradient-to-br ${tile.surface}`}
              >
                <div className="relative grid grid-cols-2 gap-4 p-6 md:p-7">
                  <div
                    className={`flex flex-col justify-between space-y-3 ${
                      tile.textOnDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    <div className="space-y-2">
                      <span
                        className={`inline-flex items-center w-max rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase ${
                          tile.textOnDark
                            ? "bg-white/15 backdrop-blur ring-1 ring-white/20 text-white"
                            : "bg-white/70 ring-1 ring-orange-100 text-orange-700"
                        }`}
                      >
                        {tile.eyebrow}
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                        {tile.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${
                          tile.textOnDark ? "text-white/75" : "text-gray-600"
                        }`}
                      >
                        {tile.subtitle}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        tile.textOnDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Shop the collection
                      <ArrowUpRight
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {tile.items.map((product) => (
                      <div
                        key={product.id}
                        className="relative aspect-square rounded-xl bg-white/85 ring-1 ring-white/40 backdrop-blur-sm overflow-hidden p-2"
                      >
                        {product.images?.[0] && (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="120px"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        )}
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 4 - tile.items.length) }).map(
                      (_, idx) => (
                        <div
                          key={`empty-${idx}`}
                          className="aspect-square rounded-xl bg-white/40 ring-1 ring-white/30"
                        />
                      ),
                    )}
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

export default Collections;
