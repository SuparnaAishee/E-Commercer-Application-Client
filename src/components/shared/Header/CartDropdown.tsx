"use client";

import { useGetMyCartProducts } from "@/src/hooks/cart";

import CartProduct from "../../UI/CartProduct/CartProduct";
import { IoCartOutline } from "react-icons/io5";

const CartDropdown = () => {
  const { data: cartProducts } = useGetMyCartProducts();

  return (
    <div className="relative group hidden lg:block">
      <div className="text-white ml-5 relative block text-center cursor-pointer">
        <span className="text-white flex justify-center">
          <IoCartOutline size={30} />
        </span>
        <span className="text-white text-[11px] leading-[10px]">Cart</span>
        {cartProducts?.data && cartProducts?.data?.length > 0 && (
          <span className="absolute bg-primary -top-1 -right-2 text-white text-[11px] w-[18px] h-[18px] leading-[18px] text-center rounded-full overflow-hidden">
            {cartProducts?.data?.length}
          </span>
        )}
      </div>

      <CartProduct cartProducts={cartProducts?.data} />
    </div>
  );
};

export default CartDropdown;
