"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const followShop = async (payload: { shopId: string }) => {
  try {
    const { data } = await AxiosSecure.post("/follow-shop", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleFollowShop = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/follow-shop/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
