import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: "Student",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
