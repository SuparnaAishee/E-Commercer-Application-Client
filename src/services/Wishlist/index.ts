"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IUpdateCartProductQuantity, TQueryParam } from "@/src/types";

export const addToWishlist = async (payload: {
  quantity: number;
  productId: string;
}) => {
  try {
    const { data } = await AxiosSecure.post(
      "/wishlist/add-to-wishlist",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getMyWishlist = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/wishlist/my-wishlist", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteWishlistProduct = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/wishlist/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateWishlistProductQuantity = async (
  payload: IUpdateCartProductQuantity
) => {
  try {
    const { data } = await AxiosSecure.patch(`/wishlist/`, payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
