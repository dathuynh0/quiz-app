import { create } from "zustand";
import { examService } from "../services/examService";
import { toast } from "sonner";

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

  createExam: async (exam) => {
    try {
      const e = await examService.createExam(exam);
      set({ ...exam, e });

      toast.success("Tạo kỳ thi thành công");
    } catch (error) {
      console.error(error);
      toast.error("Tạo kỳ thi thất bại");
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
