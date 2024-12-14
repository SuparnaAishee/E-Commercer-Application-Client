"use client";

import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaGreaterThan } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";

const Login = () => {
  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const { setIsUserLoading, user } = useUser();
  const router = useRouter();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      // email: "web@hero.com",
      // password: "ph-password",
      email: "jiinat@gmail.com",
      password: "jiinat",
      // email: "sabbirshnt@gmail.com",
      // password: "1111",
    },
  });

  const handleSignIn: SubmitHandler<FieldValues> = async (data) => {
    handleLogin(data, {
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
    setIsUserLoading(true);
  };

  useEffect(() => {
    if (user && user?.role) {
      if (user?.role === "ADMIN") {
        router.push("/admin");
      } else if (user?.role === "VENDOR") {
        router.push("/vendor");
      } else {
        router.push("/");
      }
    }
  }, [user]);
  return (
    <div className="py-10 bg-gray-50">
      <div className="flex items-center gap-2 container">
        <MdOutlineHome
          onClick={() => router.push("/")}
          size={20}
          className="text-primary cursor-pointer"
        />
        <FaGreaterThan className="" />
        <span className="text-lg">Login</span>
      </div>

      <div className="w-full max-w-[500px] mx-auto box_shadow rounded px-[30px] py-[24px] mb-14">
        <h4 className="text-[28px] uppercase font-semibold mb-4">Login</h4>

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
            <div className="mt-4">
              <label htmlFor="password" className="block">
                Password <span className="text-primary">*</span>
              </label>
              <input
                {...register("password", { required: true })}
                className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                type="password"
                placeholder="type password"
              />
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-3 items-center">
                <input
                  defaultChecked
                  type="checkbox"
                  className="focus:ring-0 text-primary border border-primary focus:bg-primary focus:outline-none"
                  id="save-default"
                />
                <label htmlFor="save-default" className="text-sm sm:text-base">
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
                <span> Login</span>
              )}
            </button>
          </div>
        </form>

        {/* <div className="flex justify-center mt-4 relative after:absolute after:w-full after:h-[1px] after:bg-gray-300 after:top-3">
          <p className="px-2 bg-white z-10">Or login in with</p>
        </div>

        <div className="flex gap-5 mt-4">
          <button className="default_btn w-full rounded bg-facebook hover:bg-white hover:border-[#3B5999] hover:text-[#3B5999]">
            <i className="fab fa-facebook-f me-2"></i> Facebook
          </button>
          <button className="default_btn w-full bg-google hover:bg-white hover:border-[#D85040] hover:text-[#D85040]">
            <i className="fab fa-google me-2"></i> Google
          </button>
        </div> */}

        <p className="text-center mt-3 mb-0">
          {"Don't"} have an account.?{" "}
          <Link href="/register" className="text-primary">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
