import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createCompare,
  deleteComparison,
  getMyComparison,
} from "../services/Compare";
import { IResponse } from "../types";
import { ICompare } from "../types/compare";

export const useCreateCompare = () => {
  return useMutation<
    any,
    Error,
    { productId: string; type?: "replaceProduct" }
  >({
    mutationKey: ["compare-product"],
    mutationFn: async (payload) => await createCompare(payload),
  });
};
export const useGetMyComparison = () => {
  return useQuery<any, Error, IResponse<ICompare[]>>({
    queryKey: ["get-my-compare-product"],
    queryFn: async () => await getMyComparison(),
  });
};

export const useDeleteComparison = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-comparison"],
    mutationFn: async (id) => await deleteComparison(id),
  });
};
