"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck, Inbox } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import config from "@/src/config";
import {
  type INotification,
  useGetMyNotifications,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
} from "@/src/hooks/notification";
import { useUser } from "@/src/context/user.provider";

const formatWhen = (s: string) => {
  const diff = Date.now() - new Date(s).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(s).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const NotificationBell = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetMyNotifications(Boolean(user?.id));
  const { mutate: markOne } = useMarkNotificationRead();
  const { mutate: markAll } = useMarkAllNotificationsRead();

  const unread = data?.data?.unreadCount ?? 0;
  const items: INotification[] = useMemo(
    () => data?.data?.data ?? [],
    [data],
  );

  // SSE — open a stream that pushes new notifications as they happen.
  useEffect(() => {
    if (!user?.id) return;
    const token = Cookies.get("accessToken");
    if (!token) return;

    const base = config.base_url.replace(/\/+$/, "");
    const url = `${base}/notifications/stream?token=${encodeURIComponent(token)}`;
    const es = new EventSource(url);

    es.onmessage = (evt) => {
      try {
        const payload = JSON.parse(evt.data) as
          | { type: "hello" }
          | { type: "notification"; notification: INotification };
        if (payload.type === "notification") {
          queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
        }
      } catch {
        // ignore malformed events
      }
    };
    es.onerror = () => {
      // EventSource auto-reconnects on transient errors — no-op here.
    };

    return () => {
      es.close();
    };
  }, [user?.id, queryClient]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleItemClick = (n: INotification) => {
    if (!n.isRead) {
      markOne(n.id, {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
        },
      });
    }
    setOpen(false);
  };

  const handleMarkAll = () => {
    markAll(undefined, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
      },
    });
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className="relative flex flex-col items-center gap-1 px-2 transition-transform hover:-translate-y-0.5"
      >
        <span className="relative grid place-items-center h-10 w-10 rounded-full bg-orange-50 text-orange-500 ring-1 ring-orange-100/70 transition-all group-hover:bg-orange-100">
          <Bell size={20} strokeWidth={1.75} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 grid place-items-center min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-semibold leading-none ring-2 ring-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </span>
        <span className="text-[11px] leading-none text-gray-700">Alerts</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] ring-1 ring-gray-100 overflow-hidden"
          >
            <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Notifications
                </p>
                <p className="text-[11px] text-gray-500">
                  {unread > 0 ? `${unread} unread` : "All caught up"}
                </p>
              </div>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAll}
                  className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 hover:text-orange-700"
                >
                  <CheckCheck size={12} />
                  Mark all read
                </button>
              )}
            </header>

            <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
              {items.length === 0 ? (
                <div className="text-center py-10 px-6">
                  <div className="grid place-items-center h-12 w-12 mx-auto rounded-full bg-gray-50 text-gray-400 mb-3">
                    <Inbox size={18} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    No notifications yet
                  </p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Order updates and reviews will land here.
                  </p>
                </div>
              ) : (
                items.map((n) => (
                  <Link
                    key={n.id}
                    href={n.link ?? "#"}
                    onClick={() => handleItemClick(n)}
                    className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition relative ${
                      !n.isRead ? "bg-orange-50/40" : ""
                    }`}
                  >
                    {!n.isRead && (
                      <span
                        aria-hidden
                        className="absolute left-1.5 top-4 h-2 w-2 rounded-full bg-orange-500"
                      />
                    )}
                    <div className="flex-1 min-w-0 pl-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {n.title}
                      </p>
                      {n.body && (
                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                          {n.body}
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatWhen(n.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
