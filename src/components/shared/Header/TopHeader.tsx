"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const TopHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white pl-4 pr-4 py-1 hidden lg:block border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="w-[110px]">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
              alt="Dokan Express Logo"
              className="w-full h-auto"
            />
          </Link>

          <div className="flex-1 max-w-md mx-6">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex h-9">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-1 pl-3 pr-10 text-sm border border-gray-200 rounded-l-md focus:outline-none focus:border-orange-400 transition-colors duration-200"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-r-md transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
