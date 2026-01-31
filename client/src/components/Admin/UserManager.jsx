import React, { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Pen, Trash, Plus } from "lucide-react";
import UpdateUser from "./UpdateUser";
import CreateUser from "./CreateUser";

const UserManager = () => {
  const { allUser, getAllUserForAdmin } = useUserStore();
  const [isOpenUpdateUser, setIsOpenUpdateUser] = useState(null);
  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await getAllUserForAdmin();
    };

    fetchUser();
  }, [getAllUserForAdmin]);

  return (
    <div className="w-full h-full p-6 bg-gray-50 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý người dùng
        </h1>
        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Input
              className="pe-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              type="text"
              placeholder="Nhập tên người dùng cần tìm"
            />
            <Button
              className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-blue-600"
              variant="ghost"
            >
              <Search />
            </Button>
          </div>

          <Button
            onClick={() => setIsOpenCreateUser(true)}
            variant="blue"
            className="flex items-center gap-2 px-4 py-2 rounded-md shadow hover:opacity-90 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm tài khoản
          </Button>

          <CreateUser
            isOpen={isOpenCreateUser}
            isClose={() => setIsOpenCreateUser(false)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="uppercase text-sm">
              <th className="px-4 py-2">Họ và tên</th>
              <th className="px-4 py-2">Tên tài khoản</th>
              <th className="px-4 py-2">Ngày tạo</th>
              <th className="px-4 py-2">Quyền</th>
              <th className="px-4 py-2">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((u) => (
              <tr
                key={u._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 text-center">{u.displayName}</td>
                <td className="px-4 py-2 text-center">{u.username}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2 text-center">{u.position}</td>
                <td className="px-4 py-2 flex justify-center items-center gap-2">
                  <Button
                    onClick={() => setIsOpenUpdateUser(u)}
                    size="sm"
                    variant="blue"
                    className="cursor-pointer rounded-md shadow"
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-red-500 text-white hover:bg-red-600 rounded-md shadow cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpenUpdateUser && (
        <UpdateUser
          isOpen={isOpenUpdateUser}
          isClose={() => setIsOpenUpdateUser(null)}
          data={isOpenUpdateUser}
        />
      )}
    </div>
  );
};

export default UserManager;
