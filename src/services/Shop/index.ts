"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IUpdateShopStatus, TQueryParam } from "@/src/types";

export const createMyShop = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post("/shops/create-shop", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getMyShop = async () => {
  try {
    const { data } = await AxiosSecure.get("/shops/my-shop");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleShop = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/shops/single-shop/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllShop = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/shops", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateMyShop = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.patch("/shops/my-shop", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateShopStatus = async (payload: IUpdateShopStatus) => {
  try {
    const { data } = await AxiosSecure.patch("/shops/status", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
