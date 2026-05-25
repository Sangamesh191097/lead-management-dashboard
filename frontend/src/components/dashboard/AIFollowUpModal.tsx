"use client";

interface Props {
  isOpen: boolean;
  message: string;
  loading: boolean;
  onClose: () => void;
}

export default function AIFollowupModal({
  isOpen,
  message,
  loading,
  onClose,
}: Props) {
  if (!isOpen) return null;

  const copyMessage = () => {
    navigator.clipboard.writeText(message);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#111936] p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            AI Follow-up Message
          </h2>

          <button
            onClick={onClose}
            className="text-white/60 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="rounded-2xl bg-white/5 p-6 min-h-[250px] text-white whitespace-pre-wrap">
          {loading
            ? "Generating AI follow-up..."
            : message}
        </div>

        {!loading && (
          <div className="flex justify-end mt-6">
            <button
              onClick={copyMessage}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white"
            >
              Copy Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}