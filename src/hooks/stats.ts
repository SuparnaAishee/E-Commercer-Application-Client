import { useQuery } from "@tanstack/react-query";
import { AxiosClient } from "../lib/AxiosClient";

export type AdminStats = {
  kpis: {
    totalRevenue: number;
    revenueGrowthPct: number;
    totalOrders: number;
    ordersGrowthPct: number;
    totalCustomers: number;
    customersGrowthPct: number;
    totalProducts: number;
    productsAddedThisWeek: number;
  };
  statusBreakdown: Record<string, number>;
  monthlyRevenue: { month: string; revenue: number }[];
  revenueByCategory: { name: string; value: number }[];
  topShops: {
    id: string;
    shopName: string;
    orders: number;
    products: number;
    followers: number;
  }[];
  recentOrders: any[];
  unreadNotifications: number;
};

export type VendorStats = {
  shop: {
    id: string;
    shopName: string;
    shopLogo: string | null;
    followers: number;
    products: number;
  };
  kpis: {
    totalRevenue: number;
    revenueGrowthPct: number;
    totalOrders: number;
    ordersGrowthPct: number;
    followers: number;
    productCount: number;
  };
  statusBreakdown: Record<string, number>;
  monthlyRevenue: { month: string; revenue: number }[];
  topProducts: {
    id: string;
    name: string;
    image: string | null;
    inventory: number;
    unitsSold: number;
    revenue: number;
  }[];
  lowStock: {
    id: string;
    name: string;
    inventory: number;
    images: string[];
  }[];
  recentOrders: any[];
};

const fetchAdminStats = async (): Promise<AdminStats> => {
  const res = await AxiosClient.get("/stats/admin");
  return res.data.data;
};

const fetchVendorStats = async (): Promise<VendorStats> => {
  const res = await AxiosClient.get("/stats/vendor");
  return res.data.data;
};

export const useAdminStats = () =>
  useQuery<AdminStats, Error>({
    queryKey: ["stats-admin"],
    queryFn: fetchAdminStats,
    staleTime: 30_000,
  });

export const useVendorStats = () =>
  useQuery<VendorStats, Error>({
    queryKey: ["stats-vendor"],
    queryFn: fetchVendorStats,
    staleTime: 30_000,
  });
