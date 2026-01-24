import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "../services/authService.js";

export const useAuthStore = create((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearState: () => {
    set({ loading: false, user: null, accessToken: null });
  },

  signUp: async (username, password, displayName) => {
    try {
      set({ loading: true });

      await authService.signUp(username, password, displayName);
      toast.success("Đăng ký thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký thất bại");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(username, password);
      get().setAccessToken(accessToken);

      await get().fetchUser();

      toast.success("Đăng nhập thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng nhập thất bại");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      await authService.signOut();
      get().clearState();
      toast.success("Đăng xuất thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đăng xuất thất bại");
    }
  },

  fetchUser: async () => {
    try {
      set({ loading: true });
      const { user } = await authService.fetchUser();

      set({ user });
    } catch (error) {
      console.error(error);
      toast.error("Lấy dữ liệu người dùng thất bại");
      set({ user: null, accessToken: null });
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, setAccessToken, fetchUser } = get();

      const accessToken = await authService.refresh();
      setAccessToken(accessToken);

      if (!user) {
        await fetchUser();
      }
    } catch (error) {
      console.error(error);
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
}));
