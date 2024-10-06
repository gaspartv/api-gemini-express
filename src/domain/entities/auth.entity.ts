import { Bcrypt } from "../../infrastruture/security/bcrypt";
import AuthEmailPasswordInvalidError from "../../shared/errors/auth-password-invalid.error";
import { Crypto } from "../../infrastruture/security/crypto";

interface AuthSet {
  email: string;
  password: string;
}

export class AuthEntity {
  private _email: string;
  private _password: string;

  constructor(dto: AuthSet) {
    this.email = dto.email;
    this._password = dto.password;
  }

  get toJson() {
    return {
      email: this.email,
      password: this.password,
    };
  }

  set email(value: string) {
    this._email = Crypto.hash(value);
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  comparePassword(password: string): void {
    const compare = Bcrypt.compare(password, this._password);
    if (!compare) throw new AuthEmailPasswordInvalidError();
  }
}
