import { useMutation, useQuery } from "@tanstack/react-query";

import { getAllUser, updateUserRoleStatus } from "../services/User";
import {
  IFullUser,
  IResponse,
  IUpdateUserStatusRole,
  TQueryParam,
} from "../types";

export const useGetAllUser = (query: TQueryParam[]) => {
  return useQuery<any, Error, IResponse<IFullUser[]>>({
    queryKey: ["get-user", query],
    queryFn: async () => await getAllUser(query),
  });
};

export const useUpdateUserStatusRole = () => {
  return useMutation<any, Error, IUpdateUserStatusRole>({
    mutationKey: ["update-user-role-status"],
    mutationFn: async (payload) => await updateUserRoleStatus(payload),
  });
};
