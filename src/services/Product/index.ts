"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { TQueryParam } from "@/src/types";

export const createProduct = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post(
      "/products/create-product",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAllProduct = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();

    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/products", {
      params,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getMyProduct = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/products/my-products", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleProduct = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/products/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateProduct = async (payload: {
  formData: FormData;
  id: string;
}) => {
  try {
    const { data } = await AxiosSecure.patch(
      `/products/${payload?.id}`,
      payload?.formData
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteProduct = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/products/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
