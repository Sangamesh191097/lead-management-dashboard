"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  Activity,
  CloudSun,
  Droplets,
  Wind,
} from "lucide-react";
import toast from "react-hot-toast";

import AppShell from "../../components/dashboard/AppShell";
import StatsCard from "../../components/dashboard/StatsCard";
import LeadsTable from "../../components/dashboard/LeadsTable";
import LeadModal from "../../components/dashboard/LeadModal";
import AIFollowupModal from "../../components/dashboard/AIFollowUpModal";
import { generateFollowup } from "../../services/ai.service";

import { getDashboardStats } from "../../services/dashboard.service";

import {
  getLeads,
  deleteLead,
  createLead,
  updateLead,
} from "../../services/lead.service";
import DeleteConfirmModal from "@/src/components/dashboard/DeleteConfirmModal";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes?: string;
}

export default function DashboardPage() {
  const queryClient = useQueryClient();

  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] =
  useState<Lead | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [aiModalOpen, setAiModalOpen] = useState(false);
const [aiMessage, setAiMessage] = useState("");
const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  

  const { data: leadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ["leads", debouncedSearch, page],
    queryFn: () => getLeads(debouncedSearch, page),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      toast.success("Lead deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      toast.success("Lead created successfully");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setIsAddLeadOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateLead(id, data),

    onSuccess: () => {
      toast.success("Lead updated successfully");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      setSelectedLead(null);
    },
  });

  const handleGenerateAI = async (lead: Lead) => {
  setAiModalOpen(true);
  setAiLoading(true);
  setAiMessage("");

  try {
    const response = await generateFollowup({
      name: lead.name,
      company: lead.company,
      status: lead.status,
      notes: lead.notes,
    });

    setAiMessage(response.data);
  } catch {
    toast.error("Failed to generate AI follow-up");
  } finally {
    setAiLoading(false);
  }
};

  const stats = statsData?.data;
  const weatherData = stats?.weather;

  console.log(weatherData, "weather")
  const activities = stats?.recentActivities || [];

  const leads = leadsData?.data?.leads || [];
  const totalPages = leadsData?.data?.totalPages || 1;

  return (
    <>
      <AppShell onAddLead={() => setIsAddLeadOpen(true)}>
        <div className="p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white">
                Dashboard Overview
              </h1>

              <p className="text-white/50 mt-2">
                Monitor your lead pipeline in real time
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Leads"
              value={statsLoading ? 0 : stats?.totalLeads || 0}
            />
            <StatsCard
              title="Active Leads"
              value={statsLoading ? 0 : stats?.activeLeads || 0}
            />
            <StatsCard
              title="Closed Leads"
              value={statsLoading ? 0 : stats?.closedLeads || 0}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <CloudSun size={24} className="text-yellow-400" />
                <h2 className="text-2xl font-semibold text-white">
                  Bengaluru Weather
                </h2>
              </div>

              {weatherData && (
                <div className="space-y-6">
                  <div className="text-6xl font-bold text-white">
                    {Math.round(weatherData.main.temp)}°C
                  </div>

                  <div className="text-white/70 text-xl capitalize">
                    {weatherData.weather[0].description}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div className="rounded-2xl bg-white/5 p-5">
                      <Droplets className="text-blue-400 mb-3" />
                      <p className="text-white/50">Humidity</p>
                      <p className="text-white text-2xl font-semibold">
                        {weatherData.main.humidity}%
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-5">
                      <Wind className="text-cyan-400 mb-3" />
                      <p className="text-white/50">Wind Speed</p>
                      <p className="text-white text-2xl font-semibold">
                        {weatherData.wind.speed} m/s
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Activity size={22} className="text-blue-400" />
                <h2 className="text-2xl font-semibold text-white">
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-4">
                {activities.map((activity: any) => (
                  <div
                    key={activity.id}
                    className="p-4 rounded-2xl bg-white/5 text-white/80"
                  >
                    {activity.description}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {!leadsLoading && (
            <LeadsTable
  leads={leads}
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
  page={page}
  totalPages={totalPages}
  onPageChange={setPage}
onDelete={(id) => {
  const lead = leads.find((l:Lead) => l.id === id);
  if (lead) {
    setLeadToDelete(lead);
  }
}}
  onEdit={(lead) => setSelectedLead(lead)}
  onGenerateAI={handleGenerateAI}
/>
          )}
        </div>
      </AppShell>

      <LeadModal
        mode="add"
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
      />

      <LeadModal
        mode="edit"
        isOpen={!!selectedLead}
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onSubmit={(data) =>
          updateMutation.mutate({
            id: selectedLead!.id,
            data,
          })
        }
      />

      

      <AIFollowupModal
  isOpen={aiModalOpen}
  message={aiMessage}
  loading={aiLoading}
  onClose={() => setAiModalOpen(false)}
/>

<DeleteConfirmModal
  isOpen={!!leadToDelete}
  leadName={leadToDelete?.name || ""}
  onCancel={() => setLeadToDelete(null)}
  onConfirm={() => {
    if (!leadToDelete) return;

    deleteMutation.mutate(leadToDelete?.id);
    setLeadToDelete(null);
  }}
/>
    </>
  );
}