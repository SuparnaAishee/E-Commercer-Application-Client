// import nexiosInstance from "@/src/lib/NexiosInstance";
// import { IProduct, IResponse } from "@/src/types";
// import { NexiosResponse } from "nexios-http/types/interfaces";
// import SingleProductComponent from "@/src/components/UI/SingleProduct/SingleProduct";

// const SingleProduct = async ({ params }: { params: { productId: string } }) => {
//   const { data }: NexiosResponse<IResponse<IProduct>> =
//     await nexiosInstance.get(`/products/${params.productId}`);

//   return (
//     <div className="pt-12">
//       {data?.data && <SingleProductComponent product={data?.data} />}
//     </div>
//   );
// };

// export default SingleProduct;
import nexiosInstance from "@/src/lib/NexiosInstance";
import type { IProduct, IResponse } from "@/src/types";
import type { NexiosResponse } from "nexios-http/types/interfaces";
import SingleProductComponent from "@/src/components/UI/SingleProduct/SingleProduct";
import { notFound } from "next/navigation";

// ✅ Ensure dynamic rendering
export const dynamicParams = true;
export const dynamic = "force-dynamic";

// ✅ Ensure fallback mode does not break
export async function generateStaticParams() {
  return [];
}

// ✅ Fetch product data inside a Server Component
export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  try {
    console.log("Fetching product:", params.productId);

    const response: NexiosResponse<IResponse<IProduct>> =
      await nexiosInstance.get(`/products/${params.productId}`);

    const product = response?.data?.data;
    if (!product) return <ErrorState message="Product not found." />;

    return (
      <div className="pt-12">
        <SingleProductComponent product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return <ErrorState message="Error loading product details." />;
  }
}

// ✅ Metadata for SEO (optional)
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  try {
    const response: NexiosResponse<IResponse<IProduct>> =
      await nexiosInstance.get(`/products/${params.productId}`);
    const product = response?.data?.data;

    return {
      title: product ? `${product.name} | My Store` : "Product Not Found",
      description: product
        ? product.description
        : "This product does not exist.",
    };
  } catch {
    return {
      title: "Product Not Found",
      description: "Error loading product details.",
    };
  }
}

// ✅ Error Component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="pt-12 text-center">
      <h2 className="text-xl font-bold">Error</h2>
      <p>{message}</p>
    </div>
  );
}

