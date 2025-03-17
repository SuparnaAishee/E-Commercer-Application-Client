// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Select,
//   SelectItem,
//   Spinner,
//   Pagination,
// } from "@nextui-org/react";

// import { IOrder } from "@/src/types";
// import { toast } from "sonner";
// import { limit, OrderStatus } from "@/src/const/const";
// import { useGetAllOrder, useUpdateOrderStatus } from "@/src/hooks/order";
// import React, { useState } from "react";

// const columns = [
//   { name: "PRODUCT", uid: "product" },
//   { name: "QUANTITY", uid: "quantity" },
//   { name: "ISPAID", uid: "isPaid" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type TOrder = Pick<IOrder, "id" | "isPaid" | "status" | "quantity"> & {
//   actions: string;
//   product: string;
//   image: string;
//   name: string;
//   ShopName: string;
// };

// const ManageUser = () => {
//   const [page, setPage] = useState(1);
//   const {
//     data,
//     refetch: refetchAllOrder,
//     isLoading,
//   } = useGetAllOrder([
//     { name: "limit", value: limit },
//     { name: "page", value: page },
//   ]);
//   const { mutate: updateOrder } = useUpdateOrderStatus();
//   const meta = data?.meta;

//   const orderData =
//     data?.data?.map((order) => ({
//       id: order.id,
//       isPaid: order?.isPaid,
//       status: order?.status,
//       quantity: order?.quantity,
//       image: order?.product?.images[0],
//       name: order?.product?.name,
//       shopName: order?.shop?.shopName,
//       ShopName: order.shop?.shopName,
//       product: order.product?.name,
//       actions: "default",
//     })) || [];

//   const handleUpdateOrderStatus = (status: string, order: TOrder) => {
//     const payload = {
//       id: order.id,
//       status,
//     };
//     updateOrder(payload, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success("Order is updated successfully");
//           refetchAllOrder();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const renderCell = React.useCallback(
//     (order: TOrder, columnKey: keyof TOrder) => {
//       const cellValue = order[columnKey];

//       switch (columnKey) {
//         case "product":
//           return (
//             <User
//               avatarProps={{ radius: "lg", src: order.image }}
//               description={order?.ShopName}
//               name={order?.name}
//             ></User>
//           );
//         case "quantity":
//           return <p>{order?.quantity}</p>;
//         case "isPaid":
//           return (
//             <Chip
//               className="capitalize"
//               color={order?.isPaid ? "success" : "danger"}
//               size="sm"
//               variant="flat"
//             >
//               {order.isPaid ? "Paid" : "Un Paid"}
//             </Chip>
//           );
//         case "status":
//           return (
//             <Chip
//               className="capitalize"
//               color={
//                 order?.status === "COMPLETED"
//                   ? "success"
//                   : order.status === "PENDING"
//                     ? "warning"
//                     : "danger"
//               }
//               size="sm"
//               variant="flat"
//             >
//               {order.status}
//             </Chip>
//           );

//         case "actions":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               <Select
//                 onChange={(e) =>
//                   handleUpdateOrderStatus(e.target.value, order as TOrder)
//                 }
//                 placeholder={order.status}
//                 className="max-w-xs"
//                 aria-label="Role"
//               >
//                 <SelectItem key={OrderStatus.PENDING}>Pending</SelectItem>
//                 <SelectItem key={OrderStatus.COMPLETED}>Completed</SelectItem>
//                 <SelectItem key={OrderStatus.CANCELLED}>Cancelled</SelectItem>
//               </Select>
//             </div>
//           );
//         default:
//           return cellValue;
//       }
//     },
//     []
//   );

//   return (
//     <div className="col-span-12 lg:col-span-9">
//       <Table aria-label="Example table with custom cells">
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={column.uid === "actions" ? "center" : "start"}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody
//           loadingContent={<Spinner />}
//           isLoading={isLoading}
//           items={orderData}
//         >
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(item as TOrder, columnKey as keyof TOrder)}
//                 </TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       {!isLoading && (
//         <div className="my-10 flex justify-end">
//           <Pagination
//             loop
//             showControls
//             onChange={(page) => setPage(page)}
//             page={page}
//             total={meta?.total ? Math.ceil(meta?.total / limit) : 1}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUser;
"use client";

import { useState } from "react";
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
  Card,
  CardBody,
  Input,
  Button,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "@nextui-org/react";
import { toast } from "sonner";
import type { IOrder } from "@/src/types";
import { limit, OrderStatus } from "@/src/const/const";
import { useGetAllOrder, useUpdateOrderStatus } from "@/src/hooks/order";
// Add imports for the new icons
import {
  Search,
  RefreshCw,
  Filter,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import React from "react";

const columns = [
  { name: "PRODUCT", uid: "product" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "PAYMENT", uid: "isPaid" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

type TOrder = Pick<IOrder, "id" | "isPaid" | "status" | "quantity"> & {
  actions: string;
  product: string;
  image: string;
  name: string;
  ShopName: string;
};

const ManageOrder = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const searchTimeout = React.useRef(null);

  const {
    data,
    refetch: refetchAllOrder,
    isLoading,
  } = useGetAllOrder([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "search", value: searchQuery },
    { name: "status", value: statusFilter !== "all" ? statusFilter : "" },
  ]);

  const { mutate: updateOrder } = useUpdateOrderStatus();
  const meta = data?.meta;

  const orderData =
    data?.data?.map((order) => ({
      id: order.id,
      isPaid: order?.isPaid,
      status: order?.status,
      quantity: order?.quantity,
      image: order?.product?.images[0],
      name: order?.product?.name,
      shopName: order?.shop?.shopName,
      ShopName: order.shop?.shopName,
      product: order.product?.name,
      actions: "default",
    })) || [];

  const handleUpdateOrderStatus = (status: string, order: TOrder) => {
    const payload = {
      id: order.id,
      status,
    };
    updateOrder(payload, {
      onSuccess(data) {
        if (data?.success) {
          toast.success("Order status updated successfully", {
            position: "top-center",
            duration: 3000,
          });
          refetchAllOrder();
        } else {
          toast.error(data?.message, {
            position: "top-center",
            duration: 3000,
          });
        }
      },
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchAllOrder();
    setIsRefreshing(false);
  };
//@ts-ignore
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Reset to first page when searching
    if (page !== 1) setPage(1);

    // Debounced search - only trigger after typing stops
    //@ts-ignore
    clearTimeout(searchTimeout.current);
    //@ts-ignore
    searchTimeout.current = setTimeout(() => {
      refetchAllOrder();
    }, 500);
  };
//@ts-ignore
  const handleFilterChange = (key) => {
    setStatusFilter(key);
    // Reset to first page when filtering
    if (page !== 1) setPage(1);

    if (key === "all") {
      refetchAllOrder({
        //@ts-ignore
        queryParams: [
          { name: "limit", value: limit },
          { name: "page", value: 1 },
        ],
      });
    } else {
      refetchAllOrder({
        //@ts-ignore
        queryParams: [
          { name: "limit", value: limit },
          { name: "page", value: 1 },
          { name: "status", value: key },
        ],
      });
    }
  };
//@ts-ignore
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "warning";
      case "CANCELLED":
        return "danger";
      default:
        return "default";
    }
  };

  const renderCell = (order: TOrder, columnKey: keyof TOrder) => {
    const cellValue = order[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: order.image,
              className: "w-10 h-10 text-large",
            }}
            description={order?.ShopName}
            name={order?.name}
            classNames={{
              name: "text-sm font-semibold",
              description: "text-xs text-default-500",
            }}
          />
        );
      case "quantity":
        return (
          <Badge content={order?.quantity} color="primary" size="sm">
            <div className="w-5 h-5"></div>
          </Badge>
        );
      case "isPaid":
        return (
          <Chip
            startContent={<DollarSign className="w-3 h-3" />}
            className="capitalize text-xs"
            color={order?.isPaid ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {order.isPaid ? "Paid" : "Unpaid"}
          </Chip>
        );
      case "status":
        return (
          <Chip
            className="capitalize text-xs"
            color={getStatusColor(order?.status)}
            size="sm"
            variant="flat"
          >
            {order.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            {order.status !== OrderStatus.COMPLETED && (
              <Tooltip content="Mark as completed">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="success"
                  onClick={() =>
                    handleUpdateOrderStatus(
                      OrderStatus.COMPLETED,
                      order as TOrder
                    )
                  }
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}

            {order.status !== OrderStatus.PENDING && (
              <Tooltip content="Mark as pending">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="warning"
                  onClick={() =>
                    handleUpdateOrderStatus(
                      OrderStatus.PENDING,
                      order as TOrder
                    )
                  }
                >
                  <Clock className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}

            {order.status !== OrderStatus.CANCELLED && (
              <Tooltip content="Cancel order">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onClick={() =>
                    handleUpdateOrderStatus(
                      OrderStatus.CANCELLED,
                      order as TOrder
                    )
                  }
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <Card className="shadow-sm">
        <CardBody className="p-0">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Manage Orders</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    classNames={{
                      base: "max-w-[300px]",
                      inputWrapper: "h-9",
                      input: "text-sm",
                    }}
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={handleSearch}
                    startContent={
                      <Search className="w-4 h-4 text-default-400" />
                    }
                  />
                </div>
                <Tooltip content="Refresh data">
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={handleRefresh}
                    isLoading={isRefreshing}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </Tooltip>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly variant="flat" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Filter options"
                    selectedKeys={[statusFilter]}
                    selectionMode="single"
                    onAction={(key) => handleFilterChange(key)}
                  >
                    <DropdownItem key="all">All Orders</DropdownItem>
                    <DropdownItem key="PENDING">Pending Orders</DropdownItem>
                    <DropdownItem key="COMPLETED">
                      Completed Orders
                    </DropdownItem>
                    <DropdownItem key="CANCELLED">
                      Cancelled Orders
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Table
              aria-label="Orders table"
              bottomContent={
                //@ts-ignore
                !isLoading && meta?.total > limit ? (
                  <div className="flex justify-center py-2">
                    <Pagination
                      showControls
                      color="primary"
                      page={page}
                      total={meta?.total ? Math.ceil(meta?.total / limit) : 1}
                      onChange={setPage}
                      classNames={{
                        cursor: "bg-primary",
                      }}
                    />
                  </div>
                ) : null
              }
              classNames={{
                wrapper: "min-h-[400px]",
              }}
            >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "end" : "start"}
                    className="text-xs uppercase"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={orderData}
                isLoading={isLoading}
                loadingContent={
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                emptyContent={
                  <div className="flex justify-center items-center h-40 text-default-400">
                    No orders found
                  </div>
                }
              >
                {(item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-default-50 transition-colors"
                  >
                    {(columnKey) => (
                      <TableCell>
                        {renderCell(item as TOrder, columnKey as keyof TOrder)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ManageOrder;

