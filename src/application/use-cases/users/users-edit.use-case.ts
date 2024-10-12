import { UsersEntity } from "../../../domain/entities/users.entity";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersEditDto } from "../../dtos/users/users-edit.dto";
import { UserData } from "../../../domain/types/users.data";
import { usersAlreadyExistsService } from "../../services/users-already-exists.service";
import { userOrThrowService } from "../../services/user-or-throw.service";
import { redisClient } from "../../../app";

async function usersEditUseCase(
  id: string,
  dto: UsersEditDto,
): Promise<UsersResponseDto> {
  await usersAlreadyExistsService(dto.email);

  const userFound: UserData = await userOrThrowService(id);
  const User = new UsersEntity(userFound);

  User.edit = dto;

  const database = new UsersRepositoryPrisma();
  await database.save(User);

  await redisClient.set(User.id, JSON.stringify(User.response), {
    EX: 3600,
  });

  return User.response;
}

export { usersEditUseCase };
