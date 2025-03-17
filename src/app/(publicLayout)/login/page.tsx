"use client";

import { useUser } from "@/src/context/user.provider";
import { useUserLogin } from "@/src/hooks/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { FaGreaterThan, FaLock, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [inputType, setInputType] = useState<"password" | "text">("password");
  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const { setIsUserLoading, user } = useUser();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSignIn: SubmitHandler<FieldValues> = async (data) => {
    handleLogin(data, {
      onSuccess(data) {
        if (data?.success) {
          setIsUserLoading(true);
          setLoginSuccess(true);

          // Show success animation before redirecting
          setTimeout(() => {
            toast.success(data?.message);
            router.push("/");
          }, 1500);
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
    <div className="py-10 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col">
      {/* <div className="flex items-center gap-2 container mb-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
        >
          <MdOutlineHome size={20} />
          <span>Home</span>
        </button>
        <FaGreaterThan className="text-xs text-gray-400" />
        <span className="text-gray-600">Login</span>
      </div> */}

      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {loginSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  Welcome Back!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 text-center"
                >
                  Login successful. Redirecting you to your dashboard...
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="w-full mt-8 flex justify-center"
                >
                  <div className="w-12 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[450px] bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-500">
                    Sign in to continue to your account
                  </p>
                </div>

                <div className="mb-6">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() =>
                        reset({
                          email: "ari@gmail.com",
                          password: "a12345",
                        })
                      }
                      className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      User
                    </button>
                    <button
                      onClick={() =>
                        reset({
                          email: "aishee@gmail.com",
                          password: "a12345",
                        })
                      }
                      className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      Vendor
                    </button>
                    <button
                      onClick={() =>
                        reset({
                          email: "suparnad806@gmail.com",
                          password: "admin123",
                        })
                      }
                      className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      Admin
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit(handleSignIn)}
                  className="space-y-5"
                >
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? "border-red-300" : "border-gray-200"} rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                        type="email"
                        placeholder="Email address"
                      />
                    </div>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 ml-1"
                      >
                        {errors.email.message as string}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 5,
                            message: "Password must be at least 5 characters",
                          },
                        })}
                        className={`w-full pl-10 pr-12 py-3 bg-gray-50 border ${errors.password ? "border-red-300" : "border-gray-200"} rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                        type={inputType}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setInputType(
                            inputType === "password" ? "text" : "password"
                          )
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {inputType === "password" ? (
                          <IoMdEyeOff size={20} />
                        ) : (
                          <IoMdEye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 ml-1"
                      >
                        {errors.password.message as string}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isPending}
                    className="w-full py-3 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        
                        <span>Signing in...</span>
                      </span>
                    ) : (
                      <>
                        
                        <span>Sign In</span>
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  By signing in, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;
