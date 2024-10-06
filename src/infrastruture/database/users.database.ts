import { UsersRepository } from "../../domain/repositories/users.repository";
import { UsersEntity } from "../../domain/entities/users.entity";
import { prisma } from "../../app";
import { UserData } from "../../domain/types/users.data";

export class UsersRepositoryPrisma implements UsersRepository {
  async save(User: UsersEntity): Promise<UserData> {
    return prisma.user.create({
      data: User.toJSON,
    });
  }

  async findByEmail(email: string): Promise<UserData | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}
