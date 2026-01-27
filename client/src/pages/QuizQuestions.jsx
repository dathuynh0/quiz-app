import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import { GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
import api from "@/lib/axios";
import CountDownTimer from "../components/CountDownTimer";
import { Button } from "@/components/ui/button";

const QuizQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState();
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchExam = async () => {
      const res = await api.get(`/exams/get/${id}`, { withCredentials: true });

      setQuiz(res.data);
    };

    fetchExam();
  }, []);

  const createHistoryExam = async (examId, score) => {
    console.log(examId, score);

    try {
      const res = await api.post(
        "/history-exam",
        {
          examId,
          score,
        },
        { withCredentials: true },
      );

      return res;
    } catch (error) {
      console.log("Lỗi khi gọi hàm createHistoryExam: ", error);
      toast.error("Thêm thất bại");
    }
  };

  const handleSelectAnswer = (questionIndex, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = confirm("Bạn chắn nộp bài. Nếu nộp sẽ không thể làm lại.");
    if (result) {
      const correct = quiz.questions.filter(
        (question, index) => answers[index] === question.answer,
      ).length;

      const newScore = Math.round((correct / quiz.questions.length) * 100) / 10;

      setScore(newScore);

      alert(`Điểm của bạn: ${newScore}`);
      await createHistoryExam(id, newScore);
    }

    navigate("/exam");
  };

  return (
    <div className="min-h-screen w-screen">
      {/* header */}
      {quiz ? (
        <div className="w-full bg-white shadow-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="size-8" />
            <h4 className="text-lg font-medium">{quiz.title}</h4>
          </div>
          {/* timing */}
          <div className="flex items-center gap-4 mr-4">
            <CountDownTimer initSeconds={quiz.timeLimit} />
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="blue"
              className="cursor-pointer"
            >
              Nộp bài
            </Button>
          </div>
        </div>
      ) : (
        <p>Đang tải dữ liêu...</p>
      )}

      {/* main */}
      {quiz ? (
        <div className="flex items-center justify-center w-full min-h-screen">
          {/* phan chon cau hoi */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 w-2xl p-8 bg-white shadow-lg">
              <h5 className="text-xl">{quiz.questions[indexQuestion].title}</h5>

              {quiz.questions[indexQuestion].options.map((q, index) => {
                return (
                  <div
                    onClick={() => handleSelectAnswer(indexQuestion, q)}
                    key={index}
                    className={`flex items-center gap-4 text-base p-4 border rounded-xl mt-4 cursor-pointer transition`}
                  >
                    <input
                      type="radio"
                      name={`radioQuestion${indexQuestion}`}
                      className="text-base cursor-pointer"
                      checked={answers[indexQuestion] === q}
                      onChange={() => handleSelectAnswer(indexQuestion, q)}
                    />
                    <p>{q}</p>
                  </div>
                );
              })}

              <div className="mt-4 flex items-center justify-between">
                <Button
                  variant="blue"
                  className="cursor-pointer"
                  disabled={indexQuestion < 1}
                  onClick={() => {
                    setIndexQuestion((p) => p - 1);
                  }}
                >
                  <ArrowLeft />
                  Câu trước
                </Button>
                <Button
                  variant="blue"
                  className="cursor-pointer"
                  disabled={indexQuestion === quiz.questions.length - 1}
                  onClick={() => {
                    setIndexQuestion((p) => p + 1);
                  }}
                >
                  Câu tiếp theo
                  <ArrowRight />
                </Button>
              </div>
            </div>

            {/* danh sach cau hoi */}
            <div className="col-span-4 p-6 border rounded-lg shadow-lg">
              <h4 className="text-xl font-medium">Danh sách câu hỏi</h4>
              <div className="mt-4 grid grid-cols-4 lg:grid-cols-5 gap-4">
                {quiz.questions.map((_, index) => (
                  <Button
                    onClick={() => setIndexQuestion(index)}
                    size="sm"
                    className={`font-bold bg-white border text-blue-800 hover:bg-orange-400 hover:text-white cursor-pointer ${indexQuestion === index ? "bg-blue-500 text-white" : ""} ${answers[index] !== undefined ? "bg-green-400 text-white" : ""}`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Đang tải dữ liêu...</p>
      )}
    </div>
  );
};

export default QuizQuestions;
