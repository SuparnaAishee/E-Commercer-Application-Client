"use client";

import Link from "next/link";

import { IoMdMenu } from "react-icons/io";

const MenuDropdown = () => {
  return (
    <div className="relative group">
      <Link href="/" className="lg:hidden relative block text-center ml-5">
        <span className="text-white flex justify-center">
          <IoMdMenu fontWeight={400} size={30} />
        </span>
        <span className="text-white text-[11px] leading-[10px]">Menu</span>
      </Link>

      <div className="absolute top-full right-[1px] bg-white z-20 rounded-b-[3px] py-5 px-[15px] w-[205px] shadow-sm mt-3.5 group-hover:mt-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <Link
          href="/"
          className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-primary transition duration-200"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-primary transition duration-200"
        >
          Product
        </Link>
        <Link
          href="/recent-products"
          className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-primary transition duration-200"
        >
          Recent Product
        </Link>
        <Link
          href="/flash-sale"
          className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-primary transition duration-200"
        >
          Flash Sale
        </Link>
      </div>
    </div>
  );
};

export default MenuDropdown;
