"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.provider";
import { useAddReviewToProduct } from "@/src/hooks/review";
import type { IProduct } from "@/src/types";
import { useQueryClient } from "@tanstack/react-query";

type Props = { product: IProduct };

const ReviewsTab = ({ product }: Props) => {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: addReview, isPending } = useAddReviewToProduct();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const reviews = product?.reviews ?? [];
  const reviewCount = reviews.length;

  const { avgRating, distribution } = useMemo(() => {
    if (reviewCount === 0) {
      return {
        avgRating: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
      };
    }
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    for (const r of reviews) {
      sum += r.rating;
      if (dist[r.rating] !== undefined) dist[r.rating] += 1;
    }
    return { avgRating: sum / reviewCount, distribution: dist };
  }, [reviews, reviewCount]);

  const submitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (reviewText.trim() === "") {
      toast.error("Please write a review");
      return;
    }
    addReview(
      { productId: product.id, rating, comment: reviewText.trim() },
      {
        onSuccess(data) {
          if (data?.success) {
            toast.success(data?.message || "Review submitted");
            setRating(0);
            setReviewText("");
            queryClient.invalidateQueries({ queryKey: ["my-order"] });
            router.refresh();
          } else {
            toast.error(data?.message || "Could not submit review");
          }
        },
        onError() {
          toast.error("Could not submit review");
        },
      },
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(avgRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              {reviewCount === 0
                ? "No ratings yet"
                : `${avgRating.toFixed(1)} out of 5 (${reviewCount})`}
            </span>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star] ?? 0;
              const pct =
                reviewCount === 0 ? 0 : Math.round((count / reviewCount) * 100);
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 w-8">{star} star</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-10 text-right">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8" id="write-review">
          <h3 className="text-lg font-medium mb-4">Write a Review</h3>

          {user?.email ? (
            <div className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          (hoverRating || rating) >= star
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="review-text"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Review
                </label>
                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full border border-gray-300 rounded-md p-3 focus:ring-primary focus:border-primary"
                  rows={4}
                />
              </div>

              <Button
                color="primary"
                className="w-full"
                onClick={submitReview}
                isLoading={isPending}
                isDisabled={isPending}
              >
                Submit Review
              </Button>
              <p className="text-xs text-gray-500">
                You can review a product after purchasing it.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-md text-center">
              <p className="text-gray-600 mb-3">
                Please log in to write a review
              </p>
              <Button color="primary" onClick={() => router.push("/login")}>
                Log In
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-lg font-medium mb-6">
          {reviewCount === 0
            ? "No Reviews Yet"
            : `${reviewCount} Review${reviewCount === 1 ? "" : "s"}`}
        </h3>

        {reviewCount === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">
              Be the first to review this product
            </p>
            <Button
              color="primary"
              onClick={() => {
                if (user?.email) {
                  document
                    .getElementById("write-review")
                    ?.scrollIntoView({ behavior: "smooth" });
                } else {
                  router.push("/login");
                }
              }}
            >
              Write a Review
            </Button>
          </div>
        ) : (
          <ul className="space-y-5">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="rounded-lg border border-gray-100 bg-white p-5 shadow-[0_2px_10px_-8px_rgba(0,0,0,0.15)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="grid place-items-center h-9 w-9 rounded-full bg-orange-50 text-orange-500 text-sm font-semibold">
                      {(r.user?.name ?? "A").slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {r.user?.name ?? "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= r.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  {r.comment}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;
