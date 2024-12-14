"use client";

import { useUser } from "@/src/context/user.provider";
import { useChangePassword } from "@/src/hooks/auth";
import { logOut } from "@/src/services/Auth";
import { IChangePassword } from "@/src/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const ChangePassword = () => {
  const { setIsUserLoading } = useUser();
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();

  const router = useRouter();
  const { handleSubmit, register } = useForm<IChangePassword>();

  const handleSignIn: SubmitHandler<IChangePassword> = async (data) => {
    if (data?.newPassword !== data?.confirmNewPassword) {
      toast.error("Password did not matched");
    }
    const payload = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };
    changePassword(payload, {
      onSuccess(data) {
        if (data?.success) {
          logOut();
          setIsUserLoading(true);
          toast.success(data?.message);
          router.push("/");
        } else {
          toast.error(data?.message);
        }
      },
      onError(error) {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <div className="py-10 bg-gray-50">
        <div className="w-full max-w-[500px] mx-auto box_shadow rounded px-[30px] py-[24px] mb-14">
          <h4 className="text-[28px] uppercase font-semibold mb-4">
            Change Password
          </h4>

          <form onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <div>
                <label htmlFor="Old Password" className="block">
                  Old Password <span className="text-primary">*</span>
                </label>
                <input
                  {...register("oldPassword", { required: true })}
                  className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                  type="password"
                  placeholder="Enter Old Password"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="newPassword" className="block">
                  New Password <span className="text-primary">*</span>
                </label>
                <input
                  {...register("newPassword", { required: true })}
                  className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                  type="password"
                  placeholder="Enter New Password"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="Confirm Password" className="block">
                  New Password <span className="text-primary">*</span>
                </label>
                <input
                  {...register("confirmNewPassword", { required: true })}
                  className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                  type="password"
                  placeholder="Type Confirm New Password"
                />
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    className="focus:ring-0 text-primary border border-primary focus:bg-primary focus:outline-none"
                    id="save-default"
                  />
                  <label
                    htmlFor="save-default"
                    className="text-sm sm:text-base"
                  >
                    Remember Me
                  </label>
                </div>
                <div>
                  <Link
                    href="/forgot-password"
                    className="text-primary text-sm sm:text-base"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="default_btn rounded w-full hover:bg-white hover:border-rose-500 hover:text-primary"
              >
                {isPending && !isSuccess ? (
                  <span className="flex items-center gap-2 justify-center text-base">
                    <span>Please Wait</span>{" "}
                    <TbFidgetSpinner className="animate-spin" />
                  </span>
                ) : (
                  <span> Continue</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
