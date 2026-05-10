"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Pencil,
  Camera,
  Heart,
  ShoppingBag,
  Star,
  KeyRound,
  CalendarClock,
  ShieldCheck,
  Save,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetMyProfile, useGetMyStats, useUpdateProfile } from "@/src/hooks/profile";
import { ProfileHeaderSkeleton, StatsRowSkeleton, Skeleton } from "@/src/components/UI/Skeleton";

type ProfileForm = {
  name: string;
  phone: string;
  description: string;
  address: string;
};

const formatJoinDate = (dateString?: string | null) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const ProfilePage = () => {
  const { data: profileData, isLoading: profileLoading, refetch } =
    useGetMyProfile();
  const { data: statsData, isLoading: statsLoading } = useGetMyStats();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const profile = profileData?.data;
  const stats = statsData?.data ?? { orders: 0, wishlist: 0, reviews: 0 };

  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingFileRef = useRef<File | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<ProfileForm>({
    defaultValues: { name: "", phone: "", description: "", address: "" },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name ?? "",
        phone: profile.phone ?? "",
        description: profile.description ?? "",
        address: profile.address ?? "",
      });
    }
  }, [profile, reset]);

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    pendingFileRef.current = file;
    setPhotoPreview(URL.createObjectURL(file));
    setIsEditing(true);
  };

  const onSubmit = (values: ProfileForm) => {
    const formData = new FormData();
    const dirtyData: Partial<ProfileForm> = {};
    for (const key of Object.keys(values) as (keyof ProfileForm)[]) {
      const v = values[key]?.trim();
      if (v !== undefined && v !== "") dirtyData[key] = v;
    }
    formData.append("data", JSON.stringify(dirtyData));
    if (pendingFileRef.current) {
      formData.append("file", pendingFileRef.current);
    }

    updateProfile(formData, {
      onSuccess(d) {
        if (d?.success) {
          toast.success("Profile updated");
          pendingFileRef.current = null;
          setPhotoPreview(null);
          setIsEditing(false);
          refetch();
        } else {
          toast.error(d?.message ?? "Could not update profile");
        }
      },
      onError() {
        toast.error("Could not update profile");
      },
    });
  };

  const cancel = () => {
    pendingFileRef.current = null;
    setPhotoPreview(null);
    setIsEditing(false);
    if (profile) {
      reset({
        name: profile.name ?? "",
        phone: profile.phone ?? "",
        description: profile.description ?? "",
        address: profile.address ?? "",
      });
    }
  };

  const photoSrc =
    photoPreview ?? profile?.profilePhoto ?? null;

  return (
    <div className="col-span-12 lg:col-span-9 space-y-6">
      {profileLoading ? (
        <ProfileHeaderSkeleton />
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-500 to-amber-400 text-white p-6 md:p-8 shadow-[0_30px_60px_-30px_rgba(255,140,0,0.55)]"
        >
          <div className="absolute -top-24 -right-16 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-4 ring-white/40 bg-white/20">
                {photoSrc ? (
                  <Image
                    src={photoSrc}
                    alt={profile?.name ?? "Profile photo"}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                    unoptimized={photoSrc.startsWith("blob:")}
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-white/80">
                    <User size={42} strokeWidth={1.4} />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
                className="absolute bottom-0 right-0 grid place-items-center h-8 w-8 rounded-full bg-white text-orange-600 ring-2 ring-orange-500 shadow hover:scale-105 transition"
              >
                <Camera size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={onPhotoChange}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {profile?.name ?? "Welcome"}
              </h1>
              <p className="mt-1 inline-flex items-center gap-1 text-white/85 text-sm">
                <Mail size={14} />
                {profile?.email}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 justify-center md:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 ring-1 ring-white/25 px-3 py-1 text-[11px] backdrop-blur">
                  <ShieldCheck size={12} />
                  {profile?.role ?? "USER"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 ring-1 ring-white/25 px-3 py-1 text-[11px] backdrop-blur">
                  <CalendarClock size={12} />
                  Joined {formatJoinDate(profile?.createdAt)}
                </span>
              </div>
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white text-orange-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 transition"
              >
                <Pencil size={14} />
                Edit profile
              </button>
            ) : null}
          </div>
        </motion.section>
      )}

      {statsLoading ? (
        <StatsRowSkeleton count={3} />
      ) : (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <StatCard
            label="Orders"
            value={stats.orders}
            icon={<ShoppingBag size={18} />}
            href="/account/order-history"
          />
          <StatCard
            label="Wishlist"
            value={stats.wishlist}
            icon={<Heart size={18} />}
            href="/account/wishlist"
          />
          <StatCard
            label="Reviews"
            value={stats.reviews}
            icon={<Star size={18} />}
            href="/account/order-history"
          />
        </div>
      )}

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.06)] p-6 md:p-8">
        <header className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Personal information
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Keep your details current so deliveries and notifications work
              smoothly.
            </p>
          </div>
        </header>

        {profileLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <Field label="Full name" icon={<User size={14} />}>
              <input
                type="text"
                disabled={!isEditing || isPending}
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-lg bg-gray-50 ring-1 ring-gray-200 disabled:bg-gray-50 disabled:text-gray-700 focus:ring-orange-300 focus:bg-white px-3 py-2.5 text-sm outline-none transition"
              />
              {formState.errors.name && (
                <p className="text-xs text-rose-500 mt-1">
                  {formState.errors.name.message as string}
                </p>
              )}
            </Field>

            <Field label="Email" icon={<Mail size={14} />}>
              <input
                type="email"
                value={profile?.email ?? ""}
                disabled
                readOnly
                className="w-full rounded-lg bg-gray-100 ring-1 ring-gray-200 text-gray-500 px-3 py-2.5 text-sm outline-none cursor-not-allowed"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Email is tied to your login and can&apos;t be changed here.
              </p>
            </Field>

            <Field label="Phone" icon={<Phone size={14} />}>
              <input
                type="tel"
                placeholder="Add a contact number"
                disabled={!isEditing || isPending}
                {...register("phone")}
                className="w-full rounded-lg bg-gray-50 ring-1 ring-gray-200 disabled:bg-gray-50 disabled:text-gray-700 focus:ring-orange-300 focus:bg-white px-3 py-2.5 text-sm outline-none transition"
              />
            </Field>

            <Field label="Address" icon={<MapPin size={14} />}>
              <input
                type="text"
                placeholder="Street, city, country"
                disabled={!isEditing || isPending}
                {...register("address")}
                className="w-full rounded-lg bg-gray-50 ring-1 ring-gray-200 disabled:bg-gray-50 disabled:text-gray-700 focus:ring-orange-300 focus:bg-white px-3 py-2.5 text-sm outline-none transition"
              />
            </Field>

            <div className="md:col-span-2">
              <Field label="About me">
                <textarea
                  rows={4}
                  placeholder="A short bio that other shoppers can see."
                  disabled={!isEditing || isPending}
                  {...register("description")}
                  className="w-full rounded-lg bg-gray-50 ring-1 ring-gray-200 disabled:bg-gray-50 disabled:text-gray-700 focus:ring-orange-300 focus:bg-white px-3 py-2.5 text-sm outline-none transition resize-none"
                />
              </Field>
            </div>

            {isEditing && (
              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={cancel}
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50 text-sm text-gray-700 px-4 py-2 transition disabled:opacity-50"
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 transition disabled:opacity-60"
                >
                  <Save size={14} />
                  {isPending ? "Saving…" : "Save changes"}
                </button>
              </div>
            )}
          </form>
        )}
      </section>

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-6 md:p-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <ActionCard
            href="/account/order-history"
            icon={<ShoppingBag size={18} />}
            title="Order history"
            subtitle="Track and manage your purchases"
          />
          <ActionCard
            href="/account/wishlist"
            icon={<Heart size={18} />}
            title="Wishlist"
            subtitle="Items you saved for later"
          />
          <ActionCard
            href="/account/change-password"
            icon={<KeyRound size={18} />}
            title="Change password"
            subtitle="Keep your account secure"
          />
        </div>
      </section>
    </div>
  );
};

const Field = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-1.5">
      {icon}
      {label}
    </span>
    {children}
  </label>
);

const StatCard = ({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  href: string;
}) => (
  <Link
    href={href}
    className="group rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-orange-200 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-25px_rgba(255,140,0,0.4)] p-4 md:p-5 transition-all"
  >
    <div className="flex items-center justify-between">
      <span className="grid place-items-center h-9 w-9 rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100">
        {icon}
      </span>
      <span className="text-2xl md:text-3xl font-semibold text-gray-900 tabular-nums">
        {value}
      </span>
    </div>
    <p className="text-xs text-gray-500 mt-2 group-hover:text-orange-600 transition">
      {label}
    </p>
  </Link>
);

const ActionCard = ({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <Link
    href={href}
    className="group flex items-start gap-3 rounded-xl bg-gray-50 hover:bg-orange-50 ring-1 ring-gray-100 hover:ring-orange-200 p-4 transition"
  >
    <span className="grid place-items-center h-9 w-9 rounded-full bg-white text-orange-500 ring-1 ring-orange-100">
      {icon}
    </span>
    <div className="min-w-0">
      <p className="text-sm font-medium text-gray-900 group-hover:text-orange-700 transition">
        {title}
      </p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </Link>
);

export default ProfilePage;
