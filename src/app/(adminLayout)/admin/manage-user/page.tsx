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
//   Chip,
//   Dropdown,
//   DropdownTrigger,
//   Button,
//   DropdownMenu,
//   DropdownItem,
//   Select,
//   SelectItem,
//   Pagination,
//   Spinner,
// } from "@nextui-org/react";

// import { VerticalDotsIcon } from "@/src/components/icons";
// import React, { useState } from "react";
// import { useGetAllUser, useUpdateUserStatusRole } from "@/src/hooks/user";
// import { IFullUser, IUserRole } from "@/src/types";
// import { toast } from "sonner";
// import { limit, UserRole, UserStatus } from "@/src/const/const";

// const columns = [
//   { name: "NAME", uid: "name" },
//   { name: "ROLE", uid: "role" },
//   { name: "STATUS", uid: "status" },
//   { name: "ACTIONS", uid: "actions" },
// ];

// type IUser = Pick<
//   IFullUser,
//   "email" | "name" | "role" | "id" | "profilePhoto" | "status"
// > & { actions: string };

// const ManageUser = () => {
//   const [page, setPage] = useState(1);
//   const {
//     data,
//     refetch: refetchUser,
//     isLoading,
//   } = useGetAllUser([
//     { name: "limit", value: limit },
//     { name: "page", value: page },
//   ]);
//   const { mutate: updateStatusRole } = useUpdateUserStatusRole();

//   const meta = data?.meta;
//   const userData =
//     data?.data?.map((user) => ({
//       id: user.id,
//       name: user?.name,
//       email: user?.email,
//       profilePhoto: user?.profilePhoto,
//       role: user?.role,
//       status: user?.status,
//     })) || [];

//   const handleUpdateStatusOrDelete = (
//     type: "BLOCKED" | "ACTIVE" | "DELETE",
//     user: IUser
//   ) => {
//     let payload;
//     if (type === "BLOCKED" || type === "ACTIVE") {
//       payload = {
//         id: user.id,
//         data: {
//           status: type,
//         },
//       };
//       updateStatusRole(payload, {
//         onSuccess(data) {
//           if (data?.success) {
//             refetchUser();
//           }
//         },
//       });
//     } else if (type === "DELETE") {
//       payload = {
//         id: user.id,
//         data: {
//           isDeleted: true,
//         },
//       };
//       updateStatusRole(payload, {
//         onSuccess(data) {
//           if (data?.success) {
//             toast.success("User is deleted successfully");
//             refetchUser();
//           } else {
//             toast.error(data?.message);
//           }
//         },
//       });
//     }
//   };

//   const handleChangeRole = (role: IUserRole, user: IUser) => {
//     const payload = {
//       id: user.id,
//       data: {
//         role,
//       },
//     };
//     updateStatusRole(payload, {
//       onSuccess(data) {
//         if (data?.success) {
//           toast.success("User role is updated successfully");
//           refetchUser();
//         } else {
//           toast.error(data?.message);
//         }
//       },
//     });
//   };

//   const renderCell = React.useCallback(
//     (user: IUser, columnKey: keyof IUser) => {
//       const cellValue = user[columnKey];

//       switch (columnKey) {
//         case "name":
//           return (
//             <User
//               avatarProps={{ radius: "lg", src: user.profilePhoto }}
//               description={user.email}
//               name={cellValue}
//             >
//               {user.email}
//             </User>
//           );
//         case "role":
//           return (
//             <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
//               <Select
//                 onChange={(e) =>
//                   handleChangeRole(e.target.value as IUserRole, user)
//                 }
//                 placeholder={user.role}
//                 className="max-w-xs"
//                 disabledKeys={[user.role]}
//                 aria-label="Role"
//               >
//                 <SelectItem key={UserRole.ADMIN}>Admin</SelectItem>
//                 <SelectItem key={UserRole.VENDOR}>Vendor</SelectItem>
//                 <SelectItem key={UserRole.USER}>User</SelectItem>
//               </Select>
//             </div>
//           );
//         case "status":
//           return (
//             <Chip
//               className="capitalize"
//               color={user?.status === UserStatus.ACTIVE ? "success" : "danger"}
//               size="sm"
//               variant="flat"
//             >
//               {cellValue}
//             </Chip>
//           );
//         case "actions":
//           return (
//             <div className="relative flex justify-end items-center gap-2">
//               <Dropdown>
//                 <DropdownTrigger>
//                   <Button isIconOnly size="sm" variant="light">
//                     <VerticalDotsIcon className="text-default-300" />
//                   </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu>
//                   {user?.status === "ACTIVE" ? (
//                     <DropdownItem
//                       onClick={() =>
//                         handleUpdateStatusOrDelete("BLOCKED", user)
//                       }
//                     >
//                       Block
//                     </DropdownItem>
//                   ) : (
//                     <DropdownItem
//                       onClick={() => handleUpdateStatusOrDelete("ACTIVE", user)}
//                     >
//                       Active
//                     </DropdownItem>
//                   )}
//                   <DropdownItem
//                     onClick={() => handleUpdateStatusOrDelete("DELETE", user)}
//                   >
//                     Delete
//                   </DropdownItem>
//                 </DropdownMenu>
//               </Dropdown>
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
//           items={userData}
//         >
//           {(item) => (
//             <TableRow key={item.id}>
//               {(columnKey) => (
//                 <TableCell>
//                   {renderCell(item as IUser, columnKey as keyof IUser)}
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
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Pagination,
  Card,
  CardBody,
  Input,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useGetAllUser, useUpdateUserStatusRole } from "@/src/hooks/user";
import type { IFullUser, IUserRole } from "@/src/types";
import { limit, UserRole, UserStatus } from "@/src/const/const";
// Add imports for the new icons
import {
  Search,
  RefreshCw,
  Filter,
  AlertTriangle,
  UserCog,
  Shield,
  Ban,
  CheckCircle,
  Trash2,
} from "lucide-react";
import React from "react";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

type IUser = Pick<
  IFullUser,
  "email" | "name" | "role" | "id" | "profilePhoto" | "status"
> & { actions: string };

const ManageUsers = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [roleFilter, setRoleFilter] = useState("all");
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchTimeout = React.useRef(null);

  const {
    data,
    refetch: refetchUser,
    isLoading,
  } = useGetAllUser([
    { name: "limit", value: limit },
    { name: "page", value: page },
    { name: "search", value: searchQuery },
    { name: "role", value: roleFilter !== "all" ? roleFilter : "" },
  ]);

  const { mutate: updateStatusRole } = useUpdateUserStatusRole();
  const meta = data?.meta;

  const userData =
    data?.data?.map((user) => ({
      id: user.id,
      name: user?.name,
      email: user?.email,
      profilePhoto: user?.profilePhoto,
      role: user?.role,
      status: user?.status,
    })) || [];

  const handleUpdateStatusOrDelete = (
    type: "BLOCKED" | "ACTIVE" | "DELETE",
    user: IUser
  ) => {
    if (type === "DELETE") {
      setUserToDelete(user);
      onOpen();
      return;
    }

    let payload;
    if (type === "BLOCKED" || type === "ACTIVE") {
      payload = {
        id: user.id,
        data: {
          status: type,
        },
      };
      updateStatusRole(payload, {
        onSuccess(data) {
          if (data?.success) {
            toast.success(
              `User ${type === "ACTIVE" ? "activated" : "blocked"} successfully`,
              {
                position: "top-center",
                duration: 3000,
              }
            );
            refetchUser();
          } else {
            toast.error(data?.message, {
              position: "top-center",
              duration: 3000,
            });
          }
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!userToDelete) return;

    const payload = {
      id: userToDelete.id,
      data: {
        isDeleted: true,
      },
    };

    updateStatusRole(payload, {
      onSuccess(data) {
        if (data?.success) {
          toast.success("User deleted successfully", {
            position: "top-center",
            duration: 3000,
          });
          refetchUser();
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

  const handleChangeRole = (role: IUserRole, user: IUser) => {
    const payload = {
      id: user.id,
      data: {
        role,
      },
    };
    updateStatusRole(payload, {
      onSuccess(data) {
        if (data?.success) {
          toast.success("User role updated successfully", {
            position: "top-center",
            duration: 3000,
          });
          refetchUser();
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
    await refetchUser();
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
      refetchUser();
    }, 500);
  };
  //@ts-ignore
  const handleFilterChange = (key) => {
    setRoleFilter(key);
    // Reset to first page when filtering
    if (page !== 1) setPage(1);

    if (key === "all") {
      refetchUser({
        //@ts-ignore
        queryParams: [
          { name: "limit", value: limit },
          { name: "page", value: 1 },
        ],
      });
    } else {
      refetchUser({
        //@ts-ignore
        queryParams: [
          { name: "limit", value: limit },
          { name: "page", value: 1 },
          { name: "role", value: key },
        ],
      });
    }
  };
  //@ts-ignore
  const getRoleIcon = (role) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Shield className="w-3 h-3" />;
      case UserRole.VENDOR:
        return <UserCog className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const renderCell = (user: IUser, columnKey: keyof IUser) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: user.profilePhoto,
              className: "w-10 h-10 text-large",
            }}
            description={user.email}
            name={cellValue}
            classNames={{
              name: "text-sm font-semibold",
              description: "text-xs text-default-500",
            }}
          />
        );
      case "role":
        return (
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Select
              onChange={(e) =>
                handleChangeRole(e.target.value as IUserRole, user)
              }
              selectedKeys={[user.role]}
              className="max-w-[120px]"
              size="sm"
              aria-label="Role"
              classNames={{
                trigger: "h-8 min-h-8",
                value: "text-xs",
              }}
            >
              <SelectItem
                key={UserRole.ADMIN}
                className="text-xs"
                startContent={<Shield className="w-3 h-3" />}
              >
                Admin
              </SelectItem>
              <SelectItem
                key={UserRole.VENDOR}
                className="text-xs"
                startContent={<UserCog className="w-3 h-3" />}
              >
                Vendor
              </SelectItem>
              <SelectItem key={UserRole.USER} className="text-xs">
                User
              </SelectItem>
            </Select>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize text-xs"
            color={user?.status === UserStatus.ACTIVE ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex justify-end items-center gap-2">
            {user?.status === UserStatus.ACTIVE ? (
              <Tooltip content="Block user">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onClick={() => handleUpdateStatusOrDelete("BLOCKED", user)}
                >
                  <Ban className="w-4 h-4" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip content="Activate user">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="success"
                  onClick={() => handleUpdateStatusOrDelete("ACTIVE", user)}
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </Tooltip>
            )}

            <Tooltip content="Delete user">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                onClick={() => handleUpdateStatusOrDelete("DELETE", user)}
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
              <h2 className="text-xl font-semibold">Manage Users</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Input
                    classNames={{
                      base: "max-w-[300px]",
                      inputWrapper: "h-9",
                      input: "text-sm",
                    }}
                    placeholder="Search users..."
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
                    selectedKeys={[roleFilter]}
                    selectionMode="single"
                    onAction={(key) => handleFilterChange(key)}
                  >
                    <DropdownItem key="all">All Users</DropdownItem>
                    <DropdownItem key={UserRole.ADMIN}>Admins</DropdownItem>
                    <DropdownItem key={UserRole.VENDOR}>Vendors</DropdownItem>
                    <DropdownItem key={UserRole.USER}>
                      Regular Users
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <Table
              aria-label="Users table"
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
                items={userData}
                isLoading={isLoading}
                loadingContent={
                  <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                }
                emptyContent={
                  <div className="flex justify-center items-center h-40 text-default-400">
                    No users found
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
                        {renderCell(item as IUser, columnKey as keyof IUser)}
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
                  Are you sure you want to delete the user &quot;{userToDelete?.name}
                  &quot;? This action cannot be undone.
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

export default ManageUsers;

