import mongoose from "mongoose";
const { Schema, model } = mongoose;
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your userName"],
    },
    userCoverImg: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: [true, "Please enter a valid email address"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 character"],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    country: {
      type: String,
      default: "Bangladesh",
    },

    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = model("User", userSchema);
export default User;
