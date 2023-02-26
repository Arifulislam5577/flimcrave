import express from "express";
import {
  getUsers,
  login,
  signup,
  deleteUserByAdmin,
} from "../controllers/userControllers.js";
import { protectedRouteAdmin } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.route("/").get(getUsers);
userRouter.route("/signup").post(signup);
userRouter.route("/login").post(login);
userRouter.route("/:id").delete(protectedRouteAdmin, deleteUserByAdmin);

export default userRouter;
