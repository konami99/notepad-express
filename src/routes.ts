import { Express, Request, Response } from "express";
import { result } from "lodash";
import { createNoteHandler } from "./controllers/note.controller";
import { createUserSessionHandler, getUserSessionHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", createUserHandler);

  app.post(
    "/api/sessions",
    createUserSessionHandler,
  )

  app.get("/api/sessions", requireUser, getUserSessionHandler);

  app.post(
    "/api/notes",
    requireUser,
    createNoteHandler,
  )
}

export default routes;