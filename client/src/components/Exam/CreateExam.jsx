import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useCategoryStore } from "../../stores/useCategoryStore";
import { useExamStore } from "../../stores/useExamStore";

const CreateExam = () => {
  const { category, getAllCategory } = useCategoryStore();
  const { createExam } = useExamStore();

  const fetchCategory = async () => {
    await getAllCategory();
  };

  if (!category) {
    fetchCategory();
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const [examData, setExamData] = useState({
    title: "",
    timeLimit: 60,
    categoryId: "",
    avatarUrl: "",
    questions: [
      {
        title: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
  });

  const addQuestion = () => {
    setExamData({
      ...examData,
      questions: [
        ...examData.questions,
        {
          title: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = examData.questions.filter((_, i) => i !== index);
    setExamData({ ...examData, questions: newQuestions });
  };

  const updateQuestion = (questionIndex, field, value) => {
    const newQuestions = [...examData.questions];
    newQuestions[questionIndex][field] = value;
    setExamData({ ...examData, questions: newQuestions });
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...examData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createExam(examData);
    setExamData({
      title: "",
      timeLimit: 60,
      categoryId: "",
      avatarUrl: "",
      questions: [
        {
          title: "",
          options: ["", "", "", ""],
          answer: "",
        },
      ],
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl text-center font-bold mb-6">Tạo Kỳ Thi</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Thông tin kỳ thi</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={examData.title}
                onChange={(e) =>
                  setExamData({ ...examData, title: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tiêu đề kỳ thi"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Thời gian (giây) <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  value={examData.timeLimit}
                  onChange={(e) =>
                    setExamData({
                      ...examData,
                      timeLimit: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
              <div>
                <label>
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <br />
                <select
                  value={examData.categoryId}
                  onChange={(e) =>
                    setExamData({ ...examData, categoryId: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Chọn danh mục</option>
                  {category.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                URL ảnh đại diện
              </label>
              <Input
                type="text"
                value={examData.avatarUrl}
                onChange={(e) =>
                  setExamData({
                    ...examData,
                    avatarUrl: e.target.value,
                  })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Danh sách câu hỏi */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Câu hỏi</h2>
            <Button
              variant="blue"
              onClick={addQuestion}
              className="cursor-pointer"
            >
              <Plus />
              Thêm câu hỏi
            </Button>
          </div>

          {examData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Câu {questionIndex + 1}</h3>
                {examData.questions.length > 1 && (
                  <Button
                    variant="ghost"
                    onClick={() => removeQuestion(questionIndex)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash />
                    Xóa
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nội dung câu hỏi <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={question.title}
                    onChange={(e) =>
                      updateQuestion(questionIndex, "title", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập câu hỏi"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Các lựa chọn <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {question.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-2">
                        <span className="font-medium text-sm w-6">
                          {String.fromCharCode(65 + oIndex)}.
                        </span>
                        <Input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateOption(questionIndex, oIndex, e.target.value)
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={`Lựa chọn ${String.fromCharCode(
                            65 + oIndex,
                          )}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Đáp án đúng <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={question.answer}
                    onChange={(e) =>
                      updateQuestion(questionIndex, "answer", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Chọn đáp án đúng</option>
                    {question.options.map((option, oIndex) => (
                      <option key={oIndex} value={option}>
                        {String.fromCharCode(65 + oIndex)}. {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button variant="blue" type="submit" className="w-full">
            Tạo kỳ thi
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;
