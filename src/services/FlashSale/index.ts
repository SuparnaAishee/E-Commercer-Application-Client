"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const getAllFlashSale = async () => {
  try {
    const { data } = await AxiosSecure.get("/flash-sales");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
