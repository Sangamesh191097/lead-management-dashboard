import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().min(10),
  company: z.string().min(2),
  status: z.enum(["NEW", "ACTIVE", "CLOSED"]).optional(),
  notes: z.string().optional(),
});

export type CreateLeadInputDataType = z.infer<typeof createLeadSchema>;
export const updateLeadSchema = createLeadSchema.partial();