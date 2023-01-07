import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import NoteModel, {
  NoteDocument,
  NoteInput,
} from "../models/note.model";

export async function createNote(input: NoteInput) {
  try {
    const result = await NoteModel.create(input);
    return result;
  } catch (e: any) {
    throw e;
  }
}

export async function findNote(
  query: FilterQuery<NoteDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await NoteModel.findOne(query, {}, options);
    return result;
  } catch (e: any) {
    throw e;
  }
}

export async function findAndUpdateNote(
  query: FilterQuery<NoteDocument>,
  update: UpdateQuery<NoteDocument>,
  options: QueryOptions = { lean: true }
) {
  return NoteModel.findOneAndUpdate(query, update, options);
}

export async function deleteNote(query: FilterQuery<NoteDocument>) {
  return NoteModel.deleteOne(query);
} 