"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Spinner,
  Pagination,
} from "@nextui-org/react";

import { DeleteIcon } from "@/src/components/icons";
import React, { useState } from "react";
import { IProduct } from "@/src/types";
import { useDeleteProduct, useGetMyProducts } from "@/src/hooks/product";
import UpdateProduct from "@/src/components/modal/vendor/UpdateProduct";
import CreateProduct from "@/src/components/modal/vendor/CreateProduct";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CreateFlashSale from "@/src/components/modal/vendor/CreateFlashSale";
import moment from "moment";
import { limit } from "@/src/const/const";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PRICE", uid: "price" },
  { name: "INVENTORY", uid: "inventory" },
  { name: "DISCOUNT", uid: "discount_percentage" },
  { name: "Sale End Time", uid: "sale_end_time" },
  { name: "SHOP", uid: "shopName" },
  { name: "ACTIONS", uid: "actions" },
];

type TPickProduct = Pick<
  IProduct,
  | "images"
  | "name"
  | "description"
  | "inventory"
  | "price"
  | "discount_percentage"
  | "id"
  | "sale_end_time"
> & { actions: string; shopName: string; categoryName: string };

const ManageProduct = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, refetch, isLoading } = useGetMyProducts([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const meta = data?.meta;
  const { mutate: deleteProduct } = useDeleteProduct();
  const productData =
    data?.data?.map((product) => ({
      id: product.id,
      
      discount_percentage: product?.discount_percentage || "N/A",
      name: product?.name,
      description: product?.description,
      images: product?.images,
      inventory: product?.inventory,
      price: product?.price,
      categoryName: product.category.name,
      sale_end_time: product?.sale_end_time
        ? moment(product?.sale_end_time).format("DD-MM-YYYY")
        : "N/A",
      shopName: product.shop.shopName,
    })) || [];

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message);
          refetch();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const renderCell = React.useCallback(
    (product: TPickProduct, columnKey: keyof TPickProduct) => {
      const cellValue = product[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              className="cursor-pointer"
              onClick={() => router.push(`/products/${product?.id}`)}
              avatarProps={{ radius: "lg", src: product.images[0] }}
              description={product.shopName}
              name={cellValue}
            />
          );

        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-5">
              <UpdateProduct id={product.id} />

              <button
                onClick={() => handleDeleteProduct(product.id)}
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
      <div className="flex justify-end gap-3 mb-5">
        <CreateFlashSale />
        <CreateProduct />
      </div>
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
        <TableBody
          loadingContent={<Spinner />}
          isLoading={isLoading}
          items={productData}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(
                    item as TPickProduct,
                    columnKey as keyof TPickProduct
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

export default ManageProduct;
