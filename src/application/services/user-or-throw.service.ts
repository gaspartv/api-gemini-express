import { UsersRepositoryPrisma } from "../../infrastruture/database/users.database";
import { UserData } from "../../domain/types/users.data";
import UsersNotFoundError from "../../shared/errors/users-not-found.error";

async function userOrThrowService(id: string): Promise<UserData> {
  const database = new UsersRepositoryPrisma();
  const userFound: UserData = await database.findById(id);
  if (!userFound) {
    throw new UsersNotFoundError();
  }
  return userFound;
}

export { userOrThrowService };
