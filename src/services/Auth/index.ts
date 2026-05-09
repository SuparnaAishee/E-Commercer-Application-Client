"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";
import { IChangePassword, IUser } from "@/src/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

type AccessTokenPayload = Pick<
  IUser,
  "id" | "name" | "email" | "role" | "iat" | "exp" | "profilePhoto"
>;

export const registerUser = async (payload: FieldValues) => {
  try {
    const { data } = await AxiosSecure.post("/auth/register", payload);

    cookies().set("accessToken", data?.data?.accessToken);
    cookies().set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const loginUser = async (payload: FieldValues) => {
  try {
    const { data } = await AxiosSecure.post("/auth/login", payload);
    cookies().set("accessToken", data?.data?.accessToken);
    cookies().set("refreshToken", data?.data?.refreshToken);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const logOut = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const changePassword = async (payload: IChangePassword) => {
  try {
    const { data } = await AxiosSecure.post("/auth/change-password", payload);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const forgotPassword = async (payload: { email: string }) => {
  try {
    const { data } = await AxiosSecure.post("/auth/forgot-password", payload);

    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getCurrentUser = async (): Promise<AccessTokenPayload | null> => {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) return null;

  const decode = jwtDecode<AccessTokenPayload>(accessToken);
  return {
    id: decode.id,
    name: decode.name,
    email: decode.email,
    role: decode.role,
    iat: decode.iat,
    exp: decode.exp,
    profilePhoto: decode.profilePhoto,
  };
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;
    const res = await AxiosSecure({
      url: "/auth/refreshToken",
      method: "POST",
      withCredentials: true,
      headers: {
        cookies: `refreshToken=${refreshToken}`,
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
