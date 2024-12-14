import { useMutation, useQuery } from "@tanstack/react-query";
import { followShop, getSingleFollowShop } from "../services/FollowShop";
import { IFollowShop, IResponse } from "../types";

export const useFollowShop = () => {
  return useMutation<any, Error, { shopId: string }>({
    mutationKey: ["follow-shop"],
    mutationFn: async (payload) => await followShop(payload),
  });
};
export const useGetSingleFollowShop = (id: string) => {
  return useQuery<any, Error, IResponse<IFollowShop>>({
    queryKey: ["single-follow-shop", id],
    queryFn: async () => await getSingleFollowShop(id),
  });
};
