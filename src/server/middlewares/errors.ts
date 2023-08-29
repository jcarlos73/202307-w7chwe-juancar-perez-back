import chalk from "chalk";
import debugCreator from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

const debug = debugCreator(":robots:error");

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const customError = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found",
  );

  next(customError);
};

export const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  debug(chalk.red(error.message));

  const errorMessage = error.message || "Internal server error";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};
