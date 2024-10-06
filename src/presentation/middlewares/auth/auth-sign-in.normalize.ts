import { NextFunction, Request, Response } from "express";
import { AuthSignInDto } from "../../../application/dtos/auth/auth-sign-in.dto";

const authSignInNormalize = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password }: AuthSignInDto = req.body;

  req.body = {
    email,
    password,
  };

  next();
};

export { authSignInNormalize };
