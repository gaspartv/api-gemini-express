import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "homo", "prod"]),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),

  SECURITY_ALGORITHM: z.string(),
  SECURITY_SECRET: z.string(),
  SECURITY_SALT: z.coerce.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),

  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  REDIS_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

const env = _env.data;

export { env };
