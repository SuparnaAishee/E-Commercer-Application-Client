"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { ICoupon, TQueryParam } from "@/src/types";

export const createCoupon = async (payload: Partial<ICoupon>) => {
  try {
    const { data } = await AxiosSecure.post("/coupons/create-coupon", payload);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAllCoupons = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/coupons", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const validateCoupon = async (payload: {
  totalAmount: number;
  code: string;
}) => {
  try {
    const { data } = await AxiosSecure.post(
      "/coupons/validate-coupon",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteCoupon = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/coupons/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
