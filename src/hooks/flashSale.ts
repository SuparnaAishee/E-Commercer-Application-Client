import { useQuery } from "@tanstack/react-query";
import { IProduct, IResponse } from "../types";
import { getAllFlashSale } from "../services/FlashSale";

export const useGetAllFlashSale = () => {
  return useQuery<any, Error, IResponse<IProduct[]>>({
    queryKey: ["all-flash_sale"],
    queryFn: async () => await getAllFlashSale(),
  });
};
