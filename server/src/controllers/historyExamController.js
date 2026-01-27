import HistoryExam from "../models/HistoryExam.js";

export const getAllHistoryExam = async (req, res) => {
  try {
    const history = await HistoryExam.find()
      .sort({ createdAt: -1 })
      .populate("examId");

    return res.status(200).json(history);
  } catch (error) {
    console.log("Lỗi khi gọi hàm getAllHistoryExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createHistoryExam = async (req, res) => {
  try {
    const { score, examId } = req.body;
    if (!examId) {
      return res.status(400).json("examId trống");
    }

    await HistoryExam.create({
      examId,
      score,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.log("Lỗi khi gọi hàm getAllHistoryExam: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
