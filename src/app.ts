import "dotenv/config";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import { controllers } from "./presentation/controllers/controllers";
import { env } from "./infrastruture/configs/validate-env";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const prisma = new PrismaClient();
const port: number = Number(env.PORT);

app.use(cors({ origin: "*" }));
app.use(express.json());
controllers(app);

const server = app.listen(port, (): void => {
  console.info(`PORT: ${port}`);
});

process.on("SIGINT", async (): Promise<void> => {
  await prisma.$disconnect();
  server.close();
  console.info("Server closed");
});

export { app, prisma };
