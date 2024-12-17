import {
  useDeleteCartProduct,
  useGetMyCartProducts,
  useUpdateCartProductQuantity,
} from "@/src/hooks/cart";
import { ICart } from "@/src/types";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";
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
  let totalAmount: number = 0;

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
    <div className="absolute top-full right-0 bg-white z-20 p-4 w-[300px] rounded-b-[3px] mt-3.5 group-hover:mt-[5px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="mb-3 border-b border-[#d8d8d8]">
        <h4 className="text-base text-secondary mb-2">
          {cartProducts?.length} Items
        </h4>
      </div>
      <div>
        {cartProducts?.map((cartProduct) => {
          return (
            <div
              key={cartProduct?.id}
              className="flex items-start pr-5 mb-4 relative"
            >
              <button
                onClick={() => handleDeleteCartProduct(cartProduct?.id)}
                className="absolute right-0 hover:text-primary transition duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 32 32">
                  <path
                    fill="currentColor"
                    d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
                  ></path>
                </svg>
              </button>
              <div className="flex-shrink-0">
                <Image
                  height={100}
                  width={100}
                  src={cartProduct?.product?.images[0]}
                  className="w-[75px] h-[60px] object-contain"
                  alt="product"
                />
              </div>

              <div className="flex-grow pl-4">
                <h5 className="text-base text-secondary hover:text-primary transition duration-300">
                  {cartProduct?.product?.name}
                </h5>
                <p className="text-[#464545] text-sm">
                  Price:
                  <span className="ms-2">
                    {cartProduct?.product?.isFlashSale
                      ? calculateDiscount(
                          cartProduct?.product?.price,
                          cartProduct?.product?.discount_percentage
                        ).toFixed(2)
                      : cartProduct?.product?.price}
                  </span>
                  {cartProduct?.product?.isFlashSale && (
                    <span className="ms-2 line-through">
                      {cartProduct?.product?.price}
                    </span>
                  )}
                </p>

                <div>
                  <div className="flex items-center  mt-1">
                    <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
                      <button
                        className="disabled:cursor-not-allowed"
                        disabled={isPending && !isSuccess}
                        onClick={() =>
                          handleUpdateQuantity(cartProduct, "decrement")
                        }
                      >
                        {" "}
                        <FaMinus />
                      </button>
                    </div>
                    <div className="w-8 h-8 border flex justify-center items-center">
                      {cartProduct?.quantity}
                    </div>
                    <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
                      <button
                        className="disabled:cursor-not-allowed"
                        disabled={isPending && !isSuccess}
                        onClick={() =>
                          handleUpdateQuantity(cartProduct, "increment")
                        }
                      >
                        {" "}
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-[#d8d8d8] flex justify-between">
        <h4 className="text-base text-secondary">SUB TOTAL:</h4>
        <h4 className="text-base ml-2">{totalAmount?.toFixed(2)}</h4>
      </div>
      <div className="flex mt-4 gap-4">
        {/* <Link
          href="/"
          className=" default_btn w-1/2 rounded-[3px] py-2 px-2.5   text-white inline-block text-center text-sm hover:bg-transparent hover:text-rose-500 transition duration-300"
        >
          VIEW CART
        </Link> */}
        {cartProducts && cartProducts?.length > 0 && (
          <Link
            href="/checkout"
            className="w-1/2 flex items-center justify-center rounded-[3px] py-2 px-2.5 border border-rose-500  bg-white hover:bg-rose-500 hover:text-white  text-center text-sm text-rose-500 transition duration-300"
          >
            CHECKOUT
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartProduct;
