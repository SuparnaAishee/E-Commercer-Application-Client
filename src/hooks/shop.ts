import { useMutation, useQuery } from "@tanstack/react-query";
import { IResponse, IShop, IUpdateShopStatus, TQueryParam } from "../types";
import {
  createMyShop,
  getAllShop,
  getMyShop,
  getSingleShop,
  updateMyShop,
  updateShopStatus,
} from "../services/Shop";

export const useCreateMyShop = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["create-my-shop"],
    mutationFn: async (payload) => await createMyShop(payload),
  });
};
export const useGetMyShop = () => {
  return useQuery<any, Error, IResponse<IShop>>({
    queryKey: ["get-my-shop"],
    queryFn: async () => await getMyShop(),
  });
};
export const useGetSingleShop = (id: string) => {
  return useQuery<any, Error, IResponse<IShop>>({
    queryKey: ["get-single-shop"],
    queryFn: async () => await getSingleShop(id),
  });
};
export const useGetAllShop = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IShop[]>>({
    queryKey: ["get-all-shop", query],
    queryFn: async () => await getAllShop(query),
  });
};
export const useUpdateMyShop = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["update-my-shop"],
    mutationFn: async (payload) => await updateMyShop(payload),
  });
};
export const useUpdateShopStatus = () => {
  return useMutation<any, Error, IUpdateShopStatus>({
    mutationKey: ["update-shop-status"],
    mutationFn: async (payload) => await updateShopStatus(payload),
  });
};
