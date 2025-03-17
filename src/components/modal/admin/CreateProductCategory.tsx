/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// "use client";

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
// import { useCreateCategory } from "@/src/hooks/category";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useState } from "react";
// import Image from "next/image";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { useQueryClient } from "@tanstack/react-query";
// import { TbFidgetSpinner } from "react-icons/tb";

// export default function CreateProductCategory() {
//   const queryClient = useQueryClient();
//   const { handleSubmit, register, reset } = useForm();
//   const [image, setImage] = useState<File | null>(null);
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const { mutate: createCategory, isPending, isSuccess } = useCreateCategory();

//   const handleCreateCategory: SubmitHandler<FieldValues> = (value) => {
//     const payload = { name: value?.name };
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(payload));
//     if (image) {
//       formData.append("file", image);
//     }
//     createCategory(formData, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           queryClient.invalidateQueries({ queryKey: ["get-categories"] });
//           reset();
//           setImage(null);
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

//   return (
//     <>
//       <Button onPress={onOpen}>Add New</Button>

//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <ModalContent>
//           {(onClose) => (
//             <form onSubmit={handleSubmit(handleCreateCategory)}>
//               <ModalHeader className="flex flex-col gap-1">
//                 Create Product Category
//               </ModalHeader>
//               <ModalBody>
//                 <Input
//                   {...register("name", { required: true })}
//                   label="Category"
//                   placeholder="Enter category name"
//                   variant="bordered"
//                 />

//                 <div className="mt-4">
//                   <label htmlFor="Image" className="text-xs">
//                     Category Image
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
//                 <Button type="submit" color="primary">
//                   {isPending && !isSuccess ? (
//                     <span className="flex items-center gap-2 justify-center text-base">
//                       <span>Please Wait</span>{" "}
//                       <TbFidgetSpinner className="animate-spin" />
//                     </span>
//                   ) : (
//                     <span> Create</span>
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

"use client";

import type React from "react";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { useCreateCategory } from "@/src/hooks/category";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { FolderPlus, Upload, X, FolderIcon, Info } from "lucide-react";

export default function CreateProductCategory({
  children,
}: {
  children?: React.ReactNode;
}) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const { mutate: createCategory, isPending } = useCreateCategory();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const categoryName = watch("name");

  const handleCreateCategory: SubmitHandler<FieldValues> = (value) => {
    const payload = { name: value?.name };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    if (image) {
      formData.append("file", image);
    }

    createCategory(formData, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message, {
            position: "top-center",
            duration: 3000,
          });
          queryClient.invalidateQueries({ queryKey: ["get-categories"] });
          reset();
          setImage(null);
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
          }
          onClose();
        } else {
          toast.error(data?.message, {
            position: "top-center",
            duration: 3000,
          });
        }
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Revoke previous URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <>
      {children ? (
        <div onClick={onOpen}>{children}</div>
      ) : (
        <Button
          onPress={onOpen}
          color="primary"
          startContent={<FolderPlus className="w-4 h-4" />}
          className="font-medium"
        >
          Add New Category
        </Button>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        size="2xl"
        classNames={{
          base: "bg-background border border-default-100",
          header: "border-b border-default-100",
          footer: "border-t border-default-100",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleCreateCategory)}>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <FolderPlus className="w-5 h-5 text-primary" />
                  <span className="text-xl font-semibold">
                    Create New Category
                  </span>
                </div>
                <p className="text-sm text-default-500 mt-1">
                  Add a new product category to organize your products
                </p>
              </ModalHeader>

              <Divider />

              <ModalBody className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Input
                      label="Category Name"
                      labelPlacement="outside"
                      {...register("name", {
                        required: "Category name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      placeholder="Enter category name"
                      variant="bordered"
                      startContent={
                        <FolderIcon
                          className="text-default-400 pointer-events-none flex-shrink-0"
                          size={16}
                        />
                      }
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message?.toString()}
                      classNames={{
                        label: "text-sm font-medium text-default-700",
                        input: "text-sm",
                      }}
                    />

                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-default-700">
                          Category Image
                        </label>
                        <Tooltip content="Recommended size: 200x200px">
                          <Info size={16} className="text-default-400" />
                        </Tooltip>
                      </div>

                      <div
                        className="border-2 border-dashed border-default-200 rounded-lg p-4 text-center hover:bg-default-50 transition-colors cursor-pointer relative"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() =>
                          document
                            .getElementById("category-image-upload")
                            ?.click()
                        }
                      >
                        <input
                          type="file"
                          onChange={handleImageChange}
                          id="category-image-upload"
                          className="hidden"
                          accept="image/*"
                        />

                        {!previewUrl ? (
                          <div className="py-6">
                            <Upload className="w-8 h-8 mx-auto text-default-400 mb-2" />
                            <p className="text-sm text-default-600">
                              Click to upload an image
                            </p>
                            <p className="text-xs text-default-400 mt-1">
                              PNG, JPG or WEBP (max. 2MB)
                            </p>
                          </div>
                        ) : (
                          <div className="relative">
                            <Image
                              src={previewUrl || "/placeholder.svg"}
                              alt="Category preview"
                              width={200}
                              height={200}
                              className="mx-auto rounded-md object-contain h-[200px] w-auto"
                            />
                            {isHovering && (
                              <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                                <p className="text-white text-sm">
                                  Click to change image
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {previewUrl && (
                        <div className="mt-2 flex justify-end">
                          <Button
                            size="sm"
                            variant="light"
                            color="danger"
                            startContent={<X size={14} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage();
                            }}
                          >
                            Remove image
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-default-50 rounded-lg p-5">
                    <h3 className="text-sm font-medium mb-3">
                      Category Preview
                    </h3>
                    <div className="border border-default-200 rounded-lg p-4 bg-background">
                      <div className="flex items-center gap-3">
                        {previewUrl ? (
                          <Image
                            src={previewUrl || "/placeholder.svg"}
                            alt="Category"
                            width={60}
                            height={60}
                            className="rounded-md object-cover h-[60px] w-[60px]"
                          />
                        ) : (
                          <div className="h-[60px] w-[60px] bg-default-100 rounded-md flex items-center justify-center">
                            <FolderIcon className="w-6 h-6 text-default-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">
                            {categoryName || "Category Name"}
                          </p>
                          <p className="text-xs text-default-500 mt-1">
                            Product Category
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-default-500">
                      <p className="flex items-start gap-2">
                        <Info size={14} className="mt-0.5 flex-shrink-0" />
                        <span>
                          Categories help organize your products and make them
                          easier to find for customers.
                        </span>
                      </p>
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
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isPending}
                  isDisabled={!isValid || isPending}
                  className="font-medium"
                >
                  Create Category
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

