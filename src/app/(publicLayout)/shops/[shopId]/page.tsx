// import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
// import ShopCard from "@/src/components/UI/ShopCard/ShopCard";
// import nexiosInstance from "@/src/lib/NexiosInstance";
// import { IResponse, IShop } from "@/src/types";
// import { NexiosResponse } from "nexios-http/types/interfaces";

// const SingleShopPage = async ({ params }: { params: { shopId: string } }) => {
//   const { data }: NexiosResponse<IResponse<IShop>> = await nexiosInstance.get(
//     `/shops/single-shop/${params?.shopId}`
//   );

//   return (
//     <div className="container pt-12 pl-12 pr-12">
//       {data?.data && <ShopCard shop={data?.data} />}
//       {data?.data && (
//         <div className="pt-14 mb-20">
//           <div className="flex items-start justify-between mb-[30px]">
//             <h2 className="text-2xl font-bold text-secondary">
//               Products Of {data?.data?.shopName}
//             </h2>
//           </div>
//           {data?.data?.products && (
//             <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {data?.data?.products?.map((product) => (
//                 <ProductCart key={product.id} product={product} />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleShopPage;
import { Suspense } from "react";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import ShopCard from "@/src/components/UI/ShopCard/ShopCard";
import nexiosInstance from "@/src/lib/NexiosInstance";
import type { IResponse, IShop } from "@/src/types";
import type { NexiosResponse } from "nexios-http/types/interfaces";
import { notFound } from "next/navigation";

// ✅ Ensure dynamic route handling
export const dynamicParams = true;
export const dynamic = "force-dynamic";

// ✅ Ensure proper fallback handling
export async function generateStaticParams() {
  return [];
}

// ✅ Using Suspense for loading state
export default function ShopPage({ params }: { params: { shopId: string } }) {
  return (
    <Suspense fallback={<LoadingState />}>
      <SingleShopPage params={params} />
    </Suspense>
  );
}

// ✅ Fetch shop details inside a Server Component
async function SingleShopPage({ params }: { params: { shopId: string } }) {
  try {
    console.log("Fetching shop with ID:", params.shopId);

    const { data }: NexiosResponse<IResponse<IShop>> = await nexiosInstance.get(
      `/shops/single-shop/${params.shopId}`
    );

    console.log("Shop data received:", !!data?.data);

    if (!data?.data) return <ErrorState message="Shop not found." />;

    return (
      <div className="container pt-12 pl-12 pr-12">
        {data.data && <ShopCard shop={data.data} />}
        {data.data?.products?.length > 0 ? (
          <div className="pt-14 mb-20">
            <h2 className="text-2xl font-bold text-secondary">
              Products Of {data.data.shopName}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.data.products.map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching shop:", error);
    return <ErrorState message="Error loading shop details." />;
  }
}

// ✅ Error Component
function ErrorState({ message }: { message: string }) {
  return (
    <div className="container pt-12 pl-12 pr-12 text-center">
      <h2 className="text-xl font-bold">Error</h2>
      <p>{message}</p>
    </div>
  );
}

// ✅ Loading Component
function LoadingState() {
  return (
    <div className="container pt-12 pl-12 pr-12 text-center">
      Loading shop details...
    </div>
  );
}
