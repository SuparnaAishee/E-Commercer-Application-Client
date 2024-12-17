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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProduct } from "@/src/hooks/product";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Image from "next/image";
import { TbFidgetSpinner } from "react-icons/tb";
import { useGetAllCategory } from "@/src/hooks/category";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateProduct() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [images, setImages] = useState<File[]>([]);
  const { mutate: createProduct, isPending, isSuccess } = useCreateProduct();
  const queryClient = useQueryClient();
  const { data: categories } = useGetAllCategory([]);
  const { handleSubmit, register, reset } = useForm();

  const handleUpdateProduct: SubmitHandler<FieldValues> = (values) => {
    const payload = Object.fromEntries(
      Object.entries({
        categoryId: values?.categoryId,
        name: values?.name,
        description: values?.description,
        inventory: Number(values?.inventory),
        price: Number(values?.price),
      }).filter(([_, value]) => value != null)
    );

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    for (let image of images) {
      formData.append("files", image);
    }
    createProduct(formData, {
      onSuccess(data) {
        if (data?.success) {
          reset();
          setImages([]);
          toast.success(data?.message);
          queryClient.invalidateQueries({ queryKey: ["my-products"] });
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
      setImages((prev) => [...prev, files[0]]);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setImages([]);
    }
  }, [isOpen]);
  return (
    <>
      <Button onPress={onOpen}>Create Product</Button>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <ModalHeader className="flex flex-col gap-1">
                Create Product
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-5">
                  <Input
                    labelPlacement="outside"
                    {...register("name", { required: true })}
                    label="Name"
                    placeholder="Name"
                    variant="bordered"
                  />
                  <Input
                    labelPlacement="outside"
                    {...register("price", { required: true })}
                    label="Price"
                    placeholder="Price"
                    variant="bordered"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <Input
                    labelPlacement="outside"
                    {...register("inventory", { required: true })}
                    label="Inventory"
                    placeholder="Inventory"
                    variant="bordered"
                  />
                  {categories?.data && (
                    <Select
                      labelPlacement="outside"
                      label="Product Category"
                      {...register("categoryId", { required: true })}
                      variant="bordered"
                      placeholder="Product Category"
                      className="max-w-full"
                      aria-label="Role"
                    >
                      {categories?.data?.map((category) => (
                        <SelectItem key={category.id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </div>

                <Input
                  {...register("description", { required: true })}
                  labelPlacement="outside"
                  label="Description"
                  placeholder="Description"
                  variant="bordered"
                />

                <div className="mt-4">
                  <label htmlFor="Image" className="text-xs">
                    Product Images
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
                    {images &&
                      images?.map((img, i) => (
                        <Image
                          key={i}
                          height={120}
                          width={120}
                          src={URL.createObjectURL(img)}
                          alt="Image"
                          className="h-[120px] w-[120px] object-cover m-2"
                        />
                      ))}
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
                    <span> Create Product</span>
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
