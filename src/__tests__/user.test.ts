import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";
import * as UserService from "../services/user.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "test@gmail.com",
  name: "ethan",
};

const userInput = {
  email: "test@gmail.com",
  name: "ethan",
};

describe("creating users", () => {
  describe("given the username and password are valid", () => {
    it("should return the user payload", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/users")
        .send(userInput);

      expect(statusCode).toBe(200);
      expect(body).toEqual(userPayload);
      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    });
  });

  describe("given the user service throws erros", () => {
    it("should return a 409 error", async () => {
      const createUserServiceMock = jest
        .spyOn(UserService, "createUser")
        .mockRejectedValueOnce("error");

      const { statusCode } = await supertest(createServer())
        .post("/api/users")
        .send(userInput);

      expect(statusCode).toBe(409);
      expect(createUserServiceMock).toHaveBeenCalled();
    });
  });
});
  