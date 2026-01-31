import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  updateRoleUser,
} from "../controllers/userController.js";
import {
  createExam,
  deleteExam,
  getExam,
  updateExam,
} from "../controllers/examController.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// user
router.get("/users", getAllUser);
router.post("/users/create-user", createUser);
router.put("/users/:id/update", updateRoleUser);
router.delete("/users/:id/delete", deleteUser);

// category
router.get("/category", getAllCategory);
router.post("/category/create-category", createCategory);
router.put("/category/:id/update", updateCategory);
router.delete("/category/:id/delete", deleteCategory);

// exam
router.get("/exam", getExam);
router.post("/exam/create-exam", createExam);
router.put("exam/:id/update", updateExam);
router.delete("/exam/:id/delete", deleteExam);

export default router;
