import { AxiosClient as AxiosSecure } from "@/src/lib/AxiosClient";
import { IReview } from "@/src/types";

export const addReviewToProduct = async (payload: Partial<IReview>) => {
  try {
    const { data } = await AxiosSecure.post("/reviews/add-review", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
