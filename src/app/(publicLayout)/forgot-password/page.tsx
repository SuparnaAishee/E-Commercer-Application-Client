"use client";

import { useForgotPassword } from "@/src/hooks/auth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGreaterThan } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const ForgotPassword = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();
  const router = useRouter();
  const { handleSubmit, register } = useForm<{ email: string }>();

  const handleSignIn: SubmitHandler<{ email: string }> = async (data) => {
    forgotPassword(data, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
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
    <div className="py-10 bg-gray-50">
      <div className="flex items-center gap-2 container">
        <MdOutlineHome
          onClick={() => router.push("/")}
          size={20}
          className="text-primary cursor-pointer"
        />
        <FaGreaterThan className="" />
        <span className="text-lg">Forgot Password</span>
      </div>

      <div className="w-full max-w-[500px] mx-auto box_shadow rounded px-[30px] py-[24px] mb-14">
        <h4 className="text-[28px] uppercase font-semibold mb-4">
          Forgot Password
        </h4>

        <form onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <div>
              <label htmlFor="email" className="block">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                {...register("email", { required: true })}
                className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                type="email"
                placeholder="example@mail.com"
              />
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
  );
};

export default ForgotPassword;
