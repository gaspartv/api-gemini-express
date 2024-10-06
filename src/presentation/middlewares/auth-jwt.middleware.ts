import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { env } from "../../infrastruture/configs/validate-env";

function authJwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(403).send({ message: ["No token provided!"] });
    return;
  }

  jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).send({ message: ["Token invalid"] });
      return;
    }

    // @ts-ignore
    req.user = decoded;
    next();
  });
}
export { authJwtMiddleware };
