"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
} from "@nextui-org/react";

import { DeleteIcon } from "@/src/components/icons";
import React, { useState } from "react";
import { ICoupon } from "@/src/types";
import { useDeleteCoupon, useGetAllCoupon } from "@/src/hooks/coupon";
import CreateCoupon from "@/src/components/modal/admin/CreateCoupon";
import { toast } from "sonner";
import { limit } from "@/src/const/const";

const columns = [
  { name: "CODE", uid: "code" },
  { name: "DISCOUNT", uid: "discount" },
  { name: "DISCOUNT TYPE", uid: "discountType" },
  { name: "STATUS", uid: "status" },
  { name: "EXPIRY DATE", uid: "expiryDate" },
  { name: "MINIMUM ORDER VALUE", uid: "minimumOrderValue" },
  { name: "USAGE LIMIT", uid: "usageLimit" },
  { name: "ACTIONS", uid: "actions" },
];

type TCouponData = Pick<
  ICoupon,
  | "code"
  | "discount"
  | "discountType"
  | "id"
  | "status"
  | "expiryDate"
  | "minimumOrderValue"
  | "usageLimit"
> & {
  actions: string;
};

const ManageCoupon = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    refetch: refetchCoupon,
    isLoading,
  } = useGetAllCoupon([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const { mutate: deleteCoupon } = useDeleteCoupon();
  const meta = data?.meta;
  const couponData =
    data?.data?.map((coupon) => ({
      id: coupon.id,
      code: coupon?.code,
      discount: coupon?.discount,
      discountType: coupon?.discountType,
      status: coupon?.status,
      expiryDate: coupon?.expiryDate,
      minimumOrderValue: coupon?.minimumOrderValue,
      usageLimit: coupon?.usageLimit,
    })) || [];

  const handleDeleteCoupon = (id: string) => {
    deleteCoupon(id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          refetchCoupon();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const renderCell = React.useCallback(
    (coupon: TCouponData, columnKey: keyof TCouponData) => {
      const cellValue = coupon[columnKey];

      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <button
                onClick={() => handleDeleteCoupon(coupon.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="col-span-12 lg:col-span-9">
      <div className="flex justify-end mb-5">
        <CreateCoupon />
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "end" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          isLoading={isLoading}
          items={couponData}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item as TCouponData,
                    columnKey as keyof TCouponData
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!isLoading && (
        <div className="my-10 flex justify-end">
          <Pagination
            loop
            showControls
            onChange={(page) => setPage(page)}
            page={page}
            total={meta?.total ? Math.ceil(meta?.total / limit) : 1}
          />
        </div>
      )}
    </div>
  );
};

export default ManageCoupon;
