import { AuthSignInDto } from "../../dtos/auth/auth-sign-in.dto";
import { AuthEntity } from "../../../domain/entities/auth.entity";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import AuthEmailPasswordInvalidError from "../../../shared/errors/auth-password-invalid.error";
import { env } from "../../../infrastruture/configs/validate-env";
import jwt from "jsonwebtoken";
import { AuthResponseDto } from "../../dtos/auth/auth-response.dto";
import { UserData } from "../../../domain/types/users.data";

async function authSignInUseCase(dto: AuthSignInDto): Promise<AuthResponseDto> {
  const Auth = new AuthEntity(dto);

  const userDB = new UsersRepositoryPrisma();

  const userFound: UserData = await userDB.findByEmail(Auth.email);
  if (!userFound) {
    throw new AuthEmailPasswordInvalidError();
  }

  Auth.comparePassword(userFound.passwordHash);

  const accessToken: string = jwt.sign(
    { id: userFound.id, email: userFound.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  );

  return { accessToken };
}

export { authSignInUseCase };
