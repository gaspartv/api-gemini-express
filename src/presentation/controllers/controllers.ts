import {UsersCreateController} from "./users/users-create.controller";
import {Application} from "express";
import {UsersUpdateController} from "./users/users-update.controller";
import {CompaniesCreateController} from "./company/companies-create.controller";
import {CompaniesUpdateController} from "./company/companies-update.controller";

export class Controllers {
  execute(app: Application) {
    this.usersController(app);
    this.companiesController(app);
  }

  private usersController(app: Application) {
    new UsersCreateController().execute(app);
    new UsersUpdateController().execute(app);
  }

  private  companiesController(app: Application) {
    new CompaniesCreateController().execute(app);
    new CompaniesUpdateController().execute(app);
  }
}
