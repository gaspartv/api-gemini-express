import { z } from "zod";

const authSignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export { authSignInSchema };
