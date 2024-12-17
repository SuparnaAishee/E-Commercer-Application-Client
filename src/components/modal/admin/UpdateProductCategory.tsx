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
import { EditIcon } from "../../icons";
import {
  useGetAllCategory,
  useGetSingleCategory,
  useUpdateSingleCategory,
} from "@/src/hooks/category";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Image from "next/image";

export default function UpdateProductCategory({ id }: { id: string }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [image, setImage] = useState<File | null>(null);
  const { data: category } = useGetSingleCategory(id);
  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: category?.data?.name,
    },
  });
  const { refetch: refetchCategories } = useGetAllCategory([]);
  const { mutate: updateCategory } = useUpdateSingleCategory();

  const handleUpdateCategory: SubmitHandler<FieldValues> = (value) => {
    if (category?.data?.id) {
      const payload = {
        name: value?.name,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (image) {
        formData.append("file", image);
      }
      updateCategory(
        { formData, id: category?.data?.id },
        {
          onSuccess(data) {
            if (data?.success) {
              toast.success(data?.message);
              refetchCategories();
              onClose();
            } else {
              toast.error(data?.message);
            }
          },
        }
      );
    }
  };

  useEffect(() => {
    reset({
      name: category?.data?.name,
    });
  }, [category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImage(files[0]);
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
      >
        <EditIcon />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateCategory)}>
              <ModalHeader className="flex flex-col gap-1">
                Edit Product Category
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
                    {!image && category?.data?.image && (
                      <Image
                        height={120}
                        width={120}
                        src={category?.data?.image}
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
                  Update
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
