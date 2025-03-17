/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-imports */
"use client";

import { useState, useEffect } from "react";
import { useGetAllProducts } from "@/src/hooks/product";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { motion } from "framer-motion";
import { RefreshCw, Clock } from "lucide-react";

const FlashSale = () => {
  const { data: allProducts, isLoading } = useGetAllProducts([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 🔥 Filter flash sale products
  useEffect(() => {
    if (allProducts?.data) {
      console.log("All products:", allProducts.data);

      const flashProducts = allProducts.data.filter(
        (product) =>
          //@ts-ignore
          product.isFlashSale === true || product.isFlashSale === "true"
      );

      console.log("Filtered Flash Sale Products:", flashProducts);
      //@ts-ignore
      setFlashSaleProducts(flashProducts);
    }
  }, [allProducts]);

  // ⏳ Countdown Timer Logic using `sale_end_time`
  useEffect(() => {
    if (!flashSaleProducts.length) return;

    const endDates = flashSaleProducts
      //@ts-ignore
    .filter((product) => product.sale_end_time) // Ensure field exists
      //@ts-ignore
      .map((product) => new Date(product.sale_end_time));

    if (endDates.length === 0) {
      console.warn("No valid flash sale end times found.");
      return;
    }
//@ts-ignore
    const earliestEndDate = new Date(Math.min(...endDates));
    console.log("Earliest Flash Sale End Time:", earliestEndDate);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = earliestEndDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`);
      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSaleProducts]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 pt-14">
      <div className="container pb-14 pl-12 pr-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-[30px]">
          <h2 className="text-[22px] sm:text-[32px] font-medium mb-4 md:mb-0">
            Flash Sale
          </h2>

          {/* Countdown Timer */}
          {timeRemaining.days > 0 ||
          timeRemaining.hours > 0 ||
          timeRemaining.minutes > 0 ||
          timeRemaining.seconds > 0 ? (
            <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg">
              <Clock className="text-red-500" size={20} />
              <div className="flex gap-2">
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeRemaining.days.toString().padStart(2, "0")}d
                </div>
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeRemaining.hours.toString().padStart(2, "0")}h
                </div>
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeRemaining.minutes.toString().padStart(2, "0")}m
                </div>
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeRemaining.seconds.toString().padStart(2, "0")}s
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Product Display */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 animate-pulse rounded-md"></div>
                  <div className="h-6 bg-gray-200 animate-pulse rounded-md w-1/2"></div>
                  <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        ) : flashSaleProducts.length > 0 ? (
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              //@ts-ignore
              <ProductCart key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No flash sale products available!
            </h3>
            <p className="text-gray-600 mb-6">Check back later for deals.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSale;
