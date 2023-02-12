import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
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
