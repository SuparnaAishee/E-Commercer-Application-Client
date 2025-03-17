"use client";

import Swal from "sweetalert2";
import { useUser } from "@/src/context/user.provider";
import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
import type { IProduct } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import {
  IoEyeOutline,
  IoCartOutline,
  IoGitCompareOutline,
} from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateCompare, useGetMyComparison } from "@/src/hooks/compare";
import { useAddToWishlist } from "@/src/hooks/wishlist";

const ProductCart = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { user, setShowCompareModal } = useUser();
  const { data: comparisons, refetch: refetchComparison } =
    useGetMyComparison();
  const { mutate: addToCompare } = useCreateCompare();
  const { data: cartProduct, refetch: refetchCart } = useGetMyCartProducts();
  const { mutate: addToCart } = useAddToCart();
  const { mutate: addToWishlist } = useAddToWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (product: IProduct & { type?: "replaceProduct" }) => {
    if (user?.email) {
      const isDifferentShop = cartProduct?.data?.find(
        (cart) => cart.product?.shopId !== product?.shopId
      );

      if (isDifferentShop) {
        Swal.fire({
          title: "Detect Different Shop",
          text: "Adding multiple shop products is not allowed! Replace the cart with the new product!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Replace",
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
                  toast.error("Failed to add product to cart!");
                },
              }
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
              toast.error("Failed to add product to cart!");
            },
          }
        );
      }
    } else {
      Swal.fire({
        title: "Please login",
        text: "Please login to add product in cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  const handleAddToCompare = (
    product: IProduct & { type?: "replaceProduct" }
  ) => {
    if (user?.email) {
      const isDifferentShop = comparisons?.data?.find(
        (compare) => compare.product?.shopId !== product?.shopId
      );

      if (isDifferentShop) {
        Swal.fire({
          title: "Detect Different Shop",
          text: "Adding multiple shop products is not allowed! Replace the comparison product with the new product!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Replace",
        }).then((result) => {
          if (result.isConfirmed) {
            addToCompare(
              { productId: product.id, type: "replaceProduct" },
              {
                onSuccess(data) {
                  if (data?.success) {
                    refetchComparison();
                    toast.success(data?.message);
                  } else {
                    toast.error(data?.message);
                  }
                },
              }
            );
          }
        });
      } else {
        addToCompare(
          { productId: product.id },
          {
            onSuccess(data) {
              if (data?.success) {
                refetchComparison();
                if (comparisons?.data?.length === 2) {
                  setShowCompareModal(true);
                }
                toast.success(data?.message);
              } else {
                toast.error(data?.message);
              }
            },
          }
        );
      }
    } else {
      Swal.fire({
        title: "Please login",
        text: "Please login to add product in cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  const handleAddToWishlist = async (product: IProduct) => {
    if (user?.email) {
      try {
        //@ts-ignore
        addToWishlist({ productId: product.id });
        toast.success("Product added to wishlist!");
      } catch {
        toast.error("Failed to add product to wishlist.");
      }
    } else {
      Swal.fire({
        title: "Please login",
        text: "Please login to add product to wishlist!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Badge - Optional */}
      {product.discount_percentage > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          {product.discount_percentage}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          height={400}
          width={400}
          className={`object-contain w-full h-full transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          src={product.images?.[0] || "/placeholder.svg"}
          alt={product.name}
        />

        {/* Quick Action Buttons */}
        <div
          className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <button
            onClick={() => handleAddToWishlist(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-rose-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="Add to wishlist"
          >
            <CiHeart size={18} />
          </button>
          <Link
            href={`/products/${product.id}`}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="Quick view"
          >
            <IoEyeOutline size={18} />
          </Link>
          <button
            onClick={() => handleAddToCompare(product)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-green-500 hover:text-white transition-colors duration-300 transform hover:scale-110"
            aria-label="Compare product"
          >
            <IoGitCompareOutline size={18} />
          </button>
        </div>

        {/* Add to Cart Button - Appears on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full py-2 bg-orange-500 text-white rounded-md flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors duration-300"
          >
            <IoCartOutline size={18} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link
          href={`/shops/${product.shopId}`}
          className="text-xs text-blue-600 hover:underline mb-1 inline-block"
        >
          {product.shop?.shopName}
        </Link>

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 h-14 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
         
            {product.discount_percentage > 0 ? (
              <>
                <span className="text-red-500 font-bold text-lg">
                  $
                  {(
                    product.price *
                    (1 - product.discount_percentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-gray-800 font-bold text-lg">
                ${product.price}
              </span>
            )}
          </div>

          {/* Rating Stars - Optional
          {product. && (
            <div className="flex items-center gap-1">
              <span className="text-amber-400">★</span>
              <span className="text-sm text-gray-600">{product.rating}</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;

// "use client";

// import Swal from "sweetalert2";
// import { useUser } from "@/src/context/user.provider";
// import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
// import { IProduct } from "@/src/types";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { CiHeart } from "react-icons/ci";
// import { IoEyeOutline } from "react-icons/io5";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import CountdownTimer from "../CountDownTimer/CountDownTimer";
// import { useCreateCompare, useGetMyComparison } from "@/src/hooks/compare";
// import { useAddToWishlist } from "@/src/hooks/wishlist";
// const ProductCart = ({ product }: { product: IProduct }) => {
//   const router = useRouter();
//   const { user, setShowCompareModal } = useUser();
//   const { data: comparisons, refetch: refetchComparison } =
//     useGetMyComparison();
//   const { mutate: addToCompare } = useCreateCompare();
//   const { data: cartProduct, refetch: refetchCart } = useGetMyCartProducts();
//   const { mutate: addToCart } = useAddToCart();
//   const { mutate: addToWishlist } = useAddToWishlist();

//   const handleAddToCart = (product: IProduct & { type?: "replaceProduct" }) => {

//     if (user?.email) {
//       const isDifferentShop = cartProduct?.data?.find(
//         (cart) => cart.product?.shopId !== product?.shopId
//       );

//       if (isDifferentShop) {
//         Swal.fire({
//           title: "Detect Different Shop",
//           text: "Adding multiple shop products is not allowed! Replace the comparison product with the new product!",
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
//                 onError(error) {

//                   toast.error("Failed to add product to cart!");
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
//             onError(error) {
//               console.error("Add to cart error:", error);
//               toast.error("Failed to add product to cart!");
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

//   const handleAddToCompare = (
//     product: IProduct & { type?: "replaceProduct" }
//   ) => {
//     if (user?.email) {
//       const isDifferentShop = comparisons?.data?.find(
//         (compare) => compare.product?.shopId !== product?.shopId
//       );

//       if (isDifferentShop) {
//         Swal.fire({
//           title: "Detect Different Shop",
//           text: "Adding multiple shop products is not allowed! Replace the cart with the new product!",
//           icon: "warning",
//           showCancelButton: true,
//           confirmButtonColor: "#3085d6",
//           cancelButtonColor: "#d33",
//           confirmButtonText: "Yes, Replace",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             addToCompare(
//               { productId: product.id, type: "replaceProduct" },
//               {
//                 onSuccess(data) {
//                   if (data?.success) {
//                     refetchComparison();
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
//         addToCompare(
//           { productId: product.id },
//           {
//             onSuccess(data) {
//               if (data?.success) {
//                 refetchComparison();
//                 if (comparisons?.data?.length === 2) {
//                   setShowCompareModal(true);
//                 }
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
//   // Handle adding product to wishlist
//   const handleAddToWishlist = async (product: IProduct) => {
//     if (user?.email) {
//       try {
//         addToWishlist({ productId: product.id });
//         toast.success("Product added to wishlist!");
//       } catch (error) {
//         toast.error("Failed to add product to wishlist.");
//       }
//     } else {
//       Swal.fire({
//         title: "Please login",
//         text: "Please login to add product to wishlist!",
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
//     <div className="w-full col-span-1 group">
//       <div className="border border-[#DDDDDD] rounded-[5px] overflow-hidden">
//         <div className="relative bg-[#f3f3f3] px-[30px] py-[30px] sm:py-5">
//           <Image
//             height={200}
//             width={200}
//             style={{ height: "200px", width: "200px" }}
//             className="w-full object-contain"
//             src={product.images?.[0]}
//             alt="product"
//           />

//           <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#e5e5e58c] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//             <Link
//               href={`/products/${product?.id}`}
//               className="mx-2 h-10 w-10 bg-orange-500 hover:bg-secondary transition text-center text-white flex justify-center items-center rounded-full"
//             >
//               <IoEyeOutline size={18} />
//             </Link>
//             <button
//               onClick={() => handleAddToWishlist(product)}
//               className="mx-2 h-10 w-10 bg-secondary hover:bg-orange-500 transition text-center text-white flex justify-center items-center rounded-full"
//             >
//               <CiHeart size={18} />
//             </button>
//           </div>
//         </div>

//         <div className="relative p-5 h-auto overflow-hidden">
//           <h4 className="text-secondary text-lg font-medium mb-[5px]">
//             {product?.name}
//           </h4>

//           <div>
//             <div className="flex items-center">
//               {product?.isFlashSale && (
//                 <span className="mr-[5px] font-medium">
//                   {(
//                     product?.price *
//                     (1 - product?.discount_percentage / 100)
//                   ).toFixed(2)}
//                 </span>
//               )}

//               <span
//                 className={`mr-[5px] font-medium ${
//                   product?.isFlashSale ? "line-through" : ""
//                 }`}
//               >
//                 {product?.price}
//               </span>
//               {product?.isFlashSale && (
//                 <div>
//                   <CountdownTimer saleEndTime={product?.sale_end_time} />
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center justify-start">
//               <div className="flex items-center">
//                 <span className="text-[#F6BC3E]">
//                   <svg width="16" height="16" viewBox="0 0 24 24">
//                     <path
//                       fill="currentColor"
//                       d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275Z"
//                     ></path>
//                   </svg>
//                 </span>
//                 <span className="text-[#F6BC3E]">
//                   <svg width="16" height="16" viewBox="0 0 24 24">
//                     <path
//                       fill="currentColor"
//                       d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275Z"
//                     ></path>
//                   </svg>
//                 </span>
//                 <span className="text-[#F6BC3E]">
//                   <svg width="16" height="16" viewBox="0 0 24 24">
//                     <path
//                       fill="currentColor"
//                       d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275Z"
//                     ></path>
//                   </svg>
//                 </span>
//                 <span className="text-[#F6BC3E]">
//                   <svg width="16" height="16" viewBox="0 0 24 24">
//                     <path
//                       fill="currentColor"
//                       d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275Z"
//                     ></path>
//                   </svg>
//                 </span>
//                 <span className="text-[#F6BC3E]">
//                   <svg width="16" height="16" viewBox="0 0 24 24">
//                     <path
//                       fill="currentColor"
//                       d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275Z"
//                     ></path>
//                   </svg>
//                 </span>
//               </div>
//               <p className="text-[13px] ml-[9px] text-[#687188]">(150)</p>

//               <Link href={`/shops/${product?.shopId}`} className="ml-[9px]">
//                 <span className="underline text-rose-500">
//                   {product?.shop?.shopName}
//                 </span>
//               </Link>
//             </div>
//           </div>

//           <button
//             onClick={() => handleAddToCart(product)}
//             className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-[15px]  relative z-10 px-4 py-2 rounded mt-6"
//           >
//             ADD TO CART
//           </button>

//           <div className="absolute inset-0 flex items-end justify-end items-end opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//             <button
//               onClick={() => handleAddToCompare(product)}
//               className="default_btn bg-secondary border-none hover:bg-white px-[15px] mb-6 mr-4"
//             >
//               ADD TO COMPARE
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCart;
