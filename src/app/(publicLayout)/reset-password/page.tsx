"use client";

import config from "@/src/config";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaGreaterThan } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const ResetPassword = () => {
  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { handleSubmit, register } = useForm<{ password: string }>();

  const handleSignIn: SubmitHandler<{ password: string }> = async (data) => {
    setLoading(true);
    const res = await axios.post(
      `${config.base_url}/auth/reset-password`,
      {
        password: data?.password,
        email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const result = res.data;
    if (result?.success) {
      toast.success(result?.message);
      router.push("/login");
    }
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
        <span className="text-lg">Reset Password</span>
      </div>

      <div className="w-full max-w-[500px] mx-auto box_shadow rounded px-[30px] py-[24px] mb-14">
        <h4 className="text-[28px] uppercase font-semibold mb-4">
          Reset Password
        </h4>

        <form onSubmit={handleSubmit(handleSignIn)}>
          <div>
            <div>
              <label htmlFor="email" className="block">
                Password <span className="text-primary">*</span>
              </label>
              <input
                {...register("password", { required: true })}
                className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                type="password"
                placeholder="Enter New Password"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="default_btn rounded w-full hover:bg-white hover:border-rose-500 hover:text-primary"
            >
              {loading ? (
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

export default ResetPassword;
