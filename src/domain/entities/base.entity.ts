import cuid from "cuid";

class BaseSet {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  disabledAt?: Date | null;
}

export class BaseEntity {
  private _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _disabledAt: Date | null;

  constructor(dto?: BaseSet) {
    this._id = dto?.id || cuid();
    this._createdAt = dto?.createdAt || new Date();
    this._updatedAt = dto?.updatedAt || new Date();
    this._deletedAt = dto?.deletedAt || null;
    this._disabledAt = dto?.disabledAt || null;
  }

  get id() {
    return this._id;
  }
  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get deletedAt() {
    return this._deletedAt;
  }
  get disabledAt() {
    return this._disabledAt;
  }

  set id(value: string) {
    this._id = value;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
  set deletedAt(value: Date | null) {
    this._updatedAt = value;
    this._deletedAt = value;
    this._disabledAt = value;
  }
  set disabledAt(value: Date | null) {
    this._updatedAt = value;
    this._disabledAt = value;
  }
}
