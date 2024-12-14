import { IProduct } from "./product";

export interface ICategories {
  id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  products: IProduct[];
}
