import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import Robot from "../../../database/models/Robot";
import { type RobotStructure } from "../../../types";

export const getRobots = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const robots = await Robot.find().exec();

    res.status(200).json({ robots });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Couldn't get the robots",
      404,
      (error as Error).message,
    );
    next(customError);
  }
};

export const addRobot = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    RobotStructure
  >,
  res: Response,
  next: NextFunction,
) => {
  const robot = req.body;

  try {
    const newRobot = await Robot.create(robot);

    res.status(201).json({ robot: newRobot });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create a robot",
      400,
      (error as Error).message,
    );

    next(customError);
  }
};
