import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../services/Notification";

export type INotification = {
  id: string;
  userId: string;
  type:
    | "ORDER_PLACED"
    | "ORDER_STATUS"
    | "REVIEW"
    | "SHOP"
    | "SYSTEM";
  title: string;
  body?: string | null;
  link?: string | null;
  isRead: boolean;
  createdAt: string;
};

type NotificationsPayload = {
  data: INotification[];
  unreadCount: number;
};

export const useGetMyNotifications = (enabled: boolean = true) => {
  return useQuery<
    any,
    Error,
    { success: boolean; data: NotificationsPayload } | undefined
  >({
    queryKey: ["my-notifications"],
    queryFn: async () => await getMyNotifications(),
    enabled,
    // SSE handles live pushes; this query is only refetched when invalidated
    // (by the stream or by mark-read mutations).
    staleTime: Infinity,
  });
};

export const useMarkNotificationRead = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["mark-notification-read"],
    mutationFn: async (id) => await markNotificationRead(id),
  });
};

export const useMarkAllNotificationsRead = () => {
  return useMutation<any, Error, void>({
    mutationKey: ["mark-all-notifications-read"],
    mutationFn: async () => await markAllNotificationsRead(),
  });
};
