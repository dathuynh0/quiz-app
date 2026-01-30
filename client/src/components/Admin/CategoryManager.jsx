import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, Plus, Search, Trash } from "lucide-react";
import { useCategoryStore } from "../../stores/useCategoryStore";
import { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";

const CategoryManager = () => {
  const {
    category,
    getAllCategory,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategoryStore();
  const [isOpenUpdate, setIsOpenUpdate] = useState(null);
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const dataCategory = { name: "", iconUrl: "" };

  useEffect(() => {
    const fetchCategory = async () => {
      await getAllCategory();
    };

    fetchCategory();
  }, [getAllCategory]);

  const handleCreateCategory = async (name, iconUrl) => {
    await createCategory(name, iconUrl);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Quản lý danh mục
        </h1>
        <div className="flex items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Input
              className="pe-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              type="text"
              placeholder="Nhập danh mục cần tìm"
            />
            <Button
              className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-blue-600"
              variant="ghost"
            >
              <Search />
            </Button>
          </div>

          {/* Add category button */}
          <Button
            onClick={() => setIsCreateCategory(true)}
            variant="blue"
            className="flex items-center gap-2 px-4 py-2 rounded-md shadow hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            Thêm danh mục
          </Button>

          <CreateCategory
            isOpen={isCreateCategory}
            isClose={() => setIsCreateCategory(false)}
            data={dataCategory}
            func={handleCreateCategory}
          />
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr className="uppercase text-sm">
              <th className="px-4 py-2">Tên danh mục</th>
              <th className="px-4 py-2">Ngày tạo</th>
              <th className="px-4 py-2">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {category.map((c) => (
              <tr
                key={c._id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2 text-center">
                  {new Date(c.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-2 flex justify-center items-center gap-2">
                  <Button
                    onClick={() => setIsOpenUpdate(c)}
                    size="sm"
                    variant="blue"
                    className="cursor-pointer rounded-md shadow"
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteCategory(c._id)}
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

      {isOpenUpdate && (
        <UpdateCategory
          isOpen={isOpenUpdate}
          isClose={() => setIsOpenUpdate(null)}
          data={isOpenUpdate}
          func={updateCategory}
        />
      )}
    </div>
  );
};

export default CategoryManager;
