import { UsersCreateDto } from "../../../application/dtos/users/users-create.dto";
import { NextFunction, Request, Response } from "express";

const usersCreateNormalize = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const { password, email }: UsersCreateDto = req.body;

  req.body = {
    password,
    email,
  };

  next();
};

export { usersCreateNormalize };
