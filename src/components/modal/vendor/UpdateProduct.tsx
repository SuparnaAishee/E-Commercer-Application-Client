/* eslint-disable jsx-a11y/label-has-associated-control */
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
  Tooltip,
  Chip,
} from "@nextui-org/react";
import { EditIcon } from "../../icons";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useGetSingleProduct, useUpdateProduct } from "@/src/hooks/product";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { useUser } from "@/src/context/user.provider";
import { useQueryClient } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";

export default function UpdateProduct({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const [images, setImages] = useState<File[]>([]);
  const { data: product } = useGetSingleProduct(id);
  const { mutate: updateProduct, isPending, isSuccess } = useUpdateProduct();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateProduct: SubmitHandler<FieldValues> = (values) => {
    if (product?.data?.id) {
      const payload = Object.fromEntries(
        Object.entries({
          name: values?.name,
          description: values?.description,
          inventory: Number(values?.inventory),
          price: Number(values?.price),
        }).filter(([_, value]) => value != null)
      );

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      for (const image of images) {
        formData.append("files", image);
      }
      updateProduct(
        { formData, id: product?.data?.id },
        {
          onSuccess(data) {
            if (data?.success) {
              toast.success(data?.message);
              if (user?.role === "VENDOR") {
                queryClient.invalidateQueries({ queryKey: ["my-products"] });
              } else {
                queryClient.invalidateQueries({ queryKey: ["all-products"] });
              }

              onClose();
            } else {
              toast.error(data?.message);
            }
          },
        }
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages((prev) => [...prev, files[0]]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!isOpen) {
      setImages([]);
    }
    if (product?.data) {
      reset({
        name: product?.data?.name,
        description: product?.data?.description,
        inventory: product?.data?.inventory,
        price: product?.data?.price,
      });
    }
  }, [isOpen, product, reset]);

  return (
    <>
      <Tooltip content="Edit Product">
        <button
          onClick={onOpen}
          className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-primary transition-colors duration-200"
          aria-label="Edit product"
        >
          <EditIcon />
        </button>
      </Tooltip>

      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        scrollBehavior="inside"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-white dark:bg-[#19172c] dark:border-white/20",
          header: "border-b-[1px] border-[#292f46] dark:border-white/20",
          footer: "border-t-[1px] border-[#292f46] dark:border-white/20",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                Edit Product
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    labelPlacement="outside"
                    {...register("name", {
                      required: "Product name is required",
                      minLength: {
                        value: 3,
                        message: "Product name must be at least 3 characters",
                      },
                    })}
                    label="Product Name"
                    placeholder="Enter product name"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message?.toString()}
                    classNames={{
                      inputWrapper:
                        "border-2 hover:border-primary focus-within:border-primary",
                    }}
                  />

                  <Input
                    labelPlacement="outside"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    })}
                    label="Price"
                    placeholder="Enter product price"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    isInvalid={!!errors.price}
                    errorMessage={errors.price?.message?.toString()}
                    classNames={{
                      inputWrapper:
                        "border-2 hover:border-primary focus-within:border-primary",
                    }}
                  />

                  <Input
                    labelPlacement="outside"
                    {...register("inventory", {
                      required: "Inventory is required",
                      min: {
                        value: 0,
                        message: "Inventory cannot be negative",
                      },
                    })}
                    label="Inventory"
                    placeholder="Enter available quantity"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    type="number"
                    isInvalid={!!errors.inventory}
                    errorMessage={errors.inventory?.message?.toString()}
                    classNames={{
                      inputWrapper:
                        "border-2 hover:border-primary focus-within:border-primary",
                    }}
                  />

                  <Input
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters",
                      },
                    })}
                    labelPlacement="outside"
                    label="Product Description"
                    placeholder="Describe your product in detail"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message?.toString()}
                    classNames={{
                      inputWrapper:
                        "border-2 hover:border-primary focus-within:border-primary",
                    }}
                  />
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">
                      Product Images
                    </label>
                    <Chip
                      color={
                        images.length > 0 ||
                        (product?.data?.images &&
                          product?.data?.images.length > 0)
                          ? "success"
                          : "danger"
                      }
                      variant="flat"
                      size="sm"
                    >
                      {images.length + (product?.data?.images?.length || 0)}{" "}
                      {images.length + (product?.data?.images?.length || 0) ===
                      1
                        ? "image"
                        : "images"}
                    </Chip>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((img, i) => (
                      <div key={`new-${i}`} className="relative group">
                        <Image
                          height={120}
                          width={120}
                          src={URL.createObjectURL(img) || "/placeholder.svg"}
                          alt="Product image"
                          className="h-[120px] w-full object-cover rounded-lg border-2 border-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md"
                        >
                          <AiOutlineClose size={16} />
                        </button>
                      </div>
                    ))}

                    {product?.data?.images &&
                      images.length === 0 &&
                      product?.data?.images.map((img, i) => (
                        <div key={`existing-${i}`} className="relative">
                          <Image
                            height={120}
                            width={120}
                            src={img || "/placeholder.svg"}
                            alt="Product image"
                            className="h-[120px] w-full object-cover rounded-lg border-2 border-primary/20"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center rounded-b-lg">
                            Existing
                          </div>
                        </div>
                      ))}

                    <div className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-[120px] hover:border-primary transition-colors duration-200">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        name="imageUrl"
                        id="upload-edit"
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="upload-edit"
                        className="cursor-pointer flex flex-col items-center justify-center h-full w-full"
                      >
                        <AiOutlinePlusCircle
                          size={30}
                          className="mb-1"
                          color="#555"
                        />
                        <span className="text-xs text-gray-500 text-center px-2">
                          Add Image
                        </span>
                      </label>
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
                  className="bg-primary font-medium"
                  isLoading={isPending && !isSuccess}
                  spinner={<TbFidgetSpinner className="animate-spin" />}
                >
                  {isPending && !isSuccess ? "Updating..." : "Update Product"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

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
// import { EditIcon } from "../../icons";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useGetSingleProduct, useUpdateProduct } from "@/src/hooks/product";
// import { useEffect, useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import Image from "next/image";
// import { useUser } from "@/src/context/user.provider";
// import { useQueryClient } from "@tanstack/react-query";
// import { TbFidgetSpinner } from "react-icons/tb";

// export default function UpdateProduct({ id }: { id: string }) {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const queryClient = useQueryClient();
//   const { user } = useUser();
//   const [images, setImages] = useState<File[]>([]);
//   const { data: product } = useGetSingleProduct(id);
//   const { mutate: updateProduct, isPending, isSuccess } = useUpdateProduct();
//   const { handleSubmit, register, reset } = useForm();

//   const handleUpdateProduct: SubmitHandler<FieldValues> = (values) => {
//     if (product?.data?.id) {
//       const payload = Object.fromEntries(
//         Object.entries({
//           name: values?.name,
//           description: values?.description,
//           inventory: Number(values?.inventory),
//           price: Number(values?.price),
//         }).filter(([_, value]) => value != null)
//       );

//       const formData = new FormData();
//       formData.append("data", JSON.stringify(payload));
//       for (let image of images) {
//         formData.append("files", image);
//       }
//       updateProduct(
//         { formData, id: product?.data?.id },
//         {
//           onSuccess(data) {
//             if (data?.success) {
//               toast.success(data?.message);
//               if (user?.role === "VENDOR") {
//                 queryClient.invalidateQueries({ queryKey: ["my-products"] });
//               } else {
//                 queryClient.invalidateQueries({ queryKey: ["all-products"] });
//               }

//               onClose();
//             } else {
//               toast.error(data?.message);
//             }
//           },
//         }
//       );
//     }
//   };
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setImages((prev) => [...prev, files[0]]);
//     }
//   };

//   useEffect(() => {
//     if (!isOpen) {
//       setImages([]);
//     }
//     if (product?.data) {
//       reset({
//         name: product?.data?.name,
//         description: product?.data?.description,
//         inventory: product?.data?.inventory,
//         price: product?.data?.price,
//       });
//     }
//   }, [isOpen, product]);
//   return (
//     <>
//       <button
//         onClick={onOpen}
//         className="text-lg text-default-400 cursor-pointer active:opacity-50"
//       >
//         <EditIcon />
//       </button>
//       <Modal
//         size="2xl"
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         placement="top-center"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <form onSubmit={handleSubmit(handleUpdateProduct)}>
//               <ModalHeader className="flex flex-col gap-1">
//                 Edit Product
//               </ModalHeader>
//               <ModalBody>
//                 <div className="flex items-center gap-5">
//                   <Input
//                     labelPlacement="outside"
//                     {...register("name", { required: true })}
//                     label="Name"
//                     placeholder="Name"
//                     variant="bordered"
//                   />
//                   <Input
//                     labelPlacement="outside"
//                     {...register("price", { required: true })}
//                     label="Price"
//                     placeholder="Price"
//                     variant="bordered"
//                   />
//                 </div>
//                 <div className="flex items-center gap-5">
//                   <Input
//                     labelPlacement="outside"
//                     {...register("inventory", { required: true })}
//                     label="Inventory"
//                     placeholder="Inventory"
//                     variant="bordered"
//                   />
//                   <Input
//                     {...register("description", { required: true })}
//                     labelPlacement="outside"
//                     label="Description"
//                     placeholder="Description"
//                     variant="bordered"
//                   />
//                 </div>

//                 <div className="mt-4">
//                   <label htmlFor="Image" className="text-xs">
//                     Product Images
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
//                     {images &&
//                       images?.map((img, i) => (
//                         <Image
//                           key={i}
//                           height={120}
//                           width={120}
//                           src={URL.createObjectURL(img)}
//                           alt="Image"
//                           className="h-[120px] w-[120px] object-cover m-2"
//                         />
//                       ))}
//                     {product?.data?.images &&
//                       images?.length === 0 &&
//                       product?.data?.images?.map((img, i) => (
//                         <Image
//                           key={i}
//                           height={120}
//                           width={120}
//                           src={img}
//                           alt="Image"
//                           className="h-[120px] w-[120px] object-cover m-2"
//                         />
//                       ))}
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
