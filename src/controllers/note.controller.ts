import { Request, Response } from "express";
import { CreateNoteInput, DeleteNoteInput, GetNoteInput, UpdateNoteInput } from "../schema/note.schema";
import {
  createNote,
  deleteNote,
  findAndUpdateNote,
  findNote,
} from "../services/note.service";

export async function createNoteHandler(
  req: Request<{}, {}, CreateNoteInput["body"]>,
  res: Response,
) {
  const userId = res.locals.user._id;
  const body = req.body;
  const note = await createNote({ ...body, user: userId });
  return res.send(note);
}

export async function updateNoteHandler(
  req: Request<UpdateNoteInput["params"], {}, UpdateNoteInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const noteId = req.params.noteId;
  const update = req.body;

  const note = await findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  if (String(note.user) !== userId) {
    return res.sendStatus(403);
  }

  const updateNote = await findAndUpdateNote({ noteId }, update, { new: true });

  return res.send(updateNote)
}

export async function getNoteHandler(
  req: Request<GetNoteInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;

  const note = await findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  return res.send(note);
}

export async function deleteNoteHandler(
  req: Request<DeleteNoteInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const noteId = req.params.noteId;

  const note = await findNote({ noteId });

  if (!note) {
    return res.sendStatus(404);
  }

  if (String(note.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteNote({ noteId });

  return res.sendStatus(200);
}