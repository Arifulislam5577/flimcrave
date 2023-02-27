import axios from "axios";
import catchAsync from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { getCountry } from "../utils/getCountry.js";
import Post from "../models/postModel.js";

export const signup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const country = await getCountry();

  const user = await User.create({
    userName: name,
    email,
    password,
    country,
  });

  res.status(201).json({
    _id: user._id,
    userName: user.userName,
    email: user.email,
    country: user.country,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      country: user.country,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

export const deleteUserByAdmin = catchAsync(async (req, res, next) => {
  try {
    const userId = req.params.id;

    await Post.updateMany(
      { $or: [{ "comments.user": userId }, { "likes.user": userId }] },
      { $pull: { comments: { user: userId }, likes: { user: userId } } }
    );
    await Post.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to delete user: ${error.message}` });
  }
});

export const updateUserInfo = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const { userName, email, password } = req.body;
  try {
    const user = await User.findById(userId);
    if (user && (await user.matchPassword(password))) {
      const update = await User.findByIdAndUpdate(user._id, {
        userName: userName ? userName : user.userName,
        email: email ? email : user.email,
      });

      if (!update) {
        return res.status(403).json({ message: "User is not updated" });
      }

      const newUser = await User.findById(update._id);

      const updatedUser = {
        ...newUser._doc,
        token: generateToken(newUser._id),
      };

      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
});
