/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
// "use client";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Pagination,
//   Spinner,
// } from "@nextui-org/react";

// import { DeleteIcon } from "@/src/components/icons";
// import React, { useState } from "react";
// import { ICategories } from "@/src/types";
// import { toast } from "sonner";
// import { useDeleteCategory, useGetAllCategory } from "@/src/hooks/category";
// import CreateProductCategory from "@/src/components/modal/admin/CreateProductCategory";
// import UpdateProductCategory from "@/src/components/modal/admin/UpdateProductCategory";
// import Image from "next/image";
// import { limit } from "@/src/const/const";

// const columns = [
//   { name: "IMAGE", uid: "image" },
//   { name: "NAME", uid: "name" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type TCategory = Pick<ICategories, "name" | "id" | "image"> & {
//   actions: string;
// };

// const ManageProductCategory = () => {
//   const [page, setPage] = useState(1);
//   const {
//     data,
//     refetch: refetchCategory,
//     isLoading,
//   } = useGetAllCategory([
//     { name: "limit", value: limit },
//     { name: "page", value: page },
//   ]);
//   const { mutate: deleteCategory } = useDeleteCategory();
//   const meta = data?.meta;
//   const categoryData =
//     data?.data?.map((category) => ({
//       id: category.id,
//       name: category?.name,
//       image: category?.image,
//     })) || [];

//   const handleDeleteCategory = (category: TCategory) => {
//     deleteCategory(category.id, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success(data?.message);
//           refetchCategory();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const renderCell = React.useCallback(
//     (category: TCategory, columnKey: keyof TCategory) => {
//       const cellValue = category[columnKey];

//       switch (columnKey) {
//         case "image":
//           return (
//             <Image
//               className="rounded-2xl object-contain"
//               height={30}
//               width={30}
//               src={category?.image}
//               alt="Category"
//             />
//           );
//         case "name":
//           return <p>{category.name}</p>;

//         case "actions":
//           return (
//             <div className="relative flex items-center justify-end gap-2">
//               <UpdateProductCategory id={category.id} />

//               <button
//                 onClick={() => handleDeleteCategory(category)}
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
//         <CreateProductCategory />
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
//           items={categoryData}
//         >
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(item as TCategory, columnKey as keyof TCategory)}
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

// export default ManageProductCategory;
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
} from "@nextui-org/react";
import { toast } from "sonner";
import type { ICategories } from "@/src/types";
import { useDeleteCategory, useGetAllCategory } from "@/src/hooks/category";
import CreateProductCategory from "@/src/components/modal/admin/CreateProductCategory";
import UpdateProductCategory from "@/src/components/modal/admin/UpdateProductCategory";
import Image from "next/image";
import { limit } from "@/src/const/const";
import {
  Search,
  RefreshCw,
  Filter,
  Plus,
  Trash2,
  Edit,
  AlertTriangle,
} from "lucide-react";
import React from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<TCategory | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchTimeout = React.useRef(null);

  const {
    data,
    refetch: refetchCategory,
    isLoading,
  } = useGetAllCategory([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "search", value: searchQuery },
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
    setCategoryToDelete(category);
    onOpen();
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;

    deleteCategory(categoryToDelete.id, {
      onSuccess(data) {
        if (data?.success) {
          toast.success(data?.message, {
            position: "top-center",
            duration: 3000,
          });
          refetchCategory();
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
    await refetchCategory();
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
      refetchCategory();
    }, 500);
  };

  const renderCell = (category: TCategory, columnKey: keyof TCategory) => {
    const cellValue = category[columnKey];

    switch (columnKey) {
      case "image":
        return (
          <div className="flex justify-center">
            <Image
              className="rounded-lg object-contain bg-default-100"
              height={40}
              width={40}
              src={category?.image || "/placeholder.svg"}
              alt={category.name}
            />
          </div>
        );
      case "name":
        return <p className="text-sm">{category.name}</p>;
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            <UpdateProductCategory id={category.id}></UpdateProductCategory>

            <Tooltip content="Delete category">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={() => handleDeleteCategory(category)}
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
              <h2 className="text-xl font-semibold">Product Categories</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    classNames={{
                      base: "max-w-[300px]",
                      inputWrapper: "h-9",
                      input: "text-sm",
                    }}
                    placeholder="Search categories..."
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
                      if (key === "recent") {
                        refetchCategory({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "sort", value: "createdAt:desc" },
                          ],
                        });
                      } else if (key === "alphabetical") {
                        refetchCategory({
                          //@ts-ignore
                          queryParams: [
                            { name: "limit", value: limit },
                            { name: "page", value: 1 },
                            { name: "sort", value: "name:asc" },
                          ],
                        });
                      } else {
                        refetchCategory({
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
                    <DropdownItem key="all">All Categories</DropdownItem>
                    <DropdownItem key="recent">Recently Added</DropdownItem>
                    <DropdownItem key="alphabetical">Alphabetical</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <CreateProductCategory></CreateProductCategory>
              </div>
            </div>

            <Table
              aria-label="Categories table"
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
                    align={
                      column.uid === "actions"
                        ? "end"
                        : column.uid === "image"
                          ? "center"
                          : "start"
                    }
                    className="text-xs uppercase"
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody
                items={categoryData}
                isLoading={isLoading}
                loadingContent={
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                emptyContent={
                  <div className="flex justify-center items-center h-40 text-default-400">
                    No categories found
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
                          item as TCategory,
                          columnKey as keyof TCategory
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
                  Are you sure you want to delete the category &quot;
                  {categoryToDelete?.name}&quot;? This action cannot be undone.
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

export default ManageProductCategory;

