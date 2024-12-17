"use client";

import { useUser } from "@/src/context/user.provider";
import { useFollowShop, useGetSingleFollowShop } from "@/src/hooks/followShop";
import { IShop } from "@/src/types";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { toast } from "sonner";

const ShopCard = ({ shop }: { shop: IShop }) => {
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
    <div className="col-span-12 lg:col-span-9">
      <div className="md:flex justify-between items-center border rounded p-5">
        {shop?.shopLogo && (
          <div className="w-20 h-20">
            <Image
              height={100}
              width={100}
              loading="lazy"
              className="w-full h-full object-cover"
              src={shop?.shopLogo}
              alt="product"
            />
          </div>
        )}
        <div className="mt-6 md:mt-0">
          <div className="transition duration-300">
            <h5>Shop Name : {shop?.shopName}</h5>
          </div>
          <p className="mb-0">{shop?.shopDetails}</p>
        </div>
        <div className="mt-6 md:mt-0">
          <div className="transition duration-300">
            <h5>Vendor Email : {shop?.user?.email}</h5>
          </div>
          <p className="mb-0"> Followers : {shop?.follower?.length}</p>
        </div>
        {user?.id && (
          <div className="flex justify-between md:gap-12 items-center mt-4 md:mt-0">
            <Button onClick={() => handleFollowShop(shop?.id)}>
              {followedShop?.data && followedShop?.data?.shopId === shop?.id ? (
                <span>Following</span>
              ) : (
                <span>Follow</span>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
