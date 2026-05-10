"use client";

import { ShoppingBag } from "lucide-react";
import { useGetMyCartProducts } from "@/src/hooks/cart";
import CartProduct from "../../UI/CartProduct/CartProduct";

const CartDropdown = () => {
  const { data: cartProducts } = useGetMyCartProducts();
  const count = cartProducts?.data?.length ?? 0;

  return (
    <div className="relative group hidden lg:block">
      <button
        type="button"
        aria-label="Cart"
        className="relative flex flex-col items-center gap-1 px-2 transition-transform hover:-translate-y-0.5"
      >
        <span className="relative grid place-items-center h-10 w-10 rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100/70 transition-all group-hover:bg-orange-100">
          <ShoppingBag size={20} strokeWidth={1.75} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] font-semibold leading-none ring-2 ring-white">
              {count}
            </span>
          )}
        </span>
        <span className="text-[11px] leading-none text-gray-700">Cart</span>
      </button>

      <div className="absolute right-0 top-full invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 transform origin-top-right">
        <CartProduct cartProducts={cartProducts?.data} />
      </div>
    </div>
  );
};

export default CartDropdown;
