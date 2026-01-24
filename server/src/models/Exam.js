import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const examSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [questionSchema],
  title: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  timeLimit: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
