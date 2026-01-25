import express from "express";
import { createExam, getExam } from "../controllers/examController.js";

const router = express.Router();

// get
router.get("/get", getExam);

// them khoa hoc
router.post("/add", createExam);

export default router;
