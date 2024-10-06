import { UsersCreateDto } from "../../dtos/users/users-create.dto";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import UsersAlreadyExistsError from "../../../shared/errors/users-already-exists.error";

async function userCreateUseCase(
  dto: UsersCreateDto,
): Promise<UsersResponseDto> {
  const User = new UsersEntity();
  User.create = dto;

  const database = new UsersRepositoryPrisma();

  const userFound = await database.findByEmail(User.email);
  if (userFound) {
    throw new UsersAlreadyExistsError();
  }

  const userCreate = await database.save(User);
  return {
    ...userCreate,
    disabledAt: User.getDate(userCreate.disabledAt),
    createdAt: User.getDate(userCreate.createdAt),
    updatedAt: User.getDate(userCreate.updatedAt),
    deletedAt: User.getDate(userCreate.deletedAt),
  };
}

export { userCreateUseCase };
