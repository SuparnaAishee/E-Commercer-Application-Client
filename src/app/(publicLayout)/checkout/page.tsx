"use client";

import { useGetMyCartProducts } from "@/src/hooks/cart";
import { useValidateCoupon } from "@/src/hooks/coupon";
import { useCreateOrder } from "@/src/hooks/order";
import { ICart } from "@/src/types";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const CheckoutPage = () => {
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState<number | null>(null);
  const { mutate: validateCoupon } = useValidateCoupon();
  const router = useRouter();
  const { mutate: createOrder } = useCreateOrder();
  const { data } = useGetMyCartProducts();

  let total: number = 0;

  if (data?.data && data?.data?.length > 0) {
    for (const cart of data?.data) {
      if (cart?.product?.isFlashSale) {
        total += calculateDiscount(
          cart?.product?.price * cart?.quantity,
          cart?.product?.discount_percentage
        );
      } else {
        total += cart?.product?.price * cart?.quantity;
      }
    }
  }

  const handleCreateOrder = (cart: ICart[]) => {
    const payload = cart?.map((ct) => ({
      coupon,
      quantity: ct.quantity,
      productId: ct.productId,
    }));
    createOrder(payload, {
      onSuccess(data) {
        if (data?.success) {
          router.push(data?.data?.payment_url);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const handleValidateCoupon = () => {
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
      },
    });
  };

  return (
    <div className="container grid grid-cols-12 gap-6 pt-14">
      <div className="col-span-12  lg:col-span-9">
        <h4 className="bg-[#E9E4E4] px-3 py-2">Cart Product</h4>

        {data?.data?.map((cart) => {
          return (
            <div
              key={cart?.id}
              className="md:flex justify-between items-center border rounded p-5 mt-2"
            >
              <div className="w-20 h-20">
                <Image
                  height={100}
                  width={100}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  src={cart?.product?.images[0]}
                  alt="product"
                />
              </div>
              <div className="mt-6 md:mt-0">
                <p className="transition duration-300">
                  <h5>{cart?.product?.name}</h5>
                </p>
                <p className="mb-0">
                  Quantity: <span className="">{cart?.quantity}</span>
                </p>
              </div>

              <div className="text-[15px]  font-medium mt-2 md:mt-0 flex flex-col">
                <span>
                  {" "}
                  {cart?.product?.isFlashSale
                    ? "Original Price"
                    : "Price"}: {cart?.product?.price}
                </span>
                {cart?.product?.isFlashSale && (
                  <span>
                    {" "}
                    Discounted Price :{" "}
                    {calculateDiscount(
                      cart?.product?.price,
                      cart?.product?.discount_percentage
                    ).toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-12 lg:col-span-3 border p-4">
        <div>
          <h4 className="uppercase text-lg">Order Summary</h4>
          <div className="space-y-2 border-b pb-3 mt-2">
            <div className="flex justify-between">
              <p className="font-medium">Subtotal</p>
              <p className="font-medium">{total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Delivery</p>
              <p className="font-medium">Free</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Tax</p>
              <p className="font-medium">Free</p>
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">{total.toFixed(2)}</p>
          </div>
          {discountedTotal && (
            <div className="flex justify-between mt-2">
              <p className="font-semibold">Discounted Total</p>
              <p className="font-semibold">{discountedTotal}</p>
            </div>
          )}
          <div className="flex  w-full lg:max-w-sm rounded-lg overflow-hidden mt-4">
            <Input
              onChange={(e) => setCode(e.target.value)}
              type="text"
              placeholder="Enter coupon"
              className="w-full border border-[#E9E4E4] text-xs focus:outline-none  focus:border-primary overflow-hidden"
            />
            <button
              onClick={handleValidateCoupon}
              className="bg-primary border border-primary text-white rounded-br-lg text-xs uppercase px-4 sm:px-8 lg:px-4 hover:bg-white hover:text-primary hover:border-primary transition-all "
            >
              apply
            </button>
          </div>
          <div className="mt-8">
            <Button
              onClick={() => handleCreateOrder(data?.data as ICart[])}
              className="block w-full px-8 lg:px-2 xl:px-8 py-2 text-center bg-primary hover:bg-transparent text-white hover:text-primary hover:border-primary border transition duration-300 rounded-lg uppercase text-sm"
            >
              Proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
