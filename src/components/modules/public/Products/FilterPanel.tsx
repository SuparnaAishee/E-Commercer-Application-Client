"use client";

import { Slider } from "@nextui-org/react";
import { RefreshCw, Star, Tag } from "lucide-react";
import type { ICategory } from "@/src/types";

type Props = {
  categories: ICategory[] | undefined;
  categoriesLoading: boolean;
  selectedCategory: string | null;
  onCategoryChange: (name: string) => void;

  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;

  inStockOnly: boolean;
  onInStockChange: (v: boolean) => void;

  minRating: number;
  onMinRatingChange: (n: number) => void;

  onReset: () => void;
};

const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="pb-5 mb-5 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
    <h3 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase text-gray-700 mb-3">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

export const FilterPanel = ({
  categories,
  categoriesLoading,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
  minRating,
  onMinRatingChange,
  onReset,
}: Props) => {
  return (
    <div className="space-y-0">
      <Section title="Categories" icon={<Tag size={13} />}>
        {categoriesLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-7 rounded-md bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-1">
            {categories?.map((category) => {
              const active = selectedCategory === category?.name;
              return (
                <li key={category?.id}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(category!.name)}
                    className={`w-full text-left text-sm rounded-md px-2.5 py-1.5 transition flex items-center justify-between ${
                      active
                        ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="truncate">{category?.name}</span>
                    {active && (
                      <span className="text-[10px] font-medium text-orange-600">
                        ✓
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Section title="Max price">
        <div className="px-1">
          <Slider
            aria-label="Price range"
            step={25}
            minValue={0}
            maxValue={1000}
            value={priceRange}
            onChange={(v) => onPriceRangeChange(v as number[])}
            showTooltip
            tooltipValueFormatOptions={{ style: "currency", currency: "USD" }}
            classNames={{
              track: "bg-gray-100",
              filler: "bg-orange-500",
              thumb: "bg-white ring-2 ring-orange-500",
            }}
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500 tabular-nums">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </Section>

      <Section title="Availability">
        <label className="flex items-center justify-between text-sm text-gray-700 cursor-pointer rounded-md px-2 py-1.5 hover:bg-gray-50 transition">
          <span>In stock only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockChange(e.target.checked)}
            className="h-4 w-4 rounded text-orange-500 focus:ring-orange-500"
          />
        </label>
      </Section>

      <Section title="Customer rating" icon={<Star size={13} />}>
        <div className="space-y-1.5">
          {[
            { value: 4, label: "4 stars & up" },
            { value: 3, label: "3 stars & up" },
            { value: 2, label: "2 stars & up" },
            { value: 0, label: "All ratings" },
          ].map(({ value, label }) => {
            const active = minRating === value;
            return (
              <label
                key={value}
                className={`flex items-center gap-2 text-sm rounded-md px-2.5 py-1.5 cursor-pointer transition ${
                  active
                    ? "bg-orange-50 text-orange-700 ring-1 ring-orange-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="min-rating"
                  checked={active}
                  onChange={() => onMinRatingChange(value)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                />
                {value > 0 ? (
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        className={
                          i < value
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </span>
                ) : null}
                <span className="text-xs">{label}</span>
              </label>
            );
          })}
        </div>
      </Section>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full ring-1 ring-gray-200 hover:ring-orange-300 hover:text-orange-600 text-sm text-gray-700 py-2 mt-2 transition"
      >
        <RefreshCw size={14} />
        Reset all filters
      </button>
    </div>
  );
};

export default FilterPanel;
