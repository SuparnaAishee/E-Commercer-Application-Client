"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="container pt-12 pl-12 pr-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg mb-8">There was an error loading this product.</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/products"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
