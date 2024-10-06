import { usersController } from "./users.controller";
import { Express } from "express";
import { globalHandleError } from "../middlewares/global-error-handler";
import { authController } from "./auth.controller";

function controllers(app: Express): void {
  app.use("/users", usersController);
  app.use("/auth", authController);
  app.use(globalHandleError);
}

export { controllers };
