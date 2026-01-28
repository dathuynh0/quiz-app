import express from "express";
import {
  createExam,
  deleteExam,
  getExam,
  getExamById,
} from "../controllers/examController.js";

const router = express.Router();

// get
router.get("/get", getExam);

// get by id
router.get("/get/:id", getExamById);

// them khoa hoc
router.post("/add", createExam);

// delete
router.delete("/:id", deleteExam);

export default router;
