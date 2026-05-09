"use client";

import { Clock } from "lucide-react";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";
import { useCountdown } from "@/src/hooks/useCountdown";

const FlashSale = () => {
  const { data: products } = useGetAllProducts([]);
  const timeLeft = useCountdown({ hours: 5, minutes: 30, seconds: 0 });

  const flashSaleProducts = products?.data
    ?.filter((product) => product.isFlashSale)
    .slice(0, 5);

  const isLive =
    timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

  return (
    <section className="relative bg-gray-100 py-12 pl-12 pr-8">
      <div className="container mx-auto text-center" />
      <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
        Flash Sale
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Grab the best deals on our top products
      </p>
      <div className="flex items-center justify-center gap-4 mb-6">
        {isLive ? (
          <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg">
            <Clock className="text-red-500" size={20} />
            <div className="flex gap-2">
              <div className="bg-red-500 text-white px-2 py-1 rounded">
                {String(timeLeft.hours).padStart(2, "0")}h
              </div>
              <div className="bg-red-500 text-white px-2 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </div>
              <div className="bg-red-500 text-white px-2 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </div>
            </div>
          </div>
        ) : (
          <div className="text-xl font-semibold text-gray-600">Sale Ended</div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {flashSaleProducts?.slice(0, 5).map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FlashSale;
