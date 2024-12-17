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
import { useCreateCategory } from "@/src/hooks/category";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";
import { TbFidgetSpinner } from "react-icons/tb";

export default function CreateProductCategory() {
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm();
  const [image, setImage] = useState<File | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { mutate: createCategory, isPending, isSuccess } = useCreateCategory();

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
          toast.success(data?.message);
          queryClient.invalidateQueries({ queryKey: ["get-categories"] });
          reset();
          setImage(null);
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
      <Button onPress={onOpen}>Add New</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleCreateCategory)}>
              <ModalHeader className="flex flex-col gap-1">
                Create Product Category
              </ModalHeader>
              <ModalBody>
                <Input
                  {...register("name", { required: true })}
                  label="Category"
                  placeholder="Enter category name"
                  variant="bordered"
                />

                <div className="mt-4">
                  <label htmlFor="Image" className="text-xs">
                    Category Image
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
                  {isPending && !isSuccess ? (
                    <span className="flex items-center gap-2 justify-center text-base">
                      <span>Please Wait</span>{" "}
                      <TbFidgetSpinner className="animate-spin" />
                    </span>
                  ) : (
                    <span> Create</span>
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
