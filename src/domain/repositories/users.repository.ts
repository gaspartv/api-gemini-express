import { UsersEntity } from "../entities/users.entity";
import { UserData } from "../types/users.data";

export interface UsersRepository {
  save(User: UsersEntity): Promise<UserData>;
  findByEmail(email: string): Promise<UserData | null>;
  findById(id: string): Promise<UserData | null>;
  findAll(): Promise<UserData[]>;
}
