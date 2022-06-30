import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface NoteInput {
  user: UserDocument["_id"];
  title: string;
  content: string;
}

export interface NoteDocument extends NoteInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const NoteModel = mongoose.model<NoteDocument>("Note", noteSchema);

export default NoteModel;
