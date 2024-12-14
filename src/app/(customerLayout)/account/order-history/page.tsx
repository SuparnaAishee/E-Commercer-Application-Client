"use client";

import AddReviewToProduct from "@/src/components/modal/user/AddReviewToProduct";
import { limit } from "@/src/const/const";
import { useDeleteMyOrder, useGetMyOrder } from "@/src/hooks/order";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const OrderHistory = () => {
  const [page, setPage] = useState(1);
  const { mutate: deleteOrder } = useDeleteMyOrder();
  const { data, refetch, isLoading } = useGetMyOrder([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const meta = data?.meta;
  const handleDeleteOrder = (id: string) => {
    deleteOrder(id, {
      onSuccess(data) {
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      {data?.data?.map((order) => {
        return (
          <div
            key={order?.id}
            className="md:flex justify-between items-center border rounded p-5 mt-2"
          >
            <div className="w-20 h-20">
              <Image
                height={100}
                width={100}
                loading="lazy"
                className="w-full h-full object-cover"
                src={order?.product?.images[0]}
                alt="product"
              />
            </div>
            <div className="mt-6 md:mt-0">
              <div className="hover:text-primary transition durition-300">
                <h5>{order?.product?.name}</h5>
              </div>
              <p className="mb-0">
                Quantity: <span className="">{order?.quantity}</span>
              </p>
              <p className="mb-0">
                Product Price: <span className="">{order?.product?.price}</span>
              </p>
              {order?.discountedPrice ? (
                <p className="mb-0">
                  Discounted Price:{" "}
                  <span className="">
                    {calculateDiscount(
                      order.product.price,
                      order.product.discount_percentage
                    ).toFixed(2)}
                  </span>
                </p>
              ) : null}

              <p className="mb-0">
                Total Price:{" "}
                <span className="">
                  {order?.discountedPrice
                    ? order?.discountedPrice
                    : order.product?.price * order?.quantity}
                </span>
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <div>
                <h5>
                  Order Status :{" "}
                  <span className={order.status}>{order?.status}</span>
                </h5>
                <div className="flex items-center gap-3">
                  {!order?.isReviewed && (
                    <AddReviewToProduct productId={order?.productId} />
                  )}
                  {order?.status === "COMPLETED" ||
                  order?.status === "CANCELLED" ? (
                    <Button
                      onClick={() => handleDeleteOrder(order?.id)}
                      className="mt-3 bg-rose-500"
                    >
                      Delete
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {!isLoading && (
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

export default OrderHistory;
