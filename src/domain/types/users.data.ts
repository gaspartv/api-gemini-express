export class UserData {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly disabledAt: Date | null;
  readonly email: string;
  readonly emailHash: string;
  readonly passwordHash: string;
}
