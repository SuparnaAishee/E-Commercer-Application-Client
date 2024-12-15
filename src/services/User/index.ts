"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IUpdateUserStatusRole, TQueryParam } from "@/src/types";

export const getAllUser = async (query: TQueryParam[]) => {
  try {
    const params = new URLSearchParams();
    if (query?.length > 0) {
      query.forEach((item) => params.append(item.name, item.value as string));
    }
    const { data } = await AxiosSecure.get("/users", {
      params,
    });
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const updateUserRoleStatus = async (payload: IUpdateUserStatusRole) => {
  try {
    const { data } = await AxiosSecure.patch(
      `/users/update/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
