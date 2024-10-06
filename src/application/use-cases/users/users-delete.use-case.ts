import { messageResponseDto } from "../../dtos/message-response.dto";
import { UsersRepositoryPrisma } from "../../../infrastruture/database/users.database";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UserData } from "../../../domain/types/users.data";
import { userOrThrowService } from "../../services/user-or-throw.service";

async function usersDeleteUseCase(id: string): Promise<messageResponseDto> {
  const userFound: UserData = await userOrThrowService(id);
  const User = new UsersEntity(userFound);
  User.deletedAt = new Date();

  const database = new UsersRepositoryPrisma();
  await database.save(User);

  return { message: "User deleted successfully" };
}

export { usersDeleteUseCase };
