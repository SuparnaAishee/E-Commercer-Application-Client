"use client";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
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
} from "@nextui-org/react";

const ProductPage = () => {
  const { query, setQuery, selectedCategory, setSelectedCategory } =
    useProduct();
  const { data: products } = useGetAllProducts(query); // Fetch products based on query
  const { data: categories } = useGetAllCategory([]); // Fetch categories

  // Handle category selection (checkbox)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedCategory(value); // Set selected category
      setQuery((prev) => {
        const updatedQuery = prev.filter((q) => q.name !== "category");
        return [...updatedQuery, { name: "category", value }];
      });
    } else {
      setSelectedCategory(null); // Deselect category
      setQuery((prev) => prev.filter((q) => q.name !== "category")); // Remove category filter
    }
  };

  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => {
      const updatedQuery = prev.filter((q) => q.name !== "searchTerm");
      return [...updatedQuery, { name: "searchTerm", value: e.target.value }];
    });
  };

  // Remove search term filter
  const handleRemoveSearch = () => {
    setQuery((prev) => prev.filter((q) => q.name !== "searchTerm"));
  };

  // Handle sorting by price
  const handleSortByPrice = (sortOrder: string) => {
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

  // Handle price range selection
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceRange = e.target.value;
    setQuery((prev) => {
      const updatedQuery = prev.filter((q) => q.name !== "priceRange");
      return [...updatedQuery, { name: "priceRange", value: priceRange }];
    });
  };

  return (
    <div className="container pb-14 pt-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-4 relative gap-6">
        <div className="col-span-1">
          <div className="lg:opacity-100 lg:visible transition-all duration-300 absolute bg-white top-[80px] left-0 lg:static w-[320px] shadow lg:w-full p-4 z-20 opacity-0 invisible">
            <div className="mt-6 sm:mt-2">
              {/* Categories */}
              <div className="pb-4 border-b border-[#E9E4E4] mb-4">
                <div className="flex justify-between items-start">
                  <h4 className="text-xl text-left font-medium mb-3 text-secondary uppercase">
                    Categories
                  </h4>
                </div>
                <div className="space-y-2">
                  {categories?.data?.map((category) => (
                    <div
                      key={category?.id}
                      className="custom_check flex justify-between items-center"
                    >
                      <div className="flex gap-3 items-center">
                        <input
                          onChange={handleCategoryChange}
                          value={category?.name}
                          type="checkbox"
                          checked={selectedCategory === category?.name}
                          className="focus:ring-0 text-rose-500 focus:bg-primary focus:outline-rose-500"
                          id={`cat-${category?.id}`}
                        />
                        <label
                          htmlFor={`cat-${category?.id}`}
                          className="cursor-pointer text-secondary"
                        >
                          {category?.name}
                        </label>
                      </div>
                      <p>({category?.products?.length})</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pb-4 border-b border-[#E9E4E4] mb-4">
                <h4 className="text-xl font-medium text-secondary uppercase">
                  Price Range
                </h4>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  onChange={handlePriceRangeChange}
                  className="w-full mt-2 h-2 bg-orange-500 rounded-full accent-orange-500"
                />
                <span
                  id="rangeValue"
                  className="block text-center text-xl font-semibold mt-2"
                >
                  {/* Display selected price range */}
                  {query?.find((q) => q.name === "priceRange")?.value || "0"} -
                  1000
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3">
          <div className="w-[200px] md:hidden mb-5">
            <Input
              onChange={handleSearchChange}
              onClear={handleRemoveSearch}
              variant="bordered"
              isClearable
              type="text"
              label="Search Product..."
            />
          </div>
          <div className="flex items-center gap-5">
            <Dropdown>
              <DropdownTrigger>
                <Button className="h-[50px]" variant="bordered">
                  Sort Product
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Sort Actions">
                <DropdownItem onClick={() => handleSortByPrice("asc")}>
                  Price Low-High
                </DropdownItem>
                <DropdownItem onClick={() => handleSortByPrice("desc")}>
                  Price High-Low
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="hidden md:block md:w-[200px]">
              <Input
                onChange={handleSearchChange}
                onClear={handleRemoveSearch}
                variant="bordered"
                isClearable
                type="text"
                label="Search Product..."
              />
            </div>

            <Button
              onClick={() => {
                setQuery([]); // Reset query
                setSelectedCategory(null); // Deselect category
              }}
              className="h-[45px] default_btn"
              variant="bordered"
            >
              Reset
            </Button>
          </div>

          {/* Display Products */}
          {products?.data && products?.data?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
              {products?.data?.map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <h5>No products available for the selected category!</h5>
            </div>
          )}
        </div>
      </div>
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
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
//   Input,
// } from "@nextui-org/react";

// const ProductPage = () => {
//   const { query, setQuery, selectedCategory, setSelectedCategory } =
//     useProduct();
//   const { data: products } = useGetAllProducts(query);
//   const { data: categories } = useGetAllCategory([]);

//   const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { checked, value } = e.target;
//     if (checked) {
//       setSelectedCategory(value);
//       setQuery((prev) => {
//         const prevQuery = prev.filter((p) => p.name !== "category");
//         return [...prevQuery, { name: "category", value }];
//       });
//     } else {
//       setQuery([]);
//       setSelectedCategory(null);
//     }
//   };

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery((prev) => {
//       const prevQuery = prev.filter((p) => p.name !== "searchTerm");
//       return [...prevQuery, { name: "searchTerm", value: e.target.value }];
//     });
//   };

//   const handleRemoveSearch = () => {
//     setQuery((prev) => {
//       const prevQuery = prev.filter((p) => p.name !== "searchTerm");
//       return [...prevQuery];
//     });
//   };

//   const handleSortByPrice = (sortOrder: string) => {
//     setQuery((prev) => {
//       const prevQuery = prev.filter(
//         (p) => p.name !== "sortBy" && p.name !== "sortOrder"
//       );

//       return [
//         ...prevQuery,
//         {
//           name: "sortBy",
//           value: "price",
//         },
//         {
//           name: "sortOrder",
//           value: sortOrder,
//         },
//       ];
//     });
//   };

//   return (
//     <div className="container pb-14 pt-12 relative">
//       <div className="grid grid-cols-1 md:grid-cols-4 relative gap-6">
//         <div className="col-span-1">
//           <div className="lg:opacity-100 lg:visible transition-all duration-300 absolute bg-white top-[80px] left-0 lg:static w-[320px] shadow lg:w-full p-4 z-20 opacity-0 invisible">
//             <div className="mt-6 sm:mt-2">
//               {/* Category */}
//               <div className="pb-4 border-b border-[#E9E4E4] mb-4">
//                 <div className="flex justify-between items-start">
//                   <h4 className="text-xl text-left font-medium mb-3 text-secondary uppercase">
//                     Categories
//                   </h4>
//                 </div>
//                 <div className="space-y-2">
//                   {categories?.data?.map((category) => (
//                     <div
//                       key={category?.id}
//                       className="custom_check flex justify-between items-center"
//                     >
//                       <div className="flex gap-3 items-center">
//                         <input
//                           onChange={handleQueryChange}
//                           value={category?.name}
//                           type="checkbox"
//                           checked={selectedCategory === category?.name}
//                           className="focus:ring-0 text-rose-500 focus:bg-primary focus:outline-rose-500"
//                           id={`cat-${category?.id}`}
//                         />
//                         <label
//                           htmlFor="cat-women"
//                           className="cursor-pointer text-secondary"
//                         >
//                           {category?.name}
//                         </label>
//                       </div>
//                       <p>({category?.products?.length})</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Price Range */}
//               <div className="pb-4 border-b border-[#E9E4E4] mb-4">
//                 <h4 className="text-xl font-medium  text-secondary uppercase">
//                   Price
//                 </h4>
//                 <span
//                   id="rangeValue"
//                   className="block relative text-center text-xl font-semibold"
//                 >
//                   200
//                 </span>
//                 <input type="range" className="range" min="0" max="1000" />
//               </div>
//               {/* Price Range */}
//             </div>
//           </div>
//         </div>
//         <div className="col-span-1 lg:col-span-3">
//           {/* Dropdown */}
//           <div className="w-[200px] md:hidden mb-5">
//             <Input
//               onChange={handleSearchChange}
//               onClear={handleRemoveSearch}
//               variant="bordered"
//               isClearable
//               type="text"
//               label="Search Product..."
//             />
//           </div>
//           <div className="flex items-center gap-5">
//             <Dropdown>
//               <DropdownTrigger>
//                 <Button className="h-[50px]" variant="bordered">
//                   Sort Product
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu aria-label="Static Actions">
//                 <DropdownItem
//                   onClick={() => handleSortByPrice("asc")}
//                   key="asc"
//                 >
//                   Price Low-High
//                 </DropdownItem>
//                 <DropdownItem
//                   onClick={() => handleSortByPrice("desc")}
//                   key="desc"
//                 >
//                   Price High-Low
//                 </DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//             <div className="hidden md:block md:w-[200px]">
//               <Input
//                 onChange={handleSearchChange}
//                 onClear={handleRemoveSearch}
//                 variant="bordered"
//                 isClearable
//                 type="text"
//                 label="Search Product..."
//               />
//             </div>

//             <Button
//               onClick={() => {
//                 setQuery([]);
//                 setSelectedCategory(null);
//               }}
//               className="h-[45px] default_btn"
//               variant="bordered"
//             >
//               Reset
//             </Button>
//           </div>
//           {products?.data && products?.data?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
//               {products?.data?.map((product) => (
//                 <ProductCart key={product.id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center w-full h-full">
//               <h5>No product available in search query!</h5>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
