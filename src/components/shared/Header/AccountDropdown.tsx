"use client";

import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LogOut,
  ShoppingBag,
  LayoutDashboard,
  Settings,
  ChevronDown,
  UserCircle,
  Bell,
  Heart,
  HelpCircle,
} from "lucide-react";

const AccountDropdown = () => {
  const router = useRouter();
  const { setIsUserLoading, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add a small delay for animation to complete
    setIsOpen(false);
    setTimeout(() => {
      logOut();
      router.push("/");
      setIsUserLoading(true);
    }, 200);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  // Get user's first name for personalized greeting
  const firstName = user?.name?.split(" ")[0] || "Guest";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex flex-col items-center gap-1 relative group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-50 text-orange-500 p-2 rounded-full"
          >
            <User size={20} strokeWidth={1.5} />
          </motion.div>

          {/* Notification dot - show if there are notifications */}
          {user?.hasNotifications && (
            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white"></span>
          )}
        </div>

        <div className="flex items-center gap-1 text-[11px] text-white">
          <span>Account</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={12} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full right-0 bg-white z-30 rounded-lg py-4 px-3 w-64 shadow-lg mt-2 border border-gray-100"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header with user info */}
            <div className="px-3 pb-3 mb-2 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-2 rounded-full">
                  <UserCircle size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Hello, {firstName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "Welcome to DokanXpress"}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items based on role */}
            <div className="space-y-1">
              {user?.role === "ADMIN" && (
                <motion.div
                  custom={0}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} className="text-orange-500" />
                    <span>Admin Dashboard</span>
                  </Link>
                </motion.div>
              )}

              {user?.role === "VENDOR" && (
                <motion.div
                  custom={0}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href="/vendor"
                    className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={18} className="text-orange-500" />
                    <span>Vendor Dashboard</span>
                  </Link>
                </motion.div>
              )}

              {user?.role === "USER" && (
                <>
                  <motion.div
                    custom={0}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href="/account"
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <User size={18} className="text-orange-500" />
                      <span>My Account</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    custom={1}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href="/account/order-history"
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingBag size={18} className="text-orange-500" />
                      <span>My Orders</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    custom={2}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href="/account/wishlist"
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Heart size={18} className="text-orange-500" />
                      <span>Wishlist</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    custom={3}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href="/account/notifications"
                      className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Bell size={18} className="text-orange-500" />
                      <span>Notifications</span>
                      {user?.hasNotifications && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </Link>
                  </motion.div>
                </>
              )}

              {/* Common items for all users */}
              <motion.div
                custom={4}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/help"
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <HelpCircle size={18} className="text-orange-500" />
                  <span>Help & Support</span>
                </Link>
              </motion.div>

              <motion.div
                custom={5}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/account/settings"
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings size={18} className="text-orange-500" />
                  <span>Account Settings</span>
                </Link>
              </motion.div>

              {/* Divider */}
              <div className="my-2 border-t border-gray-100"></div>

              {/* Logout button */}
              <motion.div
                custom={6}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
                >
                  <LogOut size={18} className="text-gray-500" />
                  <span>Log out</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountDropdown;
