"use client";

import { Zap } from "lucide-react";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";
import { useCountdown } from "@/src/hooks/useCountdown";
import { ProductGridSkeleton } from "@/src/components/UI/Skeleton";

const FlashSale = () => {
  const { data: products, isLoading } = useGetAllProducts([
    { name: "limit", value: 5 },
    { name: "isFlashSale", value: true },
  ]);
  const timeLeft = useCountdown({ hours: 5, minutes: 30, seconds: 0 });

  const flashSaleProducts = products?.data?.slice(0, 5);

  const isLive =
    timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

  return (
    <section className="relative py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-orange-50/40 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 text-rose-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
            <Zap size={11} className="fill-rose-700" />
            Flash Sale
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            Going fast, going cheap.
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
            A short-window selection of our top picks at their best prices.
          </p>

          {isLive ? (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white ring-1 ring-rose-100 px-3 py-2 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">
                Ends in
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { label: "h", value: timeLeft.hours },
                  { label: "m", value: timeLeft.minutes },
                  { label: "s", value: timeLeft.seconds },
                ].map((unit) => (
                  <span
                    key={unit.label}
                    className="rounded-md bg-gray-900 text-white text-xs font-semibold tabular-nums px-2 py-1"
                  >
                    {String(unit.value).padStart(2, "0")}
                    <span className="opacity-60 ml-0.5">{unit.label}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 text-sm font-semibold text-gray-500">
              Sale ended
            </div>
          )}
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={5} />
        ) : flashSaleProducts && flashSaleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {flashSaleProducts.slice(0, 5).map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500 py-8">
            No flash deals right now — check back soon.
          </p>
        )}
      </div>
    </section>
  );
};

export default FlashSale;
