import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Auth routes working",
  });
});

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;