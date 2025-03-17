/* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Pagination,
//   Spinner,
// } from "@nextui-org/react";

// import { DeleteIcon } from "@/src/components/icons";
// import React, { useState } from "react";
// import { IProduct } from "@/src/types";
// import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/product";
// import UpdateProduct from "@/src/components/modal/vendor/UpdateProduct";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { limit } from "@/src/const/const";

// const columns = [
//   { name: "NAME", uid: "name" },
//   { name: "PRICE", uid: "price" },
//   { name: "INVENTORY", uid: "inventory" },
//   { name: "DISCOUNT", uid: "discount" },
//   { name: "SHOP", uid: "shopName" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type TPickProduct = Pick<
//   IProduct,
//   | "images"
//   | "name"
//   | "description"
//   | "inventory"
//   | "price"
//   | "discount_percentage"
//   | "id"
//   | "isFlashSale"
// > & { actions: string; shopName: string; categoryName: string };

// const ManageProduct = () => {
//   const [page, setPage] = useState(1);
//   const router = useRouter();
//   const { data, refetch, isLoading } = useGetAllProducts([
//     { name: "limit", value: limit },
//     { name: "page", value: page },
//   ]);
//   const { mutate: deleteProduct } = useDeleteProduct();
//   const meta = data?.meta;
//   const productData =
//     data?.data?.map((product) => ({
//       id: product.id,
//       discount_percentage: product?.discount_percentage,
//       name: product?.name,
//       description: product?.description,
//       images: product?.images,
//       inventory: product?.inventory,
//       price: product?.price,
//       categoryName: product.category.name,
//       shopName: product.shop.shopName,
//       isFlashSale: product?.isFlashSale,
//     })) || [];

//   const handleDeleteProduct = (id: string) => {
//     deleteProduct(id, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           refetch();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const renderCell = React.useCallback(
//     (product: TPickProduct, columnKey: keyof TPickProduct) => {
//       const cellValue = product[columnKey];

//       switch (columnKey) {
//         case "name":
//           return (
//             <User
//               className="cursor-pointer"
//               onClick={() => router.push(`/products/${product?.id}`)}
//               avatarProps={{ radius: "lg", src: product.images[0] }}
//               description={product.shopName}
//               name={cellValue}
//             />
//           );
//         case "price":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               {product.price}
//             </div>
//           );
//         case "inventory":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               {product.inventory}
//             </div>
//           );
//         case "discount_percentage":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               {product.discount_percentage || "N/A"}
//             </div>
//           );
//         case "shopName":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               {product.shopName}
//             </div>
//           );
//         case "actions":
//           return (
//             <div className="relative flex items-center justify-end gap-5">
//               <UpdateProduct id={product.id} />

//               <button
//                 onClick={() => handleDeleteProduct(product.id)}
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
//           items={productData}
//         >
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(
//                     item as TPickProduct,
//                     columnKey as keyof TPickProduct
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

// export default ManageProduct;
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
import type { IProduct } from "@/src/types";
import { useDeleteProduct, useGetAllProducts } from "@/src/hooks/product";
import UpdateProduct from "@/src/components/modal/vendor/UpdateProduct";
import { useRouter } from "next/navigation";
import { limit } from "@/src/const/const";
// Add imports for the new icons
import {
  Search,
  RefreshCw,
  Filter,
  Trash2,
  Edit,
  AlertTriangle,
  Eye,
} from "lucide-react";
import React from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "PRICE", uid: "price" },
  { name: "INVENTORY", uid: "inventory" },
  { name: "DISCOUNT", uid: "discount_percentage" },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [productToDelete, setProductToDelete] = useState<TPickProduct | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  // Add this at the top of the component, after the useState declarations
  const searchTimeout = React.useRef(null);

  const { data, refetch, isLoading } = useGetAllProducts([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "search", value: searchQuery },
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

  const handleDeleteProduct = (product: TPickProduct) => {
    setProductToDelete(product);
    onOpen();
  };

  const confirmDelete = () => {
    if (!productToDelete) return;

    deleteProduct(productToDelete.id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message, {
            position: "top-center",
            duration: 3000,
          });
          refetch();
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
    await refetch();
    setIsRefreshing(false);
  };

  // Replace the handleSearch function with this implementation
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
      refetch();
    }, 500);
  };
//@ts-ignore
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const renderCell = (product: TPickProduct, columnKey: keyof TPickProduct) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: product.images[0],
              className: "w-10 h-10 text-large",
            }}
            description={product.categoryName}
            name={cellValue}
            classNames={{
              name: "text-sm font-semibold cursor-pointer",
              description: "text-xs text-default-500",
            }}
            onClick={() => router.push(`/products/${product?.id}`)}
          />
        );
      case "price":
        return (
          <div className="flex items-center">
            <span className="text-sm font-medium">
              {formatPrice(product.price)}
            </span>
          </div>
        );
      case "inventory":
        return (
          <div className="flex items-center">
            <Chip
              size="sm"
              variant="flat"
              color={
                //@ts-ignore
                Number.parseInt(product.inventory) > 10
                  ? "success"
                  //@ts-ignore
                  : Number.parseInt(product.inventory) > 0
                    ? "warning"
                    : "danger"
              }
            >
              {product.inventory} in stock
            </Chip>
          </div>
        );
      case "discount_percentage":
        return (
          <div className="flex items-center">
            {product.discount_percentage ? (
              <Chip size="sm" variant="flat" color="primary">
                {product.discount_percentage}% off
              </Chip>
            ) : (
              <span className="text-xs text-default-400">No discount</span>
            )}
          </div>
        );
      case "shopName":
        return (
          <div className="flex items-center">
            <span className="text-sm">{product.shopName}</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            <Tooltip content="View product">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => router.push(`/products/${product?.id}`)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Tooltip>

            <UpdateProduct id={product.id}>
              {/* <Button isIconOnly size="sm" variant="light" color="primary">
                <Edit className="w-4 h-4" />
              </Button> */}
            </UpdateProduct>

            <Tooltip content="Delete product">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={() => handleDeleteProduct(product)}
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
              <h2 className="text-xl font-semibold">Manage Products</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    classNames={{
                      base: "max-w-[300px]",
                      inputWrapper: "h-9",
                      input: "text-sm",
                    }}
                    placeholder="Search products..."
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
                {/* Replace the Filter dropdown implementation with this: */}
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
                      if (key === "low-stock") {
                        refetch({
                          //@ts-ignore
                          queryKey: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "inventory", value: "lt:10" },
                          ],
                        });
                      } else if (key === "flash-sale") {
                        refetch({
                          //@ts-ignore
                          queryKey: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "isFlashSale", value: true },
                          ],
                        });
                      } else if (key === "discounted") {
                        refetch({
                          //@ts-ignore
                          queryKey: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "hasDiscount", value: true },
                          ],
                        });
                      } else {
                        refetch({
                          //@ts-ignore
                          queryKey: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                          ],
                        });
                      }
                      // Reset to first page when filtering
                      if (page !== 1) setPage(1);
                    }}
                  >
                    <DropdownItem key="all">All Products</DropdownItem>
                    <DropdownItem key="low-stock">Low Stock</DropdownItem>
                    <DropdownItem key="flash-sale">Flash Sale</DropdownItem>
                    <DropdownItem key="discounted">Discounted</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Table
              aria-label="Products table"
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
                items={productData}
                isLoading={isLoading}
                loadingContent={
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                emptyContent={
                  <div className="flex justify-center items-center h-40 text-default-400">
                    No products found
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
                          item as TPickProduct,
                          columnKey as keyof TPickProduct
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
                  Are you sure you want to delete the product &quot;
                  {productToDelete?.name}&quot;? This action cannot be undone.
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

export default ManageProduct;

