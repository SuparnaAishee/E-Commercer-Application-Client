export interface IFullUser {
  id: string;
  name: string;
  email: string;
  address: string;
  description: string;
  role: "ADMIN" | "USER" | "VENDOR";
  profilePhoto?: string;
  status: "ACTIVE" | "BLOCKED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  recentActivity?: { description: string; date: string; icon?: JSX.Element }[];
}

export interface IUpdateUserStatusRole {
  id: string;
  data: {
    role?: "ADMIN" | "USER" | "VENDOR";
    status?: "ACTIVE" | "BLOCKED";
    isDeleted?: boolean;
  };
}

export type IUserRole = "ADMIN" | "VENDOR" | "USER";

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}
