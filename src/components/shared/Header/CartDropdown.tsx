"use client";

import { ShoppingBag } from "lucide-react";
import { useGetMyCartProducts } from "@/src/hooks/cart";
import { useUser } from "@/src/context/user.provider";

const CartDropdown = () => {
  const { setCartOpen } = useUser();
  const { data: cartProducts } = useGetMyCartProducts();
  const count = cartProducts?.data?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => setCartOpen(true)}
      aria-label="Open cart"
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
  );
};

export default CartDropdown;
