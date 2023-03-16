import express from "express";
import {
  getMoviewByID,
  getMoviews,
  movieDisLikeReaction,
  movieLikeReaction,
} from "../controllers/movieControllers.js";
import { protectedRoute } from "../middlewares/authMiddleware.js";
const movieRouter = express.Router();

movieRouter.route("/").get(getMoviews);
movieRouter.route("/:id").get(getMoviewByID);
movieRouter.route("/like/:id").patch(protectedRoute, movieLikeReaction);
movieRouter.route("/dislike/:id").patch(protectedRoute, movieDisLikeReaction);

export default movieRouter;
