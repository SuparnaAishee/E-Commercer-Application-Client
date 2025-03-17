"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import {
  Home,
  Package,
  ShoppingBag,
  Tag,
  Store,
  FileText,
  Users,
  LogOut,
  Menu,
  UserIcon,
} from "lucide-react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, setIsUserLoading } = useUser();
  const router = useRouter();

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleLogout = () => {
    logOut();
    setIsUserLoading(true);
    router.push("/");
  };

  // Direct management links
  const managementLinks = [
    {
      text: "Dashboard",
      path: "/admin/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      text: "Manage Products",
      path: "/admin/manage-product",
      icon: <Package className="w-5 h-5" />,
    },
    {
      text: "Manage Categories",
      path: "admin/manage-category",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      text: "Manage Orders",
      path: "/admin/manage-order",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      text: "Manage Coupons",
      path: "/admin/manage-coupon",
      icon: <Tag className="w-5 h-5" />,
    },
    {
      text: "Manage Shops",
      path: "/admin/manage-shop",
      icon: <Store className="w-5 h-5" />,
    },
    {
      text: "Manage Users",
      path: "/admin/manage-user",
      icon: <Users className="w-5 h-5" />,
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
              <UserIcon className="h-6 w-6 text-gray-500" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm text-gray-500">Hello,</p>
          <h4 className="font-medium">{user?.name}</h4>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="ml-auto border border-primary rounded p-1.5 lg:hidden hover:bg-gray-100 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Content */}
      <div
        id="sidebar"
        className={`w-[300px] lg:w-full mt-4 lg:mt-6 shadow-md rounded-md px-4 py-6 bg-white absolute lg:static z-10 transition-all duration-300 ease-in-out ${
          open
            ? "opacity-100 visible left-0"
            : "opacity-0 invisible -left-full lg:opacity-100 lg:visible lg:left-0"
        }`}
      >
        <div className="space-y-6">
          {/* Management Links */}
          <div className="space-y-2">
            {managementLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors hover:text-primary"
              >
                <span className="text-gray-500">{link.icon}</span>
                <span className="font-medium">{link.text}</span>
              </Link>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            {/* Back to Home Button */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors hover:text-primary"
            >
              <span className="text-gray-500">
                <Home className="w-5 h-5" />
              </span>
              <span className="font-medium">Back to Home</span>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors hover:text-primary w-full text-left"
            >
              <span className="text-gray-500">
                <LogOut className="w-5 h-5" />
              </span>
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

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
// import { adminNavlist } from "@/src/const/admin.navlist";

// const AdminSidebar = () => {
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
//           {adminNavlist?.map((list, i) => {
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

// export default AdminSidebar;
