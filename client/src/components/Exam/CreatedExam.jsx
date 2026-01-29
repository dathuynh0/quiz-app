import React, { useEffect } from "react";
import { useExamStore } from "../../stores/useExamStore";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

const CreatedExam = () => {
  const { exams, getAllExam, deleteExam } = useExamStore();
  const user = useAuthStore((u) => u.user);

  useEffect(() => {
    const fetchExam = async () => {
      await getAllExam();
    };

    fetchExam();
  }, [getAllExam]);

  const filteredExam = exams.filter((e) => e.userId._id === user._id);

  if (filteredExam.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Bạn chưa tạo bất kì kỳ thi nào</p>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-2">Danh sách các kỳ thi đã tạo</h2>
      <div className="p-12 bg-white shadow-lg rounded-lg">
        {filteredExam.map((exam) => (
          <div
            key={exam._id}
            className="flex items-center justify-between gap-6 mb-2 border p-4 rounded-lg"
          >
            <div>
              <h4>{exam.title}</h4>
              <div className="text-sm space-x-3">
                <span>
                  Ngày tạo{" "}
                  {new Date(exam.createdAt).toLocaleDateString("vi-VN")}
                </span>
                <span>Số câu {exam.questions.length}</span>
              </div>
            </div>
            <Button
              onClick={async () => await deleteExam(exam._id)}
              size="sm"
              className="bg-red-300 text-white hover:bg-red-600 cursor-pointer"
            >
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatedExam;
