import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectedUser = async (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1]; // Bearer accessToken

    if (!token) {
      return res.status(401).json({ message: "accessToken không hợp lệ" });
    }

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, decodedUser) => {
        if (err) {
          return res.status(403).json({ message: "accessToken không hợp lệ" });
        }

        const user = await User.findById(decodedUser.userId).select(
          "-password",
        );

        if (!user) {
          return res.status(404).json({ message: "User không tông tại" });
        }

        req.user = user;
        next();
      },
    );
  } catch (error) {
    console.error("Lỗi khi gọi middleware protectedUser: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
