"use client";
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
import { PlusIcon } from "../../icons";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Image from "next/image";
import { useCreateMyShop, useGetMyShop } from "@/src/hooks/shop";
import { TbFidgetSpinner } from "react-icons/tb";

export default function CreateShop() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { refetch } = useGetMyShop();
  const { mutate: createMyShop, isSuccess, isPending } = useCreateMyShop();
  const [image, setImage] = useState<File | null>(null);
  const [previewHover, setPreviewHover] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleUpdateShop: SubmitHandler<FieldValues> = (values) => {
    const payload = {
      shopName: values?.name,
      shopDetails: values?.shopDetails,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (image) {
      formData.append("file", image);
    }

    createMyShop(formData, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          refetch();
          onClose();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImage(files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="default_btn bg-orange-500 text-white shadow-md hover:shadow-lg transition-all duration-300"
        endContent={<PlusIcon />}
        size="lg"
      >
        Create a Shop
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
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
            <form onSubmit={handleSubmit(handleUpdateShop)}>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                Create Your Shop
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <Input
                    {...register("name", {
                      required: "Shop name is required",
                      minLength: {
                        value: 3,
                        message: "Shop name must be at least 3 characters",
                      },
                    })}
                    label="Shop Name"
                    placeholder="Enter a unique name for your shop"
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
                    {...register("shopDetails", {
                      required: "Shop details are required",
                      minLength: {
                        value: 10,
                        message: "Please provide more details about your shop",
                      },
                    })}
                    label="Shop Details"
                    placeholder="Describe what your shop sells and your unique value"
                    variant="bordered"
                    size="lg"
                    radius="sm"
                    isInvalid={!!errors.shopDetails}
                    errorMessage={errors.shopDetails?.message?.toString()}
                    classNames={{
                      inputWrapper:
                        "border-2 hover:border-primary focus-within:border-primary",
                    }}
                  />

                  <div className="space-y-2">
                    <label htmlFor="Image" className="text-sm font-medium">
                      Shop Logo
                    </label>

                    <div className="flex flex-col items-center justify-center">
                      {image ? (
                        <div
                          className="relative group"
                          onMouseEnter={() => setPreviewHover(true)}
                          onMouseLeave={() => setPreviewHover(false)}
                        >
                          <Image
                            height={150}
                            width={150}
                            src={
                              URL.createObjectURL(image) || "/placeholder.svg"
                            }
                            alt="Shop Logo Preview"
                            className="h-[150px] w-[150px] object-cover rounded-lg border-2 border-primary/20"
                          />
                          {previewHover && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center transition-all duration-200">
                              <button
                                type="button"
                                onClick={removeImage}
                                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors duration-200">
                          <input
                            type="file"
                            onChange={handleImageChange}
                            name="imageUrl"
                            id="upload"
                            className="hidden"
                            accept="image/*"
                          />
                          <label
                            htmlFor="upload"
                            className="cursor-pointer flex flex-col items-center"
                          >
                            <AiOutlinePlusCircle
                              size={40}
                              className="mb-2"
                              color="#555"
                            />
                            <span className="text-sm text-gray-500">
                              Click to upload shop logo
                            </span>
                            <span className="text-xs text-gray-400 mt-1">
                              PNG, JPG up to 5MB
                            </span>
                          </label>
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
                <Button
                  type="submit"
                  color="primary"
                  className="bg-primary font-medium"
                  isLoading={isPending && !isSuccess}
                  spinner={<TbFidgetSpinner className="animate-spin" />}
                >
                  {isPending && !isSuccess ? "Creating..." : "Create Shop"}
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
// import { PlusIcon } from "../../icons";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useState } from "react";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import Image from "next/image";
// import { useCreateMyShop, useGetMyShop } from "@/src/hooks/shop";
// import { TbFidgetSpinner } from "react-icons/tb";

// export default function CreateShop() {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const { refetch } = useGetMyShop();
//   const { mutate: createMyShop, isSuccess, isPending } = useCreateMyShop();
//   const [image, setImage] = useState<File | null>(null);
//   const { handleSubmit, register } = useForm();

//   const handleUpdateShop: SubmitHandler<FieldValues> = (values) => {
//     const payload = {
//       shopName: values?.name,
//       shopDetails: values?.shopDetails,
//     };

//     const formData = new FormData();
//     formData.append("data", JSON.stringify(payload));
//     if (image) {
//       formData.append("file", image);
//     }

//     createMyShop(formData, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           refetch();
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
//       <Button
//         onPress={onOpen}
//         className="default_btn"
//         endContent={<PlusIcon />}
//       >
//         Create a Shop
//       </Button>
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
//         <ModalContent>
//           {(onClose) => (
//             <form onSubmit={handleSubmit(handleUpdateShop)}>
//               <ModalHeader className="flex flex-col gap-1">
//                 Update My Shop
//               </ModalHeader>
//               <ModalBody>
//                 <Input
//                   {...register("name", { required: true })}
//                   label="Shop Name"
//                   placeholder="Enter shop name"
//                   variant="bordered"
//                 />
//                 <Input
//                   {...register("shopDetails", { required: true })}
//                   label="Shop Details"
//                   placeholder="Enter shop details"
//                   variant="bordered"
//                 />

//                 <div className="mt-4">
//                   <label htmlFor="Image" className="text-xs">
//                     Shop Logo
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
//                   {!isSuccess && isPending ? (
//                     <span className="flex items-center gap-2 justify-center text-base">
//                       <span>Please Wait</span>{" "}
//                       <TbFidgetSpinner className="animate-spin" />
//                     </span>
//                   ) : (
//                     <span>Create Shop</span>
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
