/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.provider";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import type { IProduct } from "@/src/types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Tag,
  ChevronRight,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Store,
} from "lucide-react";
import { Button, Tooltip, Chip } from "@nextui-org/react";

// Tab interface
interface Tab {
  id: string;
  label: string;
}

const SingleProduct = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const router = useRouter();
  const { refetch: refetchCart } = useGetMyCartProducts();
  //@ts-ignore
  const { mutate: addToCart, isLoading: isAddingToCart } = useAddToCart();

  const [activeImg, setActiveImg] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const tabs: Tab[] = [
    { id: "description", label: "Description" },
    { id: "details", label: "Details" },
    { id: "reviews", label: "Reviews" },
  ];

  // Calculate if product is on sale
  const isOnSale = product?.isFlashSale && product?.discount_percentage > 0;

  // Calculate discount percentage for display
  const discountPercentage = isOnSale
    ? Math.round(product?.discount_percentage)
    : 0;

  // Calculate discounted price
  const discountedPrice = isOnSale
    ? calculateDiscount(product?.price, product?.discount_percentage)
    : product?.price;

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (user?.email) {
      addToCart(
        { productId: product.id, quantity },
        {
          onSuccess(data) {
            if (data?.success) {
              refetchCart();
              setIsAddedToCart(true);
              toast.success(data?.message);

              // Reset after animation
              setTimeout(() => {
                setIsAddedToCart(false);
              }, 2000);
            } else {
              toast.error(data?.message);
            }
          },
          onError(error) {
            toast.error("Failed to add product to cart");
           
          },
        }
      );
    } else {
      Swal.fire({
        title: "Please login",
        text: "Login to add product to cart!",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  const handleBuyNow = () => {
    if (user?.email) {
      handleAddToCart();
      router.push("/checkout");
    } else {
      Swal.fire({
        title: "Please login",
        text: "Login to proceed with purchase!",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  const handleToggleWishlist = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (user?.email) {
      setIsWishlisted(!isWishlisted);
      toast.success(
        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
      );
    } else {
      Swal.fire({
        title: "Please login",
        text: "Login to add products to your wishlist!",
        icon: "warning",
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  const handleVisitStore = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product?.shop?.id) {
      router.push(`/shop/${product.shop.id}`);
    }
  };

  const submitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (reviewText.trim() === "") {
      toast.error("Please write a review");
      return;
    }

    toast.success("Review submitted successfully!");
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="container mx-auto px-4 py-12 pl-12 pr-12">
      {/* Breadcrumb */}
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

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          {/* Main Image with Zoom Effect */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full relative"
              >
                <Image
                  src={product?.images[activeImg] || "/default-product.png"}
                  alt={product?.name}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                  priority
                />

                {/* Product badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  {isOnSale && (
                    <Chip color="danger" size="sm" variant="flat">
                      -{discountPercentage}%
                    </Chip>
                  )}
                </div>

                <Tooltip
                  content={
                    isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  <Button
                    isIconOnly
                    color={isWishlisted ? "danger" : "default"}
                    variant="flat"
                    className="absolute top-4 right-4 bg-white"
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                    />
                  </Button>
                </Tooltip>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImg(index)}
                className={`relative min-w-[80px] h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImg === index
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product?.name}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">(0 reviews)</span>

              {product?.shop?.shopName && (
                <>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (product?.shop?.id) {
                        router.push(`/shop/${product.shop.id}`);
                      }
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

          {/* Category */}
          <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md w-fit">
            <Tag className="h-4 w-4 text-primary" />
            <span className="text-gray-800 font-medium">
              {product?.category?.name || "Uncategorized"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {product?.description || "No description available."}
          </p>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center h-12 border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 h-full flex items-center justify-center font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
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
                  isAddedToCart ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <ShoppingCart size={18} />
                  )
                }
                onClick={handleAddToCart}
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

          {/* Product Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Secure Payment</p>
                <p className="text-xs text-gray-500">100% secure checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Easy Returns</p>
                <p className="text-xs text-gray-500">30 day return policy</p>
              </div>
            </div>
          </div>

          {/* Shop Section */}
          {product?.shop && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mt-6">
              <Image
                src={product.shop.icon || "/placeholder.svg?height=60&width=60"}
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

              {/* Fixed Visit Store button */}
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
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {/* Description Tab */}
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product?.description || "No description available."}
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <ul className="mt-4">
                <li>Premium quality materials</li>
                <li>Designed for comfort and durability</li>
                <li>Perfect for everyday use</li>
                <li>Modern and stylish design</li>
              </ul>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Product Specifications
                </h3>
                <div className="space-y-3">
                  <div className="flex border-b pb-2">
                    <span className="w-1/3 text-gray-500">Category</span>
                    <span className="w-2/3 font-medium">
                      {product?.category?.name || "Uncategorized"}
                    </span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="w-1/3 text-gray-500">Brand</span>
                    <span className="w-2/3 font-medium">
                      {product?.shop?.shopName || "Unknown"}
                    </span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="w-1/3 text-gray-500">Availability</span>
                    <span className="w-2/3 font-medium">In Stock</span>
                  </div>
                  <div className="flex border-b pb-2">
                    <span className="w-1/3 text-gray-500">SKU</span>
                    <span className="w-2/3 font-medium">
                      {product?.id?.substring(0, 8) || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Shipping Information
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Free shipping on orders over $50</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Express shipping available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>30-day return policy</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Review Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-5 w-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">5.0 out of 5</span>
                  </div>

                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 w-8">
                          {rating} star
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: rating === 5 ? "100%" : "0%" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {rating === 5 ? "100%" : "0%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Write a Review */}
                <div className="mt-8" id="write-review">
                  <h3 className="text-lg font-medium mb-4">Write a Review</h3>

                  {user?.email ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  (hoverRating || rating) >= star
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Review
                        </label>
                        <textarea
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Share your experience with this product..."
                          className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary"
                          rows={4}
                        ></textarea>
                      </div>

                      <Button
                        color="primary"
                        className="w-full"
                        onClick={submitReview}
                      >
                        Submit Review
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-md text-center">
                      <p className="text-gray-600 mb-3">
                        Please log in to write a review
                      </p>
                      <Button
                        color="primary"
                        onClick={() => router.push("/login")}
                      >
                        Log In
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Review List */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-medium mb-6">No Reviews Yet</h3>

                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">
                    Be the first to review this product
                  </p>
                  <Button
                    color="primary"
                    onClick={() => {
                      if (user?.email) {
                        document
                          .getElementById("write-review")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        router.push("/login");
                      }
                    }}
                  >
                    Write a Review
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products - Placeholder for backend data */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">
            Related products will be loaded from the backend
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { FaMinus, FaPlus, FaTag } from "react-icons/fa";
// import { IoCartOutline } from "react-icons/io5";
// import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
// import { toast } from "sonner";
// import { useUser } from "@/src/context/user.provider";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { calculateDiscount } from "@/src/utils/calculateDiscount";
// import { IProduct } from "@/src/types";

// const SingleProduct = ({ product }: { product: IProduct }) => {
//   const { user } = useUser();
//   const router = useRouter();
//   const { refetch: refetchCart } = useGetMyCartProducts();
//   const { mutate: addToCart } = useAddToCart();
//   const [activeImg, setActiveImg] = useState<number>(0);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = (product: IProduct) => {
//     if (user?.email) {
//       addToCart(
//         { productId: product.id, quantity },
//         {
//           onSuccess(data) {
//             if (data?.success) {
//               refetchCart();
//               toast.success(data?.message);
//             } else {
//               toast.error(data?.message);
//             }
//           },
//         }
//       );
//     } else {
//       Swal.fire({
//         title: "Please login",
//         text: "Login to add product to cart!",
//         icon: "warning",
//         confirmButtonText: "Login",
//       }).then(() => router.push("/login"));
//     }
//   };

//   return (
//     <div className="container py-10">
//       {/* Main Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Product Image */}
//         <div className="flex flex-col items-center">
//           <Image
//             src={product?.images[activeImg] || "/default-product.png"}
//             alt="Product Image"
//             width={550}
//             height={500}
//             className="rounded-md shadow-md object-cover"
//           />

//           <div className="flex gap-2 mt-4">
//             {product?.images.map((image, index) => (
//               <Image
//                 key={index}
//                 src={image}
//                 alt="Thumbnail"
//                 width={80}
//                 height={80}
//                 className={`cursor-pointer border-2 p-1 rounded-md ${
//                   activeImg === index ? "border-orange-500" : "border-gray-300"
//                 }`}
//                 onClick={() => setActiveImg(index)}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="space-y-5">
//           <h1 className="text-3xl font-bold text-gray-800">{product?.name}</h1>
//           <div className="text-xl font-semibold text-orange-600">
//             $
//             {product?.isFlashSale
//               ? calculateDiscount(
//                   product?.price,
//                   product?.discount_percentage
//                 ).toFixed(2)
//               : product?.price.toFixed(2)}
//             {product?.isFlashSale && (
//               <span className="line-through text-gray-500 text-sm ml-2">
//                 ${product?.price.toFixed(2)}
//               </span>
//             )}
//           </div>
//           <p className="text-gray-600">{product?.description}</p>

//           {/* Updated Category Section */}
//           <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md shadow-sm w-fit">
//             <FaTag className="text-orange-500" />
//             <span className="text-gray-800 font-semibold">
//               {product?.category?.name || "Uncategorized"}
//             </span>
//           </div>

//           {/* Add to Cart Section */}
//           <div className="flex items-center space-x-4 mt-4">
//             <button
//               className="bg-orange-500 text-white py-2 px-5 rounded-md flex items-center gap-2 hover:bg-orange-600 transition"
//               onClick={() => handleAddToCart(product)}
//             >
//               <IoCartOutline size={20} /> Add to Cart
//             </button>

//             <div className="flex items-center border rounded-md">
//               <button
//                 className="px-3 py-1"
//                 onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
//               >
//                 <FaMinus />
//               </button>
//               <span className="px-4 py-1">{quantity}</span>
//               <button
//                 className="px-3 py-1"
//                 onClick={() => setQuantity((prev) => prev + 1)}
//               >
//                 <FaPlus />
//               </button>
//             </div>
//           </div>

//           {/* Shop Section */}
//           <div className="border-t w-5/6 mt-6 pt-4 ">
//             <div className="flex items-center gap-2 ">
//               <Image
//                 src={
//                   product?.shop?.icon ||
//                   "https://res.cloudinary.com/dwelabpll/image/upload/v1725557438/gradient-logo_23-2148149231_kr42co.avif"
//                 }
//                 alt="Shop Icon"
//                 width={50}
//                 height={20}
//                 className="rounded-full"
//               />
//               <Link
//                 href={
//                   product?.shop?.id
//                     ? `/shop/${product.shop.id}`
//                     : "/shop/default"
//                 }
//                 className="text-orange-600 hover:underline"
//               >
//                 {product?.shop?.shopName || "Default Shop"}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 pl-20">
//         {/* Leave a Review */}
//         <div>
//           <h2 className="text-2xl font-medium text-gray-800 pb-2">
//             Leave a Review:
//           </h2>
//           {user?.email ? (
//             <>
//               <div className="flex items-center gap-2 mt-2">
//                 {[...Array(5)].map((_, i) => (
//                   <span key={i} className="text-orange-500">
//                     ★
//                   </span>
//                 ))}
//               </div>
//               <textarea
//                 placeholder="Write your comment here..."
//                 className="w-full border rounded-md p-3 focus:outline-orange-500 mt-4"
//               ></textarea>
//               <button className="bg-orange-500 text-white mt-3 px-5 py-2 rounded-md hover:bg-orange-600">
//                 Post Review
//               </button>
//             </>
//           ) : (
//             <div>
//               <textarea
//                 placeholder="You must be logged in to leave a review..."
//                 className="w-full border rounded-md p-3 focus:outline-orange-500 mt-4"
//                 disabled
//               ></textarea>
//               <button className="bg-gray-300 text-white mt-3 px-5 py-2 rounded-md cursor-not-allowed">
//                 Post Review
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Existing Reviews */}
//         <div>
//           <h2 className="text-2xl font-medium text-gray-800 pb-2">Reviews:</h2>
//           <p className="text-gray-500">No Review Found</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;

// "use client";

// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Navigation } from "swiper/modules";
// import Image from "next/image";
// import Link from "next/link";
// import { IProduct } from "@/src/types";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { IoCartOutline } from "react-icons/io5";
// import { useGetAllProducts } from "@/src/hooks/product";
// import ProductCart from "../ProductCart/ProductCart";
// import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
// import { toast } from "sonner";
// import { useUser } from "@/src/context/user.provider";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { calculateDiscount } from "@/src/utils/calculateDiscount";

// const SingleProduct = ({ product }: { product: IProduct }) => {
//   const { user } = useUser();
//   const router = useRouter();
//   const { data: products } = useGetAllProducts([
//     { name: "category", value: product?.category.name },
//   ]);
//   const { data: cartProduct, refetch: refetchCart } = useGetMyCartProducts();
//   const { mutate: addToCart } = useAddToCart();
//   const [activeImg, setActiveImg] = useState<number>(0);
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = (product: IProduct) => {
//     if (user?.email) {
//       const isDifferentShop = cartProduct?.data?.find(
//         (cart) => cart.product?.shopId !== product?.shopId
//       );
//       if (isDifferentShop) {
//         Swal.fire({
//           title: "Detect Different Shop",
//           text: "Adding multiple shop product is not allowed! Replace the cart with the new product!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, Replace",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             addToCart(
//               { productId: product.id, quantity: 1, type: "replaceProduct" },
//               {
//                 onSuccess(data) {
//                   if (data?.success) {
//                     refetchCart();
//                     toast.success(data?.message);
//                   } else {
//                     toast.error(data?.message);
//                   }
//                 },
//               }
//             );
//           }
//         });
//       } else {
//         addToCart(
//           { productId: product.id, quantity: 1 },
//           {
//             onSuccess(data) {
//               if (data?.success) {
//                 refetchCart();
//                 toast.success(data?.message);
//               } else {
//                 toast.error(data?.message);
//               }
//             },
//           }
//         );
//       }
//     } else {
//       Swal.fire({
//         title: "Please login",
//         text: "Please login to add product in cart!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Login",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           router.push("/login");
//         }
//       });
//     }
//   };

//   return (
//     <div className="container">
//       <div className="grid grid-cols-12 gap-6">
//         <div className="col-span-12 lg:col-span-6">
//           <div className="flex justify-center items-center">
//             <Image
//               height={500}
//               width={500}
//               style={{
//                 height: "auto",
//                 width: "auto",
//               }}
//               loading="lazy"
//               alt="product"
//               src={product?.images[activeImg]}
//             />
//           </div>

//           <div className="pt-6">
//             <Swiper
//               slidesPerView={3}
//               spaceBetween={10}
//               modules={[Navigation]}
//               className="mySwiper"
//             >
//               {product?.images.map((image, i) => (
//                 <SwiperSlide
//                   key={i}
//                   style={{ width: "111px", marginRight: "8px" }}
//                 >
//                   {" "}
//                   <div className="w-full h-[80px] flex justify-center items-center">
//                     <Image
//                       height={100}
//                       width={100}
//                       onClick={() => setActiveImg(i)}
//                       loading="lazy"
//                       alt="product"
//                       className={`w-full h-full object-contain cursor-pointer border p-3 rounded-md ${
//                         activeImg === i ? "border-rose-500" : ""
//                       }`}
//                       src={image}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//         <div className="col-span-12 lg:col-span-6">
//           <div className="product_info_wrapper">
//             <div className="product_base_info">
//               <h1 className="text-2xl sm:text-3xl uppercase">
//                 {product?.name}
//               </h1>

//               <div className="space-y-2 mt-4">
//                 <p>
//                   <span className="font-medium pr-3">Quantity:</span>
//                   <span className="font-medium">{product?.inventory}</span>
//                 </p>

//                 <p>
//                   <span className="font-medium pr-3">Category:</span>
//                   {product?.category?.name}
//                 </p>
//                 <p>
//                   <span className="font-medium pr-3">Shop:</span>
//                   <Link
//                     className="underline text-rose-500"
//                     href={`/shops/${product?.shopId}`}
//                   >
//                     {product?.shop?.shopName}
//                   </Link>
//                 </p>
//               </div>
//               <div className="mt-3 flex gap-3 items-center overflow-hidden">
//                 {product?.isFlashSale ? (
//                   <span className="text-2xl text-primary font-semibold">
//                     {calculateDiscount(
//                       product?.price,
//                       product?.discount_percentage
//                     ).toFixed(2)}
//                   </span>
//                 ) : (
//                   <span className="text-2xl text-primary font-semibold">
//                     {product?.price}
//                   </span>
//                 )}

//                 {product?.isFlashSale && (
//                   <span className="line-through">
//                     {(product?.price).toFixed(2)}
//                   </span>
//                 )}
//               </div>
//               <div className="mt-2">
//                 <p>{product?.description}</p>
//               </div>

//               {/* <!-- quantity --> */}
//               <div className="cart_qnty ms-md-auto">
//                 <p>Quantity</p>
//                 <div className="flex items-center  mt-1">
//                   <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
//                     <button
//                       onClick={() =>
//                         setQuantity((prev) => (prev >= 2 ? prev - 1 : 1))
//                       }
//                     >
//                       <FaMinus />
//                     </button>
//                   </div>
//                   <div className="w-8 h-8 border flex justify-center items-center">
//                     {quantity}
//                   </div>
//                   <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
//                     <button onClick={() => setQuantity((prev) => prev + 1)}>
//                       <FaPlus />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* <!-- add to cart & wishlist --> */}
//             <div className="flex gap-5 mt-6 border-b pb-5">
//               <button
//                 onClick={() => handleAddToCart(product)}
//                 className="flex gap-2 items-center border border-primary default_btn text-sm sm:text-base text-white hover:bg-white hover:text-rose-500 transition duration-300 px-2 sm:px-8 py-2 rounded uppercase group"
//               >
//                 <span className="text-white group-hover:text-rose-500">
//                   <IoCartOutline size={20} />
//                 </span>
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Review */}
//       <div className="container pt-14">
//         <div className="flex items-start justify-between mb-[30px]">
//           <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
//             Product Reviews
//           </h2>
//           <div className="pt-2">
//             <Link
//               href="/products"
//               className="text-[15px] font-medium text-primary flex items-center gap-1"
//             >
//               See More
//               <svg width="15" height="15" viewBox="0 0 32 32">
//                 <path
//                   fill="currentColor"
//                   d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l.687-.719l-.687-.719z"
//                 ></path>
//               </svg>
//             </Link>
//           </div>
//         </div>
//         {product?.reviews?.map((review) => {
//           return (
//             <div key={review?.id} className="flex gap-5 border-b pb-5">
//               {review?.user?.profilePhoto && (
//                 <div>
//                   <Image
//                     height={100}
//                     width={100}
//                     loading="lazy"
//                     src={review?.user?.profilePhoto}
//                     alt="user"
//                   />
//                 </div>
//               )}

//               {/* <!-- content --> */}
//               <div>
//                 <h5>by {review?.user?.name}</h5>
//                 {/* <!-- rating --> */}
//                 <div className="flex mt-2">
//                   {[review?.rating]?.map((rating, i) => {
//                     return (
//                       <span key={i} className="text-[#F6BC3E]">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="18"
//                           height="18"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             fill="currentColor"
//                             d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
//                           ></path>
//                         </svg>
//                       </span>
//                     );
//                   })}
//                 </div>
//                 <div className="text-xs mt-2">{review?.createdAt}</div>
//                 <p className="mt-2">{review?.comment}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       {/* Related product*/}
//       <div className="container pt-14">
//         <div className="flex items-start justify-between mb-[30px]">
//           <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
//             Related Product
//           </h2>
//           <div className="pt-2">
//             <Link
//               href="/products"
//               className="text-[15px] font-medium text-primary flex items-center gap-1"
//             >
//               See More
//               <svg width="15" height="15" viewBox="0 0 32 32">
//                 <path
//                   fill="currentColor"
//                   d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l.687-.719l-.687-.719z"
//                 ></path>
//               </svg>
//             </Link>
//           </div>
//         </div>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {products?.data
//             ?.slice(0, 4)
//             ?.map((product) => (
//               <ProductCart key={product.id} product={product} />
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleProduct;
