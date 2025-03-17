"use client";

import { useState } from "react";
import Link from "next/link";
import { ThemeSwitch } from "../../theme-switch";
import { Search } from "lucide-react";

const OrganizedTopHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e:any) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="bg-white pl-4 pr-4 py-1 hidden lg:block border-b border-gray-200">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="w-[110px]">
            <img
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
              alt="Dokan Express Logo"
              className="w-full h-auto"
            />
          </Link>

          {/* Search Box */}
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
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 rounded-r-md transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Theme Switch */}
          <div className="flex items-center">
            {/* <ThemeSwitch /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizedTopHeader;

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { ThemeSwitch } from "../../theme-switch";
// import Search from "./Search";
// import { Globe, ChevronDown, Phone, Mail, MapPin } from "lucide-react";

// const TopHeader = () => {
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const [selectedLanguage, setSelectedLanguage] = useState("English");

//   const languages = ["English", "Spanish", "French", "German", "Chinese"];

//   const toggleLanguageDropdown = () => {
//     setIsLanguageOpen(!isLanguageOpen);
//   };

//   const selectLanguage = (lang:any) => {
//     setSelectedLanguage(lang);
//     setIsLanguageOpen(false);
//   };

//   return (
//     <header className="py-3 hidden lg:block border-b border-gray-200">
//       {/* Top bar with contact info and language selector */}
//       <div className="container mx-auto flex justify-between items-center px-4 lg:px-12 mb-3">
//         {/* Contact information */}
//         <div className="flex items-center space-x-4 text-sm text-gray-600">
//           <a
//             href="tel:+1234567890"
//             className="flex items-center hover:text-orange-500 transition-colors duration-200"
//           >
//             <Phone className="h-3.5 w-3.5 mr-1" />
//             <span>+1 (234) 567-890</span>
//           </a>
//           <a
//             href="mailto:support@dokanexpress.com"
//             className="flex items-center hover:text-orange-500 transition-colors duration-200"
//           >
//             <Mail className="h-3.5 w-3.5 mr-1" />
//             <span>support@dokanexpress.com</span>
//           </a>
//         </div>

//         {/* Language selector and store locator */}
//         <div className="flex items-center space-x-4 text-sm">
//           <div className="relative">
//             <button
//               className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-200"
//               onClick={toggleLanguageDropdown}
//             >
//               <Globe className="h-3.5 w-3.5 mr-1" />
//               <span>{selectedLanguage}</span>
//               <ChevronDown className="h-3.5 w-3.5 ml-1" />
//             </button>

//             {isLanguageOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
//                 {languages.map((lang) => (
//                   <button
//                     key={lang}
//                     className={`block w-full text-left px-4 py-2 text-sm ${
//                       lang === selectedLanguage
//                         ? "bg-orange-50 text-orange-500"
//                         : "text-gray-700 hover:bg-gray-50"
//                     }`}
//                     onClick={() => selectLanguage(lang)}
//                   >
//                     {lang}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <a
//             href="/store-locator"
//             className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-200"
//           >
//             <MapPin className="h-3.5 w-3.5 mr-1" />
//             <span>Store Locator</span>
//           </a>
//         </div>
//       </div>

//       {/* Main top header with logo, search and theme switch */}
//       <div className="container mx-auto flex justify-between items-center px-4 lg:px-12">
//         {/* Logo with hover effect */}
//         <Link
//           href="/"
//           className="w-[125px] transform transition-transform duration-300 hover:scale-105"
//         >
//           <img
//             src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png"
//             alt="Dokan Express Logo"
//             className="w-full h-auto"
//           />
//         </Link>

//         {/* Enhanced Search Box */}
//         <div className="flex-1 max-w-xl mx-8 group">
//           <div className="relative">
//             <Search />
//             <div className="absolute -bottom-10 left-0 w-full bg-white shadow-lg rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 py-2 px-3">
//               <p className="text-xs text-gray-500 mb-1">Popular Searches:</p>
//               <div className="flex flex-wrap gap-2">
//                 <a
//                   href="/search?q=smartphones"
//                   className="text-xs bg-gray-100 hover:bg-orange-100 px-2 py-1 rounded-full text-gray-700 hover:text-orange-500 transition-colors duration-200"
//                 >
//                   Smartphones
//                 </a>
//                 <a
//                   href="/search?q=laptops"
//                   className="text-xs bg-gray-100 hover:bg-orange-100 px-2 py-1 rounded-full text-gray-700 hover:text-orange-500 transition-colors duration-200"
//                 >
//                   Laptops
//                 </a>
//                 <a
//                   href="/search?q=headphones"
//                   className="text-xs bg-gray-100 hover:bg-orange-100 px-2 py-1 rounded-full text-gray-700 hover:text-orange-500 transition-colors duration-200"
//                 >
//                   Headphones
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Theme Switch with animation */}
//         <div className="flex items-center">
//           <div className="transform transition-transform duration-300 hover:scale-110">
//             <ThemeSwitch />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopHeader;

// import Link from "next/link";
// import { ThemeSwitch } from "../../theme-switch";
// import Search from "./Search"; // Ensure you update this component to use an icon for search

// const TopHeader = () => {
//   return (
//     <header className="py-3 hidden lg:block">
//       <div className="container mx-auto flex justify-between items-center pl-12 pr-12">
//         {/* Logo */}
//         <Link href="/" className="w-[125px]">
//           <img
//             src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png" // Replace with your actual logo image path
//             alt="Dokan Express Logo"
//             className="w-full h-auto "
//           />
//         </Link>

//         {/* Search Box */}
//         <Search />

//         {/* Theme Switch */}
//         <div className="flex items-center">
//           <ThemeSwitch />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default TopHeader;
