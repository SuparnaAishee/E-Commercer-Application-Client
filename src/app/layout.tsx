import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "../lib/Provider";
import { siteConfig } from "@/src/config/site";
import { poppins } from "@/src/config/fonts";
import ScrollToTop from "../components/UI/ScrollToTop/ScrollToTop";
import { getCurrentUser } from "../services/Auth";
import type { IUser } from "../types";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialUser = (await getCurrentUser()) as IUser | null;

  return (
    <html lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          poppins.className
        )}
      >
        <Providers initialUser={initialUser}>
          {children}
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
