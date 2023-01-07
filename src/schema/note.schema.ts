import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),
    content: string({
      required_error: "content is required",
    }),
  }),
};

const params = {
  params: object({
    noteId: string({
      required_error: "noteId is required",
    }),
  }),
};

export const createNoteSchema = object({
  ...payload,
});

export const updateNoteSchema = object({
  ...payload,
  ...params,
});

export const deleteNoteSchema = object({
  ...params,
});

export const getNoteSchema = object({
  ...params,
});

export type CreateNoteInput = TypeOf<typeof createNoteSchema>;
export type UpdateNoteInput = TypeOf<typeof updateNoteSchema>;
export type DeleteNoteInput = TypeOf<typeof deleteNoteSchema>;
export type GetNoteInput = TypeOf<typeof getNoteSchema>;