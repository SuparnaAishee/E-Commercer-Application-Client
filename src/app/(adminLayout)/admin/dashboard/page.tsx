"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  DollarSign,
  Package,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import { useAdminStats } from "@/src/hooks/stats";
import { Skeleton, StatsRowSkeleton } from "@/src/components/UI/Skeleton";

const STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-indigo-100 text-indigo-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-gray-100 text-gray-600",
  RETURN_REQUESTED: "bg-rose-100 text-rose-700",
  RETURNED: "bg-rose-100 text-rose-700",
};

const PIE_COLORS = [
  "#f97316",
  "#fb923c",
  "#fbbf24",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#94a3b8",
];

const compact = (n: number) =>
  new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

const money = (n: number) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

const Trend = ({ value }: { value: number }) => {
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium ${
        up ? "text-emerald-600" : "text-rose-600"
      }`}
    >
      {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(value).toFixed(1)}%
    </span>
  );
};

const KpiCard = ({
  label,
  value,
  delta,
  hint,
  icon,
  tone = "orange",
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon: React.ReactNode;
  tone?: "orange" | "blue" | "emerald" | "purple";
}) => {
  const toneClass = {
    orange: "bg-orange-50 text-orange-500 ring-orange-100",
    blue: "bg-blue-50 text-blue-500 ring-blue-100",
    emerald: "bg-emerald-50 text-emerald-500 ring-emerald-100",
    purple: "bg-violet-50 text-violet-500 ring-violet-100",
  }[tone];
  return (
    <div className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 hover:shadow-[0_18px_40px_-25px_rgba(0,0,0,0.15)] transition-shadow">
      <div className="flex items-start justify-between">
        <span
          className={`grid place-items-center h-10 w-10 rounded-full ring-1 ${toneClass}`}
        >
          {icon}
        </span>
        {delta !== undefined && <Trend value={delta} />}
      </div>
      <p className="text-xs uppercase tracking-[0.16em] text-gray-400 mt-4">
        {label}
      </p>
      <p className="text-2xl md:text-3xl font-semibold text-gray-900 tabular-nums mt-1">
        {value}
      </p>
      {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
    </div>
  );
};

export default function AdminDashboard() {
  const { data, isLoading } = useAdminStats();

  if (isLoading || !data) {
    return (
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <StatsRowSkeleton count={4} />
        <Skeleton className="h-80 w-full" rounded="2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-72 w-full" rounded="2xl" />
          <Skeleton className="h-72 w-full" rounded="2xl" />
        </div>
      </div>
    );
  }

  const {
    kpis,
    statusBreakdown,
    monthlyRevenue,
    revenueByCategory,
    topShops,
    recentOrders,
  } = data;
  const statusItems = Object.entries(statusBreakdown).filter(([, v]) => v > 0);
  const totalStatuses = statusItems.reduce((s, [, v]) => s + v, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="col-span-12 lg:col-span-9 space-y-6"
    >
      <header>
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-orange-600 mb-2">
          <Bell size={11} />
          Admin overview
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          Operations dashboard
          <span className="text-orange-500">.</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Live numbers across every shop, customer, and order.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total revenue"
          value={money(kpis.totalRevenue)}
          delta={kpis.revenueGrowthPct}
          hint="paid orders, week over week"
          icon={<DollarSign size={18} />}
          tone="orange"
        />
        <KpiCard
          label="Orders"
          value={compact(kpis.totalOrders)}
          delta={kpis.ordersGrowthPct}
          hint="all time"
          icon={<ShoppingBag size={18} />}
          tone="blue"
        />
        <KpiCard
          label="Customers"
          value={compact(kpis.totalCustomers)}
          delta={kpis.customersGrowthPct}
          hint="user accounts"
          icon={<Users size={18} />}
          tone="emerald"
        />
        <KpiCard
          label="Products listed"
          value={compact(kpis.totalProducts)}
          hint={`${kpis.productsAddedThisWeek} added this week`}
          icon={<Package size={18} />}
          tone="purple"
        />
      </div>

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Revenue trend
            </h2>
            <p className="text-xs text-gray-500">
              Last 12 months · paid orders
            </p>
          </div>
        </header>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                stroke="#e5e7eb"
              />
              <YAxis
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                stroke="#e5e7eb"
                tickFormatter={(v) => money(Number(v))}
                width={70}
              />
              <RTooltip
                formatter={(v: number) => money(v)}
                contentStyle={{ borderRadius: 12, border: "1px solid #f3f4f6" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#rev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6 lg:col-span-1">
          <h2 className="text-base font-semibold text-gray-900">
            Revenue by category
          </h2>
          <p className="text-xs text-gray-500 mb-2">Last 12 months</p>
          {revenueByCategory.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-12">
              No category sales yet.
            </p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <RTooltip formatter={(v: number) => money(v)} />
                  <Pie
                    data={revenueByCategory}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={56}
                    outerRadius={88}
                    stroke="none"
                  >
                    {revenueByCategory.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6 lg:col-span-2">
          <h2 className="text-base font-semibold text-gray-900">
            Order status
          </h2>
          <p className="text-xs text-gray-500 mb-3">
            {totalStatuses} orders across all states
          </p>
          {statusItems.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-12">
              No orders yet.
            </p>
          ) : (
            <div className="space-y-2.5">
              {statusItems.map(([label, value]) => {
                const pct = totalStatuses ? (value / totalStatuses) * 100 : 0;
                return (
                  <div key={label}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                          STATUS_COLOR[label] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {label.replace("_", " ")}
                      </span>
                      <span className="text-gray-500 tabular-nums">
                        {value} · {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
        <header className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <Store size={16} className="text-orange-500" />
              Top shops by order volume
            </h2>
            <p className="text-xs text-gray-500">
              Showing top {topShops.length}
            </p>
          </div>
          <Link
            href="/admin/manage-shop"
            className="text-xs font-medium text-orange-600 hover:text-orange-700"
          >
            Manage shops →
          </Link>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100">
              <tr>
                <th className="text-left py-2 font-medium">Shop</th>
                <th className="text-right py-2 font-medium tabular-nums">
                  Orders
                </th>
                <th className="text-right py-2 font-medium tabular-nums">
                  Products
                </th>
                <th className="text-right py-2 font-medium tabular-nums">
                  Followers
                </th>
              </tr>
            </thead>
            <tbody>
              {topShops.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="py-3 font-medium text-gray-900">
                    {s.shopName}
                  </td>
                  <td className="py-3 text-right tabular-nums">{s.orders}</td>
                  <td className="py-3 text-right tabular-nums">{s.products}</td>
                  <td className="py-3 text-right tabular-nums text-gray-500">
                    {compact(s.followers)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
        <header className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">
            Recent orders
          </h2>
          <Link
            href="/admin/manage-order"
            className="text-xs font-medium text-orange-600 hover:text-orange-700"
          >
            All orders →
          </Link>
        </header>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-12">
            No orders yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentOrders.map((o: any) => (
              <li key={o.id} className="py-3 flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  {o.product?.images?.[0] && (
                    <Image
                      src={o.product.images[0]}
                      alt={o.product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {o.product?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {o.user?.name ?? o.user?.email} · {o.shop?.shopName}
                  </p>
                </div>
                <span
                  className={`hidden sm:inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    STATUS_COLOR[o.status] ?? "bg-gray-100 text-gray-600"
                  }`}
                >
                  {o.status.replace("_", " ")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </motion.div>
  );
}
