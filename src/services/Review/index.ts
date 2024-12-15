"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IReview } from "@/src/types";

export const addReviewToProduct = async (payload: Partial<IReview>) => {
  try {
    const { data } = await AxiosSecure.post("/reviews/add-review", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
