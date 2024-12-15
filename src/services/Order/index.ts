"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IOrderPayload, TQueryParam } from "@/src/types";

export const createOrder = async (payload: IOrderPayload[]) => {
  try {
    const { data } = await AxiosSecure.post("/orders/create-order", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getMyOrders = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/orders/my-order", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getShopOrders = async (payload: {
  limit: number;
  page: number;
  shopId: string;
}) => {
  try {
    const params = new URLSearchParams();
    if (payload?.limit && payload.page) {
      params.append("limit", payload.limit.toString());
      params.append("page", payload.page.toString());
    }
    const { data } = await AxiosSecure.get(
      `/orders/shop-order/${payload.shopId}`,
      {
        params,
      }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllOrders = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/orders", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateOrderStatus = async (payload: {
  id: string;
  status: string;
}) => {
  try {
    const { data } = await AxiosSecure.patch(`/orders/${payload.id}`, {
      status: payload.status,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteMyOrder = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/orders/my-order/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
