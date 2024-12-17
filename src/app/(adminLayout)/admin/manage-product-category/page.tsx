"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { DeleteIcon } from "@/src/components/icons";
import React, { useState } from "react";
import { ICategories } from "@/src/types";
import { toast } from "sonner";
import { useDeleteCategory, useGetAllCategory } from "@/src/hooks/category";
import CreateProductCategory from "@/src/components/modal/admin/CreateProductCategory";
import UpdateProductCategory from "@/src/components/modal/admin/UpdateProductCategory";
import Image from "next/image";
import { limit } from "@/src/const/const";

const columns = [
  { name: "IMAGE", uid: "image" },
  { name: "NAME", uid: "name" },
  { name: "ACTIONS", uid: "actions" },
];

type TCategory = Pick<ICategories, "name" | "id" | "image"> & {
  actions: string;
};

const ManageProductCategory = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    refetch: refetchCategory,
    isLoading,
  } = useGetAllCategory([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const { mutate: deleteCategory } = useDeleteCategory();
  const meta = data?.meta;
  const categoryData =
    data?.data?.map((category) => ({
      id: category.id,
      name: category?.name,
      image: category?.image,
    })) || [];

  const handleDeleteCategory = (category: TCategory) => {
    deleteCategory(category.id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          refetchCategory();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const renderCell = React.useCallback(
    (category: TCategory, columnKey: keyof TCategory) => {
      const cellValue = category[columnKey];

      switch (columnKey) {
        case "image":
          return (
            <Image
              className="rounded-2xl object-contain"
              height={30}
              width={30}
              src={category?.image}
              alt="Category"
            />
          );
        case "name":
          return <p>{category.name}</p>;

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <UpdateProductCategory id={category.id} />

              <button
                onClick={() => handleDeleteCategory(category)}
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
        <CreateProductCategory />
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
          items={categoryData}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item as TCategory, columnKey as keyof TCategory)}
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

export default ManageProductCategory;
