import { NextFunction, Request, Response } from "express";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const globalHandleError = async (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: [err.message],
    });
    return;
  }

  res.status(500).json({
    message: ["Internal server error"],
  });
};

export { globalHandleError, AppError };
