// import { useRemoveFromWishlist } from "@/src/hooks/wishlist";
// import { IProduct } from "@/src/types"; // Importing IProduct for type checking
// import { toast } from "sonner";
// import Image from "next/image";


// const WishlistProduct = ({
//   wishlistProducts,
// }: {
//   wishlistProducts: IProduct[] | undefined;
// }) => {
//   const { mutate: deleteWishlistProduct } = useRemoveFromWishlist();

//   const handleDeleteProduct = (id: string) => {
//     deleteWishlistProduct(id, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   return (
//     <div>
//       {wishlistProducts?.map((product) => (
//         <div key={product?.id} className="flex items-start pr-5 mb-4 relative">
//           <button
//             onClick={() => handleDeleteProduct(product?.id)}
//             className="absolute right-0 hover:text-primary transition duration-300"
//           >
//             <svg width="18" height="18" viewBox="0 0 32 32">
//               <path
//                 fill="currentColor"
//                 d="M7.219 5.781L5.78 7.22L14.563 16L5.78 24.781l1.44 1.439L16 17.437l8.781 8.782l1.438-1.438L17.437 16l8.782-8.781L24.78 5.78L16 14.563z"
//               ></path>
//             </svg>
//           </button>
//           <div className="flex-shrink-0">
//             <Image
//               height={100}
//               width={100}
//               src={product?.images[0]}
//               className="w-[75px] h-[60px] object-contain"
//               alt="product"
//             />
//           </div>
//           <div className="flex-grow pl-4">
//             <h5 className="text-base text-secondary hover:text-primary transition duration-300">
//               {product?.name}
//             </h5>
//             <p className="text-[#464545] text-sm">
//               Price: <span className="ms-2">{product?.price}</span>
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default WishlistProduct;
