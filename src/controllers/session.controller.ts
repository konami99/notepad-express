import { Request, Response } from "express";
import UserModel from "../models/user.model";
import {
  createSession,
  findSessions,
} from "../services/session.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  const session = await createSession(user._id, req.get("user-agent") || "");
  const accessToken = signJwt(
    { ...user.toJSON(), session: session._id },
    { expiresIn: '15m' }
  )

  return res.send({ accessToken });
}