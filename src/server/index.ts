import express from "express";
import morgan from "morgan";
import { pingController } from "./controllers/ping/pingController.js";
const app = express();

app.use(morgan("dev"));

app.use("/", pingController);

export default app;
