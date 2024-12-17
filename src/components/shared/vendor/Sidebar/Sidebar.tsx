"use client";
import { RxHamburgerMenu } from "react-icons/rx";
import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { vendorNavlist } from "@/src/const/vendor.navlist";

const VendorSidebar = () => {
  const [open, setOpen] = useState(false);
  const { user, setIsUserLoading } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
    setIsUserLoading(true);
    router.push("/");
  };

  return (
    <div className="col-span-12 lg:col-span-3 relative">
      <div>
        <div className="box_shadow px-4 py-2 flex gap-5 items-center">
          <div className="w-12 border border-[#E9E4E4] rounded-full p-1">
            <Link href="my-account.html">
              {user?.profilePhoto && (
                <Image
                  height={100}
                  width={100}
                  loading="lazy"
                  src={user?.profilePhoto}
                  alt="user"
                />
              )}
            </Link>
          </div>

          <div className="acprof_cont">
            <p>Hello,</p>
            <h4>{user?.name}</h4>
          </div>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex ml-auto border border-primary -mt-2 rounded  p-1 lg:hidden"
          >
            <RxHamburgerMenu />
          </button>
        </div>

        <div
          className={`w-[300px] lg:w-full lg:mt-6 box_shadow px-4 py-6 bg-white absolute lg:static lg:visible lg:opacity-100 z-10 transition-all duration-300  ${open ? "opacity-100 visible top-20" : "opacity-0 invisible top-0"}`}
        >
          {vendorNavlist?.map((list, i) => {
            return (
              <div key={i} className="border-b mt-2">
                <p className="flex gap-2 items-center text-lg lg:text-base xl:text-lg font-medium  group">
                  <span>
                    <CiBoxList />
                  </span>
                  {list?.key}
                </p>
                {list?.children?.map((child) => {
                  return (
                    <Link
                      onClick={() => setOpen(false)}
                      key={child?.path}
                      href={child?.path}
                      className="pl-7 pt-1 block hover:text-primary mb-3"
                    >
                      {child?.text}
                    </Link>
                  );
                })}
              </div>
            );
          })}

          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center text-[18px] font-medium hover:text-primary group"
            >
              <span className="group-hover:text-primary">
                <AiOutlineLogout />
              </span>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSidebar;
