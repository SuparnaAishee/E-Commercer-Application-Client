// "use server";

// import { AxiosClient as AxiosSecure } from "@/src/lib/AxiosClient";

// export const createCompare = async (payload: {
//   productId: string;
//   type?: "replaceProduct";
// }) => {
//   try {
//     const { data } = await AxiosSecure.post(
//       "/comparisons/create-comparison",
//       payload
//     );
//     return data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };
// export const getMyComparison = async () => {
//   try {
//     const { data } = await AxiosSecure.get("/comparisons");
//     return data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };
// export const deleteComparison = async (id: string) => {
//   try {
//     const { data } = await AxiosSecure.delete(`/comparisons/${id}`);
//     return data;
//   } catch (error: any) {
//     return error.response.data;
//   }
// };

import { AxiosClient as AxiosSecure } from "@/src/lib/AxiosClient";

export const createCompare = async (payload: {
  productId: string;
  type?: "replaceProduct";
}) => {
  try {
    const { data } = await AxiosSecure.post(
      "/comparisons/create-comparison",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getMyComparison = async () => {
  try {
    const { data } = await AxiosSecure.get("/comparisons");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteComparison = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/comparisons/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};