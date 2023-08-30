import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { pingController } from "./controllers/ping/pingController.js";
import { endpointNotFound, generalErrorHandler } from "./middlewares/errors.js";
import robotsRouter from "./routers/robotsRouter.js";

const app = express();

app.use(morgan("dev"));

app.get("/", pingController);

app.use("/robots", robotsRouter);

app.use(endpointNotFound);
app.use(generalErrorHandler);

export default app;
