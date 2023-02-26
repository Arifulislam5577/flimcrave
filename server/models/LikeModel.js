import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Like = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default Like;
