import { Request, Response, Router } from "express";
import { authSignInUseCase } from "../../application/use-cases/auth/auth-sign-in.use-case";
import { authSignInNormalize } from "../middlewares/auth/auth-sign-in.normalize";
import { authSignInSchema } from "../middlewares/auth/auth-sign-in.schema";
import { validateSchemaMiddleware } from "../middlewares/validate-schema.middleware";
import { AuthResponseDto } from "../../application/dtos/auth/auth-response.dto";

const authController: Router = Router();

authController.post(
  "/sign-in",
  authSignInNormalize,
  validateSchemaMiddleware(authSignInSchema),
  authSignInController,
);
async function authSignInController(
  req: Request,
  res: Response,
): Promise<void> {
  const data: AuthResponseDto = await authSignInUseCase(req.body);
  res.status(200).json(data);
}

export { authController };
