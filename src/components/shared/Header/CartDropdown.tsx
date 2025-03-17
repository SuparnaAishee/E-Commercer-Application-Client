// "use client";

// import { useGetMyCartProducts } from "@/src/hooks/cart";

// import CartProduct from "../../UI/CartProduct/CartProduct";
// import { IoCartOutline } from "react-icons/io5";

// const CartDropdown = () => {
//   const { data: cartProducts } = useGetMyCartProducts();

//   return (
//     <div className="relative group hidden lg:block">
//       <div className="text-white ml-5 relative block text-center cursor-pointer">
//         <span className="text-orange-500 flex justify-center">
//           <IoCartOutline size={30} />
//         </span>
//         <span className="text-white text-[11px] leading-[10px]">Cart</span>
//         {cartProducts?.data && cartProducts?.data?.length > 0 && (
//           <span className="absolute bg-primary -top-1 -right-2 text-white text-[11px] w-[18px] h-[18px] leading-[18px] text-center rounded-full overflow-hidden">
//             {cartProducts?.data?.length}
//           </span>
//         )}
//       </div>

//       <CartProduct cartProducts={cartProducts?.data} />
//     </div>
//   );
// };

// export default CartDropdown;
"use client";

import { useGetMyCartProducts } from "@/src/hooks/cart";
import CartProduct from "../../UI/CartProduct/CartProduct";
import { IoCartOutline } from "react-icons/io5";

const CartDropdown = () => {
  const { data: cartProducts } = useGetMyCartProducts();

  return (
    <div className="relative group hidden lg:block">
      <div className="text-white ml-5 relative block text-center cursor-pointer group-hover:opacity-90 transition-opacity">
        <span className="text-orange-500 flex justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg]">
          <IoCartOutline size={30} className="drop-shadow-sm" />
        </span>
        <span className="text-white text-[11px] leading-[10px] transition-all duration-300 group-hover:text-orange-200">
          Cart
        </span>
        {cartProducts?.data && cartProducts?.data?.length > 0 && (
          <span className="absolute bg-primary -top-1 -right-2 text-white text-[11px] w-[18px] h-[18px] leading-[18px] text-center rounded-full overflow-hidden animate-pulse shadow-sm">
            {cartProducts?.data?.length}
          </span>
        )}
      </div>

      <div className="absolute right-0 top-full invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 transform origin-top-right">
        <CartProduct cartProducts={cartProducts?.data} />
      </div>
    </div>
  );
};

export default CartDropdown;

