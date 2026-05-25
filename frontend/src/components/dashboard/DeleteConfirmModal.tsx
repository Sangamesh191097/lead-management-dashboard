"use client";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  leadName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  leadName,
  onCancel,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111936] shadow-2xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Delete Lead
        </h2>

        <p className="text-white/60 leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">
            {leadName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-2xl bg-white/10 text-white hover:bg-white/15 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium hover:opacity-95 transition"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}