"use client";

import Header from "@/src/components/shared/Header/Header";
import TopHeader from "@/src/components/shared/Header/TopHeader";
import BreadCrumbs from "@/src/components/shared/user/BreadCrumbs/BreadCrumbs";
import UserSidebar from "@/src/components/shared/user/Sidebar/Sidebar";
import { IChildren } from "@/src/types/global";
import React from "react";

const AccountPayout = ({ children }: IChildren) => {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="flex-grow">
        <TopHeader />
        <Header />
        <BreadCrumbs />
        <div className="container grid grid-cols-12 gap-6 pb-14">
          <UserSidebar />
          {children}
        </div>
      </main>
    </div>
  );
};

export default AccountPayout;
