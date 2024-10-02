import {Application} from "express";

export class CompaniesCreateController {
  localUrl: string;

  constructor() {
    this.localUrl = '/companies';
  }

  execute(app: Application) {
    app.get(`${this.localUrl}/create`, (req, res) => {
      res.send('Empresa criada com sucesso!');
    });
  }
}
