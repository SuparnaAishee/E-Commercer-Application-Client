"use client";


import { limit } from "@/src/const/const";
import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";

import {
  useDeleteWishlistProduct,
  useGetMyWishlistProducts,
} from "@/src/hooks/wishlist";
import { IWishlist } from "@/src/types/wishlist";

import { Button, Pagination } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import Swal from "sweetalert2";
import LoadingSpinner from "../loading";

const Wishlist = () => {
  const [page, setPage] = useState(1);
  const { data: cartProduct, refetch: refetchCart } = useGetMyCartProducts();
  const {
    mutate: addToCart,
    isPending: isCartPending,
    isSuccess: isCartSuccess,
  } = useAddToCart();

  const { mutate: deleteWishlist } = useDeleteWishlistProduct();
  const {
    data,
    refetch: refetchWishlist,
    isLoading,
  } = useGetMyWishlistProducts([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const meta = data?.meta;
  console.log(data);
  const handleDeleteWishlist = (id: string) => {
    deleteWishlist(id, {
      onSuccess(data) {
        if (data?.success) {
          refetchWishlist();
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const handleAddToCart = (wishlist: IWishlist) => {
    const { product, id } = wishlist;
    const isDifferentShop = cartProduct?.data?.find(
      (cart) => cart.product?.shopId !== product?.shopId
    );

    if (isDifferentShop) {
      Swal.fire({
        title: "Detect Different Shop",
        text: "Adding multiple shop product is not allowed! Replace the comparison product with the new product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Replace",
      }).then((result) => {
        if (result.isConfirmed) {
          addToCart(
            { productId: product.id, quantity: 1, type: "replaceProduct" },
            {
              onSuccess(data) {
                if (data?.success) {
                  deleteWishlist(id, {
                    onSuccess(data) {
                      refetchWishlist();
                      refetchCart();
                      toast.success(data?.message);
                    },
                  });
                } else {
                  toast.error(data?.message);
                }
              },
            }
          );
        }
      });
    } else {
      addToCart(
        { productId: product.id, quantity: 1 },
        {
          onSuccess(data) {
            if (data?.success) {
              deleteWishlist(id, {
                onSuccess(data) {
                  refetchWishlist();
                  refetchCart();
                  toast.success(data?.message);
                },
              });
            } else {
              toast.error(data?.message);
            }
          },
        }
      );
    }
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      {isLoading && <LoadingSpinner />}
      {data?.data?.map((wishlist) => {
        return (
          <div
            key={wishlist?.id}
            className="md:flex justify-between items-center border rounded p-5 mt-2 bg-white shadow-md"
          >
            <div className="w-20 h-20">
              <Image
                height={100}
                width={100}
                loading="lazy"
                className="w-full h-full object-cover"
                src={wishlist?.product?.images[0]}
                alt="product"
              />
            </div>
            <div className="mt-6 md:mt-0">
              <div className="hover:text-primary transition duration-300 font-medium">
                <h5>{wishlist?.product?.name}</h5>
              </div>
              <p className="mb-0">
                Availability:{" "}
                <span className="">
                  {wishlist?.product?.inventory > 0 ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-secondary">Out of Stock</span>
                  )}
                </span>
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="mb-0">
                Product Price:{" "}
                <span className="">{wishlist?.product?.price}</span>
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <div className="flex items-center gap-5">
                <Button
                  radius="sm"
                  onPress={() => handleAddToCart(wishlist)}
                  className="mt-3  bg-primary text-white  flex items-center gap-3"
                >
                  {isCartPending && !isCartSuccess ? (
                    <span className="flex items-center gap-2 justify-center text-base">
                      <span>Please Wait</span>{" "}
                      <TbFidgetSpinner className="animate-spin" />
                    </span>
                  ) : (
                    <>
                      <IoCartOutline size={20} />
                      <span>Add To Cart</span>
                    </>
                  )}
                </Button>

                <div className="ml-5">
                  <RiDeleteBin6Line
                    className="cursor-pointer hover:text-secondary transition-colors"
                    size={20}
                    onClick={() => handleDeleteWishlist(wishlist?.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {data?.data?.length === 0 && (
        <h1 className="flex items-center justify-center min-h-[30vh]">
          You dont have any wishlist!
        </h1>
      )}

      {!isLoading && data?.data && data?.data?.length > 0 && (
        <div className="my-10 flex justify-end">
          <Pagination
            loop
            showControls
            onChange={(page) => setPage(page)}
            page={page}
            total={meta?.total ? Math.ceil(meta?.total / limit) : 1}
          />
        </div>
      )}
    </div>
  );
};

export default Wishlist;
