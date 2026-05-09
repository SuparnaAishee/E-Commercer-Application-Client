"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/src/context/user.provider";
import ProductProvider from "@/src/context/product.provider";
import ChatAssistant from "@/src/components/chat/ChatAssistant";

export interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
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
