"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useGetAllCategory } from "@/src/hooks/category";

type CategoryItem = {
  id: string;
  name: string;
  image?: string | null;
  productCount: number;
};

const CategoryGrid = () => {
  const { data: categoriesData, isLoading } = useGetAllCategory([
    { name: "limit", value: 24 },
  ]);

  const sorted = useMemo<CategoryItem[]>(() => {
    const list = (categoriesData?.data ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
      productCount: (c as unknown as { products?: unknown[] }).products?.length ?? 0,
    }));
    return list.sort((a, b) => b.productCount - a.productCount);
  }, [categoriesData]);

  const [hero, ...rest] = sorted;
  const supportingTiles = rest.slice(0, 8);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-orange-600 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Browse the store
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Find your aisle
              <span className="text-orange-500">.</span>
            </h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md">
              Curated collections across every aisle, with the most-loved on
              the left and everything else just one tap away.
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1.5 self-start text-sm font-medium text-gray-700 hover:text-orange-600 transition"
          >
            View all categories
            <ArrowUpRight size={14} />
          </Link>
        </header>

        {isLoading || !hero ? (
          <BentoSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px] gap-3 md:gap-4">
            {/* Hero card — col-span-2 row-span-2, takes the most-popular category */}
            <HeroCategoryCard category={hero} index={0} />

            {/* Supporting tiles — sized 1×1 each */}
            {supportingTiles.map((category, i) => (
              <SupportingCategoryCard
                key={category.id}
                category={category}
                index={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const HeroCategoryCard = ({
  category,
  index,
}: {
  category: CategoryItem;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.04 }}
    viewport={{ once: true }}
    className="col-span-2 row-span-2"
  >
    <Link
      href={`/products?category=${category.id}`}
      className="group relative block w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 via-amber-100 to-orange-50 ring-1 ring-orange-100 hover:ring-orange-300 transition-all"
    >
      {category.image && (
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      )}

      {/* Gradient overlay readable both light + dark imagery */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-950/85 via-gray-950/45 to-transparent" />
      <div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />

      <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase">
            <Sparkles size={11} className="text-orange-300" />
            Most loved
          </span>
          <span className="grid place-items-center h-9 w-9 rounded-full bg-white text-gray-900 group-hover:bg-orange-500 group-hover:text-white transition shadow-lg">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.1]">
            {category.name}
          </h3>
          <p className="text-xs md:text-sm text-white/75 mt-2 max-w-xs">
            {category.productCount > 0
              ? `${category.productCount} ${
                  category.productCount === 1 ? "product" : "products"
                } across our partner shops`
              : "Discover this collection"}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-200 group-hover:text-white transition">
            Shop now
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const SupportingCategoryCard = ({
  category,
  index,
}: {
  category: CategoryItem;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: 0.05 + (index % 8) * 0.04 }}
    viewport={{ once: true }}
  >
    <Link
      href={`/products?category=${category.id}`}
      className="group relative block w-full h-full overflow-hidden rounded-2xl ring-1 ring-gray-100 hover:ring-orange-200 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-25px_rgba(255,140,0,0.45)] transition-all bg-white"
    >
      {category.image && (
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/30 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-3 md:p-4">
        <h3 className="text-xs md:text-sm font-semibold text-white line-clamp-2 leading-tight">
          {category.name}
        </h3>
        {category.productCount > 0 && (
          <p className="text-[10px] text-white/70 mt-0.5">
            {category.productCount}{" "}
            {category.productCount === 1 ? "item" : "items"}
          </p>
        )}
      </div>

      <span className="absolute top-2 right-2 grid place-items-center h-7 w-7 rounded-full bg-white/95 text-gray-900 opacity-0 group-hover:opacity-100 transition shadow">
        <ArrowUpRight size={12} />
      </span>
    </Link>
  </motion.div>
);

const BentoSkeleton = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px] gap-3 md:gap-4">
    <div className="col-span-2 row-span-2 rounded-3xl bg-gray-100 animate-pulse" />
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="rounded-2xl bg-gray-100 animate-pulse" />
    ))}
  </div>
);

export default CategoryGrid;
