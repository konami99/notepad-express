import { Request, Response } from "express";
import UserModel from "../models/user.model";
import {
  createSession,
  findSessions,
  updateSession,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import { omit } from "lodash";
import { CreateSessionInput } from "../schema/session.schema";

export async function createUserSessionHandler(
  req: Request<{}, {}, CreateSessionInput["body"]>,
  res: Response
) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const session = await createSession(user, req.get("user-agent") || "");
  const accessToken = signJwt(
    { ...omit(user.toJSON(), 'password'), session: session._id },
    "ACCESS_TOKEN_PRIVATE_KEY",
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  )

  const refreshToken = signJwt(
    { ...omit(user.toJSON(), 'password'), session: session._id },
    "REFRESH_TOKEN_PRIVATE_KEY",
    { expiresIn: process.env.REFRESH_TOKEN_TTL }
  )

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refershToken: null,
  })
}