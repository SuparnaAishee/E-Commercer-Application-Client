import { useMutation, useQuery } from "@tanstack/react-query";
import { IResponse, IUser } from "../types";
import {
  getMyProfile,
  getMyStats,
  updateProfile,
} from "../services/Profile/profile";

export const useUpdateProfile = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["update-profile"],
    mutationFn: async (payload) => await updateProfile(payload),
  });
};
export const useGetMyProfile = () => {
  return useQuery<any, Error, IResponse<IUser>>({
    queryKey: ["my-profile"],
    queryFn: async () => await getMyProfile(),
  });
};
export const useGetMyStats = () => {
  return useQuery<
    any,
    Error,
    IResponse<{ orders: number; wishlist: number; reviews: number }>
  >({
    queryKey: ["my-stats"],
    queryFn: async () => await getMyStats(),
  });
};
