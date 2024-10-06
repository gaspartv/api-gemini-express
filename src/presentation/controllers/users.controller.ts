import { Request, Response, Router } from "express";
import { usersCreateUseCase } from "../../application/use-cases/users/users-create.use-case";
import { UsersResponseDto } from "../../application/dtos/users/users-response.dto";
import { usersCreateSchema } from "../middlewares/users/users-create.schema";
import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware";
import { usersCreateNormalize } from "../middlewares/users/users-create.normalize";
import { authJwtMiddleware } from "../middlewares/auth-jwt.middleware";
import { usersFindUseCase } from "../../application/use-cases/users/users-find-use.case";
import { usersListUseCase } from "../../application/use-cases/users/users-list.use-case";
import { messageResponseDto } from "../../application/dtos/message-response.dto";
import { usersDeleteUseCase } from "../../application/use-cases/users/users-delete.use-case";
import { usersEditUseCase } from "../../application/use-cases/users/users-edit.use-case";

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
  const data: UsersResponseDto = await usersCreateUseCase(req.body);
  res.status(201).json(data);
}

usersController.get("/profile", authJwtMiddleware, usersProfileController);
async function usersProfileController(
  req: Request,
  res: Response,
): Promise<void> {
  // @ts-expect-error: Property 'user' does not exist on type 'Request'.
  const data: UsersResponseDto = await usersFindUseCase(req.user.id);
  res.status(200).json(data);
}

usersController.get("/:id", authJwtMiddleware, usersFindController);
async function usersFindController(req: Request, res: Response): Promise<void> {
  const data: UsersResponseDto = await usersFindUseCase(req.params.id);
  res.status(200).json(data);
}

usersController.get("/", authJwtMiddleware, usersListController);
async function usersListController(
  _req: Request,
  res: Response,
): Promise<void> {
  const data: UsersResponseDto[] = await usersListUseCase();
  res.status(200).json(data);
}

usersController.delete("/:id/delete", authJwtMiddleware, usersDeleteController);
async function usersDeleteController(
  req: Request,
  res: Response,
): Promise<void> {
  const data: messageResponseDto = await usersDeleteUseCase(req.params.id);
  res.status(200).json(data);
}

usersController.patch("/:id/edit", authJwtMiddleware, usersEditController);
async function usersEditController(req: Request, res: Response): Promise<void> {
  const data: UsersResponseDto = await usersEditUseCase(
    req.params.id,
    req.body,
  );
  console.log(data, "data");
  res.status(200).json(data);
}

usersController.patch(
  "/profile/edit",
  authJwtMiddleware,
  usersProfileEditController,
);
async function usersProfileEditController(
  req: Request,
  res: Response,
): Promise<void> {
  // @ts-expect-error: Property 'user' does not exist on type 'Request'.
  const data: UsersResponseDto = await usersEditUseCase(req.user.id, req.body);
  res.status(200).json(data);
}

usersController.patch("/:id/disable");

usersController.patch("/:id/enable");

export { usersController };
