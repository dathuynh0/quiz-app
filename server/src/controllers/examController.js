import Exam from "../models/Exam.js";

export const getExam = async (req, res) => {
  try {
    const exam = await Exam.find();

    return res.status(200).json({ exam });
  } catch (error) {
    console.error("Lỗi khi gọi hàm addExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const addExam = async (req, res) => {
  try {
    const user = req.user;
    const { questions, title, avatarUrl, timeLimit, score } = req.body;
    if (!questions || !title || !timeLimit) {
      return res.status(400).json({ message: "Điền đầy đủ thông tin" });
    }

    const existExam = await Exam.findOne({ title });
    if (existExam) {
      return res.status(400).json({ message: "Kỳ thi đã tồn tại" });
    }

    await Exam.create({
      userId: user._id,
      questions,
      title,
      avatarUrl,
      timeLimit,
      score,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm addExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
