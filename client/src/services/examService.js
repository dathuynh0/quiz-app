import api from "@/lib/axios";

export const examService = {
  getAllExam: async () => {
    const res = await api.get("/exams/get", { withCredentials: true });

    return res.data;
  },

  getHistoryExam: async () => {
    const res = await api.get("/history-exam", { withCredentials: true });

    return res.data;
  },
};
