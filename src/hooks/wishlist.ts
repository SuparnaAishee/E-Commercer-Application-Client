import { useMutation, useQuery } from "@tanstack/react-query";

import { IResponse } from "../types";
import { IWishlist } from "../types/wishlist";
import { addToWishlist, getWishlist, removeFromWishlist } from "../services/Wishlist";

// Hook for adding a product to wishlist
export const useAddToWishlist = () => {
  return useMutation<IResponse<IWishlist>, Error, { productId: string }>({
    mutationKey: ["add-to-wishlist"],
    mutationFn: async (payload) => await addToWishlist(payload),
  });
};

// Hook for fetching user's wishlist
export const useGetWishlist = () => {
  return useQuery<IResponse<IWishlist[]>, Error>({
    queryKey: ["get-wishlist"],
    queryFn: async () => await getWishlist(),
  });
};

// Hook for removing a product from wishlist
export const useRemoveFromWishlist = () => {
  return useMutation<IResponse<null>, Error, string>({
    mutationKey: ["remove-from-wishlist"],
    mutationFn: async (productId) => await removeFromWishlist(productId),
  });
};
