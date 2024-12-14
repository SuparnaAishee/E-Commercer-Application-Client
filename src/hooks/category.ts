import { useMutation, useQuery } from "@tanstack/react-query";
import { ICategories, IResponse, TQueryParam } from "../types";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
} from "../services/Category";

export const useCreateCategory = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["create-category"],
    mutationFn: async (payload) => await createCategory(payload),
  });
};

export const useGetAllCategory = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<ICategories[]>>({
    queryKey: ["get-categories", query],
    queryFn: async () => await getAllCategories(query),
  });
};

export const useGetSingleCategory = (id: string) => {
  return useQuery<any, Error, IResponse<ICategories>>({
    queryKey: ["get-category", id],
    queryFn: async () => await getSingleCategory(id),
  });
};
export const useUpdateSingleCategory = () => {
  return useMutation<any, Error, { id: string; formData: FormData }>({
    mutationKey: ["update-category"],
    mutationFn: async (payload) => await updateSingleCategory(payload),
  });
};

export const useDeleteCategory = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-category"],
    mutationFn: async (id) => await deleteCategory(id),
  });
};
