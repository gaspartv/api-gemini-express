import { Request, Response, Router } from "express";
import { userCreateUseCase } from "../../application/use-cases/users/users-create.use-case";
import { UsersResponseDto } from "../../application/dtos/users/users-response.dto";
import { usersCreateSchema } from "../middlewares/users/users-create.schema";
import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware";
import { usersCreateNormalize } from "../middlewares/users/users-create.normalize";
import { authJwtMiddleware } from "../middlewares/auth-jwt.middleware";

const usersController: Router = Router();

usersController.post(
  "/register",
  authJwtMiddleware,
  usersCreateNormalize,
  validateSchemaMiddleware(usersCreateSchema),
  usersCreateController,
);
async function usersCreateController(
  req: Request,
  res: Response,
): Promise<void> {
  const data: UsersResponseDto = await userCreateUseCase(req.body);
  res.status(201).json(data);
}

export { usersController };
