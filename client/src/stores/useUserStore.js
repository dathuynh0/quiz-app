import { create } from "zustand";
import { userService } from "../services/userService";
import { useAuthStore } from "../stores/useAuthStore";
import { toast } from "sonner";

export const useUserStore = create((set, get) => ({
  allUser: [],

  updateUser: async (id, displayName, avatarUrl) => {
    try {
      await userService.updateUser(id, displayName, avatarUrl);

      await useAuthStore.getState().fetchUser();
      toast.success(`Cập nhật thành công ${displayName}`);
    } catch (error) {
      console.error("Lỗi khi gọi hàm updateUser: ", error);
      toast.error("Cập nhật thất bại");
    }
  },

  // ADMIN
  getAllUserForAdmin: async () => {
    try {
      const allUser = await userService.getAllUser();
      set({ allUser });
    } catch (error) {
      console.error("Lỗi khi gọi hàm getAllUserForAdmin: ", error);
      toast.error("Gọi dữ liệu thất bại");
    }
  },

  createUserForAdmin: async (username, password, displayName, position) => {
    try {
      await userService.createUserForAdmin(
        username,
        password,
        displayName,
        position,
      );

      get().getAllUserForAdmin();
      toast.success("Thêm tài khoản thành công");
    } catch (error) {
      console.error("Lỗi khi gọi hàm createUserForAdmin: ", error);
      toast.error("Thêm tài khoản thất bại");
    }
  },

  updateUserForAdmin: async (id, displayName, username, position) => {
    try {
      await userService.updateUserForAdmin(id, displayName, username, position);
      get().getAllUserForAdmin();

      toast.success("Cập nhật thành công");
    } catch (error) {
      console.error("Lỗi khi gọi hàm updateUserForAdmin: ", error);
      toast.error("Cập nhật thất bại");
    }
  },
}));
