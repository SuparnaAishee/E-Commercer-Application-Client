"use client";

import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllFlashSale } from "@/src/hooks/flashSale";

const FlashSale = () => {
  const { data: flashSale } = useGetAllFlashSale();
  console.log(flashSale);
  return (
    <section className="flex flex-col items-center justify-center gap-4 pt-14">
      <div className="container pb-14">
        <div className="flex items-start justify-between mb-[30px]">
          <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
            Flash Sale
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashSale?.data?.map((flashSale) => (
            <ProductCart key={flashSale.id} product={flashSale} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
