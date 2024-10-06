import { BaseEntity } from "./base.entity";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import cuid from "cuid";
import { Crypto } from "../../infrastruture/security/crypto";
import { Bcrypt } from "../../infrastruture/security/bcrypt";
import { UserData } from "../types/users.data";

dayjs.extend(utc);
dayjs.extend(timezone);

interface UsersSet {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  disabledAt?: Date | null;
  email?: string;
  password?: string;
}

interface UsersCreate {
  email: string;
  password: string;
}

interface UsersUpdate {
  email?: string;
  password?: string;
}

export class UsersEntity extends BaseEntity {
  private _email?: string;
  private _emailHash?: string;
  private _password?: string;

  constructor(dto?: UsersSet) {
    super(dto);
    this._email = dto?.email || null;
    this._emailHash = dto?.email || null;
    this._password = dto?.password || null;
  }

  getDate(date: Date | null) {
    if (!date) return null;
    return dayjs(date).tz("America/Sao_Paulo").format("DD-MM-YYYY HH:mm:ss");
  }

  get toJSON(): UserData {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      disabledAt: this.disabledAt,
      email: this._email,
      emailHash: this._emailHash,
      passwordHash: this._password,
    };
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  set email(value: string) {
    this._email = Crypto.hash(value);
    this._emailHash = Crypto.encrypt(value);
  }

  set password(value: string) {
    this._password = Bcrypt.hash(value);
  }

  set create(dto: UsersCreate) {
    this.id = cuid();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
    this.disabledAt = null;
    this.email = dto.email;
    this.password = dto.password;
  }

  set update(dto: UsersUpdate) {
    this.updatedAt = new Date();
    if (dto.email) this._email = dto.email;
    if (dto.password) this._password = dto.password;
  }

  set changeEmail(email: string) {
    this.updatedAt = new Date();
    this._email = email;
  }

  set changePassword(password: string) {
    this.updatedAt = new Date();
    this._password = password;
  }

  private dateGenerate(data?: Date | undefined) {
    if (!data) return dayjs().toDate();
    return dayjs(data).toDate();
  }
}
