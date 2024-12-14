import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import ShopCard from "@/src/components/UI/ShopCard/ShopCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import { IResponse, IShop } from "@/src/types";
import { NexiosResponse } from "nexios-http/types/interfaces";

const SingleShopPage = async ({ params }: { params: { shopId: string } }) => {
  const { data }: NexiosResponse<IResponse<IShop>> = await nexiosInstance.get(
    `/shops/single-shop/${params?.shopId}`
  );

  return (
    <div className="container pt-12">
      {data?.data && <ShopCard shop={data?.data} />}
      {data?.data && (
        <div className="pt-14">
          <div className="flex items-start justify-between mb-[30px]">
            <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
              Products Of {data?.data?.shopName}
            </h2>
          </div>
          {data?.data?.products && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data?.data?.products?.map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleShopPage;
