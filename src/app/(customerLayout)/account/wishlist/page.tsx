"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingBag,
  Share2,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  X,
} from "lucide-react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
import {
  useDeleteWishlistProduct,
  useGetMyWishlistProducts,
} from "@/src/hooks/wishlist";
import { useUser } from "@/src/context/user.provider";
import { ProductCardSkeleton } from "@/src/components/UI/Skeleton";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import type { IWishlist } from "@/src/types/wishlist";

type SortKey = "newest" | "priceAsc" | "priceDesc" | "name";

const sortLabel: Record<SortKey, string> = {
  newest: "Recently added",
  priceAsc: "Price: low to high",
  priceDesc: "Price: high to low",
  name: "Name (A → Z)",
};

const itemPrice = (item: IWishlist) => {
  const p = item.product;
  if (p?.isFlashSale && p?.discount_percentage) {
    return calculateDiscount(p.price, p.discount_percentage);
  }
  return p?.price ?? 0;
};

const WishlistPage = () => {
  const queryClient = useQueryClient();
  const { setCartOpen } = useUser();
  const { data: wishlist, isLoading, refetch } = useGetMyWishlistProducts([]);
  const { data: cart, refetch: refetchCart } = useGetMyCartProducts();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: deleteItem } = useDeleteWishlistProduct();

  const items = useMemo(() => wishlist?.data ?? [], [wishlist]);

  const [sort, setSort] = useState<SortKey>("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const sorted = useMemo(() => {
    const copy = [...items];
    if (sort === "priceAsc") {
      copy.sort((a, b) => itemPrice(a) - itemPrice(b));
    } else if (sort === "priceDesc") {
      copy.sort((a, b) => itemPrice(b) - itemPrice(a));
    } else if (sort === "name") {
      copy.sort((a, b) =>
        (a.product?.name ?? "").localeCompare(b.product?.name ?? ""),
      );
    }
    // "newest" relies on the backend's default order
    return copy;
  }, [items, sort]);

  // Drop selected ids that no longer exist
  useEffect(() => {
    setSelected((prev) => {
      const next = new Set<string>();
      const ids = new Set(items.map((i) => i.id));
      prev.forEach((id) => ids.has(id) && next.add(id));
      return next;
    });
  }, [items]);

  const totalValue = sorted.reduce(
    (sum, item) => sum + itemPrice(item) * 1,
    0,
  );
  const inStockCount = items.filter(
    (i) => (i.product?.inventory ?? 0) > 0,
  ).length;

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected = items.length > 0 && selected.size === items.length;
  const toggleSelectAll = () => {
    setSelected(allSelected ? new Set() : new Set(items.map((i) => i.id)));
  };

  const invalidateWishlist = () => {
    queryClient.invalidateQueries({ queryKey: ["get-my-wishlist-product"] });
    queryClient.invalidateQueries({ queryKey: ["my-stats"] });
  };

  const handleRemove = (id: string) => {
    deleteItem(id, {
      onSuccess(d) {
        if (d?.success) {
          invalidateWishlist();
          refetch();
          toast.success(d?.message ?? "Removed from wishlist");
        } else {
          toast.error(d?.message ?? "Could not remove item");
        }
      },
    });
  };

  const moveOneToCart = (item: IWishlist, removeAfter: boolean) => {
    const product = item.product;
    if (!product) return;
    const isDifferentShop = cart?.data?.find(
      (c) => c.product?.shopId !== product.shopId,
    );

    const performAdd = (replace = false) =>
      addToCart(
        {
          productId: product.id,
          quantity: 1,
          ...(replace ? { type: "replaceProduct" as const } : {}),
        },
        {
          onSuccess(d) {
            if (d?.success) {
              refetchCart();
              if (removeAfter) handleRemove(item.id);
              else toast.success(d?.message ?? "Added to cart");
              setCartOpen(true);
            } else {
              toast.error(d?.message ?? "Could not add to cart");
            }
          },
          onError() {
            toast.error("Could not add to cart");
          },
        },
      );

    if (isDifferentShop) {
      Swal.fire({
        title: "Different shop detected",
        text: "Replace the cart with this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#9ca3af",
        confirmButtonText: "Yes, replace",
      }).then((result) => {
        if (result.isConfirmed) performAdd(true);
      });
    } else {
      performAdd(false);
    }
  };

  const handleBulkMove = () => {
    const targets = items.filter((i) => selected.has(i.id));
    if (targets.length === 0) return;
    targets.forEach((item) => moveOneToCart(item, true));
    setSelected(new Set());
  };

  const handleBulkRemove = () => {
    const targets = items.filter((i) => selected.has(i.id));
    if (targets.length === 0) return;
    Swal.fire({
      title: `Remove ${targets.length} item${
        targets.length === 1 ? "" : "s"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        targets.forEach((item) => handleRemove(item.id));
        setSelected(new Set());
      }
    });
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Dokan Express wishlist",
          text: `Check out my wishlist (${items.length} items)`,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Wishlist link copied");
      }
    } catch {
      // user cancelled — no-op
    }
  };

  return (
    <div className="col-span-12 lg:col-span-9 space-y-6">
      {/* Editorial header */}
      <header className="rounded-2xl bg-white ring-1 ring-gray-100 p-6 md:p-8 shadow-[0_2px_20px_-15px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-orange-600 mb-2">
              <Heart size={11} className="fill-orange-500 text-orange-500" />
              Saved for later
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              My wishlist
              <span className="text-orange-500">.</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-md">
              {isLoading
                ? "Pulling your saved items…"
                : items.length === 0
                  ? "Items you save will live here. Tap the heart on any product to start a list."
                  : `${items.length} ${
                      items.length === 1 ? "item" : "items"
                    } you've saved · ${inStockCount} in stock · est. value $${totalValue.toFixed(2)}`}
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button
                    size="sm"
                    variant="flat"
                    endContent={<ChevronDown size={14} />}
                  >
                    {sortLabel[sort]}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Sort wishlist">
                  <DropdownItem
                    key="newest"
                    onClick={() => setSort("newest")}
                  >
                    Recently added
                  </DropdownItem>
                  <DropdownItem
                    key="priceAsc"
                    onClick={() => setSort("priceAsc")}
                  >
                    Price: low to high
                  </DropdownItem>
                  <DropdownItem
                    key="priceDesc"
                    onClick={() => setSort("priceDesc")}
                  >
                    Price: high to low
                  </DropdownItem>
                  <DropdownItem key="name" onClick={() => setSort("name")}>
                    Name (A → Z)
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-gray-200 hover:ring-orange-300 hover:text-orange-600 text-sm text-gray-700 px-4 py-1.5 transition"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Bulk action bar */}
      <AnimatePresence>
        {selected.size > 0 && (
          <motion.div
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="sticky top-24 z-20 flex flex-wrap items-center justify-between gap-3 rounded-full bg-gray-900 text-white px-5 py-3 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center h-8 w-8 rounded-full bg-orange-500 text-white">
                <CheckCircle2 size={16} />
              </span>
              <span className="text-sm">
                <strong className="font-semibold">{selected.size}</strong>{" "}
                selected
              </span>
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="text-xs text-white/60 hover:text-white"
              >
                Clear
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBulkMove}
                disabled={isAddingToCart}
                className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-medium px-4 py-1.5 transition"
              >
                <ShoppingBag size={14} />
                Move to bag
              </button>
              <button
                type="button"
                onClick={handleBulkRemove}
                className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-white/20 hover:ring-white/40 text-white text-sm px-4 py-1.5 transition"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toolbar (select-all) */}
      {items.length > 0 && (
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 cursor-pointer text-gray-600">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="h-4 w-4 rounded text-orange-500 focus:ring-orange-500"
            />
            Select all
          </label>
          <span className="text-xs text-gray-500 tabular-nums">
            Showing {sorted.length} of {items.length}
          </span>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {sorted.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              selected={selected.has(item.id)}
              onToggleSelect={() => toggleSelect(item.id)}
              onRemove={() => handleRemove(item.id)}
              onAddToCart={() => moveOneToCart(item, false)}
              isAddingToCart={isAddingToCart}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white ring-1 ring-gray-100 p-12 text-center">
          <div className="grid place-items-center h-16 w-16 mx-auto rounded-full bg-orange-50 text-orange-500 mb-4">
            <Heart size={22} className="fill-orange-200" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Your wishlist is empty
          </h3>
          <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto">
            Tap the heart on any product card or product page to save it here
            — we&apos;ll keep an eye on price drops for you.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 transition"
          >
            <Sparkles size={14} />
            Discover products
          </Link>
        </div>
      )}
    </div>
  );
};

const WishlistCard = ({
  item,
  selected,
  onToggleSelect,
  onRemove,
  onAddToCart,
  isAddingToCart,
}: {
  item: IWishlist;
  selected: boolean;
  onToggleSelect: () => void;
  onRemove: () => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}) => {
  const product = item.product;
  if (!product) return null;
  const inStock = (product.inventory ?? 0) > 0;
  const lowStock = inStock && (product.inventory ?? 0) < 30;
  const finalPrice = itemPrice(item);
  const hasDiscount =
    product.isFlashSale && (product.discount_percentage ?? 0) > 0;

  return (
    <article
      className={`group relative rounded-2xl bg-white ring-1 transition-all overflow-hidden ${
        selected
          ? "ring-orange-300 shadow-[0_24px_48px_-30px_rgba(255,140,0,0.6)]"
          : "ring-gray-100 hover:ring-orange-200 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-25px_rgba(0,0,0,0.18)]"
      }`}
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          )}
          {hasDiscount && (
            <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-rose-600 text-white text-xs font-semibold px-2.5 py-1 shadow-md">
              −{product.discount_percentage}%
            </span>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-white/65 backdrop-blur-sm grid place-items-center">
              <span className="rounded-full bg-gray-900 text-white text-xs font-semibold px-4 py-1.5">
                Out of stock
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Top-right select + remove cluster (always visible) */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <label className="grid place-items-center h-8 w-8 rounded-full bg-white/95 backdrop-blur ring-1 ring-gray-200 hover:ring-orange-300 cursor-pointer shadow-sm">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggleSelect}
            aria-label="Select item"
            className="h-3.5 w-3.5 rounded text-orange-500 focus:ring-orange-500"
          />
        </label>
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove from wishlist"
          className="grid place-items-center h-8 w-8 rounded-full bg-white/95 backdrop-blur ring-1 ring-gray-200 hover:ring-rose-300 hover:text-rose-500 text-gray-500 shadow-sm transition"
        >
          <X size={14} />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <Link
          href={`/products/${product.id}`}
          className="block text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 transition"
        >
          {product.name}
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900 tabular-nums">
            ${finalPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through tabular-nums">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs">
          <span
            className={
              !inStock
                ? "text-gray-500"
                : lowStock
                  ? "text-amber-600 font-medium"
                  : "text-emerald-600 font-medium"
            }
          >
            {!inStock
              ? "Currently unavailable"
              : lowStock
                ? `Only ${product.inventory} left`
                : "In stock"}
          </span>
          {product.shop?.shopName && (
            <span className="text-gray-400 truncate max-w-[40%]">
              by {product.shop.shopName}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          disabled={!inStock || isAddingToCart}
          className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-gray-900 hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 transition"
        >
          <ShoppingBag size={14} />
          {!inStock
            ? "Notify me"
            : isAddingToCart
              ? "Adding…"
              : "Add to cart"}
        </button>
      </div>
    </article>
  );
};

export default WishlistPage;
