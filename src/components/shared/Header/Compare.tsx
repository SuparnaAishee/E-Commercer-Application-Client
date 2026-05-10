"use client";

import { Scale } from "lucide-react";
import { useUser } from "@/src/context/user.provider";
import { useGetMyComparison } from "@/src/hooks/compare";

const Compare = () => {
  const { setShowCompareModal } = useUser();
  const { data } = useGetMyComparison();
  const count = data?.data?.length ?? 0;

  return (
    <button
      type="button"
      onClick={() => setShowCompareModal(true)}
      aria-label="Compare products"
      className="relative flex flex-col items-center gap-1 px-2 transition-transform hover:-translate-y-0.5"
    >
      <span className="relative grid place-items-center h-10 w-10 rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100/70 transition-all group-hover:bg-orange-100">
        <Scale size={20} strokeWidth={1.75} />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] font-semibold leading-none ring-2 ring-white">
            {count}
          </span>
        )}
      </span>
      <span className="text-[11px] leading-none text-gray-700">Compare</span>
    </button>
  );
};

export default Compare;
