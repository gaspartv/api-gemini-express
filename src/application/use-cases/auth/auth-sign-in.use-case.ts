import { AuthSignInDto } from "../../dtos/auth/auth-sign-in.dto";
import { AuthEntity } from "../../../domain/entities/auth.entity";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import AuthEmailPasswordInvalidError from "../../../shared/errors/auth-password-invalid.error";
import { env } from "../../../infrastruture/configs/validate-env";
import jwt from "jsonwebtoken";

async function authSignInUseCase(dto: AuthSignInDto) {
  const Auth = new AuthEntity(dto);

  const userDB = new UsersRepositoryPrisma();

  const userFound = await userDB.findByEmail(Auth.email);

  if (!userFound) {
    throw new AuthEmailPasswordInvalidError();
  }

  const accessToken = jwt.sign(
    { id: userFound.id, email: userFound.email },
    env.JWT_SECRET,
    { expiresIn: "1m" },
  );

  return { accessToken };
}

export { authSignInUseCase };
