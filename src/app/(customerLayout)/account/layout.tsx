"use client";

import { Navbar } from "@/src/components/shared/Header/Navbar";
import UserSidebar from "@/src/components/shared/user/Sidebar/Sidebar";
import { IChildren } from "@/src/types/global";

const AccountLayout = ({ children }: IChildren) => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="grid grid-cols-12 gap-6">
            <UserSidebar />
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountLayout;
