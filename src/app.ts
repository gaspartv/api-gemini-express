import 'dotenv/config';
import express, { Application } from 'express';
import {Controllers} from "./presentation/controllers/controllers";

class App {
  app: Application = express();
  port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT);
    this.controllers();
  }

  controllers() {
    new Controllers().execute(this.app);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`PORT: ${this.port}`);
    });
  }
}

const appInstance = new App();
appInstance.start();
