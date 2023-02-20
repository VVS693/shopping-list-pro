import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    // listId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "List",
    //   require: true,
    // },
    listId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
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
          // type: mongoose.Schema.Types.ObjectId,
          // ref: "User",
          type: String,
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
