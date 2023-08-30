import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError";
import Robot from "../../../../database/models/Robot";
import { createdRobotMock } from "../../../../mocks/robotsMock";
import { type RobotStructure } from "../../../../types";
import { addRobot } from "../robotsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an addRobot controller", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  describe("When it receives a request with a Robot, a response and a next function", () => {
    Robot.create = jest.fn().mockResolvedValue(createdRobotMock);

    test("Then it should respond with status 201", async () => {
      const expectedStatusCode = 201;

      await addRobot(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          RobotStructure
        >,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with the new Robot created", async () => {
      await addRobot(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          RobotStructure
        >,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ robot: createdRobotMock });
    });
  });

  describe("When it receives a request with an incorrect Robot, a response and next function", () => {
    test("Then it should respond with the new robot", async () => {
      const error = new Error("error");
      const customError = new CustomError(
        "Couldn't create a robot",
        400,
        error.message,
      );

      Robot.create = jest.fn().mockRejectedValue(error);

      await addRobot(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          RobotStructure
        >,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
