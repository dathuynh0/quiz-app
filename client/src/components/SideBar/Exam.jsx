import { useEffect } from "react";
import ExamCard from "@/components/ExamCard";
import { useExamStore } from "../../stores/useExamStore";

const Exam = () => {
  const { exams, getAllExam } = useExamStore();

  useEffect(() => {
    const fetchExam = async () => {
      await getAllExam();
    };

    fetchExam();
  }, [getAllExam]);

  console.log(exams);

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold">Danh sách khóa thi</h2>
      <div className="grid lg:grid-cols-4">
        {exams.map((exam, index) => (
          <ExamCard exam={exam} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Exam;
