import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectionDB from "./config/connectionDB.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import examRoute from "./routes/examRoute.js";
import { protectedUser } from "./middlewares/authMiddleware.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.URL_CLIENT, credentials: true }));

// router
app.use("/api/auth", authRoute);

// private route
app.use(protectedUser);
app.use("/api/users", userRoute);
app.use("/api/exams", examRoute);

connectionDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
  });
});
