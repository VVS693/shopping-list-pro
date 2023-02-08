import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    id: {
        type: String,
        require: true,
      },
    completed: {
      type: Boolean,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    comments: [
      {
        idComment: {
          type: String,
          require: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        title: String,
        default: "",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Item", ItemSchema);
