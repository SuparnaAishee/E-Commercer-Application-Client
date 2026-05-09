"use client";

import { useState } from "react";
import type { IProduct } from "@/src/types";
import DescriptionTab from "./tabs/DescriptionTab";
import DetailsTab from "./tabs/DetailsTab";
import ReviewsTab from "./tabs/ReviewsTab";

const TABS = [
  { id: "description", label: "Description" },
  { id: "details", label: "Details" },
  { id: "reviews", label: "Reviews" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type ProductTabsProps = {
  product: IProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <div className="mt-16">
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        {activeTab === "description" && (
          <DescriptionTab description={product?.description} />
        )}
        {activeTab === "details" && <DetailsTab product={product} />}
        {activeTab === "reviews" && <ReviewsTab />}
      </div>
    </div>
  );
};

export default ProductTabs;
