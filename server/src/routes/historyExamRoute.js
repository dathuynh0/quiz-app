import express from "express";
import {
  getAllHistoryExam,
  createHistoryExam,
} from "../controllers/historyExamController.js";

const router = express.Router();

router.get("/", getAllHistoryExam);

router.post("/", createHistoryExam);

export default router;
