"use client";

import Link from "next/link";
import Search from "./Search";

const TopHeader = () => {
  return (
    <div className="bg-white pl-4 pr-4 py-1 hidden lg:block border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="w-[110px] flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
              alt="Dokan Express Logo"
              className="w-full h-auto"
            />
          </Link>

          <Search className="flex-1 max-w-2xl mx-6" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
