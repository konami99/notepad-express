import { Request, Response } from "express";
import config from "config";
import UserModel from "../models/user.model";
import {
  createSession,
  findSessions,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt.utils";
import { omit } from "lodash";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const session = await createSession(user, req.get("user-agent") || "");
  const accessToken = signJwt(
    { ...omit(user.toJSON(), 'password'), session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  )

  const refreshToken = signJwt(
    { ...omit(user.toJSON(), 'password'), session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  )

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}