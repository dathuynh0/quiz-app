import { create } from "zustand";
import { userService } from "../services/userService";
import { toast } from "sonner";

export const useUserStore = create((set, get) => ({
  updateUser: async (id, displayName, avatarUrl) => {
    try {
      await userService.updateUser(id, displayName, avatarUrl);
      toast.success(`Cập nhật thành công ${displayName}`);
    } catch (error) {
      console.error("Lỗi khi gọi hàm updateUser: ", error);
      toast.error("Cập nhật thất bại");
    }
  },
}));
