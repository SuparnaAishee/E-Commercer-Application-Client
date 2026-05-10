"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/src/context/user.provider";
import ProductProvider from "@/src/context/product.provider";
import ChatAssistant from "@/src/components/chat/ChatAssistant";
import type { IUser } from "@/src/types";

export interface ProvidersProps {
  children: React.ReactNode;
  initialUser?: IUser | null;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children, initialUser = null }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider initialUser={initialUser}>
        <ProductProvider>
          <NextUIProvider navigate={router.push}>
            <Toaster />
            {children}
            <ChatAssistant />
          </NextUIProvider>
        </ProductProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
