import { create } from "zustand";
import { toast } from "sonner";
import { categoryService } from "../services/categoryService";

export const useCategoryStore = create((set, get) => ({
  category: [],

  getAllCategory: async () => {
    try {
      const category = await categoryService.getAllCategory();
      set({ category });
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi gọi getAllCategory");
    }
  },

  createCategory: async (name, iconUrl) => {
    try {
      await categoryService.createCategory(name, iconUrl);
      get().getAllCategory();

      toast.success("Thêm thành công");
    } catch (error) {
      console.error(error);
      toast.error("Thêm thất bại");
    }
  },

  updateCategory: async (id, name, iconUrl) => {
    try {
      await categoryService.updateCategory(id, name, iconUrl);
      get().getAllCategory();

      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại");
    }
  },

  deleteCategory: async (id) => {
    try {
      await categoryService.deleteCategory(id);
      get().getAllCategory();

      toast.success("Xóa thành công");
    } catch (error) {
      console.error(error);
      toast.error("Xóa thất bại");
    }
  },
}));
