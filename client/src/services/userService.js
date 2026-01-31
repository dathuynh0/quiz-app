import api from "@/lib/axios";

export const userService = {
  updateUser: async (id, displayName, avatarUrl) => {
    await api.put(
      `/users/${id}`,
      { displayName, avatarUrl },
      { withCredentials: true },
    );
  },

  // ADMIN
  getAllUser: async () => {
    const res = await api.get("/admin/users", { withCredentials: true });

    return res.data;
  },

  createUserForAdmin: async (username, password, displayName, position) => {
    await api.post(
      "/admin/users/create-user",
      { username, password, displayName, position },
      { withCredentials: true },
    );
  },

  updateUserForAdmin: async (id, displayName, username, position) => {
    await api.put(
      `/admin/users/${id}/update`,
      {
        displayName,
        username,
        position,
      },
      { withCredentials: true },
    );
  },
};
