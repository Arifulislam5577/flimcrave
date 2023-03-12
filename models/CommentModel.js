import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Comment = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default Comment;
