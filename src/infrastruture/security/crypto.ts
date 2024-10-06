import crypto from "crypto";
import { env } from "../configs/validate-env";

export class Crypto {
  static hash(value: string): string {
    return crypto.createHash("sha256").update(value).digest("hex");
  }

  static encrypt(value: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        env.SECURITY_ALGORITHM,
        Buffer.from(this.getEncryptionKey()),
        iv,
      );
      let encryptedMessage = cipher.update(value, "utf8", "hex");
      encryptedMessage += cipher.final("hex");
      return iv.toString("hex") + ":" + encryptedMessage;
    } catch {
      throw new Error("algorítimo de criptografia inválido");
    }
  }

  static decrypt(value: string): string {
    try {
      const [ivHex, encryptedMessage] = value.split(":");
      const decipher = crypto.createDecipheriv(
        env.SECURITY_ALGORITHM,
        Buffer.from(this.getEncryptionKey()),
        Buffer.from(ivHex, "hex"),
      );
      let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf8");
      decryptedMessage += decipher.final("utf8");
      return decryptedMessage;
    } catch {
      throw new Error("algorítimo de criptografia inválido");
    }
  }

  private static getEncryptionKey(): Buffer {
    return crypto.pbkdf2Sync(
      env.SECURITY_SECRET!,
      env.SECURITY_SALT!,
      10000,
      32,
      "sha512",
    );
  }
}
