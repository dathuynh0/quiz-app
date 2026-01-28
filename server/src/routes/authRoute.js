import express from "express";
import {
  createUser,
  refresh,
  signIn,
  signOut,
  signUp,
} from "../controllers/authController.js";

const router = express.Router();

// signup
router.post("/signup", signUp);

//create
router.post("/add", createUser);

// signin
router.post("/signin", signIn);

// signout
router.post("/signout", signOut);

// refreshToken -> cap lai accessToken
router.post("/refresh", refresh);

export default router;
