import api from "@/lib/axios";

export const categoryService = {
  getAllCategory: async () => {
    const res = await api.get("/category", { withCredentials: true });

    return res.data;
  },

  createCategory: async (name, iconUrl) => {
    await api.post(
      "/category/add-category",
      { name, iconUrl },
      { withCredentials: true },
    );
  },

  updateCategory: async (id, name, iconUrl) => {
    const res = await api.put(
      `/category/${id}`,
      { name, iconUrl },
      { withCredentials: true },
    );

    return res.data;
  },

  deleteCategory: async (id) => {
    await api.delete(`/category/${id}`, { withCredentials: true });
  },
};
