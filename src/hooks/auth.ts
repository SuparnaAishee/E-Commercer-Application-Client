import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  changePassword,
  forgotPassword,
  loginUser,
  registerUser,
} from "../services/Auth";
import { IChangePassword } from "../types";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_registration"],
    mutationFn: async (userData) => await registerUser(userData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["user_login"],
    mutationFn: async (userData) => await loginUser(userData),
  });
};
export const useChangePassword = () => {
  return useMutation<any, Error, IChangePassword>({
    mutationKey: ["change-password"],
    mutationFn: async (payload) => await changePassword(payload),
  });
};
export const useForgotPassword = () => {
  return useMutation<any, Error, { email: string }>({
    mutationKey: ["forgot-password"],
    mutationFn: async (payload) => await forgotPassword(payload),
  });
};
