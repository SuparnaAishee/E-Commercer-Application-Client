"use client";

import Swal from "sweetalert2";
import { useUser } from "@/src/context/user.provider";
import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
import type { IProduct } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Eye, GitCompareArrows, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateCompare, useGetMyComparison } from "@/src/hooks/compare";
import { useAddToWishlist } from "@/src/hooks/wishlist";
import { useQueryClient } from "@tanstack/react-query";

const ProductCart = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setShowCompareModal } = useUser();
  const { data: comparisons, refetch: refetchComparison } =
    useGetMyComparison();
  const { mutate: addToCompare } = useCreateCompare();
  const { data: cartProduct, refetch: refetchCart } = useGetMyCartProducts();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const promptLogin = (text: string) =>
    Swal.fire({
      title: "Please login",
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Login",
    }).then((result) => {
      if (result.isConfirmed) router.push("/login");
    });

  const handleAddToCart = (product: IProduct & { type?: "replaceProduct" }) => {
    if (!user?.email) {
      promptLogin("Please login to add product in cart!");
      return;
    }

    const isDifferentShop = cartProduct?.data?.find(
      (cart) => cart.product?.shopId !== product?.shopId,
    );

    if (isDifferentShop) {
      Swal.fire({
        title: "Different shop detected",
        text: "Adding multiple shop products is not allowed. Replace the cart with this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#9ca3af",
        confirmButtonText: "Yes, replace",
      }).then((result) => {
        if (result.isConfirmed) {
          addToCart(
            { productId: product.id, quantity: 1, type: "replaceProduct" },
            {
              onSuccess(data) {
                if (data?.success) {
                  refetchCart();
                  toast.success(data?.message);
                } else {
                  toast.error(data?.message);
                }
              },
              onError() {
                toast.error("Failed to add product to cart.");
              },
            },
          );
        }
      });
    } else {
      addToCart(
        { productId: product.id, quantity: 1 },
        {
          onSuccess(data) {
            if (data?.success) {
              refetchCart();
              toast.success(data?.message);
            } else {
              toast.error(data?.message);
            }
          },
          onError() {
            toast.error("Failed to add product to cart.");
          },
        },
      );
    }
  };

  const handleAddToCompare = (product: IProduct) => {
    if (!user?.email) {
      promptLogin("Please login to compare products!");
      return;
    }

    const isDifferentShop = comparisons?.data?.find(
      (compare) => compare.product?.shopId !== product?.shopId,
    );

    const onCompareSuccess = (data: any) => {
      if (data?.success) {
        queryClient.invalidateQueries({ queryKey: ["get-my-compare-product"] });
        refetchComparison();
        toast.success(data?.message ?? "Added to compare");
      } else {
        toast.error(data?.message ?? "Could not add to compare");
      }
    };

    if (isDifferentShop) {
      Swal.fire({
        title: "Different shop detected",
        text: "Replace the comparison list with this product?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#9ca3af",
        confirmButtonText: "Yes, replace",
      }).then((result) => {
        if (result.isConfirmed) {
          addToCompare(
            { productId: product.id, type: "replaceProduct" },
            { onSuccess: onCompareSuccess },
          );
        }
      });
    } else {
      addToCompare(
        { productId: product.id },
        {
          onSuccess(data) {
            onCompareSuccess(data);
            if (data?.success && comparisons?.data?.length === 2) {
              setShowCompareModal(true);
            }
          },
        },
      );
    }
  };

  const handleAddToWishlist = (product: IProduct) => {
    if (!user?.email) {
      promptLogin("Please login to add product to wishlist!");
      return;
    }
    addToWishlist(
      { productId: product.id },
      {
        onSuccess(data) {
          if (data?.success) {
            queryClient.invalidateQueries({
              queryKey: ["get-my-wishlist-product"],
            });
            toast.success(data?.message ?? "Added to wishlist");
          } else {
            toast.error(data?.message ?? "Could not add to wishlist");
          }
        },
        onError() {
          toast.error("Failed to add product to wishlist.");
        },
      },
    );
  };

  const hasDiscount = (product.discount_percentage ?? 0) > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discount_percentage / 100)
    : product.price;

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden ring-1 ring-gray-100 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_48px_-24px_rgba(255,140,0,0.35)] hover:ring-orange-100 transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden bg-gradient-to-br from-gray-50 to-orange-50/40 p-4">
        <Image
          height={400}
          width={400}
          className={`object-contain w-full h-full transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
        />

        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-rose-500 text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm">
            -{Math.round(product.discount_percentage)}%
          </span>
        )}

        {product.isFlashSale && !hasDiscount && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-amber-500 text-white text-[11px] font-semibold px-2.5 py-1 shadow-sm">
            Flash Sale
          </span>
        )}

        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2 pointer-events-none"
          }`}
        >
          <button
            onClick={() => handleAddToWishlist(product)}
            aria-label="Add to wishlist"
            className="p-2 bg-white/90 backdrop-blur rounded-full ring-1 ring-gray-100 shadow-sm hover:bg-rose-500 hover:text-white hover:ring-rose-500 transition"
          >
            <Heart size={16} />
          </button>
          <Link
            href={`/products/${product.id}`}
            aria-label="Quick view"
            className="p-2 bg-white/90 backdrop-blur rounded-full ring-1 ring-gray-100 shadow-sm hover:bg-gray-900 hover:text-white hover:ring-gray-900 transition"
          >
            <Eye size={16} />
          </Link>
          <button
            onClick={() => handleAddToCompare(product)}
            aria-label="Compare product"
            className="p-2 bg-white/90 backdrop-blur rounded-full ring-1 ring-gray-100 shadow-sm hover:bg-orange-500 hover:text-white hover:ring-orange-500 transition"
          >
            <GitCompareArrows size={16} />
          </button>
        </div>

        <div
          className={`absolute inset-x-3 bottom-3 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 hover:bg-orange-500 text-white text-sm font-medium py-2.5 transition-colors"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <Link
          href={`/shops/${product.shopId}`}
          className="text-xs font-medium text-orange-600 hover:text-orange-700 inline-block"
        >
          {product.shop?.shopName ?? "Dokan Express"}
        </Link>

        <Link href={`/products/${product.id}`}>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem] hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Star size={12} className="fill-amber-400 text-amber-400" />
            <span>4.8</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
