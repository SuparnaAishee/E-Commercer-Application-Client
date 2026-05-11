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
  Textarea,
} from "@nextui-org/react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { logOut } from "@/src/services/Auth";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "@/src/lib/AxiosClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  User as UserIcon,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { useGetMyProfile, useUpdateProfile } from "@/src/hooks/profile";

type FormValues = {
  name: string;
  phone: string;
  address: string;
  description: string;
};

export default function UpdateProfile() {
  const { user, setIsUserLoading } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { data: profileResp } = useGetMyProfile();
  const profile = profileResp?.data;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      description: "",
    },
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // Pre-fill form once profile data loads or modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        name: profile?.name || user?.name || "",
        phone: profile?.phone || "",
        address: profile?.address || "",
        description: profile?.description || "",
      });
    }
  }, [isOpen, profile, user, reset]);

  // Clear status after a delay
  useEffect(() => {
    if (formStatus !== "idle") {
      const timer = setTimeout(() => setFormStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleUpdateProfile: SubmitHandler<FieldValues> = (value) => {
    setIsSubmitting(true);
    const payload = {
      name: value?.name,
      phone: value?.phone || "",
      address: value?.address || "",
      description: value?.description || "",
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    if (image) formData.append("file", image);

    updateProfile(formData, {
      async onSuccess(data) {
        if (!data?.success) {
          setFormStatus("error");
          toast.error(data?.message);
          setIsSubmitting(false);
          return;
        }

        // Mint a fresh access token so the JWT-derived sidebar (name, photo)
        // reflects the saved changes without forcing a full re-login.
        const refreshed = await refreshAccessToken();

        setFormStatus("success");
        toast.success(data?.message);

        if (refreshed) {
          queryClient.invalidateQueries({ queryKey: ["my-profile"] });
          setIsUserLoading(true);
          setTimeout(() => {
            setImage(null);
            setPreviewUrl(null);
            setIsSubmitting(false);
            router.refresh();
            onClose();
          }, 800);
        } else {
          // Refresh failed (expired refresh token) — fall back to forced re-login
          setTimeout(() => {
            logOut();
            setIsUserLoading(true);
            reset();
            setImage(null);
            setPreviewUrl(null);
            router.push("/login");
            onClose();
          }, 1200);
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
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const removeImage = () => {
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-white text-gray-800 ring-1 ring-gray-200 hover:bg-gray-50 transition-all"
        startContent={<Camera size={16} />}
      >
        Edit Profile
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-white rounded-2xl shadow-xl",
          header: "border-b border-gray-100",
          body: "py-6",
          footer: "border-t border-gray-100",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateProfile)}>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit profile
                </h3>
                <p className="text-xs text-gray-500 font-normal">
                  Update your name, photo, and contact details.
                </p>
              </ModalHeader>

              <ModalBody>
                <div className="space-y-5">
                  {/* Photo upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Profile photo
                    </label>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                    />

                    <div
                      className={`relative border-2 border-dashed rounded-xl p-4 transition-all ${
                        isDragging
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {previewUrl ? (
                        <div className="relative">
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative mx-auto rounded-xl overflow-hidden"
                            style={{ maxWidth: "200px" }}
                          >
                            <Image
                              src={previewUrl}
                              alt="Profile preview"
                              width={200}
                              height={200}
                              className="object-cover mx-auto rounded-xl"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                              aria-label="Remove image"
                            >
                              <X size={14} />
                            </motion.button>
                          </motion.div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={triggerFileInput}
                          className="w-full flex flex-col items-center justify-center py-4"
                        >
                          {(profile?.profilePhoto || user?.profilePhoto) && (
                            <Image
                              src={profile?.profilePhoto || user?.profilePhoto || ""}
                              alt="Current profile"
                              width={64}
                              height={64}
                              className="rounded-full mb-3 ring-1 ring-gray-200"
                            />
                          )}
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 text-center">
                            <span className="font-medium text-orange-500">
                              Click to upload
                            </span>{" "}
                            or drag &amp; drop
                          </p>
                          <p className="text-[11px] text-gray-400 mt-1">
                            PNG, JPG, GIF or WebP · max 5MB
                          </p>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <Input
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    label="Name"
                    placeholder="Your full name"
                    variant="bordered"
                    color={errors.name ? "danger" : "default"}
                    errorMessage={errors.name?.message?.toString()}
                    isInvalid={!!errors.name}
                    startContent={
                      <UserIcon size={16} className="text-gray-400" />
                    }
                  />

                  {/* Phone */}
                  <Input
                    {...register("phone", {
                      maxLength: {
                        value: 30,
                        message: "Phone is too long",
                      },
                    })}
                    type="tel"
                    label="Phone"
                    placeholder="e.g. +1 555 123 4567"
                    variant="bordered"
                    color={errors.phone ? "danger" : "default"}
                    errorMessage={errors.phone?.message?.toString()}
                    isInvalid={!!errors.phone}
                    startContent={<Phone size={16} className="text-gray-400" />}
                  />

                  {/* Address */}
                  <Textarea
                    {...register("address", {
                      maxLength: {
                        value: 300,
                        message: "Address is too long (300 chars max)",
                      },
                    })}
                    label="Address"
                    placeholder="Street, city, country"
                    variant="bordered"
                    minRows={2}
                    color={errors.address ? "danger" : "default"}
                    errorMessage={errors.address?.message?.toString()}
                    isInvalid={!!errors.address}
                    startContent={
                      <MapPin size={16} className="text-gray-400" />
                    }
                  />

                  {/* Description / Bio */}
                  <Textarea
                    {...register("description", {
                      maxLength: {
                        value: 500,
                        message: "About me is too long (500 chars max)",
                      },
                    })}
                    label="About"
                    placeholder="A short bio or store description"
                    variant="bordered"
                    minRows={3}
                    color={errors.description ? "danger" : "default"}
                    errorMessage={errors.description?.message?.toString()}
                    isInvalid={!!errors.description}
                    startContent={
                      <FileText size={16} className="text-gray-400" />
                    }
                  />
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
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-emerald-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">Saved!</span>
                    </motion.div>
                  ) : formStatus === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <AlertCircle size={16} />
                      <span className="text-sm font-medium">Failed</span>
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
                            Saving...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            Save changes
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
