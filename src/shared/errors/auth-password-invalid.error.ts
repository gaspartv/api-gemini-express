import { AppError } from "../../presentation/middlewares/global-error-handler";

class AuthEmailPasswordInvalidError extends AppError {
  constructor() {
    super("Invalid email or password", 401);
  }
}

export default AuthEmailPasswordInvalidError;
