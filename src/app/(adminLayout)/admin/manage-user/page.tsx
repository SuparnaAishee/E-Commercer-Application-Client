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
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Select,
  SelectItem,
  Pagination,
  Spinner,
} from "@nextui-org/react";

import { VerticalDotsIcon } from "@/src/components/icons";
import React, { useState } from "react";
import { useGetAllUser, useUpdateUserStatusRole } from "@/src/hooks/user";
import { IFullUser, IUserRole } from "@/src/types";
import { toast } from "sonner";
import { limit, UserRole, UserStatus } from "@/src/const/const";

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

const ManageUser = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    refetch: refetchUser,
    isLoading,
  } = useGetAllUser([
    { name: "limit", value: limit },
    { name: "page", value: page },
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
            refetchUser();
          }
        },
      });
    } else if (type === "DELETE") {
      payload = {
        id: user.id,
        data: {
          isDeleted: true,
        },
      };
      updateStatusRole(payload, {
        onSuccess(data) {
          if (data?.success) {
            toast.success("User is deleted successfully");
            refetchUser();
          } else {
            toast.error(data?.message);
          }
        },
      });
    }
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
          toast.success("User role is updated successfully");
          refetchUser();
        } else {
          toast.error(data?.message);
        }
      },
    });
  };

  const renderCell = React.useCallback(
    (user: IUser, columnKey: keyof IUser) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.profilePhoto }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select
                onChange={(e) =>
                  handleChangeRole(e.target.value as IUserRole, user)
                }
                placeholder={user.role}
                className="max-w-xs"
                disabledKeys={[user.role]}
                aria-label="Role"
              >
                <SelectItem key={UserRole.ADMIN}>Admin</SelectItem>
                <SelectItem key={UserRole.VENDOR}>Vendor</SelectItem>
                <SelectItem key={UserRole.USER}>User</SelectItem>
              </Select>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={user?.status === UserStatus.ACTIVE ? "success" : "danger"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {user?.status === "ACTIVE" ? (
                    <DropdownItem
                      onClick={() =>
                        handleUpdateStatusOrDelete("BLOCKED", user)
                      }
                    >
                      Block
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      onClick={() => handleUpdateStatusOrDelete("ACTIVE", user)}
                    >
                      Active
                    </DropdownItem>
                  )}
                  <DropdownItem
                    onClick={() => handleUpdateStatusOrDelete("DELETE", user)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
          items={userData}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item as IUser, columnKey as keyof IUser)}
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

export default ManageUser;
