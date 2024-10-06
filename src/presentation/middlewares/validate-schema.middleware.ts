import { ZodSchema } from "zod";
import { NextFunction, Request, Response } from "express";

const validateSchemaMiddleware = <T extends ZodSchema>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      // @ts-expect-error error is an instance of ZodError
      const message = error?.errors.map((err) => `${err.path}: ${err.message}`);
      res.status(422).json({ message });
    }
  };
};

export { validateSchemaMiddleware };
