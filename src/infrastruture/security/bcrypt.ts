import { env } from "../configs/validate-env";
import bcrypt from "bcryptjs";

export class Bcrypt {
  static hash(password: string): string {
    return bcrypt.hashSync(password, Number(env.SECURITY_SALT));
  }

  static compare(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
