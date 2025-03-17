import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IResponse,

  TQueryParam,
} from "../types";
import {
  addToWishlist,
  deleteWishlistProduct,
  getMyWishlist,
  updateWishlistProductQuantity,
} from "../services/Wishlist";
import { IUpdateWishlistProductQuantity, IWishlist } from "../types/wishlist";

export const useAddToWishlist = () => {
  return useMutation<any, Error, { quantity: number; productId: string }>({
    mutationKey: ["add-to-wishlist"],
    mutationFn: async (payload) => await addToWishlist(payload),
  });
};
export const useGetMyWishlistProducts = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IWishlist[]>>({
    queryKey: ["get-my-wishlist-product"],
    queryFn: async () => await getMyWishlist(query),
  });
};

export const useDeleteWishlistProduct = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-wishlist"],
    mutationFn: async (id) => await deleteWishlistProduct(id),
  });
};
export const useUpdateWishlistProductQuantity = () => {
  return useMutation<any, Error, IUpdateWishlistProductQuantity>({
    mutationKey: ["update-wishlist-product"],
    mutationFn: async (payload) => await updateWishlistProductQuantity(payload),
  });
};
