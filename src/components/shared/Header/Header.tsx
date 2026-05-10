/* eslint-disable @next/next/no-img-element */
"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search as SearchIcon } from "lucide-react";
import { useUser } from "@/src/context/user.provider";
import { useGetAllCategory } from "@/src/hooks/category";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import MenuDropdown from "./MenuDropdoen";
import Wishlist from "./wishlist";
import Compare from "./Compare";
import Comparison from "@/src/components/modal/Comparison";
import CartDrawer from "./CartDrawer";
import Search from "./Search";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Shops", path: "/products" },
  { name: "Viewed Products", path: "/recent-products" },
  { name: "About Us", path: "/about" },
  { name: "Support", path: "/support" },
  { name: "Flash Deals", path: "/flash-deals" },
] as const;

const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { data: categories } = useGetAllCategory([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [highlightedLink, setHighlightedLink] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    router.push(value ? `/products?category=${value}` : `/products`);
  };

  return (
    <nav
      className={`bg-white py-3 transition-all duration-300 ${isScrolled ? "shadow-md" : "border-b border-gray-200"}`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="lg:hidden w-[120px]">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
              alt="Dokan Express Logo"
              className="w-full h-auto"
            />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden text-gray-700 hover:text-orange-500"
          >
            <Menu className="h-6 w-6" />
          </button>

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

          <div className="lg:hidden flex items-center">
            <select
              onChange={handleCategoryChange}
              aria-label="Select category"
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

          <ul className="hidden lg:flex items-center space-x-6 ml-8">
            {NAV_LINKS.map((link) => (
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
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-3">
            <button
              aria-label="Search"
              className="lg:hidden text-gray-700 hover:text-orange-500"
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {user?.email ? (
              <div className="flex items-center gap-1 md:gap-2">
                <div className="relative group">
                  <MenuDropdown />
                </div>
                <div className="relative group">
                  <Wishlist />
                </div>
                <div className="relative group">
                  <Compare />
                </div>
                <div className="relative group">
                  <CartDropdown />
                </div>
                <div className="relative group">
                  <AccountDropdown />
                </div>
                <Comparison />
                <CartDrawer />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="relative text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 group"
                >
                  Login
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300" />
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

        {isMenuOpen && (
          <div className="lg:hidden mt-4 space-y-3">
            <Search />
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
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

export default MainHeader;
