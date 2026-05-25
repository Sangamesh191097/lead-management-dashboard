import api from "../lib/axios";


export const getLeads = async (
  search = "",
  page = 1
) => {
  const response = await api.get("/leads", {
    params: {
      search,
      page,
      limit: 5,
    },
  });

  return response.data;
};

export const createLead = async (data: {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes?: string;
}) => {
  const response = await api.post("/leads", data);
  return response.data;
};

export const updateLead = async (
  id: string,
  data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    status: string;
    notes: string;
  }
) => {
  const response = await api.put(`/leads/${id}`, data);
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};