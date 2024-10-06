import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UserData } from "../../../domain/types/users.data";

async function usersListUseCase(): Promise<UsersResponseDto[]> {
  const database = new UsersRepositoryPrisma();
  const usersFound: UserData[] = await database.findAll();
  return usersFound.map((user: UserData): UsersResponseDto => {
    const User = new UsersEntity(user);
    return User.response;
  });
}

export { usersListUseCase };
