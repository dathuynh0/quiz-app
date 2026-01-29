import api from "@/lib/axios";

export const examService = {
  getAllExam: async () => {
    const res = await api.get("/exams/get", { withCredentials: true });

    return res.data;
  },

  createExam: async (exam) => {
    const res = await api.post("/exams/add", exam, { withCredentials: true });

    return res.data;
  },

  deleteExam: async (id) => {
    await api.delete(`/exams/${id}`, { withCredentials: true });
  },

  getHistoryExam: async () => {
    const res = await api.get("/history-exam", { withCredentials: true });

    return res.data;
  },
};
