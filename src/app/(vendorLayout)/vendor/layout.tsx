import VendorSidebar from "@/src/components/shared/vendor/Sidebar/Sidebar";
import type { IChildren } from "@/src/types/global";

const layout = ({ children }: IChildren) => {
  return (
    <div className="relative flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* <TopHeader />
         */}
        {/* <Header /> */}
        {/* <BreadCrumbs /> */}
        <div className="container mx-auto grid grid-cols-12 gap-6 pb-14 mt-8">
          <div className="col-span-3">
            <VendorSidebar />
          </div>
          <div className="col-span-9">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default layout;
