"use client";

import { useState, useEffect } from "react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes?: string;
}

interface EditLeadModalProps {
  isOpen: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSubmit: (
    id: string,
    data: {
      name: string;
      email: string;
      phone: string;
      company: string;
      status: string;
      notes: string;
    }
  ) => void;
}

export default function EditLeadModal({
  isOpen,
  lead,
  onClose,
  onSubmit,
}: EditLeadModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "ACTIVE",
    notes: "",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        status: lead.status,
        notes: lead.notes || "",
      });
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(lead.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111936] shadow-2xl p-8">
        <h2 className="text-3xl font-semibold text-white mb-8">
          Edit Lead
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            required
            type="text"
            placeholder="Lead Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
          />

          <input
            required
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
          />

          <input
            required
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({
                ...formData,
                company: e.target.value,
              })
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
          />

          <textarea
            placeholder="Notes (Optional)"
            rows={4}
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none resize-none"
          />

          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-white/10 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white"
            >
              Update Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}