import { UsersResponseDto } from "../../dtos/users/users-response.dto";
import { UsersEntity } from "../../../domain/entities/users.entity";
import { UserData } from "../../../domain/types/users.data";
import { userOrThrowService } from "../../services/user-or-throw.service";

async function usersFindUseCase(id: string): Promise<UsersResponseDto> {
  const userFound: UserData = await userOrThrowService(id);
  const User = new UsersEntity(userFound);
  return User.response;
}

export { usersFindUseCase };
