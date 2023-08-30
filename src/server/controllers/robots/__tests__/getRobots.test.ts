import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError";
import Robot from "../../../../database/models/Robot";
import { robotsMock } from "../../../../mocks/robotsMock";
import { getRobots } from "../robotsControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a robotsController controller", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();
  describe("When it receives a request, a respond and next function", () => {
    Robot.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(robotsMock),
    });

    test("Then it should respond with status 200", async () => {
      const expectedStatusCode = 200;

      await getRobots(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with a robots list", async () => {
      await getRobots(req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ robots: robotsMock });
    });
  });

  describe("When it receives a request, a response, a next function and exec() rejects", () => {
    test("Then it should called a next function with error 'Couldn't get the robots' and status 404", async () => {
      const error = new Error("error");
      const customError = new CustomError(
        "Couldn't get the robots",
        404,
        error.message,
      );

      Robot.find = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await getRobots(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
