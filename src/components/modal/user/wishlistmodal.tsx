// "use client";

// import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";
// import { GoTrash } from "react-icons/go";
// import { Heart } from "lucide-react";
// import Image from "next/image";
// import { useDeleteWishlist, useGetMyWishlist } from "@/src/hooks/wishlist";
// import { toast } from "sonner";
// import { useUser } from "@/src/context/user.provider";
// import { useAddToCart } from "@/src/hooks/cart";

// export default function WishlistModal() {
//   const { data: wishlistData, refetch: refetchWishlist } = useGetMyWishlist();
//   const { showWishlistModal, setShowWishlistModal } = useUser();
//   const { mutate: deleteWishlist } = useDeleteWishlist();
//   const { mutate: addToCart } = useAddToCart();

//   const handleAddToCart = (wishlistItem: any) => {
//     addToCart(
//       { productId: wishlistItem.product?.id, quantity: 1 },
//       {
//         onSuccess(data) {
//           if (data?.success) {
//             deleteWishlist(wishlistItem?.id, {
//               onSuccess() {
//                 refetchWishlist();
//               },
//             });
//             toast.success(data?.message);
//             setShowWishlistModal(false);
//           } else {
//             toast.error(data?.message);
//           }
//         },
//       }
//     );
//   };

//   const handleDeleteWishlist = (id: string) => {
//     deleteWishlist(id, {
//       onSuccess(data) {
//         toast.success(data?.message);
//         refetchWishlist();
//       },
//     });
//   };

//   return (
//     <>
//       <button onClick={() => setShowWishlistModal(true)}>
//         <div className="relative group hidden lg:block">
//           <div className="text-white ml-5 relative block text-center cursor-pointer">
//             <span className="text-orange-500 flex justify-center">
//               <Heart size={30} />
//             </span>
//             <span className="text-white text-[11px] leading-[10px]">
//               Wishlist
//             </span>

//             <span className="absolute bg-primary -top-1 left-2 text-white text-[11px] w-[18px] h-[18px] leading-[18px] text-center rounded-full overflow-hidden">
//               {wishlistData?.data?.length || 0}
//             </span>
//           </div>
//         </div>
//       </button>

//       <Modal
//         size="5xl"
//         isOpen={showWishlistModal}
//         onOpenChange={setShowWishlistModal}
//         placement="top-center"
//       >
//         <ModalContent>
//           {() => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Wishlist Products
//               </ModalHeader>
//               <ModalBody>
//                 {wishlistData?.data?.length === 0 ? (
//                   <div className="text-center py-8">
//                     <Heart size={40} className="mx-auto mb-4 text-gray-400" />
//                     <p className="text-lg font-medium">
//                       Your wishlist is empty
//                     </p>
//                     <p className="text-gray-500">
//                       Add items to your wishlist to see them here
//                     </p>
//                   </div>
//                 ) : (
//                   wishlistData?.data?.map((item: any) => {
//                     return (
//                       <div
//                         key={item?.id}
//                         className="md:flex justify-between items-center border rounded p-5 mt-2"
//                       >
//                         <div className="w-20 h-20">
//                           <Image
//                             height={100}
//                             width={100}
//                             loading="lazy"
//                             className="w-full h-full object-cover"
//                             src={
//                               item?.product?.images?.[0] || "/placeholder.svg"
//                             }
//                             alt="product"
//                           />
//                         </div>
//                         <div className="mt-6 md:mt-0">
//                           <p className="transition duration-300">
//                             <h5>{item?.product?.name}</h5>
//                           </p>
//                           <p className="mb-0 line-clamp-1">
//                             {item?.product?.description}
//                           </p>
//                           <span>Price: ${item?.product?.price}</span>
//                         </div>

//                         <div className="text-[15px] font-medium mt-2 md:mt-0 flex items-center gap-5">
//                           <button
//                             onClick={() => handleAddToCart(item)}
//                             className="default_btn bg-secondary border-none hover:bg-white px-[15px]"
//                           >
//                             ADD TO CART
//                           </button>
//                           <button
//                             className="default_btn text-white bg-primary"
//                             onClick={() => handleDeleteWishlist(item.id)}
//                           >
//                             <GoTrash size={17} />
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
