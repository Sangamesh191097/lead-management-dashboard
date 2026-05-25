import jwt, { Secret, SignOptions } from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (
  payload: TokenPayload
) => {
  const secret: Secret = process.env.JWT_SECRET!;

  const options: SignOptions = {
    expiresIn:
      (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "7d",
  };

  return jwt.sign(payload, secret, options);
};