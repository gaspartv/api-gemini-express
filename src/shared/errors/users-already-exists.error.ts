import { AppError } from "../../presentation/middlewares/global-error-handler";

class UsersAlreadyExistsError extends AppError {
  constructor() {
    super("User already exists", 409);
  }
}

export default UsersAlreadyExistsError;
