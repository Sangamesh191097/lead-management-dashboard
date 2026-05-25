"use client";

import { Trash2, Pencil, Sparkles } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes?: string;
  createdAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
  onGenerateAI: (lead: Lead) => void;
}

export default function LeadsTable({
  leads,
  searchTerm,
  onSearchChange,
  page,
  totalPages,
  onPageChange,
  onDelete,
  onEdit,
  onGenerateAI,
}: LeadsTableProps) {
  // const handleDelete = (id: string, name: string) => {
  //   const confirmed = window.confirm(
  //     `Delete lead "${name}"?`
  //   );

  //   if (confirmed) {
  //     onDelete(id);
  //   }
  // };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Lead Management
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none"
          />

         
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white/50 border-b border-white/10">
              <th className="pb-4">Name</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Phone</th>
              <th className="pb-4">Company</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Notes</th>
              <th className="pb-4">Created</th>
              <th className="pb-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
              >
                <td className="py-5 text-white">
                  {lead.name}
                </td>

                <td className="text-white/80">
                  {lead.email}
                </td>

                <td className="text-white/80">
                  {lead.phone}
                </td>

                <td className="text-white/80">
                  {lead.company}
                </td>

                <td>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-medium ${
                      lead.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="text-white/80">
                  {lead.notes || "-"}
                </td>

                <td className="text-white/80">
                  {new Date(lead.createdAt)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "-")}
                </td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(lead)}
                      className="w-10 h-10 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center"
                    >
                      <Pencil
                        size={18}
                        className="text-blue-400"
                      />
                    </button>

                    <button
                      onClick={() => onGenerateAI(lead)}
                      className="w-10 h-10 rounded-xl bg-fuchsia-500/10 hover:bg-fuchsia-500/20 flex items-center justify-center"
                    >
                      <Sparkles
                        size={18}
                        className="text-fuchsia-400"
                      />
                    </button>

                    <button
                      onClick={() => onDelete(lead.id)}
                      className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center"
                    >
                      <Trash2
                        size={18}
                        className="text-red-400"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() =>
              onPageChange(page - 1)
            }
            className="px-5 py-2 rounded-xl bg-white/5 text-white disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-white/70 flex items-center">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() =>
              onPageChange(page + 1)
            }
            className="px-5 py-2 rounded-xl bg-white/5 text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}