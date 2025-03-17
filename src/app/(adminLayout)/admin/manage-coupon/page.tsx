// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Spinner,
//   Pagination,
// } from "@nextui-org/react";

// import { DeleteIcon } from "@/src/components/icons";
// import React, { useState } from "react";
// import { ICoupon } from "@/src/types";
// import { useDeleteCoupon, useGetAllCoupon } from "@/src/hooks/coupon";
// import CreateCoupon from "@/src/components/modal/admin/CreateCoupon";
// import { toast } from "sonner";
// import { limit } from "@/src/const/const";

// const columns = [
//   { name: "CODE", uid: "code" },
//   { name: "DISCOUNT", uid: "discount" },
//   { name: "DISCOUNT TYPE", uid: "discountType" },
//   { name: "STATUS", uid: "status" },
//   { name: "EXPIRY DATE", uid: "expiryDate" },
//   { name: "MINIMUM ORDER VALUE", uid: "minimumOrderValue" },
//   { name: "USAGE LIMIT", uid: "usageLimit" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type TCouponData = Pick<
//   ICoupon,
//   | "code"
//   | "discount"
//   | "discountType"
//   | "id"
//   | "status"
//   | "expiryDate"
//   | "minimumOrderValue"
//   | "usageLimit"
// > & {
//   actions: string;
// };

// const ManageCoupon = () => {
//   const [page, setPage] = useState(1);
//   const {
//     data,
//     refetch: refetchCoupon,
//     isLoading,
//   } = useGetAllCoupon([
//     { name: "limit", value: limit },
//     { name: "page", value: page },
//   ]);
//   const { mutate: deleteCoupon } = useDeleteCoupon();
//   const meta = data?.meta;
//   const couponData =
//     data?.data?.map((coupon) => ({
//       id: coupon.id,
//       code: coupon?.code,
//       discount: coupon?.discount,
//       discountType: coupon?.discountType,
//       status: coupon?.status,
//       expiryDate: coupon?.expiryDate,
//       minimumOrderValue: coupon?.minimumOrderValue,
//       usageLimit: coupon?.usageLimit,
//     })) || [];

//   const handleDeleteCoupon = (id: string) => {
//     deleteCoupon(id, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           refetchCoupon();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const renderCell = React.useCallback(
//     (coupon: TCouponData, columnKey: keyof TCouponData) => {
//       const cellValue = coupon[columnKey];

//       switch (columnKey) {
//         case "actions":
//           return (
//             <div className="relative flex items-center justify-end gap-2">
//               <button
//                 onClick={() => handleDeleteCoupon(coupon.id)}
//                 className="text-lg text-danger cursor-pointer active:opacity-50"
//               >
//                 <DeleteIcon />
//               </button>
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
//       <div className="flex justify-end mb-5">
//         <CreateCoupon />
//       </div>
//       <Table aria-label="Example table with custom cells">
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn
//               key={column.uid}
//               align={column.uid === "actions" ? "end" : "start"}
//             >
//               {column.name}
//             </TableColumn>
//           )}
//         </TableHeader>
//         <TableBody
//           loadingContent={<Spinner />}
//           isLoading={isLoading}
//           items={couponData}
//         >
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(
//                     item as TCouponData,
//                     columnKey as keyof TCouponData
//                   )}
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

// export default ManageCoupon;
"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Card,
  CardBody,
  Button,
  Input,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@nextui-org/react";
import { toast } from "sonner";
import type { ICoupon } from "@/src/types";
import { useDeleteCoupon, useGetAllCoupon } from "@/src/hooks/coupon";
import CreateCoupon from "@/src/components/modal/admin/CreateCoupon";
import { limit } from "@/src/const/const";
import {
  Search,
  RefreshCw,
  Filter,
 
  Trash2,
  AlertTriangle,
  Tag,
  Calendar,
} from "lucide-react";
import React from "react";

const columns = [
  { name: "CODE", uid: "code" },
  { name: "DISCOUNT", uid: "discount" },
  { name: "TYPE", uid: "discountType" },
  { name: "STATUS", uid: "status" },
  { name: "EXPIRY", uid: "expiryDate" },
  { name: "MIN ORDER", uid: "minimumOrderValue" },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<TCouponData | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchTimeout = React.useRef(null);

  const {
    data,
    refetch: refetchCoupon,
    isLoading,
  } = useGetAllCoupon([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "search", value: searchQuery },
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

  const handleDeleteCoupon = (coupon: TCouponData) => {
    setCouponToDelete(coupon);
    onOpen();
  };

  const confirmDelete = () => {
    if (!couponToDelete) return;

    deleteCoupon(couponToDelete.id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message, {
            position: "top-center",
            duration: 3000,
          });
          refetchCoupon();
        } else {
          toast.error(data?.message, {
            position: "top-center",
            duration: 3000,
          });
        }
        onClose();
      },
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetchCoupon();
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
      refetchCoupon();
    }, 500);
  };
  //@ts-ignore
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderCell = (coupon: TCouponData, columnKey: keyof TCouponData) => {
    const cellValue = coupon[columnKey];

    switch (columnKey) {
      case "code":
        return (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{coupon.code}</span>
          </div>
        );
      case "discount":
        return (
          <Chip color="primary" variant="flat" size="sm">
            {coupon.discount}
            {coupon.discountType === "PERCENTAGE" ? "%" : "$"}
          </Chip>
        );
      case "discountType":
        return <span className="text-xs">{coupon.discountType}</span>;
      case "status":
        return (
          <Chip
            className="capitalize text-xs"
            color={coupon.status === "ACTIVE" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {coupon.status}
          </Chip>
        );
      case "expiryDate":
        return (
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-default-400" />
            <span className="text-xs">{formatDate(coupon.expiryDate)}</span>
          </div>
        );
      case "minimumOrderValue":
        return <span className="text-xs">${coupon.minimumOrderValue}</span>;
      case "usageLimit":
        return <span className="text-xs">{coupon.usageLimit}</span>;
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            <Tooltip content="Delete coupon">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={() => handleDeleteCoupon(coupon)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </Tooltip>
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
              <h2 className="text-xl font-semibold">Manage Coupons</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    classNames={{
                      base: "max-w-[300px]",
                      inputWrapper: "h-9",
                      input: "text-sm",
                    }}
                    placeholder="Search coupons..."
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
                    selectionMode="single"
                    onAction={(key) => {
                      if (key === "active") {
                        refetchCoupon({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "status", value: "ACTIVE" },
                          ],
                        });
                      } else if (key === "expired") {
                        refetchCoupon({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "status", value: "EXPIRED" },
                          ],
                        });
                      } else if (key === "percentage") {
                        refetchCoupon({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "discountType", value: "PERCENTAGE" },
                          ],
                        });
                      } else if (key === "fixed") {
                        refetchCoupon({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "discountType", value: "FIXED" },
                          ],
                        });
                      } else {
                        refetchCoupon({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                          ],
                        });
                      }
                      // Reset to first page when filtering
                      if (page !== 1) setPage(1);
                    }}
                  >
                    <DropdownItem key="all">All Coupons</DropdownItem>
                    <DropdownItem key="active">Active Coupons</DropdownItem>
                    <DropdownItem key="expired">Expired Coupons</DropdownItem>
                    <DropdownItem key="percentage">
                      Percentage Discounts
                    </DropdownItem>
                    <DropdownItem key="fixed">Fixed Discounts</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <CreateCoupon></CreateCoupon>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table
                aria-label="Coupons table"
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
                  items={couponData}
                  isLoading={isLoading}
                  loadingContent={
                    <div className="flex justify-center items-center h-40">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  }
                  emptyContent={
                    <div className="flex justify-center items-center h-40 text-default-400">
                      No coupons found
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
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center">
                <AlertTriangle className="w-5 h-5 text-danger" />
                Confirm Deletion
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete the coupon code &quot;
                  {couponToDelete?.code}&quot;? This action cannot be undone.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={confirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManageCoupon;

