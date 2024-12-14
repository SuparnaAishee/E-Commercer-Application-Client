import { useMutation } from "@tanstack/react-query";
import { addReviewToProduct } from "../services/Review";
import { IReview } from "../types";

export const useAddReviewToProduct = () => {
  return useMutation<any, Error, Partial<IReview>>({
    mutationKey: ["add-review"],
    mutationFn: async (payload) => await addReviewToProduct(payload),
  });
};
