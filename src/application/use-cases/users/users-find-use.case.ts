import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UserData } from "../../../domain/types/users.data";
import { userOrThrowService } from "../../services/user-or-throw.service";
import { redisClient } from "../../../app";

async function usersFindUseCase(id: string): Promise<UsersResponseDto> {
  const userCache = await redisClient.get(id);
  if (userCache) return JSON.parse(userCache);

  const userFound: UserData = await userOrThrowService(id);
  const User = new UsersEntity(userFound);

  await redisClient.set(User.id, JSON.stringify(User.response), {
    EX: 3600,
  });

  return User.response;
}

export { usersFindUseCase };
