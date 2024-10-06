import UsersAlreadyExistsError from "../../shared/errors/users-already-exists.error";
import { UserData } from "../../domain/types/users.data";
import { UsersEntity } from "../../domain/entities/users.entity";
import { UsersRepositoryPrisma } from "../../infrastruture/database/users.database";

async function usersAlreadyExistsService(email: string): Promise<boolean> {
  const database = new UsersRepositoryPrisma();

  const UserAlreadyExists = new UsersEntity();
  UserAlreadyExists.email = email;
  const userAlreadyExists: UserData = await database.findByEmail(
    UserAlreadyExists.email,
  );
  if (userAlreadyExists) {
    throw new UsersAlreadyExistsError();
  }

  return true;
}

export { usersAlreadyExistsService };
