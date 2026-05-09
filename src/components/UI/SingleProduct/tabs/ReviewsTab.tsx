"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.provider";

const ReviewsTab = () => {
  const { user } = useUser();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const submitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (reviewText.trim() === "") {
      toast.error("Please write a review");
      return;
    }
    // TODO: wire to POST /api/v1/reviews when review hook is ready
    toast.success("Review submitted successfully!");
    setRating(0);
    setReviewText("");
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
                  className="h-5 w-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium">5.0 out of 5</span>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-8">{star} star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: star === 5 ? "100%" : "0%" }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">
                  {star === 5 ? "100%" : "0%"}
                </span>
              </div>
            ))}
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
              >
                Submit Review
              </Button>
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
        <h3 className="text-lg font-medium mb-6">No Reviews Yet</h3>
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
      </div>
    </div>
  );
};

export default ReviewsTab;
