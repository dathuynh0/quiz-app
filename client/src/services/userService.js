import api from "@/lib/axios";

export const userService = {
  updateUser: async (id, displayName, avatarUrl) => {
    await api.put(
      `/users/${id}`,
      { displayName, avatarUrl },
      { withCredentials: true },
    );
  },
};
