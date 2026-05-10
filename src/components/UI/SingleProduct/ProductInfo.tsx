"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Chip } from "@nextui-org/react";
import {
  Check,
  CheckCircle2,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import type { IProduct } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import { useState } from "react";

type ProductInfoProps = {
  product: IProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { user } = useUser();
  const router = useRouter();
  const { refetch: refetchCart } = useGetMyCartProducts();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const isOnSale = product?.isFlashSale && product?.discount_percentage > 0;
  const discountPercentage = isOnSale ? Math.round(product.discount_percentage) : 0;
  const discountedPrice = isOnSale
    ? calculateDiscount(product.price, product.discount_percentage)
    : product.price;

  const promptLogin = (text: string) =>
    Swal.fire({
      title: "Please login",
      text,
      icon: "warning",
      confirmButtonText: "Login",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) router.push("/login");
    });

  const handleAddToCart = (onAdded?: () => void) => {
    if (!user?.email) {
      promptLogin("Login to add product to cart!");
      return;
    }
    addToCart(
      { productId: product.id, quantity },
      {
        onSuccess(data) {
          if (data?.success) {
            refetchCart();
            setIsAddedToCart(true);
            toast.success(data?.message);
            setTimeout(() => setIsAddedToCart(false), 2000);
            onAdded?.();
          } else {
            toast.error(data?.message);
          }
        },
        onError() {
          toast.error("Failed to add product to cart");
        },
      },
    );
  };

  const handleBuyNow = () => {
    if (!user?.email) {
      promptLogin("Login to proceed with purchase!");
      return;
    }
    handleAddToCart(() => router.push("/checkout"));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>

        <div className="flex items-center gap-2 mb-4">
          {(() => {
            const reviews = product?.reviews ?? [];
            const count = reviews.length;
            const avg =
              count === 0
                ? 0
                : reviews.reduce((s, r) => s + r.rating, 0) / count;
            return (
              <>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(avg)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {count === 0
                    ? "(no reviews yet)"
                    : `(${avg.toFixed(1)} · ${count} review${count === 1 ? "" : "s"})`}
                </span>
              </>
            );
          })()}

          {product?.shop?.shopName && (
            <>
              <span className="text-gray-300">|</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (product?.shop?.id) router.push(`/shop/${product.shop.id}`);
                }}
                className="text-sm text-primary hover:underline"
              >
                by {product.shop.shopName}
              </button>
            </>
          )}
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900">
            ${discountedPrice.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-xl text-gray-500 line-through">
              ${product?.price.toFixed(2)}
            </span>
          )}
          {isOnSale && (
            <Chip color="danger" size="sm" variant="flat">
              Save {discountPercentage}%
            </Chip>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md w-fit">
        <Tag className="h-4 w-4 text-primary" />
        <span className="text-gray-800 font-medium">
          {product?.category?.name || "Uncategorized"}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed">
        {product?.description || "No description available."}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <div className="flex items-center h-12 border border-gray-300 rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-12 h-full flex items-center justify-center font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            aria-label="Increase quantity"
            className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3">
          <Button
            color="primary"
            className="h-12"
            startContent={
              isAddedToCart ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />
            }
            onClick={() => handleAddToCart()}
            isLoading={isAddingToCart}
            isDisabled={isAddingToCart}
          >
            {isAddedToCart ? "Added to Cart" : "Add to Cart"}
          </Button>

          <Button
            color="default"
            className="h-12"
            variant="flat"
            onClick={handleBuyNow}
            isDisabled={isAddingToCart}
          >
            Buy Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        {[
          { icon: Truck, title: "Free Shipping", subtitle: "On orders over $50" },
          { icon: ShieldCheck, title: "Secure Payment", subtitle: "100% secure checkout" },
          { icon: RefreshCw, title: "Easy Returns", subtitle: "30 day return policy" },
        ].map((benefit) => (
          <div key={benefit.title} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <benefit.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{benefit.title}</p>
              <p className="text-xs text-gray-500">{benefit.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {product?.shop && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mt-6">
          <Image
            src={product.shop.shopLogo || "/placeholder.svg?height=60&width=60"}
            alt={product.shop.shopName || "Shop"}
            width={60}
            height={60}
            className="rounded-full border border-gray-200"
          />
          <div className="flex-1">
            <h3 className="font-medium">{product.shop.shopName}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
          </div>
          <Link href={`/shops/${product.shopId}`}>
            <Button
              color="primary"
              variant="flat"
              size="sm"
              startContent={<Store size={16} />}
            >
              Visit Store
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
