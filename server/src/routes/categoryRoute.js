import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategory);

router.post("/add-category", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;
