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

  getHistoryExam: async () => {
    const res = await api.get("/history-exam", { withCredentials: true });

    return res.data;
  },
};
