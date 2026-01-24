import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING_DB);
    console.log("Kết nối với CSDL thành công");
  } catch (error) {
    console.error("Lỗi khi kết nối đến CSDL: ", error);
    process.exit(1);
  }
};

export default connectionDB;
