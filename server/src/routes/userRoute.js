import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
