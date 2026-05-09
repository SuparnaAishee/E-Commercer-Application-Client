import { Check } from "lucide-react";
import type { IProduct } from "@/src/types";

type DetailsTabProps = {
  product: IProduct;
};

const DetailsTab = ({ product }: DetailsTabProps) => {
  const specs: { label: string; value: string }[] = [
    { label: "Category", value: product?.category?.name || "Uncategorized" },
    { label: "Brand", value: product?.shop?.shopName || "Unknown" },
    { label: "Availability", value: product?.inventory > 0 ? "In Stock" : "Out of stock" },
    { label: "SKU", value: product?.id?.substring(0, 8) || "N/A" },
  ];

  const shippingPoints: string[] = [
    "Free shipping on orders over $50",
    "Express shipping available",
    "30-day return policy",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Product Specifications</h3>
        <div className="space-y-3">
          {specs.map((spec) => (
            <div key={spec.label} className="flex border-b pb-2">
              <span className="w-1/3 text-gray-500">{spec.label}</span>
              <span className="w-2/3 font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
        <ul className="space-y-2">
          {shippingPoints.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-green-500 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsTab;
