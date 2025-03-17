/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useProduct } from "@/src/context/product.provider";
import type { ICategories } from "@/src/types";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CategoryCard = ({ category }: { category: ICategories }) => {
  const { setQuery, setSelectedCategory, selectedCategory } = useProduct();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const isSelected = selectedCategory === category?.name;

  const handleFilterByCategory = (category: ICategories) => {
    setQuery((prev) => {
      const prevQuery = prev.filter((p) => p.name !== "category");
      return [...prevQuery, { name: "category", value: category?.name }];
    });
    setSelectedCategory(category?.name);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
  };

  return (
    <motion.div
      className="col-span-1 overflow-hidden rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        onClick={() => handleFilterByCategory(category)}
        href="/products"
        className={`
          relative block h-[150px] sm:h-[200px] w-full
          transition-all duration-300 ease-in-out
          ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${category.image})` }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
          <h4 className="text-xl font-medium text-white">{category.name}</h4>

          <motion.div
            className="text-white"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowRight className="h-5 w-5" />
          </motion.div>
        </div>

        {isSelected && (
          <motion.div
            className="absolute top-3 right-3 bg-primary text-white text-xs px-2 py-1 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            Selected
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
