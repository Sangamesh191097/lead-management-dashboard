import {prisma} from "../config/db";

export const createActivity = async (
  leadId: string | null,
  action: string,
  description: string
) => {
   return prisma.activity.create({
    data: {
      leadId,
      action,
      description,
    },
  });
};

export const getRecentActivities = async () => {
  return prisma.activity.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
};
export const deleteActivitiesByLeadId = async (
  leadId: string
) => {
  return prisma.activity.deleteMany({
    where: {
      leadId,
    },
  });
};