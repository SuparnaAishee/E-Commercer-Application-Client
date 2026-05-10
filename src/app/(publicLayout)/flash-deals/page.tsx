"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bolt,
  ChevronDown,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from "@nextui-org/react";

import FlashDealCard from "@/src/components/modules/public/FlashDeals/FlashDealCard";
import { ProductCardSkeleton } from "@/src/components/UI/Skeleton";
import { useGetAllProducts } from "@/src/hooks/product";
import { calculateDiscount } from "@/src/utils/calculateDiscount";

const PAGE_SIZE = 8;
type SortKey = "ending" | "discount" | "popular";
const sortLabel: Record<SortKey, string> = {
  ending: "Ending soonest",
  discount: "Biggest discount",
  popular: "Most popular",
};

const FlashDealsPage = () => {
  const { data: products, isLoading } = useGetAllProducts([
    { name: "isFlashSale", value: true },
    { name: "limit", value: 100 },
  ]);

  const all = useMemo(() => products?.data ?? [], [products]);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("ending");
  const [page, setPage] = useState(1);

  // Reset to page 1 when filter or sort changes
  useEffect(() => {
    setPage(1);
  }, [activeCategory, sort]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of all) {
      const name = p.category?.name ?? "Other";
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [all]);

  const filteredSorted = useMemo(() => {
    let list =
      activeCategory === "All"
        ? all
        : all.filter((p) => (p.category?.name ?? "Other") === activeCategory);

    if (sort === "ending") {
      list = [...list].sort((a, b) => {
        const ta = a.sale_end_time
          ? new Date(a.sale_end_time).getTime()
          : Infinity;
        const tb = b.sale_end_time
          ? new Date(b.sale_end_time).getTime()
          : Infinity;
        return ta - tb;
      });
    } else if (sort === "discount") {
      list = [...list].sort(
        (a, b) =>
          (b.discount_percentage ?? 0) - (a.discount_percentage ?? 0),
      );
    } else if (sort === "popular") {
      list = [...list].sort((a, b) => (b.view ?? 0) - (a.view ?? 0));
    }
    return list;
  }, [all, activeCategory, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PAGE_SIZE));
  const paginated = filteredSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const featured = useMemo(() => {
    if (filteredSorted.length === 0) return null;
    // Pick the deepest discount that hasn't ended as the hero
    const live = filteredSorted.filter((p) => {
      if (!p.sale_end_time) return true;
      return new Date(p.sale_end_time).getTime() > Date.now();
    });
    return [...live].sort(
      (a, b) =>
        (b.discount_percentage ?? 0) - (a.discount_percentage ?? 0),
    )[0];
  }, [filteredSorted]);

  // Hero countdown for the featured deal
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const heroEnd = featured?.sale_end_time
    ? new Date(featured.sale_end_time).getTime()
    : null;
  const heroDiff = heroEnd ? heroEnd - now : 0;
  const heroLive = heroEnd ? heroDiff > 0 : false;
  const days = Math.max(0, Math.floor(heroDiff / 86_400_000));
  const hours = Math.max(0, Math.floor((heroDiff % 86_400_000) / 3_600_000));
  const minutes = Math.max(0, Math.floor((heroDiff % 3_600_000) / 60_000));
  const seconds = Math.max(0, Math.floor((heroDiff % 60_000) / 1000));

  return (
    <div>
      {/* Hero band */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-orange-900 text-white">
        <div className="absolute -top-24 -right-32 h-[28rem] w-[28rem] rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-rose-600/25 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_120%,rgba(255,140,0,0.18),transparent_60%)]" />

        <div className="container mx-auto relative px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase">
                <Flame size={12} className="text-orange-300" />
                Flash deals · live now
              </div>

              <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
                The deals
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  drop fast.
                </span>
              </h1>

              <p className="text-white/70 max-w-xl">
                {isLoading
                  ? "Pulling today's lightning deals…"
                  : `${all.length} hand-picked items at flash-sale prices, with new drops every hour. When the timer hits zero, they're gone.`}
              </p>

              {featured && heroEnd && heroLive && (
                <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur px-5 py-4 max-w-md">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-300 mb-3">
                    Headline deal ends in
                  </p>
                  <div className="flex items-center gap-2">
                    {[
                      { label: "d", value: days },
                      { label: "h", value: hours },
                      { label: "m", value: minutes },
                      { label: "s", value: seconds },
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 px-3 py-2 min-w-[58px]"
                      >
                        <span className="text-2xl font-semibold tabular-nums">
                          {String(unit.value).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] uppercase tracking-wider text-white/60">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {featured && (
              <Link
                href={`/products/${featured.id}`}
                className="lg:col-span-5 group block"
              >
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 ring-1 ring-white/10 backdrop-blur-sm p-4 md:p-6 hover:ring-orange-300/40 transition">
                  <div className="absolute top-4 left-4 z-10 grid place-items-center bg-rose-500 text-white text-xs font-bold w-16 h-16 rounded-full rotate-[-8deg] shadow-lg ring-4 ring-rose-300/40">
                    −{featured.discount_percentage ?? 0}%
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/10">
                    {featured.images?.[0] && (
                      <Image
                        src={featured.images[0]}
                        alt={featured.name}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-300 mb-1">
                        Hero pick
                      </p>
                      <p className="text-base font-semibold truncate">
                        {featured.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-semibold tabular-nums">
                        $
                        {calculateDiscount(
                          featured.price,
                          featured.discount_percentage ?? 0,
                        ).toFixed(2)}
                      </p>
                      <p className="text-xs text-white/50 line-through tabular-nums">
                        ${featured.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Sticky category strip */}
      {!isLoading && categories.length > 0 && (
        <div className="sticky top-[var(--app-header-h,0px)] z-20 bg-white/95 backdrop-blur border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-8 flex gap-2 overflow-x-auto py-3 no-scrollbar">
            <CategoryChip
              label="All deals"
              count={all.length}
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            />
            {categories.map((c) => (
              <CategoryChip
                key={c.name}
                label={c.name}
                count={c.count}
                active={activeCategory === c.name}
                onClick={() => setActiveCategory(c.name)}
              />
            ))}
          </div>
        </div>
      )}

      <section className="container mx-auto px-4 md:px-8 py-10">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 flex items-center gap-2">
              <Bolt size={18} className="text-orange-500" />
              {activeCategory === "All"
                ? "All live deals"
                : `${activeCategory} deals`}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {filteredSorted.length}{" "}
              {filteredSorted.length === 1 ? "deal" : "deals"} · refreshed every
              minute
            </p>
          </div>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                size="sm"
                variant="flat"
                endContent={<ChevronDown size={14} />}
                startContent={<TrendingUp size={14} />}
              >
                {sortLabel[sort]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Sort flash deals">
              <DropdownItem key="ending" onClick={() => setSort("ending")}>
                Ending soonest
              </DropdownItem>
              <DropdownItem key="discount" onClick={() => setSort("discount")}>
                Biggest discount
              </DropdownItem>
              <DropdownItem key="popular" onClick={() => setSort("popular")}>
                Most popular
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </header>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : paginated.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {paginated.map((p) => (
              <FlashDealCard key={p.id} product={p} />
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl bg-white ring-1 ring-gray-100 p-12 text-center">
            <div className="grid place-items-center h-16 w-16 mx-auto rounded-full bg-orange-50 text-orange-500 mb-4">
              <Sparkles size={22} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No deals in this category right now
            </h3>
            <p className="text-sm text-gray-500 mb-5">
              New flash sales drop every hour. Pick a different category or
              browse the full catalogue.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 transition"
            >
              Browse all products
            </Link>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              total={totalPages}
              page={page}
              onChange={setPage}
              showControls
              color="primary"
            />
          </div>
        )}
      </section>
    </div>
  );
};

const CategoryChip = ({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`whitespace-nowrap inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-gray-900 text-white"
        : "bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:ring-orange-300 hover:bg-orange-50 hover:text-orange-700"
    }`}
  >
    {label}
    <span
      className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 tabular-nums ${
        active ? "bg-white/20 text-white" : "bg-white text-gray-500"
      }`}
    >
      {count}
    </span>
  </button>
);

export default FlashDealsPage;
