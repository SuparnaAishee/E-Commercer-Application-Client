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
//   Pagination,
// } from "@nextui-org/react";

// import { toast } from "sonner";
// import { useGetAllShop, useUpdateShopStatus } from "@/src/hooks/shop";
// import { IShop, IUpdateShopStatus } from "@/src/types";
// import React, { useState } from "react";
// import { limit, ShopStatus } from "@/src/const/const";

// const columns = [
//   { name: "SHOPNAME", uid: "shopName" },
//   { name: "USERNAME", uid: "userName" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type TPickShop = Pick<
//   IShop,
//   "id" | "shopLogo" | "shopName" | "status" | "shopDetails"
// > & {
//   actions: string;
//   userName: string;
// };

// const ManageUser = () => {
//   const [page, setPage] = useState(1);
//   const {
//     data,
//     refetch: refetchShop,
//     isLoading,
//   } = useGetAllShop([
//     { name: "limit", value: limit },
//     { name: "page", value: page },
//   ]);
//   const { mutate: updateStatusRole } = useUpdateShopStatus();
//   const meta = data?.meta;

//   const shopData =
//     data?.data?.map((shop) => ({
//       id: shop.id,
//       shopName: shop?.shopName,
//       userName: shop?.user?.name,
//       status: shop?.status,
//       shopDetails: shop?.shopDetails,
//       shopLogo: shop?.shopLogo,
//     })) || [];

//   const handleUpdateShopStatus = (data: IUpdateShopStatus) => {
//     const payload = {
//       status: data?.status,
//       shopId: data?.shopId,
//     };
//     updateStatusRole(payload, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success("Shop status is updated successfully");
//           refetchShop();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const renderCell = React.useCallback(
//     (shop: TPickShop, columnKey: keyof TPickShop) => {
//       const cellValue = shop[columnKey];

//       switch (columnKey) {
//         case "shopName":
//           return (
//             <User
//               avatarProps={{ radius: "lg", src: shop.shopLogo }}
//               description={shop.shopDetails}
//               name={cellValue}
//             ></User>
//           );
//         case "userName":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               {shop.userName}
//             </div>
//           );
//         case "status":
//           return (
//             <Chip
//               className="capitalize"
//               color={shop?.status === ShopStatus.ACTIVE ? "success" : "danger"}
//               size="sm"
//               variant="flat"
//             >
//               {cellValue}
//             </Chip>
//           );
//         case "actions":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               <Select
//                 onChange={(e) =>
//                   handleUpdateShopStatus({
//                     status: e.target.value as "ACTIVE" | "BLOCKED",
//                     shopId: shop?.id,
//                   })
//                 }
//                 placeholder={shop.status}
//                 className="max-w-xs"
//                 aria-label="Role"
//               >
//                 <SelectItem key={ShopStatus.ACTIVE}>Active</SelectItem>
//                 <SelectItem key={ShopStatus.BLOCKED}>Block</SelectItem>
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
//         <TableBody items={shopData}>
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(item as TPickShop, columnKey as keyof TPickShop)}
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useGetAllShop, useUpdateShopStatus } from "@/src/hooks/shop";
import type { IShop, IUpdateShopStatus } from "@/src/types";
import { limit, ShopStatus } from "@/src/const/const";
import { Search, RefreshCw, Filter, Ban, CheckCircle } from "lucide-react";
import React from "react";

const columns = [
  { name: "SHOP NAME", uid: "shopName" },
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

const ManageShop = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const searchTimeout = React.useRef(null);

  const {
    data,
    refetch: refetchShop,
    isLoading,
  } = useGetAllShop([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "search", value: searchQuery },
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
          toast.success("Shop status is updated successfully", {
            position: "top-center",
            duration: 3000,
          });
          refetchShop();
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
    await refetchShop();
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
      refetchShop();
    }, 500);
  };

  const renderCell = (shop: TPickShop, columnKey: keyof TPickShop) => {
    const cellValue = shop[columnKey];

    switch (columnKey) {
      case "shopName":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: shop.shopLogo,
              className: "w-10 h-10 text-large",
            }}
            description={shop.shopDetails}
            name={cellValue}
            classNames={{
              name: "text-sm font-semibold",
              description: "text-xs text-default-500",
            }}
          />
        );
      case "userName":
        return (
          <div className="flex items-center">
            <span className="text-sm">{shop.userName}</span>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize text-xs"
            color={shop?.status === ShopStatus.ACTIVE ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            {shop.status === ShopStatus.ACTIVE ? (
              <Tooltip content="Block shop">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onClick={() =>
                    handleUpdateShopStatus({
                      status: ShopStatus.BLOCKED,
                      shopId: shop?.id,
                    })
                  }
                >
                  <Ban className="w-4 h-4" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip content="Activate shop">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="success"
                  onClick={() =>
                    handleUpdateShopStatus({
                      status: ShopStatus.ACTIVE,
                      shopId: shop?.id,
                    })
                  }
                >
                  <CheckCircle className="w-4 h-4" />
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
              <h2 className="text-xl font-semibold">Manage Shops</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    classNames={{
                      base: "max-w-[300px]",
                      inputWrapper: "h-9",
                      input: "text-sm",
                    }}
                    placeholder="Search shops..."
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
                        refetchShop({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "status", value: ShopStatus.ACTIVE },
                          ],
                        });
                      } else if (key === "blocked") {
                        refetchShop({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "status", value: ShopStatus.BLOCKED },
                          ],
                        });
                      } else {
                        refetchShop({
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
                    <DropdownItem key="all">All Shops</DropdownItem>
                    <DropdownItem key="active">Active Shops</DropdownItem>
                    <DropdownItem key="blocked">Blocked Shops</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Table
              aria-label="Shops table"
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
                items={shopData}
                isLoading={isLoading}
                loadingContent={
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                emptyContent={
                  <div className="flex justify-center items-center h-40 text-default-400">
                    No shops found
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
                          item as TPickShop,
                          columnKey as keyof TPickShop
                        )}
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

export default ManageShop;

