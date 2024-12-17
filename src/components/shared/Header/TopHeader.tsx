import Link from "next/link";
import { ThemeSwitch } from "../../theme-switch";
import Search from "./Search"; // Ensure you update this component to use an icon for search

const TopHeader = () => {
  return (
    <header className="py-3 hidden lg:block">
      <div className="container mx-auto flex justify-between items-center pl-8 pr-8">
        {/* Logo */}
        <Link href="/" className="w-[125px]">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1734166983/Screenshot_2024-12-14_150213-removebg-preview_nemgmt.png" // Replace with your actual logo image path
            alt="Dokan Express Logo"
            className="w-full h-auto"
          />
        </Link>

        {/* Search Box */}
        <Search />

        {/* Theme Switch */}
        <div className="flex items-center">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
