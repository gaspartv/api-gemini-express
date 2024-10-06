import { AppError } from "../../presentation/middlewares/global-error-handler";

class UsersNotFoundError extends AppError {
  constructor() {
    super("User not found", 404);
  }
}

export default UsersNotFoundError;
