import Link from "next/link";
import React from "react";

const WishlistDropdown = () => {
  return (
    <Link href="/" className="relative flex-col items-center">
      <span className="text-white flex justify-center">
        <svg width="28" height="28" viewBox="0 0 256 256">
          <path
            fill="currentColor"
            d="M128 220.2a13.6 13.6 0 0 1-9.9-4.1L35 133a58 58 0 0 1 2.2-84.2a56.5 56.5 0 0 1 41.6-14a62.8 62.8 0 0 1 40.3 18.3L128 62l11-11a57.9 57.9 0 0 1 84.1 2.2a56.2 56.2 0 0 1 14.1 41.6a62.8 62.8 0 0 1-18.3 40.3l-81 81a13.6 13.6 0 0 1-9.9 4.1Zm5.6-8.3ZM75 46.7a44 44 0 0 0-29.7 11.1a45.8 45.8 0 0 0-1.8 66.7l83.1 83.1a1.9 1.9 0 0 0 2.8 0l81-81c18.2-18.2 19.9-47.5 3.8-65.3a45.8 45.8 0 0 0-66.7-1.8l-15.3 15.2a6.1 6.1 0 0 1-8.5 0l-13.1-13.1A50.3 50.3 0 0 0 75 46.7Z"
          ></path>
        </svg>
      </span>
      <span className="text-white text-[11px] leading-[10px]">Wish List</span>
      <span className="absolute bg-primary -top-1 right-0 text-white text-[11px] w-[18px] h-[18px] leading-[18px] text-center rounded-full overflow-hidden">
        6
      </span>
    </Link>
  );
};

export default WishlistDropdown;
