"use client";

import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";

const AccountDropdown = () => {
  const router = useRouter();
  const { setIsUserLoading, user } = useUser();
  const handleLogout = () => {
    logOut();
    router.push("/");
    setIsUserLoading(true);
  };
  return (
    <div className="relative group">
      <Link href="/" className="relative block text-center ml-5">
        <span className="text-white flex justify-center">
          <AiOutlineUser fontWeight={400} size={30} />
        </span>
        <span className="text-white text-[11px] leading-[10px]">Account</span>
      </Link>

      <div className="absolute top-full right-[1px] bg-white z-20 rounded-b-[3px] py-5 px-[15px] w-[205px] shadow-sm mt-3.5 group-hover:mt-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div>
          <p className="text-sm leading-[18px] font-medium text-secondary text-center">
            Welcome to <span className="text-orange-500">Dokan</span><span className="text-secondary">Xpress</span>
          </p>
        </div>
        {user?.role === "ADMIN" && (
          <div className="pt-2.5">
            <Link
              href="/admin"
              className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-orange-500 transition duration-200"
            >
              <svg
                className="absolute left-0 top-[1px]"
                width="22"
                height="22"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M5 6C3.355 6 2 7.355 2 9v14c0 1.645 1.355 3 3 3h22c1.645 0 3-1.355 3-3V9c0-1.645-1.355-3-3-3zm0 2h22c.566 0 1 .434 1 1v14c0 .566-.434 1-1 1H5c-.566 0-1-.434-1-1V9c0-.566.434-1 1-1zm6 2c-2.2 0-4 1.8-4 4c0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 0 0 6 21h2c0-1.668 1.332-3 3-3s3 1.332 3 3h2a5.036 5.036 0 0 0-2.219-4.156C14.523 16.117 15 15.114 15 14c0-2.2-1.8-4-4-4zm7 1v2h8v-2zm-7 1c1.117 0 2 .883 2 2s-.883 2-2 2s-2-.883-2-2s.883-2 2-2zm7 3v2h8v-2zm0 4v2h5v-2z"
                ></path>
              </svg>
              Dashboard
            </Link>
          </div>
        )}
        {user?.role === "VENDOR" && (
          <div className="pt-2.5">
            <Link
              href="/vendor"
              className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-orange-500 transition duration-200"
            >
              <svg
                className="absolute left-0 top-[1px]"
                width="22"
                height="22"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M5 6C3.355 6 2 7.355 2 9v14c0 1.645 1.355 3 3 3h22c1.645 0 3-1.355 3-3V9c0-1.645-1.355-3-3-3zm0 2h22c.566 0 1 .434 1 1v14c0 .566-.434 1-1 1H5c-.566 0-1-.434-1-1V9c0-.566.434-1 1-1zm6 2c-2.2 0-4 1.8-4 4c0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 0 0 6 21h2c0-1.668 1.332-3 3-3s3 1.332 3 3h2a5.036 5.036 0 0 0-2.219-4.156C14.523 16.117 15 15.114 15 14c0-2.2-1.8-4-4-4zm7 1v2h8v-2zm-7 1c1.117 0 2 .883 2 2s-.883 2-2 2s-2-.883-2-2s.883-2 2-2zm7 3v2h8v-2zm0 4v2h5v-2z"
                ></path>
              </svg>
              Dashboard
            </Link>
          </div>
        )}
        {user?.role === "USER" && (
          <div className="pt-2.5">
            <Link
              href="/account"
              className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-orange-500 transition duration-200"
            >
              <svg
                className="absolute left-0 top-[1px]"
                width="22"
                height="22"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M5 6C3.355 6 2 7.355 2 9v14c0 1.645 1.355 3 3 3h22c1.645 0 3-1.355 3-3V9c0-1.645-1.355-3-3-3zm0 2h22c.566 0 1 .434 1 1v14c0 .566-.434 1-1 1H5c-.566 0-1-.434-1-1V9c0-.566.434-1 1-1zm6 2c-2.2 0-4 1.8-4 4c0 1.113.477 2.117 1.219 2.844A5.036 5.036 0 0 0 6 21h2c0-1.668 1.332-3 3-3s3 1.332 3 3h2a5.036 5.036 0 0 0-2.219-4.156C14.523 16.117 15 15.114 15 14c0-2.2-1.8-4-4-4zm7 1v2h8v-2zm-7 1c1.117 0 2 .883 2 2s-.883 2-2 2s-2-.883-2-2s.883-2 2-2zm7 3v2h8v-2zm0 4v2h5v-2z"
                ></path>
              </svg>
              My Account
            </Link>
            <Link
              href="/account/order-history"
              className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-orange-500 transition duration-200"
            >
              <svg
                className="absolute left-0 top-[1px]"
                width="21"
                height="21"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M12 5c-1.645 0-3 1.355-3 3c0 .353.073.684.188 1H4v6h1v13h22V15h1V9h-5.188c.115-.316.188-.647.188-1c0-1.645-1.355-3-3-3c-1.75 0-2.94 1.33-3.72 2.438c-.103.148-.188.292-.28.437c-.092-.145-.177-.29-.28-.438C14.94 6.33 13.75 5 12 5zm0 2c.626 0 1.436.67 2.063 1.563c.152.217.13.23.25.437H12c-.565 0-1-.435-1-1s.435-1 1-1zm8 0c.565 0 1 .435 1 1s-.435 1-1 1h-2.313c.12-.206.098-.22.25-.438C18.564 7.672 19.375 7 20 7zM6 11h20v2h-9v-1h-2v1H6v-2zm1 4h18v11h-8V16h-2v10H7V15z"
                ></path>
              </svg>
              My Order
            </Link>

            {/* <Link
              href="/account/my-cart"
              className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-primary transition duration-200"
            >
              <svg
                className="absolute left-0 top-[2px]"
                width="18"
                height="18"
                viewBox="0 0 32 32"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M6 6h24l-3 13H9m18 4H10L5 2H2"></path>
                  <circle cx="25" cy="27" r="2"></circle>
                  <circle cx="12" cy="27" r="2"></circle>
                </g>
              </svg>
              My Cart
            </Link> */}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center relative w-full mt-[7px] text-[15px] pl-8 text-[#464545] hover:text-orange-500 transition duration-200"
        >
          <svg
            className="absolute left-0 top-[2px]"
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M15 4v12h2V4zm-3 .688C7.348 6.34 4 10.785 4 16c0 6.617 5.383 12 12 12s12-5.383 12-12c0-5.215-3.348-9.66-8-11.313v2.157C23.527 8.39 26 11.91 26 16c0 5.516-4.484 10-10 10S6 21.516 6 16c0-4.09 2.473-7.61 6-9.156z"
            ></path>
          </svg>
          Log out
        </button>
      </div>
    </div>
  );
};

export default AccountDropdown;
