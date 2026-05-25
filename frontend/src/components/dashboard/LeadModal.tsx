"use client";

import { useState, useEffect } from "react";

interface Lead {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
  notes?: string;
}

interface LeadModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  lead?: Lead | null;
  onClose: () => void;
  onSubmit: (data: Lead) => void;
}

export default function LeadModal({
  isOpen,
  mode,
  lead,
  onClose,
  onSubmit,
}: LeadModalProps) {
  const [formData, setFormData] = useState<Lead>({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "ACTIVE",
    notes: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "ACTIVE",
        notes: "",
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        company: "",
      });

      return;
    }

    if (mode === "edit" && lead) {
      setFormData({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        status: lead.status || "ACTIVE",
        notes: lead.notes || "",
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        company: "",
      });

      return;
    }

    if (mode === "add") {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        status: "ACTIVE",
        notes: "",
      });

      setErrors({
        name: "",
        email: "",
        phone: "",
        company: "",
      });
    }
  }, [isOpen, mode, lead?.id]);

  if (!isOpen) return null;

  const validate = () => {
    let valid = true;

    const newErrors = {
      name: "",
      email: "",
      phone: "",
      company: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Lead name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
      valid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field: keyof Lead, value: string) => {
    let updatedValue = value;

    if (field === "phone") {
      updatedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));

    let errorMessage = "";

    if (field === "name" && !updatedValue.trim()) {
      errorMessage = "Lead name is required";
    }

    if (field === "company" && !updatedValue.trim()) {
      errorMessage = "Company name is required";
    }

    if (field === "email") {
      if (!updatedValue.trim()) {
        errorMessage = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(updatedValue)
      ) {
        errorMessage = "Enter a valid email address";
      }
    }

    if (field === "phone") {
      if (!updatedValue.trim()) {
        errorMessage = "Phone number is required";
      } else if (updatedValue.length !== 10) {
        errorMessage = "Phone number must be exactly 10 digits";
      }
    }

    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: errorMessage,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  const inputStyle =
    "w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-fuchsia-400 transition";

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111936] shadow-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {mode === "add" ? "Add New Lead" : "Edit Lead"}
          </h2>

          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl transition"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Lead Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`${inputStyle} ${
                errors.name ? "border-pink-400" : ""
              }`}
            />
            {errors.name && (
              <p className="text-pink-400 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`${inputStyle} ${
                errors.email ? "border-pink-400" : ""
              }`}
            />
            {errors.email && (
              <p className="text-pink-400 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={`${inputStyle} ${
                errors.phone ? "border-pink-400" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-pink-400 text-sm mt-2">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className={`${inputStyle} ${
                errors.company ? "border-pink-400" : ""
              }`}
            />
            {errors.company && (
              <p className="text-pink-400 text-sm mt-2">{errors.company}</p>
            )}
          </div>

          <textarea
            rows={3}
            placeholder="Notes (Optional)"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className={`${inputStyle} resize-none`}
          />

          <div className="relative">
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="
                w-full
                px-5
                py-3.5
                rounded-2xl
                bg-white/5
                border
                border-white/10
                text-white
                outline-none
                focus:border-fuchsia-400
                transition
                appearance-none
                cursor-pointer
                backdrop-blur-xl
              "
            >
              <option
                value="ACTIVE"
                className="bg-[#111936] text-white"
              >
                ACTIVE
              </option>

              <option
                value="CLOSED"
                className="bg-[#111936] text-white"
              >
                CLOSED
              </option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center">
              <svg
                className="w-5 h-5 text-fuchsia-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-white/10 text-white hover:bg-white/15 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white font-medium hover:opacity-95 transition"
            >
              {mode === "add" ? "Create Lead" : "Update Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}