import { Request, Response, NextFunction } from "express";
import { generateFollowupMessage } from "../services/ai.service";

export const generateFollowup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await generateFollowupMessage(req.body);

    console.log(message, "Message")

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.log(error, "ERROR")
    next(error);
  }
};