import {Application} from "express";

export class UsersCreateController {
  localUrl: string;

  constructor() {
    this.localUrl = '/users';
  }

  execute(app: Application) {
    app.get(`${this.localUrl}/create`, (req, res) => {
      res.send('Usuário criado com sucesso!');
    });
  }
}
