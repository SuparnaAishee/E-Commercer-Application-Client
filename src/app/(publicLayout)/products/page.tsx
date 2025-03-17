"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProduct } from "@/src/context/product.provider";
import { useGetAllCategory } from "@/src/hooks/category";
import { useGetAllProducts } from "@/src/hooks/product";

import {
  Button,
  Input,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Slider,
  Chip,
  Tooltip,
  Pagination,
} from "@nextui-org/react";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  ArrowDownUp,
  Tag,
  RefreshCw,
  Grid3X3,
  Grid2X2,
  List,
} from "lucide-react";

import ProductCart from "@/src/components/UI/ProductCart/ProductCart";

const ProductPage = () => {
  const { query, setQuery, selectedCategory, setSelectedCategory } =
    useProduct();
  const { data: products, isLoading: productsLoading } =
    useGetAllProducts(query);
  const { data: categories, isLoading: categoriesLoading } = useGetAllCategory(
    []
  );

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [gridView, setGridView] = useState<"grid3" | "grid2" | "list">("grid3");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"" | "asc" | "desc">("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Initialize search value from query
  useEffect(() => {
    const searchQuery = query.find((q) => q.name === "searchTerm");
    if (searchQuery) {
      setSearchValue(String(searchQuery.value));
    }

    // Initialize price range from query
    const priceRangeQuery = query.find((q) => q.name === "priceRange");
    if (priceRangeQuery) {
      setPriceRange([0, parseInt(String(priceRangeQuery.value))]);
    }

    // Initialize sort order
    const sortOrderQuery = query.find((q) => q.name === "sortOrder");
    if (sortOrderQuery) {
      setSortOrder(sortOrderQuery.value as "asc" | "desc");
    }

    // Update active filters
    updateActiveFilters();
  }, [query]);

  // Update active filters list
  const updateActiveFilters = () => {
    const filters: string[] = [];

    query.forEach((q) => {
      if (q.name === "category") {
        filters.push(`Category: ${q.value}`);
      }
      if (q.name === "priceRange") {
        filters.push(`Price: $0-$${q.value}`);
      }
      if (q.name === "searchTerm") {
        filters.push(`Search: ${q.value}`);
      }
      if (q.name === "sortOrder") {
        filters.push(
          `Sort: Price ${q.value === "asc" ? "Low-High" : "High-Low"}`
        );
      }
    });

    setActiveFilters(filters);
    setIsFilterApplied(filters.length > 0);
  };

  // Handle category selection
  const handleCategoryChange = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      // Deselect category
      setSelectedCategory(null);
      setQuery((prev) => prev.filter((q) => q.name !== "category"));
    } else {
      // Select category
      setSelectedCategory(categoryName);
      setQuery((prev) => {
        const updatedQuery = prev.filter((q) => q.name !== "category");
        return [...updatedQuery, { name: "category", value: categoryName }];
      });
    }
  };

  // Handle search term change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (value.trim()) {
      setQuery((prev) => {
        const updatedQuery = prev.filter((q) => q.name !== "searchTerm");
        return [...updatedQuery, { name: "searchTerm", value }];
      });
    } else {
      setQuery((prev) => prev.filter((q) => q.name !== "searchTerm"));
    }
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);

    setQuery((prev) => {
      const updatedQuery = prev.filter((q) => q.name !== "priceRange");
      return [
        ...updatedQuery,
        { name: "priceRange", value: value[1].toString() },
      ];
    });
  };

  // Handle sorting by price
  const handleSortByPrice = (sortOrder: "asc" | "desc") => {
    setSortOrder(sortOrder);

    setQuery((prev) => {
      const updatedQuery = prev.filter(
        (q) => q.name !== "sortBy" && q.name !== "sortOrder"
      );
      return [
        ...updatedQuery,
        { name: "sortBy", value: "price" },
        { name: "sortOrder", value: sortOrder },
      ];
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setQuery([]);
    setSelectedCategory(null);
    setSearchValue("");
    setPriceRange([0, 1000]);
    setSortOrder("");
    setCurrentPage(1);
  };

  // Remove specific filter
  const handleRemoveFilter = (filter: string) => {
    if (filter.startsWith("Category:")) {
      setSelectedCategory(null);
      setQuery((prev) => prev.filter((q) => q.name !== "category"));
    } else if (filter.startsWith("Price:")) {
      setPriceRange([0, 1000]);
      setQuery((prev) => prev.filter((q) => q.name !== "priceRange"));
    } else if (filter.startsWith("Search:")) {
      setSearchValue("");
      setQuery((prev) => prev.filter((q) => q.name !== "searchTerm"));
    } else if (filter.startsWith("Sort:")) {
      setSortOrder("");
      setQuery((prev) =>
        prev.filter((q) => q.name !== "sortBy" && q.name !== "sortOrder")
      );
    }
  };

  // Product grid variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Get grid classes based on view mode
  const getGridClasses = () => {
    switch (gridView) {
      case "grid3":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
      case "grid2":
        return "grid-cols-1 sm:grid-cols-2 gap-6";
      case "list":
        return "grid-cols-1 gap-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className="container py-8 md:py-12 pr-12 pl-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl text-center md:text-4xl font-bold text-gray-800 mb-2">
          Our Products
        </h1>
        <p className="text-gray-600 text-center">
          Discover our collection of high-quality products
        </p>
      </div>

      {/* Active Filters */}
      {isFilterApplied && (
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 mr-1">Active Filters:</span>
            {activeFilters.map((filter, index) => (
              <Chip
                key={index}
                onClose={() => handleRemoveFilter(filter)}
                variant="flat"
                color="primary"
                className="text-sm"
              >
                {filter}
              </Chip>
            ))}
            <Button
              size="sm"
              variant="light"
              color="primary"
              startContent={<RefreshCw size={14} />}
              onClick={handleResetFilters}
            >
              Reset All
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Tag size={18} className="mr-2 text-primary" />
                Categories
              </h3>

              {categoriesLoading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 bg-gray-200 animate-pulse rounded-md"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {categories?.data?.map((category) => (
                    <motion.div
                      key={category?.id}
                      whileHover={{ x: 4 }}
                      className="flex justify-between items-center"
                    >
                      <label className="flex items-center cursor-pointer w-full">
                        <input
                          type="checkbox"
                          checked={selectedCategory === category?.name}
                          onChange={() => handleCategoryChange(category?.name)}
                          className="rounded text-primary focus:ring-primary mr-3"
                        />
                        <span className="text-gray-700">{category?.name}</span>
                        <span className="ml-auto text-gray-500 text-sm">
                          ({category?.products?.length || 0})
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <SlidersHorizontal size={18} className="mr-2 text-primary" />
                Price Range
              </h3>

              <div className="px-2">
                <Slider
                  label="Price Range"
                  step={50}
                  minValue={0}
                  maxValue={1000}
                  value={priceRange}
                  onChange={handlePriceRangeChange as any}
                  showTooltip={true}
                  tooltipValueFormatOptions={{
                    style: "currency",
                    currency: "USD",
                  }}
                  className="max-w-md"
                />

                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Button
              color="primary"
              className="w-full"
              onClick={handleResetFilters}
              startContent={<RefreshCw size={16} />}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <Button
                  className="lg:hidden"
                  variant="flat"
                  onClick={() => setMobileFiltersOpen(true)}
                  startContent={<SlidersHorizontal size={18} />}
                >
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      endContent={<ChevronDown size={16} />}
                      startContent={
                        sortOrder === "asc" ? (
                          <ArrowUpDown size={16} />
                        ) : (
                          <ArrowDownUp size={16} />
                        )
                      }
                    >
                      {sortOrder === "asc"
                        ? "Price: Low to High"
                        : sortOrder === "desc"
                          ? "Price: High to Low"
                          : "Sort By"}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Sort options">
                    <DropdownItem
                      key="asc"
                      startContent={<ArrowUpDown size={16} />}
                      onClick={() => handleSortByPrice("asc")}
                    >
                      Price: Low to High
                    </DropdownItem>
                    <DropdownItem
                      key="desc"
                      startContent={<ArrowDownUp size={16} />}
                      onClick={() => handleSortByPrice("desc")}
                    >
                      Price: High to Low
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="flex items-center gap-2">
                {/* Search Input */}
                <div className="w-full sm:w-auto">
                  <Input
                    value={searchValue}
                    onValueChange={handleSearchChange}
                    placeholder="Search products..."
                    startContent={
                      <Search size={18} className="text-gray-400" />
                    }
                    endContent={
                      searchValue ? (
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          onClick={() => handleSearchChange("")}
                        >
                          <X size={14} />
                        </Button>
                      ) : null
                    }
                    className="w-full sm:w-64"
                  />
                </div>

                {/* View Mode Buttons */}
                <div className="hidden sm:flex border rounded-lg overflow-hidden">
                  <Tooltip content="3-Column Grid">
                    <Button
                      isIconOnly
                      variant={gridView === "grid3" ? "solid" : "light"}
                      color={gridView === "grid3" ? "primary" : "default"}
                      onClick={() => setGridView("grid3")}
                      className="rounded-none"
                    >
                      <Grid3X3 size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="2-Column Grid">
                    <Button
                      isIconOnly
                      variant={gridView === "grid2" ? "solid" : "light"}
                      color={gridView === "grid2" ? "primary" : "default"}
                      onClick={() => setGridView("grid2")}
                      className="rounded-none"
                    >
                      <Grid2X2 size={16} />
                    </Button>
                  </Tooltip>
                  <Tooltip content="List View">
                    <Button
                      isIconOnly
                      variant={gridView === "list" ? "solid" : "light"}
                      color={gridView === "list" ? "primary" : "default"}
                      onClick={() => setGridView("list")}
                      className="rounded-none"
                    >
                      <List size={16} />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className={`grid ${getGridClasses()}`}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : products?.data && products?.data?.length > 0 ? (
            <motion.div
              className={`grid ${getGridClasses()}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
            
                {products?.data?.map((product) => (
                  <ProductCart key={product.id} product={product} />
                ))}
             
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Products Found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find any products matching your criteria.
                </p>
                <Button
                  color="primary"
                  onClick={handleResetFilters}
                  startContent={<RefreshCw size={16} />}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}

          {/* Pagination */}
          {products?.data && products?.data?.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                total={10}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
                showControls
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-80 bg-white z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <Button
                    isIconOnly
                    variant="light"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories?.data?.map((category) => (
                      <div
                        key={category?.id}
                        className="flex justify-between items-center"
                      >
                        <label className="flex items-center cursor-pointer w-full">
                          <input
                            type="checkbox"
                            checked={selectedCategory === category?.name}
                            onChange={() =>
                              handleCategoryChange(category?.name)
                            }
                            className="rounded text-primary focus:ring-primary mr-3"
                          />
                          <span className="text-gray-700">
                            {category?.name}
                          </span>
                          <span className="ml-auto text-gray-500 text-sm">
                            ({category?.products?.length || 0})
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6 pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Price Range
                  </h4>
                  <div className="px-2">
                    <Slider
                      label="Price Range"
                      step={50}
                      minValue={0}
                      maxValue={1000}
                      value={priceRange}
                      onChange={handlePriceRangeChange as any}
                      showTooltip={true}
                      tooltipValueFormatOptions={{
                        style: "currency",
                        currency: "USD",
                      }}
                      className="max-w-md"
                    />

                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    color="primary"
                    className="flex-1"
                    onClick={() => {
                      updateActiveFilters();
                      setMobileFiltersOpen(false);
                    }}
                  >
                    Apply Filters
                  </Button>
                  <Button
                    variant="flat"
                    className="flex-1"
                    onClick={handleResetFilters}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;
// "use client";

// import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
// import { useProduct } from "@/src/context/product.provider";
// import { useGetAllCategory } from "@/src/hooks/category";
// import { useGetAllProducts } from "@/src/hooks/product";
// import {
//   Button,
//   Input,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Chip,
// } from "@nextui-org/react";
// import { useState } from "react";

// const ProductPage = () => {
//   const { query, setQuery, selectedCategory, setSelectedCategory } =
//     useProduct();
//   const { data: products } = useGetAllProducts(query);
//   const { data: categories } = useGetAllCategory([]);
//   const [priceRange, setPriceRange] = useState("1000");

//   // Handle category selection
//   const handleCategoryChange = (categoryName) => {
//     setSelectedCategory(categoryName);
//     setQuery((prev) => {
//       const updatedQuery = prev.filter((q) => q.name !== "category");
//       return [...updatedQuery, { name: "category", value: categoryName }];
//     });
//   };

//   // Handle search
//   const handleSearchChange = (e) => {
//     setQuery((prev) => {
//       const updatedQuery = prev.filter((q) => q.name !== "searchTerm");
//       return [...updatedQuery, { name: "searchTerm", value: e.target.value }];
//     });
//   };

//   // Handle sorting
//   const handleSortByPrice = (sortOrder) => {
//     setQuery((prev) => {
//       const updatedQuery = prev.filter(
//         (q) => q.name !== "sortBy" && q.name !== "sortOrder"
//       );
//       return [
//         ...updatedQuery,
//         { name: "sortBy", value: "price" },
//         { name: "sortOrder", value: sortOrder },
//       ];
//     });
//   };

//   // Handle price range selection
//   const handlePriceRangeChange = (e) => {
//     const value = e.target.value;
//     setPriceRange(value);
//     setQuery((prev) => {
//       const updatedQuery = prev.filter((q) => q.name !== "priceRange");
//       return [...updatedQuery, { name: "priceRange", value }];
//     });
//   };

//   return (
//     <div className="container pb-14 pt-12 relative">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Sidebar */}
//         <div className="col-span-1 p-4 bg-white shadow-md rounded-lg">
//           <h4 className="text-xl font-medium text-secondary uppercase mb-4">
//             Categories
//           </h4>
//           <div className="flex flex-wrap gap-2">
//             {categories?.data?.map((category) => (
//               <Chip
//                 key={category.id}
//                 onClick={() => handleCategoryChange(category.name)}
//                 color={
//                   selectedCategory === category.name ? "primary" : "default"
//                 }
//                 variant="bordered"
//                 className="cursor-pointer"
//               >
//                 {category.name}
//               </Chip>
//             ))}
//           </div>

//           <h4 className="text-xl font-medium text-secondary uppercase mt-6">
//             Price Range
//           </h4>
//           <input
//             type="range"
//             min="0"
//             max="1000"
//             value={priceRange}
//             onChange={handlePriceRangeChange}
//             className="w-full mt-2 h-2 bg-orange-500 rounded-full"
//           />
//           <span className="block text-center text-lg font-semibold mt-2">
//             0 - {priceRange}
//           </span>
//         </div>

//         {/* Products Section */}
//         <div className="col-span-1 lg:col-span-3">
//           <div className="flex flex-wrap items-center gap-5 mb-5">
//             <Input
//               onChange={handleSearchChange}
//               variant="bordered"
//               isClearable
//               type="text"
//               label="Search Product..."
//             />
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button variant="bordered">Sort Product</Button>
//               </DropdownTrigger>
//               <DropdownMenu>
//                 <DropdownItem onClick={() => handleSortByPrice("asc")}>
//                   Price Low-High
//                 </DropdownItem>
//                 <DropdownItem onClick={() => handleSortByPrice("desc")}>
//                   Price High-Low
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//             <Button
//               onClick={() => {
//                 setQuery([]);
//                 setSelectedCategory(null);
//                 setPriceRange("1000");
//               }}
//               variant="bordered"
//             >
//               Reset Filters
//             </Button>
//           </div>

//           {/* Product Grid */}
//           {products?.data && products?.data?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4 animate-fadeIn">
//               {products?.data?.map((product) => (
//                 <ProductCart key={product.id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center w-full h-64">
//               <h5 className="text-lg text-gray-500">
//                 No products available for the selected category!
//               </h5>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
