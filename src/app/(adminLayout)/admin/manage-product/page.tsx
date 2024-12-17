"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { DeleteIcon } from "@/src/components/icons";
import React, { useState } from "react";
import { IProduct } from "@/src/types";
import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/product";
import UpdateProduct from "@/src/components/modal/vendor/UpdateProduct";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { limit } from "@/src/const/const";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PRICE", uid: "price" },
  { name: "INVENTORY", uid: "inventory" },
  { name: "DISCOUNT", uid: "discount" },
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
  | "isFlashSale"
> & { actions: string; shopName: string; categoryName: string };

const ManageProduct = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data, refetch, isLoading } = useGetAllProducts([
    { name: "limit", value: limit },
    { name: "page", value: page },
  ]);
  const { mutate: deleteProduct } = useDeleteProduct();
  const meta = data?.meta;
  const productData =
    data?.data?.map((product) => ({
      id: product.id,
      discount_percentage: product?.discount_percentage,
      name: product?.name,
      description: product?.description,
      images: product?.images,
      inventory: product?.inventory,
      price: product?.price,
      categoryName: product.category.name,
      shopName: product.shop.shopName,
      isFlashSale: product?.isFlashSale,
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
        case "price":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {product.price}
            </div>
          );
        case "inventory":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {product.inventory}
            </div>
          );
        case "discount_percentage":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {product.discount_percentage || "N/A"}
            </div>
          );
        case "shopName":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              {product.shopName}
            </div>
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
