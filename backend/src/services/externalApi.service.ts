import {prisma} from "../config/db";
import { Activity } from "@prisma/client";

export const getDashboardStats = async () => {
  const totalLeads = await prisma.lead.count();

  const activeLeads = await prisma.lead.count({
    where: {
      status: "ACTIVE",
    },
  });

  const closedLeads = await prisma.lead.count({
    where: {
      status: "CLOSED",
    },
  });

  let recentActivities:Activity[] = [];
  let weather = null;

  try {
    recentActivities = await prisma.activity.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
  } catch {}

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    if (response.ok) {
      weather = await response.json();
    }
  } catch {}

  return {
    totalLeads,
    activeLeads,
    closedLeads,
    recentActivities,
    weather,
  };
};