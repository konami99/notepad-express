import jwt from "jsonwebtoken";
import { decode } from "punycode";

export function signJwt (
  object: Object,
  options?: jwt.SignOptions | undefined
) {

  console.log(`ACCESS_TOKEN_PRIVATE_KEY===${process.env.ACCESS_TOKEN_PRIVATE_KEY}`);
  const signingKey = Buffer.from(
    process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    "base64",
  ).toString("ascii");

  console.log(`signingKey===${signingKey}`);

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(
  token: string,
) {
  const publicKey = Buffer.from(
    process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
    "ascii",
  );

  try {
    const decoded = jwt.verify(token, publicKey);
    console.log(`decoded------${decoded}`);
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