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
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { IOrder } from "@/src/types";
import React, { useState } from "react";
import { useGetMyShop } from "@/src/hooks/shop";
import { useRouter } from "next/navigation";
import { limit } from "@/src/const/const";
import { useGetShopOrder } from "@/src/hooks/order";

const columns = [
  { name: "PRODUCT", uid: "product" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "ISPAID", uid: "isPaid" },
  { name: "PRICE", uid: "price" },
  { name: "DELIVERY", uid: "status" },
];

type TOrder = Pick<IOrder, "id" | "isPaid" | "status" | "quantity"> & {
  product: string;
  image: string;
  name: string;
  ShopName: string;
  price: number;
};

const ManageUser = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetMyShop();
  const shopId = data?.data?.id;
  const { data: shopOrder, isLoading } = useGetShopOrder({
    limit,
    page,
    shopId: shopId as string,
  });
  const meta = shopOrder?.meta;
  const router = useRouter();

  const orderData =
    shopOrder?.data?.map((order) => ({
      id: order?.productId,
      isPaid: order?.isPaid,
      status: order?.status,
      quantity: order?.quantity,
      image: order?.product?.images[0],
      name: order?.product?.name,
      shopName: order?.shop?.shopName,
      ShopName: order.shop?.shopName,
      product: order.product?.name,
      price: order?.quantity * order?.product?.price,
    })) || [];

  const renderCell = React.useCallback(
    (order: TOrder, columnKey: keyof TOrder) => {
      const cellValue = order[columnKey];

      switch (columnKey) {
        case "product":
          return (
            <User
              className="cursor-pointer"
              onClick={() => router.push(`/products/${order?.id}`)}
              avatarProps={{ radius: "lg", src: order.image }}
              description={order?.ShopName}
              name={order?.name}
            ></User>
          );
        case "quantity":
          return <p>{order?.quantity}</p>;
        case "isPaid":
          return (
            <Chip
              className="capitalize"
              color={order?.isPaid ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {order.isPaid ? "Paid" : "Un Paid"}
            </Chip>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={
                order?.status === "COMPLETED"
                  ? "success"
                  : order.status === "PENDING"
                    ? "warning"
                    : "danger"
              }
              size="sm"
              variant="flat"
            >
              {order.status}
            </Chip>
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
              align={column.uid === "status" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          isLoading={isLoading}
          items={orderData}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item as TOrder, columnKey as keyof TOrder)}
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
            total={meta?.total ? Math.ceil(meta.total / limit) : 1}
          />
        </div>
      )}
    </div>
  );
};

export default ManageUser;
