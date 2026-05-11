"use client";

import AdminSidebar from "@/src/components/shared/admin/Sidebar/Sidebar";
import { IChildren } from "@/src/types/global";

const layout = ({ children }: IChildren) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="lg:pl-72">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
