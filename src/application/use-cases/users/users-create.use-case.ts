import { UsersCreateDto } from "../../dtos/users/users-create.dto";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import { usersAlreadyExistsService } from "../../services/users-already-exists.service";

async function usersCreateUseCase(
  dto: UsersCreateDto,
): Promise<UsersResponseDto> {
  await usersAlreadyExistsService(dto.email);

  const User = new UsersEntity();
  User.create = dto;

  const database = new UsersRepositoryPrisma();
  await database.save(User);

  return User.response;
}

export { usersCreateUseCase };
