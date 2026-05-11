"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  Store,
  FolderTree,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  UserIcon,
  ShieldCheck,
} from "lucide-react";

type NavItem = {
  text: string;
  path: string;
  icon: React.ReactNode;
};

type NavSection = {
  label: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    label: "Overview",
    items: [
      {
        text: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard className="w-[18px] h-[18px]" />,
      },
      {
        text: "Profile",
        path: "/admin",
        icon: <UserIcon className="w-[18px] h-[18px]" />,
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        text: "Products",
        path: "/admin/manage-product",
        icon: <Package className="w-[18px] h-[18px]" />,
      },
      {
        text: "Categories",
        path: "/admin/manage-category",
        icon: <FolderTree className="w-[18px] h-[18px]" />,
      },
      {
        text: "Coupons",
        path: "/admin/manage-coupon",
        icon: <Tag className="w-[18px] h-[18px]" />,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        text: "Orders",
        path: "/admin/manage-order",
        icon: <ShoppingBag className="w-[18px] h-[18px]" />,
      },
      {
        text: "Shops",
        path: "/admin/manage-shop",
        icon: <Store className="w-[18px] h-[18px]" />,
      },
      {
        text: "Users",
        path: "/admin/manage-user",
        icon: <Users className="w-[18px] h-[18px]" />,
      },
    ],
  },
];

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, setIsUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = () => {
    logOut();
    setIsUserLoading(true);
    router.push("/");
  };

  const isActive = (path: string) =>
    path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-2.5 flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg ring-1 ring-gray-200 hover:bg-gray-50 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-4 h-4 text-gray-700" />
        </button>
        <div className="flex items-center gap-2 min-w-0">
          <div className="shrink-0">
            {user?.profilePhoto ? (
              <Image
                height={32}
                width={32}
                src={user.profilePhoto}
                alt={user?.name || "Admin"}
                className="rounded-full w-8 h-8 object-cover ring-1 ring-orange-100"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center ring-1 ring-orange-100">
                <UserIcon className="h-4 w-4 text-orange-500" />
              </div>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase tracking-wide text-gray-400 font-medium leading-tight">
              Admin
            </span>
            <h4 className="font-semibold text-xs text-gray-900 truncate leading-tight">
              {user?.name || "Administrator"}
            </h4>
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — fixed on lg, drawer on mobile */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out lg:shadow-sm lg:border-r lg:border-gray-100 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Profile header */}
        <div className="shrink-0 px-5 pt-6 pb-5 bg-gradient-to-br from-orange-500 to-orange-400 text-white relative">
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden absolute top-3 right-3 p-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              {user?.profilePhoto ? (
                <Image
                  height={56}
                  width={56}
                  src={user.profilePhoto}
                  alt={user?.name || "Admin"}
                  className="rounded-full w-14 h-14 object-cover ring-2 ring-white/40"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/40">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] uppercase tracking-wider text-white/80 font-medium">
                Welcome back
              </span>
              <h4 className="font-semibold text-base truncate">
                {user?.name || "Administrator"}
              </h4>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-[11px] font-medium">
            <ShieldCheck className="w-3 h-3" />
            <span>{user?.role || "ADMIN"}</span>
          </div>
        </div>

        {/* Nav sections (scrolls if too tall) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {section.label}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                          active
                            ? "bg-orange-50 text-orange-600"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <span
                          className={`transition-colors ${
                            active
                              ? "text-orange-500"
                              : "text-gray-400 group-hover:text-gray-600"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="flex-1">{item.text}</span>
                        {active && (
                          <ChevronRight className="w-3.5 h-3.5 text-orange-500" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer (pinned) */}
        <div className="shrink-0 border-t border-gray-100 px-3 py-3 space-y-1 bg-white">
          <Link
            href="/"
            className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
          >
            <Home className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-600" />
            <span>Back to Store</span>
          </Link>
          <button
            onClick={handleLogout}
            className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all text-left"
          >
            <LogOut className="w-[18px] h-[18px] text-gray-400 group-hover:text-red-500" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
