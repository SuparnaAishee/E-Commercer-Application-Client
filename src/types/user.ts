export interface IFullUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "VENDOR";
  profilePhoto?: string;
  status: "ACTIVE" | "BLOCKED";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
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
