import { Router } from "express";
import { generateFollowup } from "../controllers/ai.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/followup",
  authenticate,
  generateFollowup
);

export default router;