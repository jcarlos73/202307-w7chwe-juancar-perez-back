import express from "express";
import { getRobots } from "../controllers/robots/robotsControllers.js";

const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);

export default robotsRouter;
