"use client";

import Header from "@/src/components/shared/Header/Header";
import TopHeader from "@/src/components/shared/Header/TopHeader";
import BreadCrumbs from "@/src/components/shared/vendor/BreadCrumbs/BreadCrumbs";
import VendorSidebar from "@/src/components/shared/vendor/Sidebar/Sidebar";
import { IChildren } from "@/src/types/global";
import React from "react";

const layout = ({ children }: IChildren) => {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="flex-grow">
        <TopHeader />
        <Header />
        <BreadCrumbs />
        <div className="container grid grid-cols-12 gap-6 pb-14">
          <VendorSidebar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
