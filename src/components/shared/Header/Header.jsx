"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { useGetAllCategory } from "@/src/hooks/category";
import AccountDropdown from "./AccountDropdown";
import CartDropdown from "./CartDropdown";
import MenuDropdown from "./MenuDropdoen";
import { useState } from "react";
import Comparison from "../../modal/Comparison";

import WishlistDropdown from "./WishlistDropdown";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const { data: categories } = useGetAllCategory([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    router.push(value ? `/products?category=${value}` : `/products`);
  };

  return (
    <nav className="bg-orange-400 py-3 pl-2 pr-2">
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="lg:hidden w-[120px]">
          <span className="text-orange-200 font-bold">Dokan</span>
          <span className="text-white">Xpress</span>
        </Link>

        {/* Left Section: Category and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Category Dropdown */}
          <div className="flex items-center space-x-2">
            <button className="text-white text-xl" aria-label="Category Menu">
              ☰
            </button>
            <select
              onChange={handleCategoryChange}
              className="text-white bg-orange-400 border border-white rounded px-3 py-1"
            >
              <option value="">Select Category</option>
              {categories?.data?.map((category) => (
                <option key={category?.id} value={category?.id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center lg:space-x-6 space-x-4">
            <li>
              <Link
                href="/"
                className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
                  pathname === "/" ? "text-secondary" : "text-white"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
                  pathname === "/products" ? "text-orange-200" : "text-white"
                }`}
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                href="/recent-products"
                className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
                  pathname === "/recent-products"
                    ? "text-orange-200"
                    : "text-white"
                }`}
              >
                Recent Product
              </Link>
            </li>
            <li>
              <Link
                href="/flash-sale"
                className={`leading-[26px] flex items-center text-base font-medium px-2 transition duration-300 ${
                  pathname === "/flash-sale" ? "text-orange-200" : "text-white"
                }`}
              >
                Flash Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section: User Actions */}
        <div className="flex items-center space-x-6">
          {user?.email ? (
            <div className="flex items-center space-x-2">
              <MenuDropdown />
              <Comparison/>
              <WishlistDropdown/>
              <CartDropdown />
              <AccountDropdown />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="text-white text-sm hover:text-orange-200 font-medium leading-[26px] transition duration-200"
              >
                Login
              </Link>
              <span className="text-white text-sm">/</span>
              <Link
                href="/register"
                className="text-white text-sm hover:text-orange-200 font-medium leading-[26px] transition duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

// "use client";
// import Link from "next/link";
// import AccountDropdown from "./AccountDropdown";
// import CartDropdown from "./CartDropdown";
// import { useUser } from "@/src/context/user.provider";
// import { usePathname } from "next/navigation";
// import MenuDropdown from "./MenuDropdoen";
// import { useGetMyComparison } from "@/src/hooks/compare";
// import Comparison from "../../modal/Comparison";
// import WishlistDropdown from "./WishlistDropdown";

// const Header = () => {
//   const pathname = usePathname();
//   const { user } = useUser();
//   const { data: comparisons } = useGetMyComparison();

//   return (
//     <nav className="bg-orange-400 py-1.5">
//       <div className="container flex items-center justify-between">
//         <Link href="/" className="lg:hidden w-[120px]">
//           <span className="text-orange-200 font-bold">Dokan</span>
//           <span className="text-white">Xpress</span>
//         </Link>

//         {/* Nav lists */}
//         <ul className="lg:flex items-center hidden">
//           <li>
//             <Link
//               href="/"
//               className={`leading-[26px] flex items-center text-base font-medium px-2.5 py-[15px] transition duration-300 ${
//                 pathname === "/" ? "text-secondary" : "text-white"
//               }`}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/products"
//               className={`leading-[26px] flex items-center text-base font-medium px-2.5 py-[15px] transition duration-300 ${
//                 pathname === "/products" ? "text-orange-200" : "text-white"
//               }`}
//             >
//               Product
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/recent-products"
//               className={`leading-[26px] flex items-center text-base font-medium px-2.5 py-[15px] transition duration-300 ${
//                 pathname === "/recent-products"
//                   ? "text-orange-200"
//                   : "text-white"
//               }`}
//             >
//               Recent Product
//             </Link>
//           </li>
//           <li>
//             <Link
//               href="/flash-sale"
//               className={`leading-[26px] flex items-center text-base font-medium px-2.5 py-[15px] transition duration-300 ${
//                 pathname === "/flash-sale" ? "text-orange-200" : "text-white"
//               }`}
//             >
//               Flash Sale
//             </Link>
//           </li>
//         </ul>

//         {user?.email ? (
//           <div className="flex items-center">
//             <MenuDropdown />
//             {comparisons?.data?.length > 0 && (
//               <Comparison comparisons={comparisons.data} />
//             )}
//             <WishlistDropdown/>
//             <CartDropdown />
//             <AccountDropdown />
//           </div>
//         ) : (
//           <div className="mr-4 flex items-center">
//             <Link
//               href="/login"
//               className="text-white text-sm hover:text-orange-200 font-medium leading-[26px] transition duration-200"
//             >
//               Login
//             </Link>
//             <span className="text-white text-sm">/</span>
//             <Link
//               href="/register"
//               className="text-white text-sm hover:text-orange-200 font-medium leading-[26px] transition duration-200"
//             >
//               Register
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;
