/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
"use client";

import type React from "react";

import { useUser } from "@/src/context/user.provider";
import { useUserRegister } from "@/src/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import {
  FaCamera,
  FaEnvelope,
  FaGreaterThan,
  FaLock,
  FaRegUser,
  FaUserPlus,
} from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const { setIsUserLoading } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const {
    mutate: handleRegisterUser,
    isSuccess,
    isPending,
  } = useUserRegister();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  /* Register function */
  const handleRegister: SubmitHandler<FieldValues> = async (data) => {
    const registerCredential = {
      password: data?.password,
      user: {
        name: data?.name,
        role: data?.role,
        email: data?.email,
      },
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(registerCredential));
    if (image) {
      formData.append("file", image);
    }

    handleRegisterUser(formData, {
      onSuccess(data) {
        if (data?.success) {
          setRegisterSuccess(true);

          // Show success animation before redirecting
          setTimeout(() => {
            toast.success(data?.message);
            router.push("/login");
          }, 1500);
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

  /* Handle image set to state */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
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
        <span className="text-gray-600">Register</span>
      </div> */}

      <div className="flex-1 flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {registerSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-[500px] bg-white rounded-2xl shadow-xl overflow-hidden"
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
                  Registration Successful!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 text-center"
                >
                  Your account has been created. Redirecting you to login...
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
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[500px] bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Create an Account
                  </h2>
                  <p className="text-gray-500">
                    Join our community and start shopping
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(handleRegister)}
                  className="space-y-4"
                >
                  {/* Profile Photo */}
                  <div className="flex justify-center mb-2">
                    <div className="relative">
                      {image ? (
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                          <Image
                            fill
                            src={
                              URL.createObjectURL(image) || "/placeholder.svg"
                            }
                            alt="Profile"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-primary/20">
                          <FaRegUser size={32} className="text-gray-400" />
                        </div>
                      )}
                      <label
                        htmlFor="upload"
                        className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition-colors"
                      >
                        <FaCamera size={14} />
                      </label>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        name="imageUrl"
                        id="upload"
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                  </div>

                  {/* Full Name */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaRegUser className="text-gray-400" />
                      </div>
                      <input
                        {...register("name", {
                          required: "Full name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                          },
                        })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.name ? "border-red-300" : "border-gray-200"} rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                        type="text"
                        placeholder="Full Name"
                      />
                    </div>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 ml-1"
                      >
                        {errors.name.message as string}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
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
                        placeholder="Email Address"
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

                  {/* Password */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.password ? "border-red-300" : "border-gray-200"} rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                        type="password"
                        placeholder="Password"
                      />
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

                  {/* Confirm Password */}
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.confirmPassword ? "border-red-300" : "border-gray-200"} rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors`}
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1 ml-1"
                      >
                        {errors.confirmPassword.message as string}
                      </motion.p>
                    )}
                  </div>

                  {/* Role Selection */}
                  <div>
             
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                          watch("role") === "USER"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <input
                          {...register("role")}
                          type="radio"
                          value="USER"
                          className="sr-only"
                          defaultChecked
                        />
                        <span
                          className={`font-medium ${watch("role") === "USER" ? "text-primary" : "text-gray-600"}`}
                        >
                          Customer
                        </span>
                      </label>
                      <label
                        className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-all ${
                          watch("role") === "VENDOR"
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <input
                          {...register("role")}
                          type="radio"
                          value="VENDOR"
                          className="sr-only"
                        />
                        <span
                          className={`font-medium ${watch("role") === "VENDOR" ? "text-primary" : "text-gray-600"}`}
                        >
                          Vendor
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start mt-4">
                    <div className="flex items-center h-5">
                      <input
                        {...register("terms", {
                          required:
                            "You must agree to the terms and conditions",
                        })}
                        id="terms"
                        type="checkbox"
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="terms" className="text-gray-600">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                      {errors.terms && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-1"
                        >
                          {errors.terms.message as string}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isPending}
                    className="w-full py-3 mt-2 bg-primary text-white rounded-lg font-medium shadow-md hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <TbFidgetSpinner className="animate-spin" size={20} />
                        <span>Creating account...</span>
                      </span>
                    ) : (
                      <>
                        <FaUserPlus size={18} />
                        <span>Create Account</span>
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  By creating an account, you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Register;

// "use client";

// import { AiOutlinePlusCircle } from "react-icons/ai";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { FaGreaterThan } from "react-icons/fa";
// import { MdOutlineHome } from "react-icons/md";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { toast } from "sonner";
// import Image from "next/image";
// import { useUserRegister } from "@/src/hooks/auth";
// import { useUser } from "@/src/context/user.provider";

// const Register = () => {
//   const { setIsUserLoading } = useUser();
//   const [image, setImage] = useState<File | null>(null);
//   const {
//     mutate: handleRegisterUser,
//     isSuccess,
//     isPending,
//   } = useUserRegister();
//   const router = useRouter();

//   const { handleSubmit, register } = useForm();

//   /* Register function */
//   const handleRegister: SubmitHandler<FieldValues> = async (data) => {
//     const registerCredential = {
//       password: data?.password,
//       user: {
//         name: data?.name,
//         role: data?.role,
//         email: data?.email,
//       },
//     };

//     const formData = new FormData();
//     formData.append("data", JSON.stringify(registerCredential));
//     if (image) {
//       formData.append("file", image);
//     }
//     handleRegisterUser(formData, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           router.push("/");
//         } else {
//           toast.error(data?.message);
//         }
//       },
//       onError(error) {
//         toast.error(error?.message);
//       },
//     });
//     setIsUserLoading(true);
//   };

//   /* Handle image set to state */
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setImage(files[0]);
//     }
//   };

//   return (
//     <div className="py-10 bg-gray-50">
//       <div className="flex items-center gap-2 container">
//         <MdOutlineHome
//           onClick={() => router.push("/")}
//           size={20}
//           className="text-primary cursor-pointer"
//         />
//         <FaGreaterThan className="" />
//         <span className="text-lg">Register</span>
//       </div>

//       <div className="w-full max-w-[500px] mx-auto box_shadow rounded px-[30px] py-[24px] mb-14">
//         <h4 className="text-[28px] uppercase font-semibold ">
//           Create an account
//         </h4>
//         <p className="mb-4 text_md">Register here if you are a new customer.</p>
//         <form onSubmit={handleSubmit(handleRegister)}>
//           <div>
//             <div>
//               <label htmlFor="Full Name" className="block">
//                 Full Name <span className="text-primary">*</span>
//               </label>
//               <input
//                 {...register("name", { required: true })}
//                 className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
//                 type="string"
//                 placeholder="Jone Doe"
//               />
//             </div>
//             <div>
//               <label htmlFor="Email" className="block">
//                 Email <span className="text-primary">*</span>
//               </label>
//               <input
//                 {...register("email", { required: true })}
//                 className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
//                 type="email"
//                 placeholder="example@mail.com"
//               />
//             </div>
//             <div className="mt-4">
//               <label htmlFor="password" className="block">
//                 Password <span className="text-primary">*</span>
//               </label>
//               <input
//                 {...register("password", { required: true })}
//                 className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
//                 type="password"
//                 placeholder="type password"
//               />
//             </div>
//             <div className="mt-4">
//               <label htmlFor="confirm Password" className="block">
//                 Confirm Password <span className="text-primary">*</span>
//               </label>
//               <input
//                 {...register("confirmPassword", { required: true })}
//                 className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
//                 type="password"
//                 placeholder="type password"
//               />
//             </div>
//             <div className="mt-4">
//               <label htmlFor="Role" className="block">
//                 Role <span className="text-primary">*</span>
//               </label>
//               <select
//                 {...register("role", { required: true })}
//                 className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
//               >
//                 <option selected value="USER">
//                   User
//                 </option>
//                 <option value="VENDOR">Vendor</option>
//               </select>
//             </div>

//             {/* Profile Photo */}
//             <div className="mt-4">
//               <label htmlFor="Image">
//                 Profile Photo <span>(optional)</span>
//               </label>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 name="imageUrl"
//                 id="upload"
//                 className="hidden"
//                 multiple
//               />
//               <div className="w-full flex items-center flex-wrap">
//                 <label htmlFor="upload">
//                   <AiOutlinePlusCircle
//                     size={30}
//                     className="mt-3 cursor-pointer"
//                     color="#555"
//                   />
//                 </label>
//                 {image && (
//                   <Image
//                     height={120}
//                     width={120}
//                     src={URL.createObjectURL(image)}
//                     alt="Image"
//                     className="h-[120px] w-[120px] object-cover m-2"
//                   />
//                 )}
//               </div>
//             </div>
//             {/* Checkbox */}
//             <div className="flex justify-between items-center mt-6">
//               <div className="flex gap-3 items-center">
//                 <input
//                   type="checkbox"
//                   className="focus:ring-0 text-primary border border-primary focus:bg-primary focus:outline-none"
//                   id="save-default"
//                 />
//                 <label htmlFor="save-default" className="text-sm sm:text-base">
//                   I have read and agree to the{" "}
//                   <span className="text-primary"> terms & conditions</span>
//                 </label>
//               </div>
//             </div>
//           </div>
//           {/* Submit Button */}
//           <div className="mt-4">
//             <button
//               type="submit"
//               className="default_btn rounded w-full hover:bg-white hover:border-rose-500 hover:text-primary"
//             >
//               {isPending && !isSuccess ? (
//                 <span className="flex items-center gap-2 justify-center text-base">
//                   <span>Please Wait</span>{" "}
//                   <TbFidgetSpinner className="animate-spin" />
//                 </span>
//               ) : (
//                 <span> Create Account</span>
//               )}
//             </button>
//           </div>
//         </form>
//         {/* Social Login */}
//         <div className="flex justify-center mt-4 relative after:absolute after:w-full after:h-[1px] after:bg-gray-300 after:top-3">
//           <p className="px-2 bg-white z-10">Or login in with</p>
//         </div>

//         <div className="flex gap-5 mt-4">
//           <button className="default_btn w-full rounded bg-facebook hover:bg-white hover:border-[#3B5999] hover:text-[#3B5999]">
//             <i className="fab fa-facebook-f me-2"></i> Facebook
//           </button>
//           <button className="default_btn w-full bg-google hover:bg-white hover:border-[#D85040] hover:text-[#D85040]">
//             <i className="fab fa-google me-2"></i> Google
//           </button>
//         </div>

//         <p className="text-center mt-3 mb-0">
//           Already have an account.?{" "}
//           <Link href="/login" className="text-primary">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
