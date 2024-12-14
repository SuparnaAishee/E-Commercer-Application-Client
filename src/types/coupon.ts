export interface ICoupon {
  id: string;
  code: string;
  discount: number;
  discountType: "PERCENTAGE" | "FIXED";
  expiryDate: string;
  minimumOrderValue: number;
  usageLimit: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}
