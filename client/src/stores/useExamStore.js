import { create } from "zustand";
import { examService } from "../services/examService";

export const useExamStore = create((set, get) => ({
  exams: [],
  historyExam: [],

  getAllExam: async () => {
    try {
      const exams = await examService.getAllExam();

      set({ exams });
    } catch (error) {
      console.error(error);
    }
  },

  getHistoryExam: async () => {
    try {
      const history = await examService.getHistoryExam();
      set({ historyExam: history });
    } catch (error) {
      console.error(error);
    }
  },
}));
