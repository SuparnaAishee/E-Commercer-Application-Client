// types/wishlist.ts
export interface IWishlist {
  id: string;
  productId: string;
  userId: string;
  createdAt: string;
  product: {
    discount_percentage: number;
    isFlashSale: any;
    id: string;
    name: string;
    images: string;
    price: number;
  };
}
// types/index.ts
export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
