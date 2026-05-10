"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";
import {
  Truck,
  Package,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  Undo2,
  Receipt,
  ShoppingBag,
} from "lucide-react";

import AddReviewToProduct from "@/src/components/modal/user/AddReviewToProduct";
import { OrderListSkeleton } from "@/src/components/UI/Skeleton";
import { limit } from "@/src/const/const";
import {
  useCancelMyOrder,
  useDeleteMyOrder,
  useGetMyOrder,
  useRequestOrderReturn,
} from "@/src/hooks/order";
import { calculateDiscount } from "@/src/utils/calculateDiscount";
import type { IOrder, IOrderStatus } from "@/src/types";

type TabKey =
  | "all"
  | "to-pay"
  | "to-ship"
  | "shipped"
  | "to-review"
  | "returns"
  | "cancelled";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "all", label: "All", icon: <Receipt size={14} /> },
  { key: "to-pay", label: "To Pay", icon: <Clock size={14} /> },
  { key: "to-ship", label: "To Ship", icon: <Package size={14} /> },
  { key: "shipped", label: "Shipped", icon: <Truck size={14} /> },
  { key: "to-review", label: "To Review", icon: <Star size={14} /> },
  { key: "returns", label: "Returns", icon: <Undo2 size={14} /> },
  { key: "cancelled", label: "Cancelled", icon: <XCircle size={14} /> },
];

const statusMatches = (order: IOrder, tab: TabKey): boolean => {
  switch (tab) {
    case "all":
      return true;
    case "to-pay":
      return order.status === "PENDING" && !order.isPaid;
    case "to-ship":
      return order.status === "CONFIRMED" || (order.status === "PENDING" && order.isPaid);
    case "shipped":
      return order.status === "SHIPPED";
    case "to-review":
      return (
        (order.status === "DELIVERED" || order.status === "COMPLETED") &&
        !order.isReviewed
      );
    case "returns":
      return order.status === "RETURN_REQUESTED" || order.status === "RETURNED";
    case "cancelled":
      return order.status === "CANCELLED";
  }
};

const STATUS_STYLE: Record<
  IOrderStatus,
  { label: string; className: string; icon: React.ReactNode }
> = {
  PENDING: {
    label: "Pending payment",
    className: "bg-amber-50 text-amber-700 ring-amber-100",
    icon: <Clock size={11} />,
  },
  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 ring-blue-100",
    icon: <CheckCircle2 size={11} />,
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    icon: <Truck size={11} />,
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    icon: <Package size={11} />,
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    icon: <CheckCircle2 size={11} />,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-gray-100 text-gray-600 ring-gray-200",
    icon: <XCircle size={11} />,
  },
  RETURN_REQUESTED: {
    label: "Return requested",
    className: "bg-rose-50 text-rose-700 ring-rose-100",
    icon: <Undo2 size={11} />,
  },
  RETURNED: {
    label: "Returned",
    className: "bg-rose-50 text-rose-700 ring-rose-100",
    icon: <Undo2 size={11} />,
  },
};

const formatDate = (s?: string) => {
  if (!s) return "";
  return new Date(s).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const computeLineTotal = (order: IOrder) => {
  if (order.discountedPrice) return order.discountedPrice;
  const p = order.product?.price ?? 0;
  if (order.product?.isFlashSale && order.product?.discount_percentage) {
    return (
      calculateDiscount(p, order.product.discount_percentage) * order.quantity
    );
  }
  return p * order.quantity;
};

const OrderHistory = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const { data, refetch, isLoading } = useGetMyOrder([
    { name: "limit", value: 50 },
    { name: "page", value: page },
  ]);
  const { mutate: deleteOrder } = useDeleteMyOrder();
  const { mutate: cancelOrder } = useCancelMyOrder();
  const { mutate: requestReturn } = useRequestOrderReturn();

  const orders = data?.data ?? [];

  const counts = useMemo(() => {
    const out: Record<TabKey, number> = {
      all: orders.length,
      "to-pay": 0,
      "to-ship": 0,
      shipped: 0,
      "to-review": 0,
      returns: 0,
      cancelled: 0,
    };
    for (const o of orders) {
      for (const tab of TABS) {
        if (tab.key !== "all" && statusMatches(o, tab.key)) out[tab.key]++;
      }
    }
    return out;
  }, [orders]);

  const visible = orders.filter((o) => statusMatches(o, activeTab));

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["my-order"] });
    refetch();
  };

  const handleCancel = (id: string) => {
    Swal.fire({
      title: "Cancel this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Cancel order",
    }).then((r) => {
      if (!r.isConfirmed) return;
      cancelOrder(id, {
        onSuccess(d) {
          if (d?.success) {
            invalidate();
            toast.success(d?.message ?? "Order cancelled");
          } else {
            toast.error(d?.message ?? "Could not cancel");
          }
        },
      });
    });
  };

  const handleReturn = (id: string) => {
    Swal.fire({
      title: "Request a return?",
      text: "We'll let the vendor know and arrange a pickup.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Request return",
    }).then((r) => {
      if (!r.isConfirmed) return;
      requestReturn(id, {
        onSuccess(d) {
          if (d?.success) {
            invalidate();
            toast.success(d?.message ?? "Return requested");
          } else {
            toast.error(d?.message ?? "Could not request return");
          }
        },
      });
    });
  };

  const handleDelete = (id: string) => {
    deleteOrder(id, {
      onSuccess(d) {
        if (d?.success) {
          invalidate();
          toast.success(d?.message ?? "Order removed");
        } else {
          toast.error(d?.message ?? "Could not remove");
        }
      },
    });
  };

  return (
    <div className="col-span-12 lg:col-span-9 space-y-5">
      <header>
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-orange-600 mb-2">
          <ShoppingBag size={11} />
          My orders
        </p>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">
          Track every purchase
          <span className="text-orange-500">.</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {isLoading ? "Loading…" : `${orders.length} orders in your history`}
        </p>
      </header>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="flex items-center gap-2 min-w-max">
          {TABS.map((tab) => {
            const count = counts[tab.key];
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 ring-1 ring-gray-200 hover:ring-orange-300 hover:text-orange-700"
                }`}
              >
                {tab.icon}
                {tab.label}
                <span
                  className={`text-[10px] font-semibold rounded-full px-1.5 py-0.5 tabular-nums ${
                    active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isLoading && <OrderListSkeleton count={3} />}

      {!isLoading && visible.length === 0 && (
        <div className="rounded-2xl bg-white ring-1 ring-gray-100 p-12 text-center">
          <div className="grid place-items-center h-14 w-14 mx-auto rounded-full bg-orange-50 text-orange-500 mb-4">
            <ShoppingBag size={20} />
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-1">
            Nothing here yet
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {activeTab === "all"
              ? "Orders you place will show up here."
              : `No orders match the "${TABS.find((t) => t.key === activeTab)?.label}" filter.`}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 transition"
          >
            Continue shopping
          </Link>
        </div>
      )}

      <AnimatePresence>
        {visible.map((order) => {
          const style = STATUS_STYLE[order.status] ?? STATUS_STYLE.PENDING;
          const lineTotal = computeLineTotal(order);
          const canCancel =
            order.status === "PENDING" || order.status === "CONFIRMED";
          const canReturn =
            order.status === "DELIVERED" || order.status === "COMPLETED";
          const canReview =
            (order.status === "DELIVERED" || order.status === "COMPLETED") &&
            !order.isReviewed;
          const canDelete =
            order.status === "CANCELLED" || order.status === "RETURNED";

          return (
            <motion.article
              key={order.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl bg-white ring-1 ring-gray-100 hover:ring-orange-200 hover:shadow-[0_18px_40px_-25px_rgba(0,0,0,0.15)] transition-all p-5"
            >
              <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>
                    Order #{order.transactionId?.slice(-8) ?? order.id.slice(-8)}
                  </span>
                  <span className="text-gray-300">·</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full ring-1 px-2.5 py-0.5 text-[11px] font-medium ${style.className}`}
                >
                  {style.icon}
                  {style.label}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/products/${order.productId}`}
                  className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50"
                >
                  {order.product?.images?.[0] && (
                    <Image
                      src={order.product.images[0]}
                      alt={order.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  )}
                </Link>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${order.productId}`}
                    className="font-medium text-gray-900 hover:text-orange-600 transition line-clamp-1"
                  >
                    {order.product?.name}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {order.shop?.shopName ?? "Shop"} · Qty {order.quantity}
                  </p>
                  {order.shippingAddress && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      Ship to: {order.shippingAddress}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-semibold text-gray-900 tabular-nums">
                    ${lineTotal.toFixed(2)}
                  </p>
                </div>
              </div>

              <footer className="mt-4 flex flex-wrap items-center justify-end gap-2">
                {canReview && (
                  <AddReviewToProduct productId={order.productId} />
                )}
                {canReturn && (
                  <button
                    type="button"
                    onClick={() => handleReturn(order.id)}
                    className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-medium px-3.5 py-1.5 transition"
                  >
                    <Undo2 size={12} />
                    Request return
                  </button>
                )}
                {canCancel && (
                  <button
                    type="button"
                    onClick={() => handleCancel(order.id)}
                    className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-medium px-3.5 py-1.5 transition"
                  >
                    <XCircle size={12} />
                    Cancel order
                  </button>
                )}
                {canDelete && (
                  <button
                    type="button"
                    onClick={() => handleDelete(order.id)}
                    className="inline-flex items-center gap-1.5 rounded-full ring-1 ring-gray-200 text-gray-500 hover:text-rose-600 hover:ring-rose-200 text-xs font-medium px-3.5 py-1.5 transition"
                  >
                    Remove from history
                  </button>
                )}
                <Link
                  href={`/products/${order.productId}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 hover:bg-orange-500 text-white text-xs font-medium px-3.5 py-1.5 transition"
                >
                  Buy again
                </Link>
              </footer>
            </motion.article>
          );
        })}
      </AnimatePresence>

      {!isLoading && visible.length > 0 && data?.meta?.total
        ? data.meta.total > limit && null
        : null}
    </div>
  );
};

export default OrderHistory;
