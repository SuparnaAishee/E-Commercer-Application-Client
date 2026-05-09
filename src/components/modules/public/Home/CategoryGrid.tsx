"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useGetAllCategory } from "@/src/hooks/category";

const CategoryGrid = () => {
  const { data: categories } = useGetAllCategory([]);

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <SectionHeader
          eyebrow="Browse"
          title="Shop by Category"
          subtitle="Curated collections across every aisle of the store."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {categories?.data?.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/products?category=${category.id}`}
                className="group block relative overflow-hidden rounded-2xl ring-1 ring-gray-100 hover:ring-orange-200 transition-all hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(255,165,0,0.35)]"
              >
                <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-orange-50/40">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                      {category.name}
                    </h3>
                    <div className="flex-shrink-0 grid place-items-center h-8 w-8 rounded-full bg-white/95 text-gray-900 group-hover:bg-orange-500 group-hover:text-white transition">
                      <ArrowUpRight size={14} />
                    </div>
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

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) => (
  <div className="flex flex-col items-center text-center mb-10">
    <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
      {eyebrow}
    </span>
    <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
      {title}
    </h2>
    <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
      {subtitle}
    </p>
  </div>
);

export default CategoryGrid;
