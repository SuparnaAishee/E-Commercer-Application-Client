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
  Select,
  SelectItem,
  type DateValue,
  DatePicker,
  Chip,
  Divider,
} from "@nextui-org/react";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProduct } from "@/src/hooks/product";
import { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import {
  TbFidgetSpinner,
  TbDiscount,
  TbCalendarTime,
  TbShoppingBag,
} from "react-icons/tb";
import { useGetAllCategory } from "@/src/hooks/category";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateFlashSale() {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [sale_start_time, setSaleStartTime] = useState<DateValue | undefined>(
    undefined
  );
  const [sale_end_time, setSaleEndTime] = useState<DateValue | undefined>(
    undefined
  );
  const [images, setImages] = useState<File[]>([]);
  const { mutate: createProduct, isPending, isSuccess } = useCreateProduct();
  const { data: categories } = useGetAllCategory([]);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);

  const handleUpdateProduct: SubmitHandler<FieldValues> = (values) => {
    if (!sale_end_time || !sale_start_time) {
      toast.error("Sale start and end dates are required");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    // Check if end date is after start date
    const startDate = new Date(
      sale_start_time.year,
      sale_start_time.month - 1,
      sale_start_time.day
    );
    const endDate = new Date(
      sale_end_time.year,
      sale_end_time.month - 1,
      sale_end_time.day
    );

    if (endDate <= startDate) {
      toast.error("Sale end date must be after start date");
      return;
    }

    const payload = Object.fromEntries(
      Object.entries({
        isFlashSale: true,
        categoryId: values?.categoryId,
        name: values?.name,
        description: values?.description,
        inventory: Number(values?.inventory),
        price: Number(values?.price),
        discount_percentage: Number(values?.discount_percentage),
        sale_end_time: endDate.toISOString(),
        sale_start_time: startDate.toISOString(),
      }).filter(([_, value]) => value != null)
    );

    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    for (const image of images) {
      formData.append("files", image);
    }

    createProduct(formData, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          queryClient.invalidateQueries({ queryKey: ["my-products"] });
          reset();
          setImages([]);
          setSaleStartTime(undefined);
          setSaleEndTime(undefined);
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

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Calculate discounted price preview
  const calculateDiscountedPrice = (price: string, discount: string) => {
    const priceValue = Number.parseFloat(price);
    const discountValue = Number.parseFloat(discount);

    if (
      !isNaN(priceValue) &&
      !isNaN(discountValue) &&
      priceValue > 0 &&
      discountValue > 0
    ) {
      const discounted = priceValue - priceValue * (discountValue / 100);
      setDiscountedPrice(Number.parseFloat(discounted.toFixed(2)));
    } else {
      setDiscountedPrice(null);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setImages([]);
      reset();
      setSaleStartTime(undefined);
      setSaleEndTime(undefined);
      setDiscountedPrice(null);
    }
  }, [isOpen, reset]);

  return (
    <>
      <Button
        onPress={onOpen}
        color="warning"
        startContent={<TbDiscount />}
        className="font-medium"
      >
        Add Flash Sale
      </Button>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        classNames={{
          header: "border-b border-divider",
          footer: "border-t border-divider",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <TbDiscount className="text-warning" />
                  <span>Create Flash Sale Product</span>
                </div>
                <p className="text-xs text-default-500">
                  Limited time offers with special discounts
                </p>
              </ModalHeader>

              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      labelPlacement="outside"
                      {...register("name", {
                        required: "Product name is required",
                      })}
                      label="Name"
                      placeholder="Enter product name"
                      variant="bordered"
                      startContent={
                        <TbShoppingBag className="text-default-400" />
                      }
                      isInvalid={!!errors.name}
                      errorMessage={errors.name?.message?.toString()}
                      className="flex-1"
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
                      startContent={<span className="text-default-400">$</span>}
                      isInvalid={!!errors.price}
                      errorMessage={errors.price?.message?.toString()}
                      className="flex-1"
                      onChange={(e) => {
                        const discountValue =
                          document.querySelector<HTMLInputElement>(
                            'input[name="discount_percentage"]'
                          )?.value || "0";
                        calculateDiscountedPrice(e.target.value, discountValue);
                      }}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      labelPlacement="outside"
                      {...register("inventory", {
                        required: "Inventory is required",
                        min: {
                          value: 1,
                          message: "Inventory must be at least 1",
                        },
                      })}
                      label="Inventory"
                      placeholder="Enter available quantity"
                      variant="bordered"
                      type="number"
                      isInvalid={!!errors.inventory}
                      errorMessage={errors.inventory?.message?.toString()}
                      className="flex-1"
                    />
                    <Input
                      {...register("description", {
                        required: "Description is required",
                      })}
                      labelPlacement="outside"
                      label="Description"
                      placeholder="Enter product description"
                      variant="bordered"
                      isInvalid={!!errors.description}
                      errorMessage={errors.description?.message?.toString()}
                      className="flex-1"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    {categories?.data && (
                      <div className="flex-1">
                        <Select
                          label="Product Category"
                          labelPlacement="outside"
                          {...register("categoryId", {
                            required: "Category is required",
                          })}
                          variant="bordered"
                          placeholder="Select product category"
                          isInvalid={!!errors.categoryId}
                          errorMessage={errors.categoryId?.message?.toString()}
                        >
                          {categories?.data?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category?.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                    )}
                    <Input
                      labelPlacement="outside"
                      {...register("discount_percentage", {
                        required: "Discount percentage is required",
                        min: {
                          value: 1,
                          message: "Discount must be at least 1%",
                        },
                        max: {
                          value: 99,
                          message: "Discount cannot exceed 99%",
                        },
                      })}
                      type="number"
                      label="Discount Percentage"
                      placeholder="Enter discount percentage"
                      variant="bordered"
                      endContent={<span className="text-default-400">%</span>}
                      isInvalid={!!errors.discount_percentage}
                      errorMessage={errors.discount_percentage?.message?.toString()}
                      className="flex-1"
                      onChange={(e) => {
                        const priceValue =
                          document.querySelector<HTMLInputElement>(
                            'input[name="price"]'
                          )?.value || "0";
                        calculateDiscountedPrice(priceValue, e.target.value);
                      }}
                    />
                  </div>

                  {discountedPrice !== null && (
                    <div className="flex items-center gap-2">
                      <Chip color="warning" variant="flat">
                        Sale Price: ${discountedPrice}
                      </Chip>
                      <span className="text-xs text-default-500">
                        (After applying discount)
                      </span>
                    </div>
                  )}

                  <Divider className="my-1" />

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-1">
                      <label className="text-sm block">Sale Start Date</label>
                      <DatePicker
                        onChange={(value) => setSaleStartTime(value)}
                        variant="bordered"
                        //@ts-ignore
                        placeholder="Select start date"
                        startContent={
                          <TbCalendarTime className="text-default-400" />
                        }
                        classNames={{
                          base: "w-full",
                        }}
                        minDate={{
                          year: new Date().getFullYear(),
                          month: new Date().getMonth() + 1,
                          day: new Date().getDate(),
                        }}
                      />
                      {!sale_start_time && isPending && (
                        <p className="text-xs text-danger">
                          Start date is required
                        </p>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <label className="text-sm block">Sale End Date</label>
                      <DatePicker
                        onChange={(value) => setSaleEndTime(value)}
                        variant="bordered"
                        //@ts-ignore
                        placeholder="Select end date"
                        startContent={
                          <TbCalendarTime className="text-default-400" />
                        }
                        classNames={{
                          base: "w-full",
                        }}
                        minDate={{
                          year: new Date().getFullYear(),
                          month: new Date().getMonth() + 1,
                          day: new Date().getDate() + 1,
                        }}
                      />
                      {!sale_end_time && isPending && (
                        <p className="text-xs text-danger">
                          End date is required
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="upload" className="text-sm font-medium">
                        Product Images
                      </label>
                      <Chip
                        color={images.length > 0 ? "success" : "danger"}
                        variant="flat"
                        size="sm"
                      >
                        {images.length}{" "}
                        {images.length === 1 ? "image" : "images"}
                      </Chip>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="border border-dashed border-default-300 rounded-md flex items-center justify-center w-[100px] h-[100px] hover:border-warning transition-colors">
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
                          className="cursor-pointer flex flex-col items-center justify-center w-full h-full"
                        >
                          <AiOutlinePlusCircle
                            size={24}
                            className="text-default-400"
                          />
                          <span className="text-xs text-default-400 mt-1">
                            Add Image
                          </span>
                        </label>
                      </div>

                      {images.map((img, i) => (
                        <div key={i} className="relative group">
                          <div className="w-[100px] h-[100px] rounded-md overflow-hidden border border-default-200">
                            <Image
                              fill
                              src={
                                URL.createObjectURL(img) || "/placeholder.svg"
                              }
                              alt="Product image"
                              className="object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute -top-1 -right-1 bg-danger text-white rounded-full p-1 w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <AiOutlineClose size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {images.length === 0 && (
                      <p className="text-xs text-danger mt-1">
                        Please upload at least one product image
                      </p>
                    )}
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="warning"
                  isLoading={isPending && !isSuccess}
                  spinner={<TbFidgetSpinner className="animate-spin" />}
                  isDisabled={
                    images.length === 0 || !sale_start_time || !sale_end_time
                  }
                  className="font-medium"
                >
                  {isPending && !isSuccess
                    ? "Creating..."
                    : "Create Flash Sale"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

