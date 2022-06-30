import { Request, Response } from "express";
import {
  createNote,
  deleteNote,
  findAndUpdateNote,
  findNote,
} from "../services/note.service";
