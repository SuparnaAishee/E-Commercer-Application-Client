"use client";

import { useUser } from "@/src/context/user.provider";
import { useFollowShop, useGetSingleFollowShop } from "@/src/hooks/followShop";
import { IShop } from "@/src/types";
import Image from "next/image";
import { toast } from "sonner";
import { AiOutlineShop, AiOutlineWifi } from "react-icons/ai";

const ShopSection = ({ shop }: { shop: IShop }) => {
  const { user } = useUser();
  const { data: followedShop, refetch: refetchFollowedShop } =
    useGetSingleFollowShop(shop?.id);
  const { mutate: followShop } = useFollowShop();

  const handleFollowShop = (id: string) => {
    followShop(
      { shopId: id },
      {
        onSuccess(data) {
          if (data?.success) {
            refetchFollowedShop();
            toast.success(data?.message);
          } else {
            toast.error(data?.message);
          }
        },
      }
    );
  };

  return (
    <div className="bg-default-white  rounded-lg max-w-8xl mx-auto">
      <div className="flex items-start gap-6 border-b">
        {/* Shop Icon */}
        <div className="flex-shrink-0">
          {shop?.shopLogo ? (
            <Image
              src={shop.shopLogo}
              alt="Shop Logo"
              width={80}
              height={80}
              className="rounded-full object-cover border border-gray-300"
            />
          ) : (
            <AiOutlineShop className="text-gray-400 text-8xl" />
          )}
        </div>

        {/* Shop Details */}
        <div className="flex-1  pb-4">
          {/* Shop Name */}
          <h1 className="text-2xl font-bold text-gray-900">
            {shop?.shopName || "Shop Name"}
          </h1>

          {/* Join Date */}
          <p className="text-sm text-gray-500 mb-4">
            Join on: {shop?.createdAt || "N/A"}
          </p>

          {/* Shop Description */}
          <p className="text-gray-700 text-sm mb-6">
            {shop?.shopDetails ||
              "This shop is committed to providing exceptional tech products and services to its customers."}
          </p>

          {/* Follow Button */}
          {user?.id && (
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium  ${
                followedShop?.data?.shopId === shop?.id
                  ? "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  : "bg-white text-black font-bold border-gray-400 hover:bg-blue-50"
              }`}
              onClick={() => handleFollowShop(shop?.id)}
            >
              <AiOutlineWifi
                className={`text-lg ${
                  followedShop?.data?.shopId === shop?.id
                    ? "text-gray-700"
                    : "text-orange-500"
                }`}
              />
              {followedShop?.data?.shopId === shop?.id
                ? "Following"
                : "Follow Shop"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopSection;

// "use client";

// import { useUser } from "@/src/context/user.provider";
// import { useFollowShop, useGetSingleFollowShop } from "@/src/hooks/followShop";
// import { IShop } from "@/src/types";
// import { Button } from "@nextui-org/button";
// import Image from "next/image";
// import { toast } from "sonner";

// const ShopCard = ({ shop }: { shop: IShop }) => {
//   const { user } = useUser();
//   const { data: followedShop, refetch: refetchFollowedShop } =
//     useGetSingleFollowShop(shop?.id);
//   const { mutate: followShop } = useFollowShop();

//   const handleFollowShop = (id: string) => {
//     followShop(
//       { shopId: id },
//       {
//         onSuccess(data) {
//           if (data?.success) {
//             refetchFollowedShop();
//             toast.success(data?.message);
//           } else {
//             toast.error(data?.message);
//           }
//         },
//       }
//     );
//   };
//   return (
//     <div className="col-span-12 lg:col-span-9">
//       <div className="md:flex justify-between items-center border rounded p-5">
//         {shop?.shopLogo && (
//           <div className="w-20 h-20">
//             <Image
//               height={100}
//               width={100}
//               loading="lazy"
//               className="w-full h-full object-cover"
//               src={shop?.shopLogo}
//               alt="product"
//             />
//           </div>
//         )}
//         <div className="mt-6 md:mt-0">
//           <div className="transition duration-300">
//             <h5>Shop Name : {shop?.shopName}</h5>
//           </div>
//           <p className="mb-0">{shop?.shopDetails}</p>
//         </div>
//         <div className="mt-6 md:mt-0">
//           <div className="transition duration-300">
//             <h5>Vendor Email : {shop?.user?.email}</h5>
//           </div>
//           <p className="mb-0"> Followers : {shop?.follower?.length}</p>
//         </div>
//         {user?.id && (
//           <div className="flex justify-between md:gap-12 items-center mt-4 md:mt-0">
//             <Button onClick={() => handleFollowShop(shop?.id)}>
//               {followedShop?.data && followedShop?.data?.shopId === shop?.id ? (
//                 <span>Following</span>
//               ) : (
//                 <span>Follow</span>
//               )}
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ShopCard;
