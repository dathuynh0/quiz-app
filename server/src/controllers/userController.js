import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Lỗi khi gọi hàm getUser: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await User.find().sort({ createdAt: -1 }).select("-password");

    return res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi khi gọi hàm getAllUser: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, displayName, avatarUrl, position } = req.body;
    if (!username || !password || !displayName || !position) {
      return res.status(400).json({
        message:
          "username, password, displayName, position không được bỏ trống",
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
      avatarUrl,
      position,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm creteUser: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { displayName, avatarUrl } = req.body;

    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        displayName,
        avatarUrl,
      },
      {
        new: true,
      },
    );

    if (!update) {
      return res.status(400).json({ message: "Update thất bại" });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm updateUser: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteUser: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
