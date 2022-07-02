import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { createNote } from "../services/note.service";
import { signJwt } from "../utils/jwt.utils";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const notePayload = {
  user: userId,
  title: "shopping list",
  content: "carrots, bananas, oranges",
};

export const userPayload = {
  _id: userId,
  email: "jane.doe@example.com",
  name: "Jane Doe",
};

describe("note", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("create note", () => {
    it("should return a 200 and create the note", async () => {
      const jwt = signJwt(userPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/notes")
        .set("Authorization", `Bearer ${jwt}`)
        .send(notePayload);

      expect(statusCode).toBe(200);

      expect(body).toEqual({
        __v: 0,
        _id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        title: "shopping list",
        content: "carrots, bananas, oranges",
        user: expect.any(String),
      });
    })
  });
});