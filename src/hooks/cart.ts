import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToCart,
  deleteCartProduct,
  getMyCartProducts,
  updateCartProductQuantity,
} from "../services/Cart";
import { ICart, IResponse, IUpdateCartProductQuantity } from "../types";

export const useAddToCart = () => {
  return useMutation<
    any,
    Error,
    { quantity: number; productId: string; type?: "replaceProduct" }
  >({
    mutationKey: ["add-to-cart"],
    mutationFn: async (payload) => await addToCart(payload),
  });
};
export const useGetMyCartProducts = () => {
  return useQuery<any, Error, IResponse<ICart[]>>({
    queryKey: ["get-my-cart-product"],
    queryFn: async () => await getMyCartProducts(),
  });
};

export const useDeleteCartProduct = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["delete-cart-product"],
    mutationFn: async (id) => await deleteCartProduct(id),
  });
};
export const useUpdateCartProductQuantity = () => {
  return useMutation<any, Error, IUpdateCartProductQuantity>({
    mutationKey: ["update-cart-product"],
    mutationFn: async (payload) => await updateCartProductQuantity(payload),
  });
};
