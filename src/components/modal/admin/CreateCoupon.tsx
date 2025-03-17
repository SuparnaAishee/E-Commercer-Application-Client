/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
//   Select,
//   SelectItem,
//   DatePicker,
//   DateValue,
// } from "@nextui-org/react";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { useCreateCoupon } from "@/src/hooks/coupon";
// import { useState } from "react";
// import { useQueryClient } from "@tanstack/react-query";

// export default function CreateCoupon() {
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//   const [expiryDate, setExpiryDate] = useState<DateValue | undefined>(
//     undefined
//   );
//   const queryClient = useQueryClient();
//   const { mutate: createCoupon, isPending, isSuccess } = useCreateCoupon();
//   const { handleSubmit, register } = useForm();

//   const handleUpdateProduct: SubmitHandler<FieldValues> = (values) => {
//     const payload = {
//       ...values,
//       discount: Number(values?.discount),
//       expiryDate: `${expiryDate?.day}-${expiryDate?.month}-${expiryDate?.year}`,
//       minimumOrderValue: Number(values?.minimumOrderValue),
//       usageLimit: Number(values?.usageLimit),
//     };

//     createCoupon(payload, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
//           onClose();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   return (
//     <>
//       <Button onPress={onOpen}>Add New</Button>
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
//                 Create Coupon
//               </ModalHeader>
//               <ModalBody>
//                 <div className="flex items-center gap-5">
//                   <Input
//                     labelPlacement="outside"
//                     {...register("code", { required: true })}
//                     label="Code"
//                     type="text"
//                     placeholder="Code"
//                     variant="bordered"
//                   />
//                   <Input
//                     type="number"
//                     labelPlacement="outside"
//                     {...register("discount", { required: true })}
//                     label="Discount"
//                     placeholder="Discount"
//                     variant="bordered"
//                   />
//                 </div>
//                 <div className="flex items-center gap-5">
//                   <Select
//                     label="Discount Type"
//                     labelPlacement="outside"
//                     {...register("discountType", { required: true })}
//                     variant="bordered"
//                     placeholder="Discount Type"
//                     className="max-w-full"
//                     aria-label="Role"
//                   >
//                     <SelectItem key="PERCENTAGE">Percentage</SelectItem>
//                     <SelectItem key="FIXED">Fixed</SelectItem>
//                   </Select>
//                   <Input
//                     type="number"
//                     {...register("minimumOrderValue", { required: true })}
//                     labelPlacement="outside"
//                     label="Minimum Order Value"
//                     placeholder="Minimum Order Value"
//                     variant="bordered"
//                   />
//                 </div>
//                 <div className="flex items-center gap-5">
//                   <Input
//                     type="number"
//                     {...register("usageLimit", { required: true })}
//                     labelPlacement="outside"
//                     label="Usage Limit"
//                     placeholder="Usage Limit"
//                     variant="bordered"
//                   />
//                   <DatePicker
//                     onChange={(value) => setExpiryDate(value)}
//                     labelPlacement="outside"
//                     variant="bordered"
//                     label="Expiry Date"
//                     className="max-w-[284px]"
//                   />
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
//                     <span> Create Coupon</span>
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

import { useState, useEffect } from "react";
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
  Divider,
  Tooltip,
} from "@nextui-org/react";
import {
  type FieldValues,
  type SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { toast } from "sonner";
import { useCreateCoupon } from "@/src/hooks/coupon";
import { useQueryClient } from "@tanstack/react-query";
import {
  Percent,
  DollarSign,
  Tag,
  Clock,
  ShoppingBag,
  Repeat,
  Info,
} from "lucide-react";

export default function CreateCoupon({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const queryClient = useQueryClient();
  const { mutate: createCoupon, isPending, isSuccess } = useCreateCoupon();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      code: "",
      discount: "",
      discountType: "PERCENTAGE",
      minimumOrderValue: "",
      usageLimit: "",
    },
    mode: "onChange",
  });

  const discountType = watch("discountType");

  useEffect(() => {
    if (isSuccess) {
      reset();
      setSelectedDate(null);
    }
  }, [isSuccess, reset]);

  const handleUpdateProduct: SubmitHandler<FieldValues> = (values) => {
    if (!selectedDate) {
      toast.error("Please select an expiry date");
      return;
    }

    const payload = {
      ...values,
      discount: Number(values?.discount),
      expiryDate: `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
      minimumOrderValue: Number(values?.minimumOrderValue),
      usageLimit: Number(values?.usageLimit),
    };

    createCoupon(payload, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message, {
            position: "top-center",
            duration: 3000,
          });
          queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
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

  return (
    <>
      {children ? (
       
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={onOpen}>{children}</div>
      ) : (
        <Button
          onPress={onOpen}
          color="primary"
          startContent={<Tag className="w-4 h-4" />}
          className="font-medium"
        >
          Add New Coupon
        </Button>
      )}

      <Modal
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
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
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="text-xl font-semibold">
                    Create New Coupon
                  </span>
                </div>
                <p className="text-sm text-default-500 mt-1">
                  Create a new coupon code for your customers
                </p>
              </ModalHeader>

              <Divider />

              <ModalBody className="py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div>
                      <Input
                        label="Coupon Code"
                        labelPlacement="outside"
                        {...register("code", {
                          required: "Coupon code is required",
                          minLength: {
                            value: 3,
                            message: "Code must be at least 3 characters",
                          },
                        })}
                        placeholder="e.g. SUMMER2023"
                        variant="bordered"
                        startContent={
                          <Tag
                            className="text-default-400 pointer-events-none flex-shrink-0"
                            size={16}
                          />
                        }
                        isInvalid={!!errors.code}
                        errorMessage={errors.code?.message?.toString()}
                        classNames={{
                          label: "text-sm font-medium text-default-700",
                          input: "text-sm",
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-6">
                      <div>
                        <Controller
                          name="discountType"
                          control={control}
                          rules={{ required: "Discount type is required" }}
                          render={({ field }) => (
                            <Select
                              label="Discount Type"
                              labelPlacement="outside"
                              placeholder="Select discount type"
                              variant="bordered"
                              selectedKeys={[field.value]}
                              onChange={field.onChange}
                              startContent={
                                field.value === "PERCENTAGE" ? (
                                  <Percent
                                    className="text-default-400 pointer-events-none flex-shrink-0"
                                    size={16}
                                  />
                                ) : (
                                  <DollarSign
                                    className="text-default-400 pointer-events-none flex-shrink-0"
                                    size={16}
                                  />
                                )
                              }
                              isInvalid={!!errors.discountType}
                              errorMessage={errors.discountType?.message?.toString()}
                              classNames={{
                                label: "text-sm font-medium text-default-700",
                                trigger: "h-12",
                              }}
                            >
                              <SelectItem
                                key="PERCENTAGE"
                                startContent={<Percent size={16} />}
                                textValue="Percentage"
                              >
                                Percentage (%)
                              </SelectItem>
                              <SelectItem
                                key="FIXED"
                                startContent={<DollarSign size={16} />}
                                textValue="Fixed"
                              >
                                Fixed Amount ($)
                              </SelectItem>
                            </Select>
                          )}
                        />
                      </div>

                      <div>
                        <Input
                          type="number"
                          label="Discount Value"
                          labelPlacement="outside"
                          {...register("discount", {
                            required: "Discount value is required",
                            min: {
                              value: 1,
                              message: "Discount must be at least 1",
                            },
                            max: {
                              value: discountType === "PERCENTAGE" ? 100 : 1000,
                              message:
                                discountType === "PERCENTAGE"
                                  ? "Percentage cannot exceed 100%"
                                  : "Fixed discount cannot exceed $1000",
                            },
                          })}
                          placeholder={
                            discountType === "PERCENTAGE"
                              ? "e.g. 15"
                              : "e.g. 10"
                          }
                          variant="bordered"
                          startContent={
                            discountType === "PERCENTAGE" ? (
                              <Percent
                                className="text-default-400 pointer-events-none flex-shrink-0"
                                size={16}
                              />
                            ) : (
                              <DollarSign
                                className="text-default-400 pointer-events-none flex-shrink-0"
                                size={16}
                              />
                            )
                          }
                          isInvalid={!!errors.discount}
                          errorMessage={errors.discount?.message?.toString()}
                          classNames={{
                            label: "text-sm font-medium text-default-700",
                            input: "text-sm",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Input
                        type="number"
                        label="Minimum Order Value"
                        labelPlacement="outside"
                        {...register("minimumOrderValue", {
                          required: "Minimum order value is required",
                          min: {
                            value: 0,
                            message: "Minimum order value cannot be negative",
                          },
                        })}
                        placeholder="e.g. 50"
                        variant="bordered"
                        startContent={
                          <ShoppingBag
                            className="text-default-400 pointer-events-none flex-shrink-0"
                            size={16}
                          />
                        }
                        isInvalid={!!errors.minimumOrderValue}
                        errorMessage={errors.minimumOrderValue?.message?.toString()}
                        classNames={{
                          label: "text-sm font-medium text-default-700",
                          input: "text-sm",
                        }}
                      />
                    </div>

                    <div>
                      <Input
                        type="number"
                        label="Usage Limit"
                        labelPlacement="outside"
                        {...register("usageLimit", {
                          required: "Usage limit is required",
                          min: {
                            value: 1,
                            message: "Usage limit must be at least 1",
                          },
                        })}
                        placeholder="e.g. 100"
                        variant="bordered"
                        startContent={
                          <Repeat
                            className="text-default-400 pointer-events-none flex-shrink-0"
                            size={16}
                          />
                        }
                        isInvalid={!!errors.usageLimit}
                        errorMessage={errors.usageLimit?.message?.toString()}
                        classNames={{
                          label: "text-sm font-medium text-default-700",
                          input: "text-sm",
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-default-700">
                          Expiry Date
                        </label>
                        <Tooltip content="When this coupon will expire">
                          <Info size={16} className="text-default-400" />
                        </Tooltip>
                      </div>
                      <div className="relative">
                        <input
                          type="date"
                          onChange={(e) =>
                            setSelectedDate(
                              e.target.value ? new Date(e.target.value) : null
                            )
                          }
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full h-12 px-3 py-2 text-sm border rounded-lg border-default-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
                        />
                        <Clock
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-default-400"
                          size={16}
                        />
                      </div>
                      {!selectedDate && (
                        <p className="text-xs text-danger mt-1">
                          Expiry date is required
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-default-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Coupon Preview</h4>
                      <p className="text-xs text-default-500 mt-1">
                        {watch("code") ? watch("code") : "CODE"} -
                        {watch("discount")
                          ? ` ${watch("discount")}${discountType === "PERCENTAGE" ? "%" : "$"} off`
                          : " Discount"}
                        {watch("minimumOrderValue")
                          ? ` on orders over $${watch("minimumOrderValue")}`
                          : ""}
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
                  isDisabled={!isValid || !selectedDate || isPending}
                  className="font-medium"
                >
                  Create Coupon
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

