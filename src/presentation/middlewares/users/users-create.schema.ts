import { z } from "zod";

const usersCreateSchema = z.object({
  email: z.string().email().min(10),
  password: z.string().min(8).max(30),
});

export { usersCreateSchema };
