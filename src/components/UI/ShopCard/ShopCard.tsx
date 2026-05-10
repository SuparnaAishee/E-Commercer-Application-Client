"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  Heart,
  Store,
  Users,
  Package,
  CalendarClock,
  ShieldCheck,
} from "lucide-react";
import { useUser } from "@/src/context/user.provider";
import {
  useFollowShop,
  useGetSingleFollowShop,
} from "@/src/hooks/followShop";
import type { IShop } from "@/src/types";

type ShopWithCounts = IShop & {
  followerCount?: number;
  productCount?: number;
};

const compactNumber = (n: number) =>
  new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

const formatJoin = (date?: string) => {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
  });
};

const ShopCard = ({ shop }: { shop: ShopWithCounts }) => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { data: followedShop, refetch: refetchFollowed } =
    useGetSingleFollowShop(shop?.id);
  const { mutate: toggleFollow, isPending } = useFollowShop();

  const isFollowing = useMemo(
    () => followedShop?.data?.shopId === shop?.id,
    [followedShop, shop?.id],
  );

  const followerCount =
    shop.followerCount ??
    (shop as unknown as { follower?: unknown[] }).follower?.length ??
    0;
  const productCount =
    shop.productCount ??
    (shop as unknown as { products?: unknown[] }).products?.length ??
    0;

  // Optimistic display: when the user toggles, show count ±1 immediately
  const displayFollowers = isFollowing ? followerCount : followerCount;

  const handleFollow = () => {
    if (!user?.id) {
      toast.error("Please login to follow this shop");
      return;
    }
    toggleFollow(
      { shopId: shop.id },
      {
        onSuccess(data) {
          if (data?.success) {
            refetchFollowed();
            queryClient.invalidateQueries({ queryKey: ["get-single-shop"] });
            toast.success(data?.message ?? "Updated");
          } else {
            toast.error(data?.message ?? "Could not update");
          }
        },
        onError() {
          toast.error("Could not update follow state");
        },
      },
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-orange-800 text-white p-6 md:p-8 shadow-[0_30px_60px_-30px_rgba(255,140,0,0.45)]"
    >
      <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-end gap-6">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl overflow-hidden bg-white/10 ring-4 ring-white/15 backdrop-blur">
            {shop?.shopLogo ? (
              <Image
                src={shop.shopLogo}
                alt={shop.shopName ?? "Shop"}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full w-full grid place-items-center text-white/70">
                <Store size={40} strokeWidth={1.4} />
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur px-3 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
              <ShieldCheck size={12} className="text-emerald-300" />
              Verified vendor
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-white/60">
              <CalendarClock size={11} />
              Joined {formatJoin(shop?.createdAt)}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {shop?.shopName ?? "Shop"}
          </h1>

          <p className="text-sm text-white/70 mt-2 max-w-xl line-clamp-2">
            {shop?.shopDetails ??
              "Curated products and dependable service from this vendor."}
          </p>

          <div className="mt-4 flex items-center gap-5">
            <Metric
              icon={<Users size={14} />}
              label="Followers"
              value={compactNumber(displayFollowers)}
            />
            <Metric
              icon={<Package size={14} />}
              label="Products"
              value={compactNumber(productCount)}
            />
          </div>
        </div>

        <div className="md:self-start">
          <button
            type="button"
            onClick={handleFollow}
            disabled={isPending}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition shadow-lg disabled:opacity-60 ${
              isFollowing
                ? "bg-white/15 ring-1 ring-white/30 text-white hover:bg-white/25"
                : "bg-white text-gray-900 hover:bg-orange-100"
            }`}
          >
            <Heart
              size={14}
              className={isFollowing ? "fill-current" : ""}
            />
            {isPending ? "…" : isFollowing ? "Following" : "Follow shop"}
          </button>
        </div>
      </div>
    </motion.section>
  );
};

const Metric = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div>
    <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] text-white/55 mb-0.5">
      {icon}
      {label}
    </span>
    <span className="text-lg font-semibold tabular-nums">{value}</span>
  </div>
);

export default ShopCard;
