// "use client";

// import { useGetMyCartProducts } from "@/src/hooks/cart";
// import { useValidateCoupon } from "@/src/hooks/coupon";
// import { useCreateOrder } from "@/src/hooks/order";
// import { ICart } from "@/src/types";
// import { calculateDiscount } from "@/src/utils/calculateDiscount";
// import { Button } from "@nextui-org/button";
// import { Input } from "@nextui-org/input";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// const CheckoutPage = () => {
//   const [code, setCode] = useState("");
//   const [coupon, setCoupon] = useState("");
//   const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
//   const { mutate: validateCoupon } = useValidateCoupon();
//   const router = useRouter();
//   const { mutate: createOrder } = useCreateOrder();
//   const { data } = useGetMyCartProducts();

//   let total: number = 0;

//   if (data?.data && data?.data?.length > 0) {
//     for (const cart of data?.data) {
//       if (cart?.product?.isFlashSale) {
//         total += calculateDiscount(
//           cart?.product?.price * cart?.quantity,
//           cart?.product?.discount_percentage
//         );
//       } else {
//         total += cart?.product?.price * cart?.quantity;
//       }
//     }
//   }

//   const handleCreateOrder = (cart: ICart[]) => {
//     const payload = cart?.map((ct) => ({
//       coupon,
//       quantity: ct.quantity,
//       productId: ct.productId,
//     }));
//     createOrder(payload, {
//       onSuccess(data) {
//         if (data?.success) {
//           router.push(data?.data?.payment_url);
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const handleValidateCoupon = () => {
//     const payload = { code, totalAmount: total };
//     validateCoupon(payload, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           setCoupon(code);
//           const discountType = data?.data?.discountType;
//           const discount = data?.data?.discount;
//           if (discountType === "PERCENTAGE") {
//             setDiscountedTotal(total * (1 - discount / 100));
//           } else {
//             setDiscountedTotal(total - discount);
//           }
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   return (
//     <div className="container grid grid-cols-12 gap-6 pt-14">
//       <div className="col-span-12  lg:col-span-9">
//         <h4 className="bg-[#E9E4E4] px-3 py-2">Cart Product</h4>

//         {data?.data?.map((cart) => {
//           return (
//             <div
//               key={cart?.id}
//               className="md:flex justify-between items-center border rounded p-5 mt-2"
//             >
//               <div className="w-20 h-20">
//                 <Image
//                   height={100}
//                   width={100}
//                   loading="lazy"
//                   className="w-full h-full object-cover"
//                   src={cart?.product?.images[0]}
//                   alt="product"
//                 />
//               </div>
//               <div className="mt-6 md:mt-0">
//                 <p className="transition duration-300">
//                   <h5>{cart?.product?.name}</h5>
//                 </p>
//                 <p className="mb-0">
//                   Quantity: <span className="">{cart?.quantity}</span>
//                 </p>
//               </div>

//               <div className="text-[15px]  font-medium mt-2 md:mt-0 flex flex-col">
//                 <span>
//                   {" "}
//                   {cart?.product?.isFlashSale
//                     ? "Original Price"
//                     : "Price"}: {cart?.product?.price}
//                 </span>
//                 {cart?.product?.isFlashSale && (
//                   <span>
//                     {" "}
//                     Discounted Price :{" "}
//                     {calculateDiscount(
//                       cart?.product?.price,
//                       cart?.product?.discount_percentage
//                     ).toFixed(2)}
//                   </span>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="col-span-12 lg:col-span-3 border p-4">
//         <div>
//           <h4 className="uppercase text-lg">Order Summary</h4>
//           <div className="space-y-2 border-b pb-3 mt-2">
//             <div className="flex justify-between">
//               <p className="font-medium">Subtotal</p>
//               <p className="font-medium">{total.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-medium">Delivery</p>
//               <p className="font-medium">Free</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-medium">Tax</p>
//               <p className="font-medium">Free</p>
//             </div>
//           </div>
//           <div className="flex justify-between mt-2">
//             <p className="font-semibold">Total</p>
//             <p className="font-semibold">{total.toFixed(2)}</p>
//           </div>
//           {discountedTotal && (
//             <div className="flex justify-between mt-2">
//               <p className="font-semibold">Discounted Total</p>
//               <p className="font-semibold">{discountedTotal}</p>
//             </div>
//           )}
//           <div className="flex  w-full lg:max-w-sm rounded-lg overflow-hidden mt-4">
//             <Input
//               onChange={(e) => setCode(e.target.value)}
//               type="text"
//               placeholder="Enter coupon"
//               className="w-full border border-[#E9E4E4] text-xs focus:outline-none  focus:border-primary overflow-hidden"
//             />
//             <button
//               onClick={handleValidateCoupon}
//               className="bg-primary border border-primary text-white rounded-br-lg text-xs uppercase px-4 sm:px-8 lg:px-4 hover:bg-white hover:text-primary hover:border-primary transition-all "
//             >
//               apply
//             </button>
//           </div>
//           <div className="mt-8">
//             <Button
//               onClick={() => handleCreateOrder(data?.data as ICart[])}
//               className="block w-full px-8 lg:px-2 xl:px-8 py-2 text-center bg-primary hover:bg-transparent text-white hover:text-primary hover:border-primary border transition duration-300 rounded-lg uppercase text-sm"
//             >
//               Proceed to checkout
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
"use client";

import { useGetMyCartProducts } from "@/src/hooks/cart";
import { useValidateCoupon } from "@/src/hooks/coupon";
import { useCreateOrder } from "@/src/hooks/order";
import type { ICart } from "@/src/types";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { mutate: validateCoupon } = useValidateCoupon();
  const router = useRouter();
  const { mutate: createOrder } = useCreateOrder();
  const { data } = useGetMyCartProducts();

  useEffect(() => {
    if (data?.data) {
      const initialQuantities: Record<string, number> = {};
      data.data.forEach((cart) => {
        initialQuantities[cart.id] = cart.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [data?.data]);

  let total = 0;

  if (data?.data && data?.data?.length > 0) {
    for (const cart of data?.data) {
      if (cart?.product?.isFlashSale) {
        total += calculateDiscount(
          cart?.product?.price * (quantities[cart.id] || cart?.quantity),
          cart?.product?.discount_percentage
        );
      } else {
        total += cart?.product?.price * (quantities[cart.id] || cart?.quantity);
      }
    }
  }

  const handleCreateOrder = (cart: ICart[]) => {
    setIsCheckingOut(true);
    const payload = cart?.map((ct) => ({
      coupon,
      quantity: quantities[ct.id] || ct.quantity,
      productId: ct.productId,
    }));
    createOrder(payload, {
      onSuccess(data) {
        if (data?.success) {
          router.push(data?.data?.payment_url);
        } else {
          toast.error(data?.message);
        }
        setIsCheckingOut(false);
      },
      onError() {
        setIsCheckingOut(false);
      },
    });
  };

  const handleValidateCoupon = () => {
    if (!code.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplying(true);
    const payload = { code, totalAmount: total };
    validateCoupon(payload, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          setCoupon(code);
          const discountType = data?.data?.discountType;
          const discount = data?.data?.discount;
          if (discountType === "PERCENTAGE") {
            setDiscountedTotal(total * (1 - discount / 100));
          } else {
            setDiscountedTotal(total - discount);
          }
        } else {
          toast.error(data?.message);
        }
        setIsApplying(false);
      },
      onError() {
        toast.error("Failed to validate coupon");
        setIsApplying(false);
      },
    });
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));
  };

  return (
    <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 py-14 bg-white to-white pl-12 pr-16">
      <div className="lg:col-span-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
         
          Your Shopping Cart
        </h2>

        <div className="bg-white rounded shadow-lg overflow-hidden border border-orange-100">
          <div className="bg-gray-200 px-6 py-4 text-black font-medium text-lg">
            Cart Products ({data?.data?.length || 0})
          </div>

          <div className="divide-y divide-orange-100">
            {data?.data?.map((cart) => (
              <div
                key={cart?.id}
                className="p-6 transition-all duration-300 hover:bg-orange-50 group"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden transform transition-transform group-hover:scale-105 shadow-md">
                    <Image
                      height={112}
                      width={112}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      src={cart?.product?.images[0] || "/placeholder.svg"}
                      alt={cart?.product?.name || "Product image"}
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
                      {cart?.product?.name}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 items-center">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              cart.id,
                              (quantities[cart.id] || cart.quantity) - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-orange-100 rounded-l-md transition-colors"
                        >
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-200 bg-white">
                          {quantities[cart.id] || cart.quantity}
                        </div>
                        <button
                          onClick={() =>
                            updateQuantity(
                              cart.id,
                              (quantities[cart.id] || cart.quantity) + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-orange-100 rounded transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex flex-col">
                        {cart?.product?.isFlashSale ? (
                          <>
                            <span className="text-gray-500 line-through text-sm">
                              ${cart?.product?.price.toFixed(2)}
                            </span>
                            <span className="text-orange-600 font-semibold">
                              $
                              {calculateDiscount(
                                cart?.product?.price,
                                cart?.product?.discount_percentage
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-800 font-semibold">
                            ${cart?.product?.price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <div className="ml-auto text-right">
                        <div className="text-gray-500 text-sm">Subtotal</div>
                        <div className="font-bold text-gray-800">
                          $
                          {cart?.product?.isFlashSale
                            ? (
                                calculateDiscount(
                                  cart?.product?.price,
                                  cart?.product?.discount_percentage
                                ) * (quantities[cart.id] || cart.quantity)
                              ).toFixed(2)
                            : (
                                cart?.product?.price *
                                (quantities[cart.id] || cart.quantity)
                              ).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {(!data?.data || data?.data.length === 0) && (
              <div className="p-12 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded bg-orange-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="bg-white rounded shadow-lg overflow-hidden border border-orange-100 sticky top-24">
          <div className="bg-gradient-to-r from-orange-200 to-orange-300 px-6 py-4 text-black font-medium text-lg">
            Order Summary
          </div>

          <div className="p-6">
            <div className="space-y-4 pb-6 border-b border-orange-100">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">${total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Delivery</p>
                <p className="text-green-600 font-medium">Free</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p className="text-green-600 font-medium">Free</p>
              </div>
            </div>

            <div className="flex justify-between mt-6 text-lg">
              <p className="font-bold">Total</p>
              <p className="font-bold">${total.toFixed(2)}</p>
            </div>

            {discountedTotal && (
              <div className="flex justify-between mt-2 bg-orange-50 p-3 rounded-md border border-orange-100">
                <p className="font-semibold text-orange-700">
                  Discounted Total
                </p>
                <p className="font-bold text-orange-700">
                  ${discountedTotal.toFixed(2)}
                </p>
              </div>
            )}

            <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Have a coupon code?</p>
              <div className="flex rounded-md overflow-hidden shadow-sm">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="w-full px-4 py-3 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={handleValidateCoupon}
                  disabled={isApplying}
                  className={`bg-orange-500 text-white px-4 text-sm uppercase font-medium hover:bg-orange-600 transition-colors ${isApplying ? "opacity-75" : ""}`}
                >
                  {isApplying ? "Applying..." : "Apply"}
                </button>
              </div>
              {coupon && (
                <div className="mt-3 text-sm text-green-600 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Coupon &quot;{coupon}&quot; applied successfully
                </div>
              )}
            </div>

            <button
              onClick={() => handleCreateOrder(data?.data as ICart[])}
              disabled={!data?.data || data?.data.length === 0 || isCheckingOut}
              className={`w-full py-4 mt-8 bg-gray-200 text-black rounded-md uppercase text-sm font-bold tracking-wider transition-all transform hover:translate-y-[-2px] ${
                !data?.data || data?.data.length === 0 || isCheckingOut
                  ? "opacity-50 cursor-not-allowed"
                  : "shadow-lg hover:shadow-xl"
              }`}
            >
              {isCheckingOut ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Proceed to Checkout"
              )}
            </button>

            <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

