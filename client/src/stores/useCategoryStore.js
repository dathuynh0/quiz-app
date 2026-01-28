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
}));
