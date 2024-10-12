import { UsersCreateDto } from "../../dtos/users/users-create.dto";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import { usersAlreadyExistsService } from "../../services/users-already-exists.service";
import { redisClient } from "../../../app";

async function usersCreateUseCase(
  dto: UsersCreateDto,
): Promise<UsersResponseDto> {
  try {
    await usersAlreadyExistsService(dto.email);

    const User = new UsersEntity();
    User.create = dto;

    const database = new UsersRepositoryPrisma();
    await database.save(User);

    await redisClient.set(User.id, JSON.stringify(User.response), {
      EX: 3600,
    });

    return User.response;
  } catch (err) {
    console.log(err);
  }
}

export { usersCreateUseCase };
