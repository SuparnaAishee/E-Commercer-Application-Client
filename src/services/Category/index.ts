"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { TQueryParam } from "@/src/types";

export const createCategory = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post(
      "/categories/create-category",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getAllCategories = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/categories", { params });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleCategory = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/categories/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateSingleCategory = async (payload: {
  id: string;
  formData: FormData;
}) => {
  try {
    const { data } = await AxiosSecure.patch(
      `/categories/${payload.id}`,
      payload.formData
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/categories/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
