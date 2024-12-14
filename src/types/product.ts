import { ICategories } from "./category";
import { IReview } from "./review";
import { IShop } from "./shop";

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  inventory: number;
  categoryId: string;
  shopId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: ICategories;
  shop: IShop;
  reviews: IReview[];
  isFlashSale: boolean;
  discount_percentage: number;
  sale_start_time: string;
  sale_end_time: string;
}
