import { AxiosClient as AxiosSecure } from "@/src/lib/AxiosClient";

export const getAllFlashSale = async () => {
  try {
    const { data } = await AxiosSecure.get("/flash-sales");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
