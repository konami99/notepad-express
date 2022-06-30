import { Request, Response } from "express";
import {
  createNote,
  deleteNote,
  findAndUpdateNote,
  findNote,
} from "../services/note.service";

export async function createNoteHandler(
  req: Request,
  res: Response,
) {
  const userId = res.locals.user._id;
  const body = req.body;
  const note = await createNote({ ...body, user: userId });
  return res.send(note);
}