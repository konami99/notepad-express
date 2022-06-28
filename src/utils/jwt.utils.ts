import jwt from "jsonwebtoken";
import { decode } from "punycode";

export function signJwt (
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    "base64",
  ).toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
) {
  const publicKey = Buffer.from(
    process.env.ACCESS_TOKEN_PUBLIC_KEY as string, "base64").toString(
    "ascii",
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}