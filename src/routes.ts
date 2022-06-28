import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", createUserHandler);

  app.post(
    "/api/sessions",
    createUserSessionHandler,
  )
}

export default routes;