import * as leadRepo from "../repositories/lead.repository";
import * as activityRepo from "../repositories/activity.repository";
import { ApiError } from "../utils/ApiError";
import { Prisma } from "@prisma/client";


export const createLeadService = async (
  data: any,
  userId: string
) => {
  const lead = await leadRepo.createLead({
  ...data,
  owner: {
    connect: {
      id: userId,
    },
  },
});

  await activityRepo.createActivity(
    lead.id,
    "CREATE",
    `${lead.name} was added as a new lead`
  );

  return lead;
};

export const getLeadsService = async (
  search?: string,
  page = 1,
  limit = 5
) => {
  const filters = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
          {
            company: {
              contains: search,
              mode: "insensitive" as const,
            },
          },
        ],
      }
    : {};

  return leadRepo.getAllLeads(filters, page, limit);
};

export const updateLeadService = async (
  id: string,
  data: Prisma.LeadUpdateInput
) => {
  const existingLead = await leadRepo.getLeadById(id);

  if (!existingLead) {
    throw new ApiError(404, "Lead not found");
  }

  const changes: string[] = [];

  if (data.name && data.name !== existingLead.name) {
    changes.push(
      `name changed from "${existingLead.name}" to "${data.name}"`
    );
  }

  if (data.email && data.email !== existingLead.email) {
    changes.push(
      `email changed from "${existingLead.email}" to "${data.email}"`
    );
  }

  if (data.phone && data.phone !== existingLead.phone) {
    changes.push(
      `phone changed from "${existingLead.phone}" to "${data.phone}"`
    );
  }

  if (data.company && data.company !== existingLead.company) {
    changes.push(
      `company changed from "${existingLead.company}" to "${data.company}"`
    );
  }

  if (data.status && data.status !== existingLead.status) {
    changes.push(
      `status changed from "${existingLead.status}" to "${data.status}"`
    );
  }

  if (
    data.notes !== undefined &&
    data.notes !== existingLead.notes
  ) {
    changes.push(`notes updated`);
  }

  const updatedLead = await leadRepo.updateLead(id, data);

  await activityRepo.createActivity(
    updatedLead.id,
    "UPDATE",
    changes.length > 0
      ? `${updatedLead.name}: ${changes.join(", ")}`
      : `${updatedLead.name} was updated`
  );

  return updatedLead;
};

export const deleteLeadService = async (id: string) => {
  const existingLead = await leadRepo.getLeadById(id);

  if (!existingLead) {
    throw new ApiError(404, "Lead not found");
  }

  await activityRepo.createActivity(
    null,
    "DELETE",
    `${existingLead.name} was deleted`
  );

  await leadRepo.deleteLead(id);

  return true;
};