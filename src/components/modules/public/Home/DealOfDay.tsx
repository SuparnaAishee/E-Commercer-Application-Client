"use client";

import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { useCountdown } from "@/src/hooks/useCountdown";

const DEAL_IMAGE =
  "https://cdn3.f-cdn.com//files/download/186511415/JUST%20FOR%20YOU%20jpg.jpg?width=780&height=438&fit=crop";

const DealOfDay = () => {
  const timeLeft = useCountdown({ hours: 5, minutes: 30, seconds: 0 });

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 px-6 py-10 md:px-12 md:py-14 shadow-[0_30px_60px_-30px_rgba(255,140,0,0.55)]">
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-rose-300/30 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-white space-y-5 max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-xs font-medium tracking-wide ring-1 ring-white/30">
                <Flame size={12} />
                Limited time offer
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                Deal of the day,
                <br />
                <span className="text-white/90">35% off everything.</span>
              </h2>
              <p className="text-white/80 max-w-md">
                Don&apos;t miss out — our best pick for today, hand-curated and
                priced to move.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center justify-center rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/20 px-4 py-3 min-w-[72px]"
                  >
                    <span className="text-2xl md:text-3xl font-semibold tabular-nums text-white">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-white/70 mt-0.5">
                      {unit.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-baseline gap-3 pt-2">
                <span className="text-4xl md:text-5xl font-semibold text-white">
                  $129.99
                </span>
                <span className="text-lg text-white/60 line-through">
                  $199.99
                </span>
                <span className="rounded-full bg-white text-orange-600 text-xs font-semibold px-3 py-1">
                  Save 35%
                </span>
              </div>

              <div>
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-1.5 rounded-full bg-gray-900 hover:bg-black px-6 py-3 text-sm font-medium text-white transition"
                >
                  Shop the deal
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -top-4 -right-2 z-10 grid place-items-center bg-rose-500 text-white text-sm font-bold w-20 h-20 rounded-full rotate-12 shadow-lg ring-4 ring-rose-300/50">
                  30% OFF
                </div>
                <div className="bg-white rounded-3xl p-8 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.35)]">
                  <img
                    src={DEAL_IMAGE}
                    alt="Deal of the day product"
                    className="max-w-full h-auto rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfDay;
