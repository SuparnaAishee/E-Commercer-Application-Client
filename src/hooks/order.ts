import { useMutation, useQuery } from "@tanstack/react-query";
import { IOrder, IOrderPayload, IResponse, TQueryParam } from "../types";
import {
  cancelMyOrder,
  createOrder,
  deleteMyOrder,
  getAllOrders,
  getMyOrders,
  getShopOrders,
  requestOrderReturn,
  updateOrderStatus,
  vendorAdvanceOrderStatus,
} from "../services/Order";

export const useCreateOrder = () => {
  return useMutation<any, Error, IOrderPayload[]>({
    mutationKey: ["create-order"],
    mutationFn: async (payload) => await createOrder(payload),
  });
};
export const useGetMyOrder = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IOrder[]>>({
    queryKey: ["my-order", query],
    queryFn: async () => await getMyOrders(query),
  });
};
export const useGetShopOrder = (payload: {
  limit: number;
  page: number;
  shopId: string;
}) => {
  return useQuery<any, Error, IResponse<IOrder[]>>({
    queryKey: ["shop-order", payload],
    enabled: !!payload.shopId,
    queryFn: async () => await getShopOrders(payload),
  });
};
export const useGetAllOrder = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IOrder[]>>({
    queryKey: ["all-order", query],
    queryFn: async () => await getAllOrders(query),
  });
};
export const useUpdateOrderStatus = () => {
  return useMutation<any, Error, { id: string; status: string }>({
    mutationKey: ["update-order"],
    mutationFn: async (payload) => await updateOrderStatus(payload),
  });
};
export const useDeleteMyOrder = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-my-order"],
    mutationFn: async (id) => await deleteMyOrder(id),
  });
};
export const useCancelMyOrder = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["cancel-my-order"],
    mutationFn: async (id) => await cancelMyOrder(id),
  });
};
export const useRequestOrderReturn = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["return-my-order"],
    mutationFn: async (id) => await requestOrderReturn(id),
  });
};
export const useVendorAdvanceStatus = () => {
  return useMutation<any, Error, { id: string; status: string }>({
    mutationKey: ["vendor-advance-status"],
    mutationFn: async (payload) => await vendorAdvanceOrderStatus(payload),
  });
};
