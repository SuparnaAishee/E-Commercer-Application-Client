import { IResponse } from "@/src/types";
import { IWishlist } from "@/src/types/wishlist";
import axios from "axios";


// Add product to wishlist
export const addToWishlist = async (payload: { productId: string }) => {
  const response = await axios.post<IResponse<IWishlist>>(
    "/wishlist/add",
    payload
  );
  return response.data;
};

// Get user's wishlist
export const getWishlist = async () => {
  const response = await axios.get<IResponse<IWishlist[]>>("/wishlist");
  return response.data;
};

// Remove product from wishlist
export const removeFromWishlist = async (productId: string) => {
  const response = await axios.delete<IResponse<null>>(
    `/wishlist/remove/${productId}`
  );
  return response.data;
};
