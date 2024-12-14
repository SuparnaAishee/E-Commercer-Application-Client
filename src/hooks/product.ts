import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getMyProduct,
  getSingleProduct,
  updateProduct,
} from "../services/Product";
import { IProduct, IResponse, TQueryParam } from "../types";

export const useCreateProduct = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["create-product"],
    mutationFn: async (payload) => await createProduct(payload),
  });
};

export const useGetAllProducts = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IProduct[]>>({
    queryKey: ["all-products", query],
    queryFn: async () => await getAllProduct(query),
  });
};
export const useGetMyProducts = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IProduct[]>>({
    queryKey: ["my-products", query],
    queryFn: async () => await getMyProduct(query),
  });
};
export const useGetSingleProduct = (id: string) => {
  return useQuery<any, Error, IResponse<IProduct>>({
    queryKey: ["single-product", id],
    queryFn: async () => await getSingleProduct(id),
  });
};
export const useUpdateProduct = () => {
  return useMutation<any, Error, { formData: FormData; id: string }>({
    mutationKey: ["update-products"],
    mutationFn: async (payload) => await updateProduct(payload),
  });
};
export const useDeleteProduct = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["update-products"],
    mutationFn: async (id) => await deleteProduct(id),
  });
};
