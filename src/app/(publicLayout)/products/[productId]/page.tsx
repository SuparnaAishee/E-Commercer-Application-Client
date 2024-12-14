import nexiosInstance from "@/src/lib/NexiosInstance";
import { IProduct, IResponse } from "@/src/types";
import { NexiosResponse } from "nexios-http/types/interfaces";
import SingleProductComponent from "@/src/components/UI/SingleProduct/SingleProduct";

const SingleProduct = async ({ params }: { params: { productId: string } }) => {
  const { data }: NexiosResponse<IResponse<IProduct>> =
    await nexiosInstance.get(`/products/${params.productId}`);

  return (
    <div className="pt-12">
      {data?.data && <SingleProductComponent product={data?.data} />}
    </div>
  );
};

export default SingleProduct;
