export const UserRole = {
  ADMIN: "ADMIN",
  VENDOR: "VENDOR",
  USER: "USER",
} as const;

export const UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export const ShopStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export const OrderStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export const protectedRoute = [
  "/account",
  "/account/:page*",
  "/admin",
  "/login",
  "/register",
];

export const limit = 10;
