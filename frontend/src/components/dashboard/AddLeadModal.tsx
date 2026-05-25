// "use client";

// import { useState } from "react";
// import toast from "react-hot-toast";

// interface AddLeadModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (data: {
//     name: string;
//     email: string;
//     company: string;
//     status: string;
//   }) => void;
// }

// export default function AddLeadModal({
//   isOpen,
//   onClose,
//   onSubmit,
// }: AddLeadModalProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     company: "",
//     phone:"",
//     notes:"",
//     status: "ACTIVE",
//   });

//   if (!isOpen) return null;

//   const handleSubmit = () => {
//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.company
//     ) {
//       toast.error("Fill all fields");
//       return;
//     }

//     onSubmit(formData);

//     setFormData({
//       name: "",
//       email: "",
//       company: "",
//       phone:"",
//       notes:"",
//       status: "ACTIVE",
//     });

//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
//       <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111936] p-8 shadow-2xl">
//         <h2 className="text-3xl font-semibold text-white mb-8">
//           Add New Lead
//         </h2>

//         <div className="space-y-5">
//           <input
//             placeholder="Lead Name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 name: e.target.value,
//               })
//             }
//             className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
//           />

//           <input
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 email: e.target.value,
//               })
//             }
//             className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
//           />

//            <input
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 phone: e.target.value,
//               })
//             }
//             className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
//           />

          

//           <input
//             placeholder="Company"
//             value={formData.company}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 company: e.target.value,
//               })
//             }
//             className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
//           />

//           <select
//             value={formData.status}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 status: e.target.value,
//               })
//             }
//             className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
//           >
//             <option value="ACTIVE">ACTIVE</option>
//             <option value="CLOSED">CLOSED</option>
//           </select>
//         </div>

//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={onClose}
//             className="px-6 py-3 rounded-2xl bg-white/10 text-white"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white"
//           >
//             Create Lead
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    company: string;
    status: string;
    notes: string;
  }) => void;
}

export default function AddLeadModal({
  isOpen,
  onClose,
  onSubmit,
}: AddLeadModalProps) {
  const [formData, setFormData] = useState({
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
      newErrors.phone = "Phone number must be 10 digits";
      valid = false;
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);

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

    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setErrors({
      ...errors,
      [field]: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111936] shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold text-white">
            Add New Lead
          </h2>

          <button
            onClick={onClose}
            className="text-white/50 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* NAME */}
          <div>
            <input
              type="text"
              required
              placeholder="Lead Name"
              value={formData.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              className={`w-full px-5 py-4 rounded-2xl bg-white/5 border text-white placeholder:text-white/40 outline-none ${
                errors.name
                  ? "border-pink-400"
                  : "border-white/10"
              }`}
            />
            {errors.name && (
              <p className="text-sm text-pink-300 mt-2">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
              className={`w-full px-5 py-4 rounded-2xl bg-white/5 border text-white placeholder:text-white/40 outline-none ${
                errors.email
                  ? "border-pink-400"
                  : "border-white/10"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-pink-300 mt-2">
                {errors.email}
              </p>
            )}
          </div>

          {/* PHONE */}
          <div>
            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
              className={`w-full px-5 py-4 rounded-2xl bg-white/5 border text-white placeholder:text-white/40 outline-none ${
                errors.phone
                  ? "border-pink-400"
                  : "border-white/10"
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-pink-300 mt-2">
                {errors.phone}
              </p>
            )}
          </div>

          {/* COMPANY */}
          <div>
            <input
              type="text"
              required
              placeholder="Company Name"
              value={formData.company}
              onChange={(e) =>
                handleChange("company", e.target.value)
              }
              className={`w-full px-5 py-4 rounded-2xl bg-white/5 border text-white placeholder:text-white/40 outline-none ${
                errors.company
                  ? "border-pink-400"
                  : "border-white/10"
              }`}
            />
            {errors.company && (
              <p className="text-sm text-pink-300 mt-2">
                {errors.company}
              </p>
            )}
          </div>

          {/* NOTES */}
          <textarea
            placeholder="Notes (Optional)"
            rows={4}
            value={formData.notes}
            onChange={(e) =>
              handleChange("notes", e.target.value)
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 outline-none resize-none"
          />

          {/* STATUS */}
          <select
            value={formData.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-2xl bg-white/10 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white font-medium"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}