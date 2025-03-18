"use client";

import type React from "react";
import { userNavlist } from "@/src/const/user.navlist";
import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  LogOut,
  ChevronDown,
  User,
  ShoppingBag,
  Heart,
  CreditCard,
  MapPin,
  Settings,
  Bell,
  HelpCircle,
  Gift,
  Ticket,
  MessageSquare,
} from "lucide-react";

const UserSidebar = () => {
  const [open, setOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [isLargeScreen, setIsLargeScreen] = useState(false); // Add state for window width
  const { user, setIsUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Check window width on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLargeScreen(window.innerWidth >= 1024);

      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 1024);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        open
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Initialize expanded sections based on active path
  useEffect(() => {
    const newExpandedSections: Record<string, boolean> = {};

    userNavlist.forEach((list) => {
      const hasActiveChild = list.children?.some(
        (child) => pathname === child.path
      );
      if (hasActiveChild) {
        newExpandedSections[list.key] = true;
      }
    });

    setExpandedSections(newExpandedSections);
  }, [pathname]);

  const handleLogout = () => {
    logOut();
    setIsUserLoading(true);
    router.push("/");
  };

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Get icon component based on section key
  const getIconForSection = (key: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Account: <User size={18} />,
      Orders: <ShoppingBag size={18} />,
      Wishlist: <Heart size={18} />,
      Payments: <CreditCard size={18} />,
      Addresses: <MapPin size={18} />,
      Settings: <Settings size={18} />,
      Notifications: <Bell size={18} />,
      Support: <HelpCircle size={18} />,
      Rewards: <Gift size={18} />,
      Coupons: <Ticket size={18} />,
      Messages: <MessageSquare size={18} />,
    };

    return iconMap[key] || <User size={18} />;
  };

  // Animation variants
  const sidebarVariants = {
    hidden: {
      x: -300,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <div className="col-span-12 lg:col-span-3 relative" ref={sidebarRef}>
      {/* User Profile Header */}
      <motion.div
        className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 p-0.5">
            {user?.profilePhoto ? (
              <Image
                height={100}
                width={100}
                loading="lazy"
                src={user?.profilePhoto || "/placeholder.svg"}
                alt={user?.name || "User"}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center">
                <User size={24} className="text-orange-500" />
              </div>
            )}
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          />
        </div>

        <div className="flex-1">
          <p className="text-sm text-gray-500">Hello,</p>
          <h4 className="font-medium text-gray-800 truncate">
            {user?.name || "Guest User"}
          </h4>
        </div>

        <motion.button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 rounded-md border border-orange-200 text-orange-500 lg:hidden"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(249, 115, 22, 0.1)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu size={20} />
        </motion.button>
      </motion.div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        <motion.div
          className={`w-[300px] lg:w-full mt-4 bg-white rounded-lg shadow-sm p-4 z-20 lg:static lg:visible lg:opacity-100 ${
            open
              ? "fixed left-4 top-20"
              : "fixed left-4 -translate-x-full lg:translate-x-0"
          }`}
          variants={sidebarVariants}
          initial="hidden"
          animate={open || isLargeScreen ? "visible" : "hidden"} // Use isLargeScreen state
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            {userNavlist?.map((list, i) => (
              <motion.div
                key={list.key}
                className="border-b border-gray-100 pb-2 mb-2"
                custom={i}
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={() => toggleSection(list.key)}
                  className="w-full flex justify-between items-center py-2 px-3 rounded-md hover:bg-orange-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-orange-500 group-hover:text-orange-600 transition-colors">
                      {getIconForSection(list.key)}
                    </span>
                    <span className="font-medium text-gray-700 group-hover:text-gray-900">
                      {list.key}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedSections[list.key] ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={16} className="text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedSections[list.key] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pr-3 py-1 space-y-1">
                        {list?.children?.map((child) => {
                          const isActive = pathname === child.path;
                          return (
                            <Link
                              key={child.path}
                              href={child.path}
                              onClick={() => setOpen(false)}
                              className={`block py-1.5 px-2 rounded-md text-sm transition-all ${
                                isActive
                                  ? "bg-orange-100 text-orange-600 font-medium"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              }`}
                            >
                              <div className="flex items-center">
                                {isActive && (
                                  <motion.div
                                    layoutId="activeIndicator"
                                    className="w-1 h-1 bg-orange-500 rounded-full mr-2"
                                  />
                                )}
                                {child.text}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={18} />
            <span className="font-medium">Log Out</span>
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/20 z-10 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSidebar;
// "use client";

// import type React from "react";

// import { userNavlist } from "@/src/const/user.navlist";
// import { useUser } from "@/src/context/user.provider";
// import { logOut } from "@/src/services/Auth";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu,
//   LogOut,
//   ChevronDown,
//   User,
//   ShoppingBag,
//   Heart,
//   CreditCard,
//   MapPin,
//   Settings,
//   Bell,
//   HelpCircle,
//   Gift,
//   Ticket,
//   MessageSquare,
// } from "lucide-react";

// const UserSidebar = () => {
//   const [open, setOpen] = useState(false);
//   const [expandedSections, setExpandedSections] = useState<
//     Record<string, boolean>
//   >({});
//   const { user, setIsUserLoading } = useUser();
//   const router = useRouter();
//   const pathname = usePathname();
//   const sidebarRef = useRef<HTMLDivElement>(null);

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target as Node) &&
//         open
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open]);

//   // Initialize expanded sections based on active path
//   useEffect(() => {
//     const newExpandedSections: Record<string, boolean> = {};

//     userNavlist.forEach((list) => {
//       const hasActiveChild = list.children?.some(
//         (child) => pathname === child.path
//       );
//       if (hasActiveChild) {
//         newExpandedSections[list.key] = true;
//       }
//     });

//     setExpandedSections(newExpandedSections);
//   }, [pathname]);

//   const handleLogout = () => {
//     logOut();
//     setIsUserLoading(true);
//     router.push("/");
//   };

//   const toggleSection = (key: string) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   // Get icon component based on section key
//   const getIconForSection = (key: string) => {
//     const iconMap: Record<string, React.ReactNode> = {
//       Account: <User size={18} />,
//       Orders: <ShoppingBag size={18} />,
//       Wishlist: <Heart size={18} />,
//       Payments: <CreditCard size={18} />,
//       Addresses: <MapPin size={18} />,
//       Settings: <Settings size={18} />,
//       Notifications: <Bell size={18} />,
//       Support: <HelpCircle size={18} />,
//       Rewards: <Gift size={18} />,
//       Coupons: <Ticket size={18} />,
//       Messages: <MessageSquare size={18} />,
//     };

//     return iconMap[key] || <User size={18} />;
//   };

//   // Animation variants
//   const sidebarVariants = {
//     hidden: {
//       x: -300,
//       opacity: 0,
//       transition: { duration: 0.3 },
//     },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.3,
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//       },
//     },
//   };

//   const listItemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i: number) => ({
//       opacity: 1,
//       x: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.2,
//       },
//     }),
//   };

//   return (
//     <div className="col-span-12 lg:col-span-3 relative" ref={sidebarRef}>
//       {/* User Profile Header */}
//       <motion.div
//         className="bg-white rounded-lg shadow-sm p-4 flex gap-4 items-center"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className="relative">
//           <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-100 p-0.5">
//             {user?.profilePhoto ? (
//               <Image
//                 height={100}
//                 width={100}
//                 loading="lazy"
//                 src={user?.profilePhoto || "/placeholder.svg"}
//                 alt={user?.name || "User"}
//                 className="rounded-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full bg-orange-100 rounded-full flex items-center justify-center">
//                 <User size={24} className="text-orange-500" />
//               </div>
//             )}
//           </div>
//           <motion.div
//             className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
//           />
//         </div>

//         <div className="flex-1">
//           <p className="text-sm text-gray-500">Hello,</p>
//           <h4 className="font-medium text-gray-800 truncate">
//             {user?.name || "Guest User"}
//           </h4>
//         </div>

//         <motion.button
//           onClick={() => setOpen((prev) => !prev)}
//           className="flex items-center justify-center w-10 h-10 rounded-md border border-orange-200 text-orange-500 lg:hidden"
//           whileHover={{
//             scale: 1.05,
//             backgroundColor: "rgba(249, 115, 22, 0.1)",
//           }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <Menu size={20} />
//         </motion.button>
//       </motion.div>

//       {/* Sidebar Navigation */}
//       <AnimatePresence>
//         <motion.div
//           className={`w-[300px] lg:w-full mt-4 bg-white rounded-lg shadow-sm p-4 z-20 lg:static lg:visible lg:opacity-100 ${open ? "fixed left-4 top-20" : "fixed left-4 -translate-x-full lg:translate-x-0"}`}
//           variants={sidebarVariants}
//           initial="hidden"
//           animate={open || window.innerWidth >= 1024 ? "visible" : "hidden"}
//           transition={{ duration: 0.3 }}
//         >
//           <div className="space-y-2">
//             {userNavlist?.map((list, i) => (
//               <motion.div
//                 key={list.key}
//                 className="border-b border-gray-100 pb-2 mb-2"
//                 custom={i}
//                 variants={listItemVariants}
//                 initial="hidden"
//                 animate="visible"
//               >
//                 <button
//                   onClick={() => toggleSection(list.key)}
//                   className="w-full flex justify-between items-center py-2 px-3 rounded-md hover:bg-orange-50 transition-colors group"
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="text-orange-500 group-hover:text-orange-600 transition-colors">
//                       {getIconForSection(list.key)}
//                     </span>
//                     <span className="font-medium text-gray-700 group-hover:text-gray-900">
//                       {list.key}
//                     </span>
//                   </div>
//                   <motion.div
//                     animate={{ rotate: expandedSections[list.key] ? 180 : 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <ChevronDown size={16} className="text-gray-400" />
//                   </motion.div>
//                 </button>

//                 <AnimatePresence>
//                   {expandedSections[list.key] && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                       className="overflow-hidden"
//                     >
//                       <div className="pl-10 pr-3 py-1 space-y-1">
//                         {list?.children?.map((child) => {
//                           const isActive = pathname === child.path;
//                           return (
//                             <Link
//                               key={child.path}
//                               href={child.path}
//                               onClick={() => setOpen(false)}
//                               className={`block py-1.5 px-2 rounded-md text-sm transition-all ${
//                                 isActive
//                                   ? "bg-orange-100 text-orange-600 font-medium"
//                                   : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
//                               }`}
//                             >
//                               <div className="flex items-center">
//                                 {isActive && (
//                                   <motion.div
//                                     layoutId="activeIndicator"
//                                     className="w-1 h-1 bg-orange-500 rounded-full mr-2"
//                                   />
//                                 )}
//                                 {child.text}
//                               </div>
//                             </Link>
//                           );
//                         })}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </div>

//           {/* Logout Button */}
//           <motion.button
//             onClick={handleLogout}
//             className="mt-4 w-full flex items-center gap-3 py-2.5 px-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
//             whileHover={{ x: 5 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <LogOut size={18} />
//             <span className="font-medium">Log Out</span>
//           </motion.button>
//         </motion.div>
//       </AnimatePresence>

//       {/* Backdrop for mobile */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             className="fixed inset-0 bg-black/20 z-10 lg:hidden"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setOpen(false)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default UserSidebar;

// "use client";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { userNavlist } from "@/src/const/user.navlist";
// import { useUser } from "@/src/context/user.provider";
// import { logOut } from "@/src/services/Auth";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { AiOutlineLogout } from "react-icons/ai";
// import { CiBoxList } from "react-icons/ci";

// const UserSidebar = () => {
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
//           {userNavlist?.map((list, i) => {
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
//                       className="pl-7 pt-1 block hover:text-orange-600 mb-3"
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
//               className="flex gap-2 items-center text-[18px] font-medium hover:text-orange-600 group"
//             >
//               <span className="group-hover:text-orange-600">
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

// export default UserSidebar;
