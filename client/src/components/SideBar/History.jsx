import { useEffect } from "react";
import { useExamStore } from "../../stores/useExamStore";
import HistoryExamCard from "../HistoryExamCard";

const History = () => {
  const { historyExam, getHistoryExam } = useExamStore();

  useEffect(() => {
    const fetchHistory = async () => {
      await getHistoryExam();
    };

    fetchHistory();
  }, []);

  console.log(historyExam);

  return (
    <div>
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
