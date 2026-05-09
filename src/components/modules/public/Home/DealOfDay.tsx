"use client";

import Link from "next/link";
import { useCountdown } from "@/src/hooks/useCountdown";

const DEAL_IMAGE =
  "https://cdn3.f-cdn.com//files/download/186511415/JUST%20FOR%20YOU%20jpg.jpg?width=780&height=438&fit=crop";

const DealOfDay = () => {
  const timeLeft = useCountdown({ hours: 5, minutes: 30, seconds: 0 });

  return (
    <section className="py-12 pl-8 pr-6 bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="max-w-lg">
              <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Deal of the Day
              </h2>
              <p className="text-gray-600 mb-6">
                Don&apos;t miss out on our exclusive deal of the day! Get this premium
                product at an unbeatable price.
              </p>

              <div className="flex space-x-4 mb-6">
                {[
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="bg-white rounded-lg shadow-sm p-3 w-20 text-center"
                  >
                    <span className="block text-2xl font-bold text-gray-900">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-gray-500">{unit.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900">$129.99</span>
                <span className="ml-2 text-xl text-gray-500 line-through">$199.99</span>
                <span className="ml-2 mr-4 bg-red-100 text-red-800 text-sm px-2 py-1 rounded font-semibold">
                  35% OFF
                </span>
              </div>

              <Link
                href="/products/deal-of-the-day"
                className="inline-block bg-orange-600 text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-4 -right-2 bg-red-500 text-white text-lg font-bold w-20 h-16 rounded-full flex items-center justify-center transform rotate-12 z-10">
                30% OFF
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <img
                  src={DEAL_IMAGE}
                  alt="Deal of the Day Product"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfDay;
