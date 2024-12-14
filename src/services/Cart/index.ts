"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IUpdateCartProductQuantity } from "@/src/types";

export const addToCart = async (payload: {
  quantity: number;
  productId: string;
  type?: "replaceProduct";
}) => {
  try {
    const { data } = await AxiosSecure.post("/carts/add-to-cart", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getMyCartProducts = async () => {
  try {
    const { data } = await AxiosSecure.get("/carts/my-cart-products");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteCartProduct = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/carts/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateCartProductQuantity = async (
  payload: IUpdateCartProductQuantity
) => {
  try {
    const { data } = await AxiosSecure.patch(`/carts/`, payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
