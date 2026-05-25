import api from "../lib/axios";

export const generateFollowup = async (
  lead: any
) => {
  const response = await api.post(
    "/ai/followup",
    lead
  );

  return response.data;
};