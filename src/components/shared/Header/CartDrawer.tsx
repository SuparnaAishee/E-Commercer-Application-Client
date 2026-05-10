"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  useDeleteCartProduct,
  useGetMyCartProducts,
  useUpdateCartProductQuantity,
} from "@/src/hooks/cart";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import { useUser } from "@/src/context/user.provider";
import type { ICart } from "@/src/types";

const computeUnitPrice = (item: ICart) => {
  if (item.product?.isFlashSale) {
    return calculateDiscount(
      item.product.price,
      item.product.discount_percentage,
    );
  }
  return item.product?.price ?? 0;
};

const CartDrawer = () => {
  const { cartOpen, setCartOpen } = useUser();
  const { data, refetch } = useGetMyCartProducts();
  const { mutate: updateQty, isPending: isUpdating } =
    useUpdateCartProductQuantity();
  const { mutate: removeItem, isPending: isRemoving } = useDeleteCartProduct();

  const cartItems = data?.data ?? [];
  const subtotal = cartItems.reduce(
    (sum, item) => sum + computeUnitPrice(item) * (item.quantity ?? 0),
    0,
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const handleQty = (item: ICart, type: "increment" | "decrement") => {
    if (type === "decrement" && item.quantity <= 1) return;
    updateQty(
      { productId: item.id, type, quantity: 1 },
      {
        onSuccess(d) {
          if (d?.success) refetch();
          else toast.error(d?.message ?? "Could not update quantity");
        },
      },
    );
  };

  const handleRemove = (id: string) => {
    removeItem(id, {
      onSuccess(d) {
        if (d?.success) {
          refetch();
          toast.success(d?.message ?? "Removed from cart");
        } else {
          toast.error(d?.message ?? "Could not remove item");
        }
      },
    });
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-gray-900/40 backdrop-blur-sm"
          />
          <motion.aside
            key="cart-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 z-[61] h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-orange-50 text-orange-500">
                  <ShoppingBag size={18} />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-gray-900 leading-none">
                    Your cart
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="grid place-items-center h-9 w-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition"
              >
                <X size={16} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="grid place-items-center h-16 w-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                    <ShoppingBag size={28} />
                  </div>
                  <p className="text-gray-700 font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-500 mt-1 max-w-xs">
                    Browse products and add a few — they&apos;ll show up here.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setCartOpen(false)}
                    className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2.5 transition"
                  >
                    Continue shopping
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => {
                  const unit = computeUnitPrice(item);
                  const original = item.product?.price ?? 0;
                  const hasDiscount = unit < original;
                  return (
                    <div
                      key={item.id}
                      className="flex gap-3 rounded-xl ring-1 ring-gray-100 bg-white p-3 hover:ring-orange-100 transition-shadow"
                    >
                      <Link
                        href={`/products/${item.product?.id}`}
                        onClick={() => setCartOpen(false)}
                        className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50"
                      >
                        {item.product?.images?.[0] && (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        )}
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/products/${item.product?.id}`}
                            onClick={() => setCartOpen(false)}
                            className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 transition"
                          >
                            {item.product?.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleRemove(item.id)}
                            disabled={isRemoving}
                            aria-label="Remove item"
                            className="text-gray-400 hover:text-rose-500 disabled:opacity-50 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-sm font-semibold text-orange-600">
                            ${unit.toFixed(2)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-gray-400 line-through">
                              ${original.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="mt-auto flex items-center gap-2 pt-2">
                          <div className="inline-flex items-center rounded-full bg-gray-50 ring-1 ring-gray-100">
                            <button
                              type="button"
                              onClick={() => handleQty(item, "decrement")}
                              disabled={isUpdating || item.quantity <= 1}
                              className="grid place-items-center h-7 w-7 text-gray-500 hover:text-orange-500 disabled:opacity-40 disabled:cursor-not-allowed"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-semibold tabular-nums text-gray-900 min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQty(item, "increment")}
                              disabled={isUpdating}
                              className="grid place-items-center h-7 w-7 text-gray-500 hover:text-orange-500 disabled:opacity-40"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="ml-auto text-xs text-gray-500 tabular-nums">
                            ${(unit * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cartItems.length > 0 && (
              <footer className="border-t border-gray-100 px-5 py-4 space-y-3 bg-gray-50/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900 tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Shipping and taxes are calculated at checkout.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="rounded-full ring-1 ring-gray-200 hover:ring-orange-300 hover:text-orange-600 text-sm font-medium py-2.5 transition"
                  >
                    Continue
                  </button>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 text-center transition"
                  >
                    Checkout
                  </Link>
                </div>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
