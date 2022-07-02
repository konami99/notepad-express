import mongoose from "mongoose";
import supertest from "supertest";
import createServer from "../utils/server";
import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import * as JwtUtils from "../utils/jwt.utils";
import { createUserSessionHandler } from "../controllers/session.controller";
import UserModel from "../models/user.model";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  toJSON: () => {
    return {
      _id: userId,
      email: "test@gmail.com",
      name: "ethan",
    }
  }
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: "PostmanRuntime/7.28.4",
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
}

const accessToken = "access token";

describe("", () => {
  it("", async () => {
    const userModelMock = jest
      .spyOn(UserModel, "findOne")
      // @ts-ignore
      .mockReturnValueOnce(userPayload);

    const sessionServiceMock = jest
      .spyOn(SessionService, "createSession")
      // @ts-ignore
      .mockReturnValueOnce(sessionPayload);

    const jwtUtilsMock = jest
      .spyOn(JwtUtils, "signJwt")
      // @ts-ignore
      .mockReturnValueOnce(accessToken);

    const req = {
      body: {
        email: "test@gmail.com"
      },
      get: () => {
        return "a user agent";
      },
    };

    const send = jest.fn();

    const res = {
      send,
    };

    // @ts-ignore
    await createUserSessionHandler(req, res);

    expect(send).toHaveBeenCalledWith({
      accessToken: accessToken,
    });
  });
});