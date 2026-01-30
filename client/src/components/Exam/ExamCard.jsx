import { Button } from "@/components/ui/button";
import { ArrowRight, FileQuestion, Timer } from "lucide-react";
import { Link } from "react-router";

const ExamCard = ({ exam }) => {
  const time = Math.floor(exam.timeLimit / 60);

  return (
    <div className="mt-4 group w-72 flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-0.5">
      <img
        className="w-full h-48 object-cover"
        src={
          exam.avatarUrl
            ? exam.avatarUrl
            : "https://statics.cdn.200lab.io/2024/09/reactjs-la-gi.png"
        }
        alt={exam.title}
      />
      <div className="p-3 mt-4">
        <h2 className="leading-snug line-clamp-2 h-15 text-xl font-medium">
          {exam.title}
        </h2>
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2">
            <Timer />
            {time} phút
          </p>
          <p className="flex items-center gap-2 font-medium text-gray-600">
            <FileQuestion />
            {exam.questions.length} câu hỏi
          </p>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="blue">
            <Link to={`/test/${exam._id}`} className="flex gap-2 items-center">
              Vào thi
              <ArrowRight />
            </Link>
          </Button>
          <p className="font-light text-sm text-gray-500">
            Tạo bởi {exam.userId.displayName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
