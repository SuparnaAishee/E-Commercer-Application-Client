import { SVGProps } from "react";
export * from "./global";
export * from "./user";
export * from "./category";
export * from "./shop";
export * from "./product";
export * from "./cart";
export * from "./followShop";
export * from "./order";
export * from "./review";
export * from "./coupon";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
