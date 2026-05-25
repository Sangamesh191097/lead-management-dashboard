import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const generateToken = (
  payload: TokenPayload
) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};