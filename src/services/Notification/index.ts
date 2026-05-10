import { AxiosClient as AxiosSecure } from "@/src/lib/AxiosClient";

export const getMyNotifications = async () => {
  try {
    const { data } = await AxiosSecure.get("/notifications");
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const markNotificationRead = async (id: string) => {
  try {
    const { data } = await AxiosSecure.patch(`/notifications/${id}/read`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const markAllNotificationsRead = async () => {
  try {
    const { data } = await AxiosSecure.patch(`/notifications/read-all`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};
