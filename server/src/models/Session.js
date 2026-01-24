import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

sessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 }); // tu dong xoa session khi session het han

const Session = mongoose.model("Session", sessionSchema);

export default Session;
