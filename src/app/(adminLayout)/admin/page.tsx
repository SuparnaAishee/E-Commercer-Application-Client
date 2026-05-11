"use client";

import UpdateProfile from "@/src/components/modal/UpdateProfile";
import { useUser } from "@/src/context/user.provider";
import { useGetMyProfile } from "@/src/hooks/profile";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail,
  ShieldCheck,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Package,
  ShoppingBag,
  Tag,
  Store,
  Users,
  FolderTree,
  ArrowUpRight,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 24 },
  },
};

const formatJoinDate = (dateString?: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const quickLinks = [
  {
    label: "Products",
    href: "/admin/manage-product",
    icon: Package,
    description: "Catalog & inventory",
  },
  {
    label: "Orders",
    href: "/admin/manage-order",
    icon: ShoppingBag,
    description: "Track & fulfill",
  },
  {
    label: "Categories",
    href: "/admin/manage-category",
    icon: FolderTree,
    description: "Organize catalog",
  },
  {
    label: "Coupons",
    href: "/admin/manage-coupon",
    icon: Tag,
    description: "Promotions",
  },
  {
    label: "Shops",
    href: "/admin/manage-shop",
    icon: Store,
    description: "Vendor stores",
  },
  {
    label: "Users",
    href: "/admin/manage-user",
    icon: Users,
    description: "Customer accounts",
  },
];

const AdminHomePage = () => {
  const { user } = useUser();
  const { data: profileResp } = useGetMyProfile();
  const profile = profileResp?.data;
  const photo = profile?.profilePhoto || user?.profilePhoto;
  const name = profile?.name || user?.name;
  const email = profile?.email || user?.email;
  const role = profile?.role || user?.role;
  const createdAt = profile?.createdAt || user?.createdAt;

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page header */}
      <motion.header
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {photo ? (
              <Image
                height={64}
                width={64}
                src={photo}
                alt={name || "Admin"}
                className="rounded-2xl w-16 h-16 object-cover ring-1 ring-orange-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center ring-1 ring-orange-100">
                <UserIcon size={28} className="text-orange-500" />
              </div>
            )}
          </div>
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-orange-600 mb-1.5">
              <ShieldCheck size={11} />
              Admin account
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
              {name || "Your profile"}
              <span className="text-orange-500">.</span>
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {email || "Manage your account and tools."}
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <UpdateProfile />
        </div>
      </motion.header>

      {/* Profile details */}
      <motion.section
        variants={itemVariants}
        className="bg-white rounded-2xl ring-1 ring-gray-100 p-6 md:p-8"
      >
        <header className="mb-6">
          <h2 className="text-base font-semibold text-gray-900">
            Account information
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Details linked to your admin account
          </p>
        </header>

        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <Field label="Full name" value={name} />
          <Field
            label="Email address"
            value={email}
            icon={<Mail size={14} />}
          />
          <Field label="Role" value={role} icon={<ShieldCheck size={14} />} />
          <Field
            label="Member since"
            value={formatJoinDate(createdAt)}
            icon={<Calendar size={14} />}
          />
          <Field
            label="Phone"
            value={profile?.phone}
            icon={<Phone size={14} />}
          />
          <Field
            label="Address"
            value={profile?.address}
            icon={<MapPin size={14} />}
          />
          <div className="md:col-span-2">
            <Field
              label="About"
              value={profile?.description}
              icon={<FileText size={14} />}
            />
          </div>
        </dl>
      </motion.section>

      {/* Quick actions */}
      <motion.section variants={itemVariants}>
        <header className="mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            Quick actions
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Jump directly to admin tools
          </p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickLinks.map(({ label, href, icon: Icon, description }) => (
            <Link
              key={href}
              href={href}
              className="group bg-white ring-1 ring-gray-100 rounded-2xl p-4 hover:ring-orange-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-50 group-hover:bg-orange-100 flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-orange-500" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900">{label}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{description}</p>
            </Link>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

const Field = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
}) => (
  <div>
    <dt className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
      {label}
    </dt>
    <dd className="flex items-center gap-2 text-sm text-gray-900 font-medium">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="break-all">{value || "—"}</span>
    </dd>
  </div>
);

export default AdminHomePage;
