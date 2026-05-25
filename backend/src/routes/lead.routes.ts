import { Router } from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
  dashboardStats,
} from "../controllers/lead.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createLeadSchema,
  updateLeadSchema,
} from "../validators/lead.validator";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Lead routes working",
  });
});

router.get("/", authenticate, getLeads);

router.post(
  "/",
  authenticate,
  validate(createLeadSchema),
  createLead
);

router.put(
  "/:id",
  authenticate,
  validate(updateLeadSchema),
  updateLead
);

router.delete("/:id", authenticate, deleteLead);

router.get("/dashboard", authenticate, dashboardStats);

export default router;