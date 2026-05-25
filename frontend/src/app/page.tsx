"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Mail, Lock, User } from "lucide-react";
import { loginUser } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      const response = await loginUser({
        email,
        password,
      });

      setToken(response.data.token);

      toast.success("Welcome back");
      router.push("/dashboard");
    } catch {
      toast.error("Invalid email or password");
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-[#040816] p-4">
      <div className="h-full w-full rounded-[36px] overflow-hidden border border-white/10 flex shadow-2xl">
        {/* LEFT PANEL */}
        <section className="hidden lg:flex lg:w-1/2 relative items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b2b63] via-[#182f7d] to-[#12084e]" />

          <div className="absolute -top-40 -left-24 w-[760px] h-[760px] rounded-full bg-gradient-to-br from-cyan-100/90 via-blue-300/60 to-transparent blur-3xl rotate-12" />

          <div className="absolute top-[28%] left-[18%] w-[560px] h-[300px] rounded-[50%] bg-gradient-to-r from-purple-300/50 via-fuchsia-400/25 to-transparent blur-3xl rotate-[-16deg]" />

          <div className="absolute -bottom-28 -left-20 w-[760px] h-[420px] rounded-[50%] bg-gradient-to-r from-blue-500/80 via-purple-500/45 to-transparent blur-3xl rotate-[8deg]" />

          <div className="absolute top-[18%] right-[10%] w-[260px] h-[260px] rounded-full bg-white/20 blur-3xl" />

          <div className="absolute bottom-[18%] right-[20%] w-[180px] h-[180px] rounded-full bg-fuchsia-300/20 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-7xl font-semibold tracking-tight text-white">
              Welcome{" "}
              <span className="bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
                back
              </span>
            </h1>

            <span className="text-2xl bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Lead Management CRM
            </span>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex-1 relative flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#23143a] via-[#30204e] to-[#4d73ff]" />

          <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full bg-fuchsia-500/25 blur-3xl" />

          <div className="absolute bottom-[-120px] left-[8%] w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-3xl" />

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 w-full max-w-xl rounded-[42px] border border-white/20 bg-white/10 backdrop-blur-[45px] shadow-2xl p-12">
            {/* avatar */}
            <div className="flex justify-center mb-12">
              <div className="w-32 h-32 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shadow-xl">
                <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <User
                    size={44}
                    className="text-white/75"
                    strokeWidth={1.6}
                  />
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-6">
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/70"
                />

                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);

                    if (errors.email) {
                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }
                  }}
                  className={`w-full bg-transparent border-b pl-10 py-3 text-white placeholder:text-white/60 outline-none transition ${
                    errors.email
                      ? "border-pink-400"
                      : "border-white/40"
                  }`}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-pink-200">
                  {errors.email}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-white/70"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }
                  }}
                  className={`w-full bg-transparent border-b pl-10 py-3 text-white placeholder:text-white/60 outline-none transition ${
                    errors.password
                      ? "border-pink-400"
                      : "border-white/40"
                  }`}
                />
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-pink-200">
                  {errors.password}
                </p>
              )}
            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm text-white/70 mb-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-fuchsia-500"
                />
                Remember me
              </label>

              <button className="hover:text-white transition">
                Forgot Password?
              </button>
            </div>

            {/* LOGIN */}
            <button
              onClick={handleLogin}
              className="w-full rounded-2xl py-5 text-white font-semibold tracking-[0.25em] bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 hover:opacity-95 transition"
            >
              LOGIN
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}