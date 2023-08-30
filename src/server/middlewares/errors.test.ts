import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { endpointNotFound, generalErrorHandler } from "./errors";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();
const customError = new CustomError(
  "Endpoint not found",
  404,
  "Endpoint not found",
);

describe("Given an endpointNotFound middleware", () => {
  describe("When it receives a request,a response and a next function", () => {
    test("Then its next function should be called with error 'Endpoint not found'", () => {
      endpointNotFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});

describe("Given a generalErrorHandler controller", () => {
  describe("When it receives a CustomError 'Endpoint not found' with status 404, a request, a response and next function", () => {
    test("Then it should respond with status 404", () => {
      const expectedStatusCode = 404;

      generalErrorHandler(customError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with error 'Endpoint not found", () => {
      const expectedErrorMessage = "Endpoint not found";

      generalErrorHandler(customError, req as Request, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });

  describe("When it receives and error with message 'Robot not existing', a request, a response and a next function", () => {
    test("Then it should respond with status 500", () => {
      const error = new Error("Robot not existing");
      const expectedStatusCode = 500;

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives and error with message '', a request, a response and a next function", () => {
    test("Then it should respond with 'Internal server error'", () => {
      const error = new Error("");
      const expectedErrorMessage = "Internal server error";

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
