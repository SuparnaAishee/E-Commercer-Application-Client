"use client";


import AdminSidebar from "@/src/components/shared/admin/Sidebar/Sidebar";

import { IChildren } from "@/src/types/global";
import React from "react";

const layout = ({ children }: IChildren) => {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="flex-grow">
        {/* <TopHeader />
        <Header /> */}
        {/* <BreadCrumbs /> */}
        <div className="container grid grid-cols-12 gap-6 pb-14">
          <AdminSidebar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
