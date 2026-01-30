import { useEffect } from "react";
import ExamCard from "@/components/Exam/ExamCard";
import { useExamStore } from "../../stores/useExamStore";

const Exam = () => {
  const { exams, getAllExam } = useExamStore();

  useEffect(() => {
    const fetchExam = async () => {
      await getAllExam();
    };

    fetchExam();
  }, [getAllExam]);

  if (exams.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <p>Chưa có bất kì kỳ thi nào</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-semibold">Danh sách kỳ thi</h2>
      {/* danh mục */}
      <div></div>
      <div className="grid lg:grid-cols-4 gap-2">
        {exams.map((exam) => (
          <ExamCard exam={exam} key={exam._id} />
        ))}
      </div>
    </div>
  );
};

export default Exam;
