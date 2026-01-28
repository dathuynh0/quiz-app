import { Timer, FileQuestion } from "lucide-react";

const HistoryExamCard = ({ historyExam }) => {
  const time = Math.floor(historyExam.examId.timeLimit / 60);

  return (
    <div className="mt-4 group w-72 flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-0.5">
      <img
        className="w-full h-[1/3] object-cover"
        src={
          historyExam.examId.avatarUrl
            ? historyExam.examId.avatarUrl
            : "https://statics.cdn.200lab.io/2024/09/reactjs-la-gi.png"
        }
        alt={historyExam.examId.title}
      />

      <div className="p-3 mt-4">
        <h2 className="leading-snug line-clamp-2 h-15 text-xl font-medium">
          {historyExam.examId.title}
        </h2>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <Timer />
            {time} phút
          </p>
          <p className="flex items-center gap-2 font-medium text-gray-600">
            <FileQuestion />
            {historyExam.examId.questions.length} câu hỏi
          </p>
        </div>
        <h2
          className={`text-lg ${historyExam.score < 5 ? "text-red-500" : "text-green-400"}`}
        >
          Điểm đạt: <span className={`font-bold `}>{historyExam.score}</span>
        </h2>
      </div>
    </div>
  );
};

export default HistoryExamCard;
