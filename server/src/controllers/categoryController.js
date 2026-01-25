import Category from "../models/Category.js";

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({ category });
  } catch (error) {
    console.error("Lỗi khi gọi hàm getAllCategory: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, iconUrl } = req.body;
    if (!name) {
      return res.status(400).json({ message: "name không được bỏ trống" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(403).json({ message: "category đã tồn tại" });
    }

    await Category.create({
      name,
      iconUrl,
    });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi gọi hàm createCategory: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, iconUrl } = req.body;

    const newCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        iconUrl,
      },
      {
        new: true,
      },
    );
    if (!newCategory) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }

    return res.status(200).json({ newCategory });
  } catch (error) {
    console.error("Lỗi khi gọi hàm updateCategory: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deleteCategory) {
      return res.status(404).json({ message: "Category không tồn tại" });
    }

    return res.status(200).json({ deleteCategory });
  } catch (error) {
    console.error("Lỗi khi gọi hàm deleteCategory: ", error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
