import { useEffect } from "react";
import { useExamStore } from "../../stores/useExamStore";
import HistoryExamCard from "../Exam/HistoryExamCard";

const History = () => {
  const { historyExam, getHistoryExam } = useExamStore();

  useEffect(() => {
    const fetchHistory = async () => {
      await getHistoryExam();
    };

    fetchHistory();
  }, [getHistoryExam]);

  if (historyExam.length === 0) {
    return (
      <div className="w-full">
        <p className="text-center font-light">
          Bạn chưa thi bất kỳ bài thi nào.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-medium">Lịch sử thi</h2>
      <div className="grid lg:grid-cols-4 gap-2">
        {historyExam.map((historyExam, index) => (
          <HistoryExamCard key={index} historyExam={historyExam} />
        ))}
      </div>
    </div>
  );
};

export default History;
