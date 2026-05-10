"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Flame, Zap } from "lucide-react";
import type { IProduct } from "@/src/types";
import { calculateDiscount } from "@/src/utils/calculateDiscount";

const useTimeLeft = (target?: string | null) => {
  const [diff, setDiff] = useState<number>(() => {
    if (!target) return 0;
    return new Date(target).getTime() - Date.now();
  });

  useEffect(() => {
    if (!target) return;
    const id = setInterval(() => {
      setDiff(new Date(target).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!target || diff <= 0) {
    return { ended: true, label: "Ended" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let label: string;
  if (days > 0) label = `${days}d ${String(hours).padStart(2, "0")}h`;
  else if (hours > 0)
    label = `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m`;
  else
    label = `${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;

  const urgent = diff < 1000 * 60 * 60; // <1h
  return { ended: false, label, urgent };
};

const claimedPercent = (product: IProduct) => {
  // Deterministic pseudo "claimed" percentage seeded from id so it's stable per render
  const seed = product.id
    .split("")
    .reduce((acc, ch) => (acc + ch.charCodeAt(0)) % 9999, 7);
  // Force into 35–92% range so it always feels "going fast"
  return 35 + (seed % 58);
};

type Props = {
  product: IProduct;
};

export const FlashDealCard = ({ product }: Props) => {
  const { ended, label, urgent } = useTimeLeft(
    product.sale_end_time ?? null,
  );
  const discount = product.discount_percentage ?? 0;
  const finalPrice = calculateDiscount(product.price, discount);
  const claimed = claimedPercent(product);
  const lowStock = (product.inventory ?? 0) > 0 && (product.inventory ?? 0) < 30;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-orange-200 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(255,140,0,0.45)] transition-all">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45 pointer-events-none" />

          {discount > 0 && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-rose-600 text-white text-xs font-semibold px-2.5 py-1 shadow-md">
              <Flame size={12} />
              −{discount}%
            </span>
          )}

          {!ended && (
            <span
              className={`absolute top-3 right-3 inline-flex items-center gap-1 rounded-full ${
                urgent
                  ? "bg-rose-600 text-white animate-pulse"
                  : "bg-gray-900/85 text-white backdrop-blur"
              } text-[11px] font-semibold tabular-nums px-2.5 py-1`}
            >
              <Zap size={11} className="fill-current" />
              {label}
            </span>
          )}

          {ended && (
            <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-gray-200 text-gray-600 text-[11px] font-semibold px-2.5 py-1">
              Ended
            </span>
          )}

          {lowStock && (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-500 text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 shadow">
              Only {product.inventory} left
            </span>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link
          href={`/products/${product.id}`}
          className="block text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 transition"
        >
          {product.name}
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900 tabular-nums">
            ${finalPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through tabular-nums">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span className="font-medium text-rose-600">
              {claimed}% claimed
            </span>
            <span>Going fast</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400"
              style={{ width: `${claimed}%` }}
            />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FlashDealCard;
