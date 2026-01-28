import Exam from "../models/Exam.js";

export const getExam = async (req, res) => {
  try {
    const exam = await Exam.find()
      .populate("categoryId")
      .populate("userId", "displayName");

    return res.status(200).json(exam);
  } catch (error) {
    console.error("Lỗi khi gọi hàm addExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("categoryId");

    if (!exam) {
      return res.status(404).json({ message: "Id không đúng" });
    }

    return res.status(200).json(exam);
  } catch (error) {
    console.error("Lỗi khi gọi hàm getExamById: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createExam = async (req, res) => {
  try {
    const user = req.user;
    const { questions, title, avatarUrl, timeLimit, categoryId } = req.body;
    if (!questions || !title || !timeLimit || !categoryId) {
      return res.status(400).json({ message: "Điền đầy đủ thông tin" });
    }

    const existingExam = await Exam.findOne({ title });
    if (existingExam) {
      return res.status(400).json({ message: "Kỳ thi đã tồn tại" });
    }

    const newExam = await Exam.create({
      userId: user._id,
      questions,
      title,
      avatarUrl,
      timeLimit,
      categoryId,
    });

    return res.status(201).json({ exam: newExam });
  } catch (error) {
    console.error("Lỗi khi gọi hàm createExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
