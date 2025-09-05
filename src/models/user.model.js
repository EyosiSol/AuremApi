import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: String,
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
