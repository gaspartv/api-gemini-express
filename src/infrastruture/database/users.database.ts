import { UsersRepository } from "../../domain/repositories/users.repository";
import { UsersEntity } from "../../domain/entities/users.entity";
import { prisma } from "../../app";
import { UserData } from "../../domain/types/users.data";

export class UsersRepositoryPrisma implements UsersRepository {
  save(User: UsersEntity): Promise<UserData> {
    return prisma.user.upsert({
      where: { id: User.id },
      update: User.toJSON,
      create: User.toJSON,
    });
  }

  findByEmail(email: string): Promise<UserData | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<UserData | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  findAll(): Promise<UserData[]> {
    return prisma.user.findMany();
  }
}
