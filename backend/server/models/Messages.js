import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: true,
    },
    roomId: {
      type: String,
      require: true,
    },
    creationTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
