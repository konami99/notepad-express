import { Express, Request, Response } from "express";
import { result } from "lodash";
import { createNoteHandler, deleteNoteHandler, getNoteHandler, updateNoteHandler } from "./controllers/note.controller";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controllers/session.controller";
import { createUserHandler } from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createNoteSchema, deleteNoteSchema, getNoteSchema, updateNoteSchema } from "./schema/note.schema";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler,
  )

  app.get("/api/sessions", requireUser, getUserSessionHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/notes",
    [requireUser, validateResource(createNoteSchema)],
    createNoteHandler,
  )

  app.put(
    "/api/notes/:noteId",
    [requireUser, validateResource(updateNoteSchema)],
    updateNoteHandler
  );

  app.get(
    "/api/notes/:noteId",
    [requireUser, validateResource(getNoteSchema)],
    getNoteHandler
  );

  app.delete(
    "/api/notes/:noteId",
    [requireUser, validateResource(deleteNoteSchema)],
    deleteNoteHandler
  );
}

export default routes;