import api from "../lib/axios";

export const getDashboardStats = async () => {
  const response = await api.get("/leads/dashboard");
  return response.data;
};