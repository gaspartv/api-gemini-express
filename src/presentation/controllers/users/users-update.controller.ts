import {Application} from "express";

export class UsersUpdateController {
  localUrl: string;

  constructor() {
    this.localUrl = '/users';
  }

  execute(app: Application) {
    app.get(`${this.localUrl}/update`, (req, res) => {
      res.send('Usuário atualizado com sucesso!');
    });
  }
}
