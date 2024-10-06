export class UsersResponseDto {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
  readonly disabledAt: string | null;
  readonly email: string;
  readonly passwordHash: string;
}
