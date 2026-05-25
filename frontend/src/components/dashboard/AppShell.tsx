"use client";

import { ReactNode, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Plus,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/auth.store";

interface AppShellProps {
  children: ReactNode;
  onAddLead: () => void;
}

export default function AppShell({
  children,
  onAddLead,
}: AppShellProps) {
  const router = useRouter();
  const { token, logout } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex bg-[#050816] text-white">
      <aside className="w-56 border-r border-white/10 bg-white/5 backdrop-blur-2xl p-6 flex flex-col">
        <div className="mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-blue-500 flex items-center justify-center mb-4">
            <BarChart3 />
          </div>

          <h1 className="text-2xl font-semibold">
            LeadFlow CRM
          </h1>

          <p className="text-white/50 mt-1">
            Lead Management Platform
          </p>
        </div>

        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-blue-500/20 border border-white/10">
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          

          <button
            onClick={onAddLead}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-white/5 transition"
          >
            <Plus size={20} />
            Add Lead
          </button>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-red-500/10 text-red-300 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gradient-to-br from-[#0b1023] via-[#111936] to-[#18244f]">
        {children}
      </main>
    </div>
  );
}