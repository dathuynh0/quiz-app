import express from "express";
import { addExam, getExam } from "../controllers/examController.js";

const router = express.Router();

// get
router.get("/get", getExam);

// them khoa hoc
router.post("/add", addExam);

export default router;
