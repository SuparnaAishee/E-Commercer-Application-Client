import { IUser } from "./global";
import { IProduct } from "./product";

export interface ICart {
  id: string;
  quantity: number;
  productId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  product: IProduct;
}

export interface IUpdateCartProductQuantity {
  productId: string;
  type: "increment" | "decrement";
  quantity: number;
}
