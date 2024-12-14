"use client";

import { AiOutlinePlusCircle } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaGreaterThan } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { TbFidgetSpinner } from "react-icons/tb";
import { toast } from "sonner";
import Image from "next/image";
import { useUserRegister } from "@/src/hooks/auth";
import { useUser } from "@/src/context/user.provider";

const Register = () => {
  const { setIsUserLoading } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const {
    mutate: handleRegisterUser,
    isSuccess,
    isPending,
  } = useUserRegister();
  const router = useRouter();

  const { handleSubmit, register } = useForm();

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
    setIsUserLoading(true);
  };

  /* Handle image set to state */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImage(files[0]);
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
        <span className="text-lg">Register</span>
      </div>

      <div className="w-full max-w-[500px] mx-auto box_shadow rounded px-[30px] py-[24px] mb-14">
        <h4 className="text-[28px] uppercase font-semibold ">
          Create an account
        </h4>
        <p className="mb-4 text_md">Register here if you are a new customer.</p>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div>
            <div>
              <label htmlFor="Full Name" className="block">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                type="string"
                placeholder="Jone Doe"
              />
            </div>
            <div>
              <label htmlFor="Email" className="block">
                Email <span className="text-primary">*</span>
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
            <div className="mt-4">
              <label htmlFor="confirm Password" className="block">
                Confirm Password <span className="text-primary">*</span>
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
                type="password"
                placeholder="type password"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="Role" className="block">
                Role <span className="text-primary">*</span>
              </label>
              <select
                {...register("role", { required: true })}
                className="w-full border border-[#E9E4E4] rounded focus:ring-0 focus:outline-primary mt-1 py-3 px-2"
              >
                <option selected value="USER">
                  User
                </option>
                <option value="VENDOR">Vendor</option>
              </select>
            </div>

            {/* Profile Photo */}
            <div className="mt-4">
              <label htmlFor="Image">
                Profile Photo <span>(optional)</span>
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                name="imageUrl"
                id="upload"
                className="hidden"
                multiple
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3 cursor-pointer"
                    color="#555"
                  />
                </label>
                {image && (
                  <Image
                    height={120}
                    width={120}
                    src={URL.createObjectURL(image)}
                    alt="Image"
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                )}
              </div>
            </div>
            {/* Checkbox */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex gap-3 items-center">
                <input
                  type="checkbox"
                  className="focus:ring-0 text-primary border border-primary focus:bg-primary focus:outline-none"
                  id="save-default"
                />
                <label htmlFor="save-default" className="text-sm sm:text-base">
                  I have read and agree to the{" "}
                  <span className="text-primary"> terms & conditions</span>
                </label>
              </div>
            </div>
          </div>
          {/* Submit Button */}
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
                <span> Create Account</span>
              )}
            </button>
          </div>
        </form>
        {/* Social Login */}
        <div className="flex justify-center mt-4 relative after:absolute after:w-full after:h-[1px] after:bg-gray-300 after:top-3">
          <p className="px-2 bg-white z-10">Or login in with</p>
        </div>

        <div className="flex gap-5 mt-4">
          <button className="default_btn w-full rounded bg-facebook hover:bg-white hover:border-[#3B5999] hover:text-[#3B5999]">
            <i className="fab fa-facebook-f me-2"></i> Facebook
          </button>
          <button className="default_btn w-full bg-google hover:bg-white hover:border-[#D85040] hover:text-[#D85040]">
            <i className="fab fa-google me-2"></i> Google
          </button>
        </div>

        <p className="text-center mt-3 mb-0">
          Already have an account.?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
