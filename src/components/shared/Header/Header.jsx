/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useUser } from "@/src/context/user.provider";
// import { useGetAllCategory } from "@/src/hooks/category";
// import AccountDropdown from "./AccountDropdown";
// import CartDropdown from "./CartDropdown";
// import MenuDropdown from "./MenuDropdoen";
// import { useState } from "react";
// import Comparison from "../../modal/Comparison";
// import { ChevronDown, Menu, Search } from "lucide-react";
// import WishlistDropdown from "./WishlistDropdown";

// const MainHeader = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user } = useUser();
//   const { data: categories } = useGetAllCategory([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     router.push(value ? `/products?category=${value}` : `/products`);
//   };

//   return (
//     <nav className="bg-white border-b border-gray-200">
//       <div className="container mx-auto px-4 lg:px-12">
//         <div className="flex items-center justify-between py-3">
//           {/* Mobile Logo - Only visible on mobile */}
//           <Link href="/" className="lg:hidden w-[120px]">
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
//               alt="Dokan Express Logo"
//               className="w-full h-auto"
//             />
//           </Link>

//           {/* Category Dropdown */}
//           <div className="relative group hidden lg:block">
//             <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-200">
//               <Menu className="h-5 w-5" />
//               <span>Categories</span>
//               <ChevronDown className="h-4 w-4" />
//             </button>
//             <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-b-md border border-gray-200 hidden group-hover:block z-10">
//               <div className="py-2">
//                 {categories?.data?.map((category) => (
//                   <Link
//                     key={category?.id}
//                     href={`/products?category=${category?.id}`}
//                     className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
//                   >
//                     {category?.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile Category Select - Only visible on mobile */}
//           <div className="lg:hidden flex items-center">
//             <select
//               onChange={handleCategoryChange}
//               className="text-gray-700 bg-white border border-gray-300 rounded px-2 py-1 text-sm"
//             >
//               <option value="">Select Category</option>
//               {categories?.data?.map((category) => (
//                 <option key={category?.id} value={category?.id}>
//                   {category?.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Navigation Links - Hidden on mobile, shown on desktop */}
//           <ul className="hidden lg:flex items-center space-x-6 ml-8">
//             <li>
//               <Link
//                 href="/"
//                 className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
//                   pathname === "/"
//                     ? "text-orange-500 border-b-2 border-orange-500"
//                     : "text-gray-700 hover:text-orange-500"
//                 }`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/products"
//                 className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
//                   pathname === "/products"
//                     ? "text-orange-500 border-b-2 border-orange-500"
//                     : "text-gray-700 hover:text-orange-500"
//                 }`}
//               >
//                 Products
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/recent-products"
//                 className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
//                   pathname === "/recent-products"
//                     ? "text-orange-500 border-b-2 border-orange-500"
//                     : "text-gray-700 hover:text-orange-500"
//                 }`}
//               >
//                 Recent Products
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/flash-sale"
//                 className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
//                   pathname === "/flash-sale"
//                     ? "text-orange-500 border-b-2 border-orange-500"
//                     : "text-gray-700 hover:text-orange-500"
//                 }`}
//               >
//                 Flash Sale
//               </Link>
//             </li>
//           </ul>

//           {/* User Actions */}
//           <div className="flex items-center space-x-3">
//             {/* Mobile Search Button - Only visible on mobile */}
//             <button className="lg:hidden text-gray-700 hover:text-orange-500">
//               <Search className="h-5 w-5" />
//             </button>

//             {user?.email ? (
//               <div className="flex items-center space-x-2">
//                 <MenuDropdown />
//                 <Comparison />
//                 <WishlistDropdown />
//                 <CartDropdown />
//                 <AccountDropdown />
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link
//                   href="/login"
//                   className="text-gray-700 hover:text-orange-500 font-medium transition duration-200"
//                 >
//                   Login
//                 </Link>
//                 <span className="text-gray-400">/</span>
//                 <Link
//                   href="/register"
//                   className="text-gray-700 hover:text-orange-500 font-medium transition duration-200"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default MainHeader;
// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useUser } from "@/src/context/user.provider";
// import { useGetAllCategory } from "@/src/hooks/category";
// import AccountDropdown from "./AccountDropdown";
// import CartDropdown from "./CartDropdown";
// import MenuDropdown from "./MenuDropdoen";
// import { useState, useEffect } from "react";

// import { ChevronDown, Menu, Search, Zap, Star, TrendingUp } from "lucide-react";

// import Wishlist from "./wishlist";

// const InteractiveMainHeader = () => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user } = useUser();
//   const { data: categories } = useGetAllCategory([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [highlightedLink, setHighlightedLink] = useState(null);

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleCategoryChange = (e) => {
//     const { value } = e.target;
//     router.push(value ? `/products?category=${value}` : `/products`);
//   };

//   // Featured categories for mega menu
//   const featuredCategories = [
//     {
//       name: "New Arrivals",
//       icon: <Star className="h-4 w-4 text-orange-500" />,
//       path: "/new-arrivals",
//     },
//     {
//       name: "Best Sellers",
//       icon: <TrendingUp className="h-4 w-4 text-orange-500" />,
//       path: "/best-sellers",
//     },
//     {
//       name: "Flash Deals",
//       icon: <Zap className="h-4 w-4 text-orange-500" />,
//       path: "/flash-deals",
//     },
//   ];

//   return (
//     <nav
//       className={`bg-white py-3 transition-all duration-300 ${isScrolled ? "shadow-md" : "border-b border-gray-200"}`}
//     >
//       <div className="container mx-auto px-4 lg:px-12">
//         <div className="flex items-center justify-between">
//           {/* Mobile Logo - Only visible on mobile */}
//           <Link href="/" className="lg:hidden w-[120px]">
//             <img
//               src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
//               alt="Dokan Express Logo"
//               className="w-full h-auto"
//             />
//           </Link>

//           {/* Mobile Menu Toggle Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="lg:hidden text-gray-700 hover:text-orange-500"
//           >
//             <Menu className="h-6 w-6" />
//           </button>

//           {/* Category Dropdown - Desktop */}
//           <div className="relative group hidden lg:block">
//             <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 border rounded-md hover:bg-orange-400 transition duration-200">
//               <Menu className="h-5 w-5" />
//               <span>Categories</span>
//               <ChevronDown className="h-4 w-4" />
//             </button>
//             <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-b-md border border-gray-200 hidden group-hover:block z-10">
//               <div className="py-2">
//                 {categories?.data?.map((category) => (
//                   <Link
//                     key={category?.id}
//                     href={`/products?category=${category?.id}`}
//                     className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
//                   >
//                     {category?.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile Category Select - Only visible on mobile */}
//           <div className="lg:hidden flex items-center">
//             <select
//               onChange={handleCategoryChange}
//               className="text-gray-700 bg-white border border-gray-300 rounded px-2 py-1 text-sm"
//             >
//               <option value="">Select Category</option>
//               {categories?.data?.map((category) => (
//                 <option key={category?.id} value={category?.id}>
//                   {category?.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Navigation Links - Hidden on mobile, shown on desktop */}
//           <ul className="hidden lg:flex items-center space-x-6 ml-8">
//             {[
//               { name: "Home", path: "/" },
//               { name: "Shops", path: "/products" },
//               { name: "Viewed Products", path: "/recent-products" },
//               { name: "About Us", path: "/about" },
//               { name: "Support", path: "/support" },
//               { name: "Flash Deals", path: "/flash-deals" },
//             ].map((link) => (
//               <li key={link.path}>
//                 <Link
//                   href={link.path}
//                   className={`relative leading-[26px] flex items-center text-base font-medium px-2 transition-all duration-300 ${
//                     pathname === link.path
//                       ? "text-orange-500"
//                       : "text-gray-700 hover:text-orange-500"
//                   }`}
//                   onMouseEnter={() => setHighlightedLink(link.path)}
//                   onMouseLeave={() => setHighlightedLink(null)}
//                 >
//                   {link.name}
//                   <span
//                     className={`absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full transition-all duration-300 ${
//                       pathname === link.path
//                         ? "scale-x-100"
//                         : highlightedLink === link.path
//                           ? "scale-x-75"
//                           : "scale-x-0"
//                     }`}
//                   ></span>
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* User Actions */}
//           <div className="flex items-center space-x-3">
//             {/* Mobile Search Button - Only visible on mobile */}
//             <button className="lg:hidden text-gray-700 hover:text-orange-500">
//               <Search className="h-5 w-5" />
//             </button>

//             {user?.email ? (
//               <div className="flex items-center space-x-2">
//                 <div className="relative group">
//                   <MenuDropdown />
//                   <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </div>
//                 <div className="relative group ">
//                   {/* <Comparison /> */}
//                   <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </div>
//                 <div className="relative group">
//                   <Wishlist />
//                   <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </div>
//                 <div className="relative group">
//                   <CartDropdown />
//                   <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </div>
//                 <div className="relative group">
//                   <AccountDropdown />
//                   <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   href="/login"
//                   className="relative text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 group"
//                 >
//                   Login
//                   <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="px-4 py-1.5 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Mobile Menu - Collapsible */}
//         {isMenuOpen && (
//           <div className="lg:hidden mt-4">
//             <ul className="space-y-2">
//               {[
//                 { name: "Home", path: "/" },
//                 { name: "Shops", path: "/products" },
//                 { name: "Viewed Products", path: "/recent-products" },
//                 { name: "About Us", path: "/about" },
//                 { name: "Support", path: "/support" },
//                 { name: "Flash Deals", path: "/flash-deals" },
//               ].map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     href={link.path}
//                     className={`block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 ${
//                       pathname === link.path ? "text-orange-500" : ""
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default InteractiveMainHeader;
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { useGetAllCategory } from "@/src/hooks/category";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import MenuDropdown from "./MenuDropdoen";
import { useState, useEffect } from "react";

import { ChevronDown, Menu, Search, Zap, Star, TrendingUp } from "lucide-react";

import Wishlist from "./wishlist";

const InteractiveMainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { data: categories } = useGetAllCategory([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [highlightedLink, setHighlightedLink] = useState(null);

  // Handle scroll effect with window check to prevent SSR errors
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    router.push(value ? `/products?category=${value}` : `/products`);
  };

  // Featured categories for mega menu
  const featuredCategories = [
    {
      name: "New Arrivals",
      icon: <Star className="h-4 w-4 text-orange-500" />,
      path: "/new-arrivals",
    },
    {
      name: "Best Sellers",
      icon: <TrendingUp className="h-4 w-4 text-orange-500" />,
      path: "/best-sellers",
    },
    {
      name: "Flash Deals",
      icon: <Zap className="h-4 w-4 text-orange-500" />,
      path: "/flash-deals",
    },
  ];

  return (
    <nav
      className={`bg-white py-3 transition-all duration-300 ${isScrolled ? "shadow-md" : "border-b border-gray-200"}`}
    >
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Mobile Logo - Only visible on mobile */}
          <Link href="/" className="lg:hidden w-[120px]">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
              alt="Dokan Express Logo"
              className="w-full h-auto"
            />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-orange-500"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Category Dropdown - Desktop */}
          <div className="relative group hidden lg:block">
            <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 border rounded-md hover:bg-orange-400 transition duration-200">
              <Menu className="h-5 w-5" />
              <span>Categories</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-b-md border border-gray-200 hidden group-hover:block z-10">
              <div className="py-2">
                {categories?.data?.map((category) => (
                  <Link
                    key={category?.id}
                    href={`/products?category=${category?.id}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                  >
                    {category?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Category Select - Only visible on mobile */}
          <div className="lg:hidden flex items-center">
            <select
              onChange={handleCategoryChange}
              className="text-gray-700 bg-white border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="">Select Category</option>
              {categories?.data?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Links - Hidden on mobile, shown on desktop */}
          <ul className="hidden lg:flex items-center space-x-6 ml-8">
            {[
              { name: "Home", path: "/" },
              { name: "Shops", path: "/products" },
              { name: "Viewed Products", path: "/recent-products" },
              { name: "About Us", path: "/about" },
              { name: "Support", path: "/support" },
              { name: "Flash Deals", path: "/flash-deals" },
            ].map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className={`relative leading-[26px] flex items-center text-base font-medium px-2 transition-all duration-300 ${
                    pathname === link.path
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                  onMouseEnter={() => setHighlightedLink(link.path)}
                  onMouseLeave={() => setHighlightedLink(null)}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded-full transition-all duration-300 ${
                      pathname === link.path
                        ? "scale-x-100"
                        : highlightedLink === link.path
                          ? "scale-x-75"
                          : "scale-x-0"
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search Button - Only visible on mobile */}
            <button className="lg:hidden text-gray-700 hover:text-orange-500">
              <Search className="h-5 w-5" />
            </button>

            {user?.email ? (
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <MenuDropdown />
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </div>
                <div className="relative group ">
                  {/* <Comparison /> */}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </div>
                <div className="relative group">
                  <Wishlist />
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </div>
                <div className="relative group">
                  <CartDropdown />
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </div>
                <div className="relative group">
                  <AccountDropdown />
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="relative text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 group"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu - Collapsible */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4">
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Shops", path: "/products" },
                { name: "Viewed Products", path: "/recent-products" },
                { name: "About Us", path: "/about" },
                { name: "Support", path: "/support" },
                { name: "Flash Deals", path: "/flash-deals" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className={`block px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-500 ${
                      pathname === link.path ? "text-orange-500" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default InteractiveMainHeader;
