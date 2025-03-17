import { IProduct } from "./product";

export interface IWishlist {
  id: string;
  quantity: 1;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  product: IProduct;
}

export interface IUpdateWishlistProductQuantity {
  productId: string;
  type: "increment" | "decrement";
  quantity: number;
}
