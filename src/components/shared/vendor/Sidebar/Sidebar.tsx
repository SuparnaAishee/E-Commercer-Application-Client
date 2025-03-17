/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
"use client";

import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Store,
  Package,
  LogOut,
  Menu,
  Home,
  ShoppingCart,
  Settings,
  LayoutDashboard,
  User,
} from "lucide-react";

const VendorSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, setIsUserLoading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    setIsUserLoading(true);
    router.push("/");
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("vendor-sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Direct navigation items
  const navItems = [
    {
      text: "Dashboard",
      path: "/vendor/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      text: "Manage Shop",
      path: "/vendor/manage-shop",
      icon: <Store className="h-5 w-5" />,
    },
    {
      text: "Manage Products",
      path: "/vendor/manage-product",
      icon: <Package className="h-5 w-5" />,
    },
    {
      text: "Manage Orders",
      path: "/vendor/manage-order",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    
  ];

  return (
    <div className="col-span-12 lg:col-span-3 relative">
      {/* Header - Always visible */}
      <div className="bg-white shadow-md rounded-md px-4 py-2 flex gap-5 items-center">
        <div className="w-12 border border-[#E9E4E4] rounded-full p-1 overflow-hidden">
          {user?.profilePhoto ? (
            <Image
              height={100}
              width={100}
              loading="lazy"
              src={user?.profilePhoto || "/placeholder.svg"}
              alt="user"
              className="rounded-full"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Hello,</p>
          <h4 className="font-medium">{user?.name}</h4>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto border border-emerald-500 rounded p-1.5 lg:hidden hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-emerald-500" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        id="vendor-sidebar"
        className={`w-[300px] lg:w-full mt-4 lg:mt-6 shadow-md rounded-md px-4 py-6 bg-white absolute lg:static z-10 transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 visible left-0"
            : "opacity-0 invisible -left-full lg:opacity-100 lg:visible lg:left-0"
        }`}
      >
        <div className="space-y-4">
          {/* Direct navigation links */}
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-50 hover:text-orange-500 transition-colors group"
            >
              <span className="text-gray-500 group-hover:text-orange-500">
                {item.icon}
              </span>
              <span className="font-medium">{item.text}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t my-4"></div>

          {/* Back to Home button */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-50 hover:text-orange-500 transition-colors group"
          >
            <span className="text-gray-500 group-hover:text-orange-500">
              <Home className="h-5 w-5" />
            </span>
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-gray-50 hover:text-orange-500 transition-colors group w-full"
          >
            <span className="text-gray-500 group-hover:text-orange-500">
              <LogOut className="h-5 w-5" />
            </span>
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;

// "use client";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { useUser } from "@/src/context/user.provider";
// import { logOut } from "@/src/services/Auth";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
// import { CiBoxList } from "react-icons/ci";
// import { vendorNavlist } from "@/src/const/vendor.navlist";

// const VendorSidebar = () => {
//   const [open, setOpen] = useState(false);
//   const { user, setIsUserLoading } = useUser();
//   const router = useRouter();

//   const handleLogout = () => {
//     logOut();
//     setIsUserLoading(true);
//     router.push("/");
//   };

//   return (
//     <div className="col-span-12 lg:col-span-3 relative">
//       <div>
//         <div className="box_shadow px-4 py-2 flex gap-5 items-center">
//           <div className="w-12 border border-[#E9E4E4] rounded-full p-1">
//             <Link href="my-account.html">
//               {user?.profilePhoto && (
//                 <Image
//                   height={100}
//                   width={100}
//                   loading="lazy"
//                   src={user?.profilePhoto}
//                   alt="user"
//                 />
//               )}
//             </Link>
//           </div>

//           <div className="acprof_cont">
//             <p>Hello,</p>
//             <h4>{user?.name}</h4>
//           </div>

//           <button
//             onClick={() => setOpen((prev) => !prev)}
//             className="flex ml-auto border border-primary -mt-2 rounded  p-1 lg:hidden"
//           >
//             <RxHamburgerMenu />
//           </button>
//         </div>

//         <div
//           className={`w-[300px] lg:w-full lg:mt-6 box_shadow px-4 py-6 bg-white absolute lg:static lg:visible lg:opacity-100 z-10 transition-all duration-300  ${open ? "opacity-100 visible top-20" : "opacity-0 invisible top-0"}`}
//         >
//           {vendorNavlist?.map((list, i) => {
//             return (
//               <div key={i} className="border-b mt-2">
//                 <p className="flex gap-2 items-center text-lg lg:text-base xl:text-lg font-medium  group">
//                   <span>
//                     <CiBoxList />
//                   </span>
//                   {list?.key}
//                 </p>
//                 {list?.children?.map((child) => {
//                   return (
//                     <Link
//                       onClick={() => setOpen(false)}
//                       key={child?.path}
//                       href={child?.path}
//                       className="pl-7 pt-1 block hover:text-primary mb-3"
//                     >
//                       {child?.text}
//                     </Link>
//                   );
//                 })}
//               </div>
//             );
//           })}

//           <div className="mt-4">
//             <button
//               onClick={handleLogout}
//               className="flex gap-2 items-center text-[18px] font-medium hover:text-primary group"
//             >
//               <span className="group-hover:text-primary">
//                 <AiOutlineLogout />
//               </span>
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorSidebar;
