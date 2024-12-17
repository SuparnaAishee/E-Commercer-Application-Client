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
  const { handleSubmit, register } = useForm();

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

  return (
    <>
      <Button
        onPress={onOpen}
        className="default_btn"
        endContent={<PlusIcon />}
      >
        Create a Shop
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateShop)}>
              <ModalHeader className="flex flex-col gap-1">
                Update My Shop
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register("name", { required: true })}
                  label="Shop Name"
                  placeholder="Enter shop name"
                  variant="bordered"
                />
                <Input
                  {...register("shopDetails", { required: true })}
                  label="Shop Details"
                  placeholder="Enter shop details"
                  variant="bordered"
                />

                <div className="mt-4">
                  <label htmlFor="Image" className="text-xs">
                    Shop Logo
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
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  {!isSuccess && isPending ? (
                    <span className="flex items-center gap-2 justify-center text-base">
                      <span>Please Wait</span>{" "}
                      <TbFidgetSpinner className="animate-spin" />
                    </span>
                  ) : (
                    <span>Create Shop</span>
                  )}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
