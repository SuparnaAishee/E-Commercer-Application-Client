/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import type React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { logOut } from "@/src/services/Auth";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useUpdateProfile } from "@/src/hooks/profile";

export default function UpdateProfile() {
  const { user } = useUser();
  const router = useRouter();
  const { setIsUserLoading } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
  });

  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
      });
    }
  }, [user, reset]);

  // Clear form status after a delay
  useEffect(() => {
    if (formStatus !== "idle") {
      const timer = setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleUpdateProfile: SubmitHandler<FieldValues> = (value) => {
    setIsSubmitting(true);
    const payload = { name: value?.name };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    if (image) {
      formData.append("file", image);
    }

    updateProfile(formData, {
      onSuccess(data) {
        if (data?.success) {
          setFormStatus("success");
          toast.success(data?.message);

          // Delay logout to show success animation
          setTimeout(() => {
            logOut();
            setIsUserLoading(true);
            reset();
            setImage(null);
            setPreviewUrl(null);
            router.push("/login");
            onClose();
          }, 1500);
        } else {
          setFormStatus("error");
          toast.error(data?.message);
          setIsSubmitting(false);
        }
      },
      onError() {
        setFormStatus("error");
        toast.error("An error occurred. Please try again.");
        setIsSubmitting(false);
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-gray-300 text-black hover:bg-gray-400 transition-all"
        startContent={<Camera size={18} />}
      >
        Update Profile
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        classNames={{
          base: "bg-white dark:bg-gray-900 rounded-lg shadow-lg",
          header: "border-b border-gray-200 dark:border-gray-700",
          body: "py-6",
          footer: "border-t border-gray-200 dark:border-gray-700",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Update Profile
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Change your profile information
                </p>
              </ModalHeader>

              <ModalBody>
                <div className="space-y-6">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <Input
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      label="Name"
                      placeholder="Enter your name"
                      variant="bordered"
                      color={errors.name ? "danger" : "default"}
                      errorMessage={errors.name?.message?.toString()}
                      isInvalid={!!errors.name}
                      startContent={
                        <span className="text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </span>
                      }
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label
                      htmlFor="image"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Profile Photo
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                    />

                    <div
                      className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
                        isDragging
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-gray-300 dark:border-gray-700 hover:border-orange-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {previewUrl ? (
                        <div className="relative">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative mx-auto rounded-lg overflow-hidden"
                            style={{ maxWidth: "240px" }}
                          >
                            <Image
                              src={previewUrl || "/placeholder.svg"}
                              alt="Profile preview"
                              width={240}
                              height={240}
                              className="object-cover mx-auto rounded-lg"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                              aria-label="Remove image"
                            >
                              <X size={16} />
                            </motion.button>
                          </motion.div>
                        </div>
                      ) : (
                        <div
                         
                          onClick={triggerFileInput}
                          className="flex flex-col items-center justify-center py-6 cursor-pointer"
                        >
                          <Upload className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            <span className="font-medium text-orange-500">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            PNG, JPG, GIF or WebP (max. 5MB)
                          </p>
                          {user?.profilePhoto && !previewUrl && (
                            <div className="mt-4 text-center">
                              <p className="text-xs text-gray-500 mb-2">
                                Current profile photo:
                              </p>
                              <Image
                                src={user.profilePhoto || "/placeholder.svg"}
                                alt="Current profile"
                                width={80}
                                height={80}
                                className="rounded-full mx-auto border-2 border-gray-200"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-medium"
                >
                  Cancel
                </Button>

                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle size={18} />
                      <span>Profile Updated!</span>
                    </motion.div>
                  ) : formStatus === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <AlertCircle size={18} />
                      <span>Update Failed</span>
                    </motion.div>
                  ) : (
                    <motion.div key="button">
                      <Button
                        type="submit"
                        className={`${
                          isPending || isSubmitting
                            ? "bg-orange-400"
                            : "bg-orange-500 hover:bg-orange-600"
                        } text-white font-medium transition-all`}
                        disabled={
                          isPending || isSubmitting || (!isDirty && !image)
                        }
                      >
                        {isPending || isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Update Profile
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
// } from "@nextui-org/react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { useUpdateProfile } from "@/src/hooks/profile";
// import { logOut } from "@/src/services/Auth";
// import { useUser } from "@/src/context/user.provider";
// import { useRouter } from "next/navigation";
// import { TbFidgetSpinner } from "react-icons/tb";

// export default function UpdateProfile() {
//   const { user } = useUser();
//   const router = useRouter();
//   const { setIsUserLoading } = useUser();
//   const { handleSubmit, register, reset } = useForm();
//   const [image, setImage] = useState<File | null>(null);
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

//   const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();

//   const handleUpdateProfile: SubmitHandler<FieldValues> = (value) => {
//     const payload = { name: value?.name };
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(payload));
//     if (image) {
//       formData.append("file", image);
//     }
//     updateProfile(formData, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           logOut();
//           setIsUserLoading(true);
//           reset();
//           setImage(null);
//           router.push("/login");
//           onClose();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setImage(files[0]);
//     }
//   };

//   useEffect(() => {
//     reset({
//       name: user?.name,
//     });
//   }, [user]);

//   return (
//     <>
//       <Button onPress={onOpen}>Update Profile</Button>

//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <ModalContent>
//           {(onClose) => (
//             <form onSubmit={handleSubmit(handleUpdateProfile)}>
//               <ModalHeader className="flex flex-col gap-1">
//                 Update Profile
//               </ModalHeader>
//               <ModalBody>
//                 <Input
//                   {...register("name", { required: true })}
//                   label="Name"
//                   placeholder="Enter Name"
//                   variant="bordered"
//                 />

//                 <div className="mt-4">
//                   <label htmlFor="Image" className="text-xs">
//                     Profile Photo
//                   </label>
//                   <input
//                     type="file"
//                     onChange={handleImageChange}
//                     name="imageUrl"
//                     id="upload"
//                     className="hidden"
//                     multiple
//                   />
//                   <div className="w-full flex items-center flex-wrap">
//                     <label htmlFor="upload">
//                       <AiOutlinePlusCircle
//                         size={30}
//                         className="mt-3 cursor-pointer"
//                         color="#555"
//                       />
//                     </label>
//                     {image && (
//                       <Image
//                         height={120}
//                         width={120}
//                         src={URL.createObjectURL(image)}
//                         alt="Image"
//                         className="h-[120px] w-[120px] object-cover m-2"
//                       />
//                     )}
//                   </div>
//                 </div>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="flat" onPress={onClose}>
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="bg-orange-500 text-white hover:bg-orange-600"
//                 >
//                   {isPending && !isSuccess ? (
//                     <span className="flex items-center gap-2 justify-center text-base">
//                       <span>Please Wait</span>{" "}
//                       <TbFidgetSpinner className="animate-spin" />
//                     </span>
//                   ) : (
//                     <span> Update</span>
//                   )}
//                 </Button>
//               </ModalFooter>
//             </form>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
