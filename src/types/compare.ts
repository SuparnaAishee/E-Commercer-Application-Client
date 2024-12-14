import { IUser } from "./global";
import { IProduct } from "./product";

export interface ICompare {
  id: string;
  userId: string;
  productId: string;
  product: IProduct;
  user: IUser;
}
