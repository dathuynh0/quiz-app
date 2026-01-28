import api from "@/lib/axios";

export const categoryService = {
  getAllCategory: async () => {
    const res = await api.get("/category", { withCredentials: true });

    return res.data;
  },
};
