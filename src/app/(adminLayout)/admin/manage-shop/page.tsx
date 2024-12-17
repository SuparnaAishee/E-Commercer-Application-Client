"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Select,
  SelectItem,
  Pagination,
} from "@nextui-org/react";

import { toast } from "sonner";
import { useGetAllShop, useUpdateShopStatus } from "@/src/hooks/shop";
import { IShop, IUpdateShopStatus } from "@/src/types";
import React, { useState } from "react";
import { limit, ShopStatus } from "@/src/const/const";

const columns = [
  { name: "SHOPNAME", uid: "shopName" },
  { name: "USERNAME", uid: "userName" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

type TPickShop = Pick<
  IShop,
  "id" | "shopLogo" | "shopName" | "status" | "shopDetails"
> & {
  actions: string;
  userName: string;
};

const ManageUser = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    refetch: refetchShop,
    isLoading,
  } = useGetAllShop([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const { mutate: updateStatusRole } = useUpdateShopStatus();
  const meta = data?.meta;

  const shopData =
    data?.data?.map((shop) => ({
      id: shop.id,
      shopName: shop?.shopName,
      userName: shop?.user?.name,
      status: shop?.status,
      shopDetails: shop?.shopDetails,
      shopLogo: shop?.shopLogo,
    })) || [];

  const handleUpdateShopStatus = (data: IUpdateShopStatus) => {
    const payload = {
      status: data?.status,
      shopId: data?.shopId,
    };
    updateStatusRole(payload, {
      onSuccess(data) {
        if (data?.success) {
          toast.success("Shop status is updated successfully");
          refetchShop();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const renderCell = React.useCallback(
    (shop: TPickShop, columnKey: keyof TPickShop) => {
      const cellValue = shop[columnKey];

      switch (columnKey) {
        case "shopName":
          return (
            <User
              avatarProps={{ radius: "lg", src: shop.shopLogo }}
              description={shop.shopDetails}
              name={cellValue}
            ></User>
          );
        case "userName":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {shop.userName}
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={shop?.status === ShopStatus.ACTIVE ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                onChange={(e) =>
                  handleUpdateShopStatus({
                    status: e.target.value as "ACTIVE" | "BLOCKED",
                    shopId: shop?.id,
                  })
                }
                placeholder={shop.status}
                className="max-w-xs"
                aria-label="Role"
              >
                <SelectItem key={ShopStatus.ACTIVE}>Active</SelectItem>
                <SelectItem key={ShopStatus.BLOCKED}>Block</SelectItem>
              </Select>
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
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={shopData}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item as TPickShop, columnKey as keyof TPickShop)}
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

export default ManageUser;
