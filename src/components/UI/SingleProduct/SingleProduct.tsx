"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import type { IProduct } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import RelatedProducts from "./RelatedProducts";

type SingleProductProps = {
  product: IProduct;
};

const SingleProduct = ({ product }: SingleProductProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isOnSale = product?.isFlashSale && product?.discount_percentage > 0;
  const discountPercentage = isOnSale ? Math.round(product.discount_percentage) : 0;

  const handleToggleWishlist = () => {
    if (user?.email) {
      setIsWishlisted((prev) => !prev);
      toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
      return;
    }
    Swal.fire({
      title: "Please login",
      text: "Login to add products to your wishlist!",
      icon: "warning",
      confirmButtonText: "Login",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) router.push("/login");
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 pl-12 pr-12">
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-700 font-medium">{product?.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery
          images={product?.images || []}
          productName={product?.name}
          isOnSale={isOnSale}
          discountPercentage={discountPercentage}
          isWishlisted={isWishlisted}
          onToggleWishlist={handleToggleWishlist}
        />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts />
    </div>
  );
};

export default SingleProduct;
