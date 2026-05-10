"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Grid2X2,
  Grid3X3,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from "@nextui-org/react";

import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { ProductCardSkeleton } from "@/src/components/UI/Skeleton";
import { useProduct } from "@/src/context/product.provider";
import { useGetAllCategory } from "@/src/hooks/category";
import { useGetAllProducts } from "@/src/hooks/product";
import FilterPanel from "@/src/components/modules/public/Products/FilterPanel";

const PAGE_SIZE = 12;
type SortOrder = "" | "asc" | "desc" | "newest" | "rating";

const sortLabel: Record<SortOrder, string> = {
  "": "Most relevant",
  newest: "Newest first",
  rating: "Top rated",
  asc: "Price: low to high",
  desc: "Price: high to low",
};

const ProductPage = () => {
  const { query, setQuery, selectedCategory, setSelectedCategory } =
    useProduct();
  const searchParams = useSearchParams();
  const urlSearchTerm = searchParams.get("searchTerm");
  const urlCategory = searchParams.get("category");

  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [gridView, setGridView] = useState<"grid3" | "grid2">("grid3");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync URL search/category into the shared query state.
  useEffect(() => {
    setQuery((prev) => {
      let next = prev;
      if (urlSearchTerm) {
        next = next.filter((q) => q.name !== "searchTerm");
        next = [...next, { name: "searchTerm", value: urlSearchTerm }];
      }
      if (urlCategory) {
        next = next.filter((q) => q.name !== "category");
        next = [...next, { name: "category", value: urlCategory }];
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlSearchTerm, urlCategory]);

  // Mirror pagination state into the query.
  useEffect(() => {
    setQuery((prev) => {
      const next = prev.filter(
        (q) => q.name !== "page" && q.name !== "limit",
      );
      return [
        ...next,
        { name: "page", value: currentPage },
        { name: "limit", value: PAGE_SIZE },
      ];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const { data: products, isLoading: productsLoading } =
    useGetAllProducts(query);
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategory(
    [],
  );

  // Apply remaining client-side filters (in-stock, min rating, sort)
  const visibleProducts = useMemo(() => {
    let list = products?.data ?? [];
    if (inStockOnly) list = list.filter((p) => (p.inventory ?? 0) > 0);
    if (minRating > 0) {
      list = list.filter((p) => {
        const reviews = p.reviews ?? [];
        if (reviews.length === 0) return false;
        const avg =
          reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviews.length;
        return avg >= minRating;
      });
    }
    if (sortOrder === "newest") {
      list = [...list].sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime(),
      );
    }
    if (sortOrder === "rating") {
      const avg = (p: (typeof list)[number]) => {
        const r = p.reviews ?? [];
        return r.length === 0
          ? 0
          : r.reduce((s, x) => s + (x.rating ?? 0), 0) / r.length;
      };
      list = [...list].sort((a, b) => avg(b) - avg(a));
    }
    return list;
  }, [products, inStockOnly, minRating, sortOrder]);

  const handleCategoryChange = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      setQuery((prev) => prev.filter((q) => q.name !== "category"));
    } else {
      setSelectedCategory(categoryName);
      setQuery((prev) => {
        const updated = prev.filter((q) => q.name !== "category");
        return [...updated, { name: "category", value: categoryName }];
      });
    }
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range: number[]) => {
    setPriceRange(range);
    setQuery((prev) => {
      const updated = prev.filter((q) => q.name !== "priceRange");
      return [...updated, { name: "priceRange", value: String(range[1]) }];
    });
  };

  const handleSortChange = (next: SortOrder) => {
    setSortOrder(next);
    if (next === "asc" || next === "desc") {
      setQuery((prev) => {
        const updated = prev.filter(
          (q) => q.name !== "sortBy" && q.name !== "sortOrder",
        );
        return [
          ...updated,
          { name: "sortBy", value: "price" },
          { name: "sortOrder", value: next },
        ];
      });
    } else {
      setQuery((prev) =>
        prev.filter((q) => q.name !== "sortBy" && q.name !== "sortOrder"),
      );
    }
  };

  const handleResetFilters = () => {
    setQuery([]);
    setSelectedCategory(null);
    setPriceRange([0, 1000]);
    setSortOrder("");
    setInStockOnly(false);
    setMinRating(0);
    setCurrentPage(1);
  };

  // Active filter chips
  const activeChips: { key: string; label: string; clear: () => void }[] = [];
  if (urlSearchTerm) {
    activeChips.push({
      key: "search",
      label: `Search · ${urlSearchTerm}`,
      clear: () => {
        setQuery((prev) => prev.filter((q) => q.name !== "searchTerm"));
      },
    });
  }
  if (selectedCategory) {
    activeChips.push({
      key: "category",
      label: `Category · ${selectedCategory}`,
      clear: () => {
        setSelectedCategory(null);
        setQuery((prev) => prev.filter((q) => q.name !== "category"));
      },
    });
  }
  if (priceRange[1] !== 1000) {
    activeChips.push({
      key: "price",
      label: `Up to $${priceRange[1]}`,
      clear: () => {
        setPriceRange([0, 1000]);
        setQuery((prev) => prev.filter((q) => q.name !== "priceRange"));
      },
    });
  }
  if (inStockOnly) {
    activeChips.push({
      key: "stock",
      label: "In stock only",
      clear: () => setInStockOnly(false),
    });
  }
  if (minRating > 0) {
    activeChips.push({
      key: "rating",
      label: `${minRating}★ & up`,
      clear: () => setMinRating(0),
    });
  }

  const totalProducts = products?.meta?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
  const gridClasses =
    gridView === "grid2"
      ? "grid-cols-1 sm:grid-cols-2 gap-5"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";

  const pageTitle = urlSearchTerm
    ? `Results for "${urlSearchTerm}"`
    : selectedCategory
      ? selectedCategory
      : "All products";

  // Slot a featured promo card after the 6th product in the grid (before pagination)
  const FEATURED_AT = 6;
  const productsBefore = visibleProducts.slice(0, FEATURED_AT);
  const productsAfter = visibleProducts.slice(FEATURED_AT);
  const featuredItem = visibleProducts[0];
  const showFeatureBand =
    !productsLoading && visibleProducts.length > FEATURED_AT && featuredItem;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Editorial title rail (left) */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto pb-4 pr-1">
            <div className="mb-7">
              <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-orange-600 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                {urlSearchTerm
                  ? "Search"
                  : selectedCategory
                    ? "Category"
                    : "Catalogue"}
              </p>
              <h1 className="text-[2.25rem] md:text-[2.75rem] leading-[1.05] font-semibold tracking-tight text-gray-900">
                {pageTitle}
                <span className="text-orange-500">.</span>
              </h1>
              <p className="text-sm text-gray-500 mt-3 max-w-xs">
                {productsLoading
                  ? "Pulling the catalogue together…"
                  : `${totalProducts} ${
                      totalProducts === 1 ? "product" : "products"
                    } picked across our partner shops, ready to ship today.`}
              </p>
              <div className="mt-5 flex items-center gap-3 text-[11px] tabular-nums text-gray-500">
                <span className="font-medium text-gray-900">
                  {String(currentPage).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-gray-200" />
                <span>
                  {String(totalPages).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="hidden lg:block rounded-2xl bg-white ring-1 ring-gray-100 p-5 shadow-[0_2px_20px_-15px_rgba(0,0,0,0.08)]">
              <h2 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
                Refine
              </h2>
              <FilterPanel
                categories={categories?.data}
                categoriesLoading={categoriesLoading}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                inStockOnly={inStockOnly}
                onInStockChange={setInStockOnly}
                minRating={minRating}
                onMinRatingChange={setMinRating}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="lg:col-span-8 xl:col-span-9 min-w-0">
          {activeChips.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-500 mr-1">
                Filters
              </span>
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={chip.clear}
                  className="inline-flex items-center gap-1 rounded-full bg-orange-50 text-orange-700 ring-1 ring-orange-100 hover:bg-orange-100 text-xs font-medium px-3 py-1 transition"
                >
                  {chip.label}
                  <X size={11} />
                </button>
              ))}
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-gray-500 hover:text-orange-600 underline-offset-2 hover:underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-y border-gray-100 py-3 mb-6">
            <Button
              size="sm"
              variant="flat"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
              startContent={<SlidersHorizontal size={14} />}
            >
              Filters
            </Button>

            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <Button
                  size="sm"
                  variant="flat"
                  endContent={<ChevronDown size={14} />}
                >
                  {sortLabel[sortOrder]}
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sort options">
                <DropdownItem key="" onClick={() => handleSortChange("")}>
                  Most relevant
                </DropdownItem>
                <DropdownItem
                  key="newest"
                  onClick={() => handleSortChange("newest")}
                >
                  Newest first
                </DropdownItem>
                <DropdownItem
                  key="rating"
                  onClick={() => handleSortChange("rating")}
                >
                  Top rated
                </DropdownItem>
                <DropdownItem
                  key="asc"
                  onClick={() => handleSortChange("asc")}
                >
                  Price: low to high
                </DropdownItem>
                <DropdownItem
                  key="desc"
                  onClick={() => handleSortChange("desc")}
                >
                  Price: high to low
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <span className="hidden md:inline text-xs text-gray-500 tabular-nums ml-auto">
              {productsLoading
                ? "Loading…"
                : `Showing ${visibleProducts.length} of ${totalProducts}`}
            </span>

            <div className="hidden sm:flex rounded-full ring-1 ring-gray-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setGridView("grid3")}
                aria-label="3-column grid"
                className={`grid place-items-center h-8 w-9 transition ${
                  gridView === "grid3"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                type="button"
                onClick={() => setGridView("grid2")}
                aria-label="2-column grid"
                className={`grid place-items-center h-8 w-9 transition ${
                  gridView === "grid2"
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Grid2X2 size={14} />
              </button>
            </div>
          </div>

          {/* Grid */}
          {productsLoading ? (
            <div className={`grid ${gridClasses}`}>
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : visibleProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className={`grid ${gridClasses}`}>
                {productsBefore.map((product) => (
                  <ProductCart key={product.id} product={product} />
                ))}
              </div>

              {showFeatureBand && (
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-orange-700 text-white p-6 md:p-8">
                  <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
                  <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
                    <div className="space-y-2 max-w-md">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 ring-1 ring-white/20 backdrop-blur text-[10px] font-medium tracking-[0.18em] uppercase px-3 py-1">
                        Editor&apos;s pick
                      </span>
                      <h3 className="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                        {featuredItem.name}
                      </h3>
                      <p className="text-sm text-white/70 line-clamp-2">
                        {featuredItem.description ??
                          "A standout from this set — picked for build quality and reviews."}
                      </p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-2xl font-semibold tabular-nums">
                          ${featuredItem.price.toFixed(2)}
                        </span>
                        <a
                          href={`/products/${featuredItem.id}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white text-gray-900 hover:bg-orange-100 text-sm font-medium px-4 py-2 transition"
                        >
                          View product
                        </a>
                      </div>
                    </div>
                    {featuredItem.images?.[0] && (
                      <div className="hidden md:block w-40 h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-2xl">
                        <img
                          src={featuredItem.images[0]}
                          alt={featuredItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {productsAfter.length > 0 && (
                <div className={`grid ${gridClasses}`}>
                  {productsAfter.map((product) => (
                    <ProductCart key={product.id} product={product} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <div className="rounded-2xl bg-white ring-1 ring-gray-100 p-12 text-center">
              <div className="grid place-items-center h-16 w-16 mx-auto rounded-full bg-orange-50 text-orange-500 mb-4">
                <SlidersHorizontal size={22} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                No products match these filters
              </h3>
              <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto">
                Try widening the price range, removing a filter, or starting a
                fresh search.
              </p>
              <Button color="primary" onClick={handleResetFilters}>
                Reset filters
              </Button>
            </div>
          )}

          {totalProducts > PAGE_SIZE && (
            <div className="mt-8 flex justify-center">
              <Pagination
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
                color="primary"
              />
            </div>
          )}
        </main>
      </div>

      {/* Mobile filters drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[80] bg-gray-900/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 z-[81] h-full w-[88vw] max-w-sm bg-white shadow-2xl flex flex-col lg:hidden"
            >
              <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h3 className="text-base font-semibold text-gray-900">
                  Filters
                </h3>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filters"
                  className="grid place-items-center h-9 w-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
                >
                  <X size={16} />
                </button>
              </header>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterPanel
                  categories={categories?.data}
                  categoriesLoading={categoriesLoading}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                  priceRange={priceRange}
                  onPriceRangeChange={handlePriceRangeChange}
                  inStockOnly={inStockOnly}
                  onInStockChange={setInStockOnly}
                  minRating={minRating}
                  onMinRatingChange={setMinRating}
                  onReset={handleResetFilters}
                />
              </div>
              <footer className="border-t border-gray-100 p-4">
                <Button
                  color="primary"
                  className="w-full"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  Show {visibleProducts.length} results
                </Button>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
