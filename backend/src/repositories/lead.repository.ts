import { prisma } from "../config/db";
import { Prisma } from "@prisma/client"

export const createLead = async (data:any) => {
  return prisma.lead.create({
    data,
  });
};

export const getAllLeads = async (
  filters: Prisma.LeadWhereInput = {},
  page = 1,
  limit = 5
) => {
  const skip = (page - 1) * limit;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),

    prisma.lead.count({
      where: filters,
    }),
  ]);

  return {
    leads,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};

export const getLeadById = async (id: string) => {
  return prisma.lead.findUnique({
    where: { id },
  });
};

export const updateLead = async (id: string, data: Prisma.LeadUpdateInput) => {
  return prisma.lead.update({
    where: { id },
    data,
  });
};

export const deleteLead = async (id: string) => {
  return prisma.lead.delete({
    where: { id },
  });
};