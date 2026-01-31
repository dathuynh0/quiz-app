import User from "../models/User.js";
import Session from "../models/Session.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const REFRESH_TOKEN_TLL = 14 * 24 * 60 * 60 * 1000; // 14 ngay

// signup
export const signUp = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    if (!username || !password || !displayName) {
      return res.status(400).json({
        message: "username, password, displayName không được bỏ trống",
      });
    }

    // kiểm tra username có trong db chưa
    const exist = await User.findOne({ username });
    if (exist) {
      return res
        .status(400)
        .json({ message: "User đã tồn tại không thể thêm" });
    }

    // hashedPassword
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
      displayName,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm signUp: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// signin
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return re.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "username hoặc password không đúng" });
    }

    // compare pass
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "username hoặc password không đúng" });
    }

    // tao accessToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    // luu refresh token vao session
    await Session.create({
      userId: user._id,
      refreshToken,
      expireAt: new Date(Date.now() + REFRESH_TOKEN_TLL),
    });

    // luu refreshToken vao cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TLL,
    });

    return res.status(201).json({
      message: `${user.displayName} đã login với accessToken: `,
      accessToken,
    });
  } catch (error) {
    console.error("Lỗi khi gọi hàm signIn: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// signout
export const signOut = async (req, res) => {
  try {
    // lay refreshToken tu cookie
    const token = req.cookies?.refreshToken;

    if (token) {
      // xoa refreshToken trong session
      await Session.deleteOne({ refreshToken: token });

      res.clearCookie("refreshToken");
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm signOut: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

// refresh
export const refresh = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;

    // kiem tra co trong db khong
    const existToken = await Session.findOne({ refreshToken: token });
    if (!existToken) {
      return res.status(404).json({ message: "Token khong hợp lệ" });
    }

    // kiểm tra thời hạn
    if (existToken.expireAt < new Date()) {
      return res.status(400).json({ message: "Token hết hạn" });
    }

    // tao accessToken moi
    const accessToken = jwt.sign(
      { userId: existToken.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    return res.status(201).json({ accessToken });
  } catch (error) {
    console.error("Lỗi khi gọi hàm refresh: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
