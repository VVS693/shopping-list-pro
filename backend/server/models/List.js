import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    usersSharing: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("List", ListSchema);
