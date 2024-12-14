import { IUser } from "./global";

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
