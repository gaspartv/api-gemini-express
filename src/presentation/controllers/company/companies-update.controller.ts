import {Application} from "express";

export class CompaniesUpdateController {
  localUrl: string;

  constructor() {
    this.localUrl = '/companies';
  }

  execute(app: Application) {
    app.get(`${this.localUrl}/update`, (req, res) => {
      res.send('Empresa atualizada com sucesso!');
    });
  }
}
