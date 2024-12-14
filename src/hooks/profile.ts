import { useMutation, useQuery } from "@tanstack/react-query";
import { IUser } from "../types";
import { getMyProfile, updateProfile } from "../services/Profile/profile";

export const useUpdateProfile = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["update-profile"],
    mutationFn: async (payload) => await updateProfile(payload),
  });
};
export const useGetMyProfile = () => {
  return useQuery<any, Error, IUser>({
    queryKey: ["my-profile"],
    queryFn: async () => await getMyProfile(),
  });
};
