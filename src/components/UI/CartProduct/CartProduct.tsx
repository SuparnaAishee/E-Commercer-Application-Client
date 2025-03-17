// import {
//   useDeleteCartProduct,
//   useGetMyCartProducts,
//   useUpdateCartProductQuantity,
// } from "@/src/hooks/cart";
// import { ICart } from "@/src/types";
// import { calculateDiscount } from "@/src/utils/calculateDiscount";
// import Image from "next/image";
// import Link from "next/link";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { toast } from "sonner";

// const CartProduct = ({
//   cartProducts,
// }: {
//   cartProducts: ICart[] | undefined;
// }) => {
//   const {
//     mutate: updateCartProductQuantity,
//     isSuccess,
//     isPending,
//   } = useUpdateCartProductQuantity();
//   const { refetch: refetchProduct } = useGetMyCartProducts();
//   const { mutate: deleteCartProduct } = useDeleteCartProduct();
//   /* Total Amount of cart products */
//   let totalAmount: number = 0;

//   if (cartProducts) {
//     for (const cartProduct of cartProducts) {
//       if (cartProduct?.product?.isFlashSale) {
//         const price = cartProduct?.product?.price * cartProduct?.quantity;
//         totalAmount += calculateDiscount(
//           price,
//           cartProduct.product.discount_percentage
//         );
//       } else {
//         totalAmount += cartProduct?.product?.price * cartProduct?.quantity;
//       }
//     }
//   }

//   const handleDeleteCartProduct = (id: string) => {
//     deleteCartProduct(id, {
//       onSuccess(data) {
//         if (data?.success) {
//           refetchProduct();
//           toast.success(data?.message);
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const handleUpdateQuantity = (
//     cartProduct: ICart,
//     type: "increment" | "decrement"
//   ) => {
//     const payload = {
//       productId: cartProduct.id,
//       type,
//       quantity: 1,
//     };
//     if (
//       (cartProduct?.quantity >= 1 && type === "increment") ||
//       (cartProduct.quantity !== 1 && type === "decrement")
//     ) {
//       updateCartProductQuantity(payload, {
//         onSuccess(data) {
//           if (data?.success) {
//             refetchProduct();
//             toast.success(data?.message);
//           } else {
//             toast.error(data?.message);
//           }
//         },
//       });
//     }
//   };
//   return (
//     <div className="absolute top-full right-0 bg-white z-20 p-4 w-[300px] rounded-b-[3px] mt-3.5 group-hover:mt-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//       <div className="mb-3 border-b border-[#d8d8d8]">
//         <h4 className="text-base text-secondary mb-2">
//           {cartProducts?.length} Items
//         </h4>
//       </div>
//       <div>
//         {cartProducts?.map((cartProduct) => {
//           return (
//             <div
//               key={cartProduct?.id}
//               className="flex items-start pr-5 mb-4 relative"
//             >
//               <button
//                 onClick={() => handleDeleteCartProduct(cartProduct?.id)}
//                 className="absolute right-0 hover:text-primary transition duration-300"
//               >
//                 <svg width="18" height="18" viewBox="0 0 32 32">
//                   <path
//                     fill="currentColor"
//                     d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
//                   ></path>
//                 </svg>
//               </button>
//               <div className="flex-shrink-0">
//                 <Image
//                   height={100}
//                   width={100}
//                   src={cartProduct?.product?.images[0]}
//                   className="w-[75px] h-[60px] object-contain"
//                   alt="product"
//                 />
//               </div>

//               <div className="flex-grow pl-4">
//                 <h5 className="text-base text-secondary hover:text-primary transition duration-300">
//                   {cartProduct?.product?.name}
//                 </h5>
//                 <p className="text-[#464545] text-sm">
//                   Price:
//                   <span className="ms-2">
//                     {cartProduct?.product?.isFlashSale
//                       ? calculateDiscount(
//                           cartProduct?.product?.price,
//                           cartProduct?.product?.discount_percentage
//                         ).toFixed(2)
//                       : cartProduct?.product?.price}
//                   </span>
//                   {cartProduct?.product?.isFlashSale && (
//                     <span className="ms-2 line-through">
//                       {cartProduct?.product?.price}
//                     </span>
//                   )}
//                 </p>

//                 <div>
//                   <div className="flex items-center  mt-1">
//                     <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
//                       <button
//                         className="disabled:cursor-not-allowed"
//                         disabled={isPending && !isSuccess}
//                         onClick={() =>
//                           handleUpdateQuantity(cartProduct, "decrement")
//                         }
//                       >
//                         {" "}
//                         <FaMinus />
//                       </button>
//                     </div>
//                     <div className="w-8 h-8 border flex justify-center items-center">
//                       {cartProduct?.quantity}
//                     </div>
//                     <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
//                       <button
//                         className="disabled:cursor-not-allowed"
//                         disabled={isPending && !isSuccess}
//                         onClick={() =>
//                           handleUpdateQuantity(cartProduct, "increment")
//                         }
//                       >
//                         {" "}
//                         <FaPlus />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="mt-4 pt-4 border-t border-[#d8d8d8] flex justify-between">
//         <h4 className="text-base text-secondary">SUB TOTAL:</h4>
//         <h4 className="text-base ml-2">{totalAmount?.toFixed(2)}</h4>
//       </div>
//       <div className="flex mt-4 gap-4">
//         {/* <Link
//           href="/"
//           className=" default_btn w-1/2 rounded-[3px] py-2 px-2.5   text-white inline-block text-center text-sm hover:bg-transparent hover:text-rose-500 transition duration-300"
//         >
//           VIEW CART
//         </Link> */}
//         {cartProducts && cartProducts?.length > 0 && (
//           <Link
//             href="/checkout"
//             className="w-1/2 flex items-center justify-center rounded-[3px] py-2 px-2.5 border border-rose-500  bg-white hover:bg-rose-500 hover:text-white  text-center text-sm text-rose-500 transition duration-300"
//           >
//             CHECKOUT
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartProduct;
"use client";

import {
  useDeleteCartProduct,
  useGetMyCartProducts,
  useUpdateCartProductQuantity,
} from "@/src/hooks/cart";
import type { ICart } from "@/src/types";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

const CartProduct = ({
  cartProducts,
}: {
  cartProducts: ICart[] | undefined;
}) => {
  const {
    mutate: updateCartProductQuantity,
    isSuccess,
    isPending,
  } = useUpdateCartProductQuantity();
  const { refetch: refetchProduct } = useGetMyCartProducts();
  const { mutate: deleteCartProduct } = useDeleteCartProduct();
  /* Total Amount of cart products */
  let totalAmount = 0;

  if (cartProducts) {
    for (const cartProduct of cartProducts) {
      if (cartProduct?.product?.isFlashSale) {
        const price = cartProduct?.product?.price * cartProduct?.quantity;
        totalAmount += calculateDiscount(
          price,
          cartProduct.product.discount_percentage
        );
      } else {
        totalAmount += cartProduct?.product?.price * cartProduct?.quantity;
      }
    }
  }

  const handleDeleteCartProduct = (id: string) => {
    deleteCartProduct(id, {
      onSuccess(data) {
        if (data?.success) {
          refetchProduct();
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const handleUpdateQuantity = (
    cartProduct: ICart,
    type: "increment" | "decrement"
  ) => {
    const payload = {
      productId: cartProduct.id,
      type,
      quantity: 1,
    };
    if (
      (cartProduct?.quantity >= 1 && type === "increment") ||
      (cartProduct.quantity !== 1 && type === "decrement")
    ) {
      updateCartProductQuantity(payload, {
        onSuccess(data) {
          if (data?.success) {
            refetchProduct();
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        },
      });
    }
  };

  return (
    <div className="absolute top-full right-0 bg-white z-20 w-[320px] rounded-lg shadow-xl mt-3.5 group-hover:mt-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-300 to-orange-600 text-white p-3 flex items-center justify-between">
        <h4 className="text-base font-medium flex items-center">
          <FaShoppingCart className="mr-2" />
          {cartProducts?.length || 0} Items
        </h4>
        <span className="text-sm bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
          ${totalAmount?.toFixed(2)}
        </span>
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {cartProducts && cartProducts.length > 0 ? (
          cartProducts.map((cartProduct) => (
            <div
              key={cartProduct?.id}
              className="p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start gap-3 relative">
                <div className="flex-shrink-0 bg-gray-50 p-1 rounded-md transition-transform duration-200 hover:scale-105">
                  <Image
                    height={100}
                    width={100}
                    src={cartProduct?.product?.images[0] || "/placeholder.svg"}
                    className="w-[60px] h-[60px] object-contain"
                    alt="product"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <h5 className="text-sm font-medium text-gray-800 hover:text-orange-500 transition duration-300 truncate pr-6">
                      {cartProduct?.product?.name}
                    </h5>
                    <button
                      onClick={() => handleDeleteCartProduct(cartProduct?.id)}
                      className="absolute right-0 top-0 text-gray-400 hover:text-orange-500 transition duration-300 p-1 hover:bg-orange-50 rounded-full"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm">
                      <span className="font-medium text-orange-500">
                        $
                        {cartProduct?.product?.isFlashSale
                          ? calculateDiscount(
                              cartProduct?.product?.price,
                              cartProduct?.product?.discount_percentage
                            ).toFixed(2)
                          : cartProduct?.product?.price}
                      </span>
                      {cartProduct?.product?.isFlashSale && (
                        <span className="ml-2 text-xs line-through text-gray-400">
                          ${cartProduct?.product?.price}
                        </span>
                      )}
                    </p>

                    <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                      <button
                        className="w-7 h-7 bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={
                          (isPending && !isSuccess) ||
                          cartProduct.quantity === 1
                        }
                        onClick={() =>
                          handleUpdateQuantity(cartProduct, "decrement")
                        }
                      >
                        <FaMinus size={10} />
                      </button>
                      <div className="w-8 h-7 flex justify-center items-center text-sm font-medium bg-white">
                        {cartProduct?.quantity}
                      </div>
                      <button
                        className="w-7 h-7 bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        disabled={isPending && !isSuccess}
                        onClick={() =>
                          handleUpdateQuantity(cartProduct, "increment")
                        }
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <FaShoppingCart size={24} />
            </div>
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        )}
      </div>

      <div className="p-3 bg-gray-50">
        {cartProducts && cartProducts.length > 0 && (
          <Link
            href="/checkout"
            className="w-full flex items-center justify-center gap-2 rounded-md py-2.5 bg-white text-black border font-medium text-sm hover:bg-orange-500 transition-all duration-300 shadow-sm hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
          >
            CHECKOUT NOW
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartProduct;

