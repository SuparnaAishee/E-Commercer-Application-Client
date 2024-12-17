"use client";

import CreateShop from "@/src/components/modal/vendor/CreateShop";
import UpdateShop from "@/src/components/modal/vendor/UpdateShop";
import { useGetMyShop } from "@/src/hooks/shop";
import Image from "next/image";
import React from "react";

const ManageShop = () => {
  const { data, isLoading, isPending } = useGetMyShop();

  return (
    <>
      {!isLoading && !isPending && !data?.data && (
        <div className="col-span-12 lg:col-span-9 ">
          <CreateShop />
          <p className="flex items-center justify-center h-full">
            {" "}
            Please create a shop!
          </p>
        </div>
      )}
      {data?.data && (
        <div className="col-span-12 lg:col-span-9">
          <div className="md:flex justify-between items-center border rounded p-5">
            {data?.data?.shopLogo && (
              <div className="w-20 h-20">
                <Image
                  height={100}
                  width={100}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  src={data?.data?.shopLogo}
                  alt="product"
                />
              </div>
            )}
            <div className="mt-6 md:mt-0">
              <a
                href="product-view.html"
                className="primary-color transition duration-300"
              >
                <h5>{data?.data?.shopName}</h5>
              </a>
              <p className="mb-0">{data?.data?.shopDetails}</p>
            </div>

            <div className="flex justify-between md:gap-12 items-center mt-4 md:mt-0">
              <UpdateShop shop={data?.data} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageShop;
