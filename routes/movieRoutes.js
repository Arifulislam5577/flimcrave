import express from "express";
import { getMoviewByID, getMoviews } from "../controllers/movieControllers.js";
const movieRouter = express.Router();

movieRouter.route("/").get(getMoviews);
movieRouter.route("/:id").get(getMoviewByID);

export default movieRouter;
