"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Heart,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useVendorStats } from "@/src/hooks/stats";
import { useVendorAdvanceStatus } from "@/src/hooks/order";
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

const NEXT_STATUS: Record<string, { label: string; to: string } | undefined> = {
  PENDING: { label: "Confirm", to: "CONFIRMED" },
  CONFIRMED: { label: "Mark shipped", to: "SHIPPED" },
  SHIPPED: { label: "Mark delivered", to: "DELIVERED" },
  RETURN_REQUESTED: { label: "Accept return", to: "RETURNED" },
};

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

export default function VendorDashboard() {
  const { data, isLoading } = useVendorStats();
  const queryClient = useQueryClient();
  const { mutate: advance, isPending: isAdvancing } = useVendorAdvanceStatus();

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
    shop,
    kpis,
    statusBreakdown,
    monthlyRevenue,
    topProducts,
    lowStock,
    recentOrders,
  } = data;
  const statusItems = Object.entries(statusBreakdown).filter(([, v]) => v > 0);
  const totalStatuses = statusItems.reduce((s, [, v]) => s + v, 0);

  const handleAdvance = (orderId: string, to: string) => {
    advance(
      { id: orderId, status: to },
      {
        onSuccess(d) {
          if (d?.success) {
            queryClient.invalidateQueries({ queryKey: ["stats-vendor"] });
            toast.success(d?.message ?? "Order updated");
          } else {
            toast.error(d?.message ?? "Could not update");
          }
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="col-span-12 lg:col-span-9 space-y-6"
    >
      <header className="rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-orange-800 text-white p-6 md:p-8 overflow-hidden relative">
        <div className="absolute -top-20 -right-16 h-64 w-64 rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-300 mb-2">
              <Store size={11} />
              Vendor overview
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              {shop.shopName}
              <span className="text-orange-400">.</span>
            </h1>
            <p className="text-sm text-white/70 mt-2 max-w-md">
              Real-time snapshot of your shop: revenue, orders, top movers and
              low stock — refreshed every 30s.
            </p>
          </div>
          {shop.shopLogo && (
            <div className="h-20 w-20 rounded-2xl overflow-hidden ring-4 ring-white/15">
              <Image
                src={shop.shopLogo}
                alt={shop.shopName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Revenue"
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
          label="Followers"
          value={compact(kpis.followers)}
          hint="people who follow this shop"
          icon={<Heart size={18} />}
          tone="emerald"
        />
        <KpiCard
          label="Products"
          value={compact(kpis.productCount)}
          hint="active listings"
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
              Last 12 months · your shop only
            </p>
          </div>
        </header>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="vrev" x1="0" y1="0" x2="0" y2="1">
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
                fill="url(#vrev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
          <h2 className="text-base font-semibold text-gray-900">Top sellers</h2>
          <p className="text-xs text-gray-500 mb-3">
            Units sold across the last 12 months
          </p>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-10">
              No sales yet.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {topProducts.map((p: any) => (
                <li key={p.id} className="py-3 flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    {p.image && (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.inventory} in stock
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 tabular-nums">
                      {compact(p.unitsSold)}{" "}
                      <span className="text-xs font-normal text-gray-400">
                        sold
                      </span>
                    </p>
                    <p className="text-[11px] text-gray-500 tabular-nums">
                      {money(p.revenue)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
          <header className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              Low stock
            </h2>
            <Link
              href="/vendor/manage-product"
              className="text-xs font-medium text-orange-600 hover:text-orange-700"
            >
              Manage →
            </Link>
          </header>
          {lowStock.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-10">
              Everything is well stocked.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {lowStock.map((p: any) => (
                <li key={p.id} className="py-3 flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    {p.images?.[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {p.name}
                    </p>
                    <p className="text-xs text-amber-600 font-medium">
                      Only {p.inventory} left
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
        <h2 className="text-base font-semibold text-gray-900">Order status</h2>
        <p className="text-xs text-gray-500 mb-3">
          {totalStatuses} orders across all states
        </p>
        {statusItems.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-10">
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

      <section className="rounded-2xl bg-white ring-1 ring-gray-100 p-5 md:p-6">
        <header className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">
            Recent orders
          </h2>
          <Link
            href="/vendor/order-history"
            className="text-xs font-medium text-orange-600 hover:text-orange-700"
          >
            All orders →
          </Link>
        </header>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-10">
            No orders yet.
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {recentOrders.map((o: any) => {
              const action = NEXT_STATUS[o.status];
              return (
                <li
                  key={o.id}
                  className="py-3 flex items-center gap-3 flex-wrap"
                >
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
                      {o.user?.name ?? o.user?.email} · qty {o.quantity}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                      STATUS_COLOR[o.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {o.status.replace("_", " ")}
                  </span>
                  {action && (
                    <button
                      type="button"
                      onClick={() => handleAdvance(o.id, action.to)}
                      disabled={isAdvancing}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-900 hover:bg-orange-500 disabled:opacity-50 text-white text-xs font-medium px-3 py-1.5 transition"
                    >
                      {action.label}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </motion.div>
  );
}
