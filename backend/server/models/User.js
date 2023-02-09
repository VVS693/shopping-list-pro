import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: " ",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema)
