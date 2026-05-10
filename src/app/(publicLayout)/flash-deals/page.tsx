"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetAllProducts } from "@/src/hooks/product";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { ProductCardSkeleton } from "@/src/components/UI/Skeleton";
import { motion } from "framer-motion";
import { RefreshCw, Clock } from "lucide-react";

const FlashSale = () => {
  const { data: products, isLoading } = useGetAllProducts([
    { name: "isFlashSale", value: true },
    { name: "limit", value: 50 },
  ]);
  const flashSaleProducts = useMemo(() => products?.data ?? [], [products]);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const earliestEnd = useMemo(() => {
    const ts = flashSaleProducts
      .map((p) => p.sale_end_time)
      .filter((v): v is string => Boolean(v))
      .map((v) => new Date(v).getTime())
      .filter((n) => Number.isFinite(n));
    return ts.length > 0 ? Math.min(...ts) : null;
  }, [flashSaleProducts]);

  useEffect(() => {
    if (!earliestEnd) return;

    const tick = () => {
      const diff = earliestEnd - Date.now();
      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return false;
      }
      setTimeRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
      return true;
    };

    if (!tick()) return;
    const timer = setInterval(() => {
      if (!tick()) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [earliestEnd]);

  return (
    <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Flash Deals
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Limited-time offers on our top products. Grab them before they
            disappear.
          </p>
        </motion.div>

        {flashSaleProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-10 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="text-red-500" size={22} />
              <h3 className="text-xl font-semibold text-gray-800">
                Sale ends in
              </h3>
            </div>
            <div className="flex items-center justify-center gap-3">
              {[
                { label: "Days", value: timeRemaining.days },
                { label: "Hours", value: timeRemaining.hours },
                { label: "Minutes", value: timeRemaining.minutes },
                { label: "Seconds", value: timeRemaining.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-red-500 text-white rounded-lg px-4 py-3 min-w-[64px] text-center"
                >
                  <div className="text-2xl font-bold">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs uppercase tracking-wide opacity-80">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : flashSaleProducts.length > 0 ? (
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashSaleProducts.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm">
            <RefreshCw className="text-gray-400 mb-3" size={32} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No flash sale products available
            </h3>
            <p className="text-gray-600">Check back later for deals.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSale;
