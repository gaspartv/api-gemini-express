import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "homo", "prod"]),
  PORT: z.coerce.number(),
  SECURITY_ALGORITHM: z.string(),
  SECURITY_SECRET: z.string(),
  SECURITY_SALT: z.coerce.string(),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

const env = _env.data;

export { env };
