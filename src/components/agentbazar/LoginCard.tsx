// ─────────────────────────────────────────────────────────────────────────────
// LoginCard.tsx — wired to AWS backend
// File: src/components/agentbazar/LoginCard.tsx
// REPLACES the existing file completely
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Loader2, ArrowRight, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
import { loginAgent, forgotPassword, loadConfig } from "@/lib/api";

interface LoginCardProps {
  onRegisterClick: () => void;
}

type View = "login" | "forgot" | "forgotSuccess";

export function LoginCard({ onRegisterClick }: LoginCardProps) {
  // ── Login state ────────────────────────────────────────────────────────────
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Forgot password state ──────────────────────────────────────────────────
  const [forgotUserId, setForgotUserId] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Pre-load config on mount so login is instant when submitted
    loadConfig().catch(console.error);
    emailRef.current?.focus();
  }, []);

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Please enter your email or mobile";
    if (!password) e.password = "Please enter your password";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Login submit ───────────────────────────────────────────────────────────
  const handleLoginSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setApiError("");
    setIsSubmitting(true);

    try {
      const data = await loginAgent(email, password);

      if (data.responsemessage.statuscode !== 200) {
        setApiError(data.responsemessage.message || "Login failed. Please try again.");
        return;
      }

      // Store session (same key as current site uses via Zustand/localStorage)
      localStorage.setItem("ab_user", JSON.stringify(data));

      // Redirect to dashboard on the AWS-hosted portal
      window.location.href = "https://agentbazar.in/home";

    } catch {
      setApiError("Unable to connect. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Forgot password submit ─────────────────────────────────────────────────
  const handleForgotSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!forgotUserId.trim()) {
      setForgotError("Please enter your User ID");
      return;
    }

    setForgotError("");
    setForgotLoading(true);

    try {
      const data = await forgotPassword(forgotUserId.trim());
      if (data.statuscode === 200) {
        setView("forgotSuccess");
      } else {
        setForgotError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setForgotError("Unable to connect. Please check your internet and try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: Forgot Password Success
  // ─────────────────────────────────────────────────────────────────────────
  if (view === "forgotSuccess") {
    return (
      <div className="w-full max-w-[460px] glass-card rounded-2xl p-9 sm:p-10 shadow-ab-card animate-ab-fade-up-delay px-[30px] py-[30px]">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <CheckCircle2 size={48} className="text-emerald-500" />
          <h2 className="font-display text-[22px] font-bold text-[var(--ab-ink)]">
            Password Reset Sent
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            We've sent a password reset link to your registered email/mobile for User ID:{" "}
            <strong className="text-[var(--ab-navy)]">{forgotUserId}</strong>
          </p>
          <button
            onClick={() => { setView("login"); setForgotUserId(""); setForgotError(""); }}
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[var(--ab-orange)] hover:underline"
          >
            <ArrowLeft size={14} /> Back to Login
          </button>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: Forgot Password Form
  // ─────────────────────────────────────────────────────────────────────────
  if (view === "forgot") {
    return (
      <div className="w-full max-w-[460px] glass-card rounded-2xl p-9 sm:p-10 shadow-ab-card animate-ab-fade-up-delay px-[30px] py-[30px]">
        <button
          onClick={() => { setView("login"); setForgotError(""); }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[var(--ab-orange)] mb-5 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Login
        </button>

        <header className="mb-7">
          <h2 className="font-display text-[24px] font-bold tracking-tight text-[var(--ab-ink)]">
            Reset Password
          </h2>
          <p className="text-sm text-neutral-600 mt-1">
            Enter your User ID and we'll send a reset link
          </p>
        </header>

        <form onSubmit={handleForgotSubmit} noValidate>
          <div className="mb-5">
            <label className="block text-[13px] font-semibold text-neutral-700 mb-2">
              User ID (Email or Mobile)
            </label>
            <input
              type="text"
              value={forgotUserId}
              onChange={(e) => { setForgotUserId(e.target.value); setForgotError(""); }}
              placeholder="Enter your User ID"
              autoFocus
              className="w-full px-4 py-3.5 text-[15px] rounded-[10px] bg-white border-[1.5px] border-neutral-200 hover:border-neutral-300 focus:border-[var(--ab-orange)] focus:shadow-[0_0_0_4px_var(--ab-glow)] outline-none transition-all"
            />
            {forgotError && (
              <span className="block mt-1.5 text-xs font-medium text-red-500">
                {forgotError}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={forgotLoading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] font-bold tracking-tight text-white bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow transition-all hover:-translate-y-px hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait text-base"
          >
            {forgotLoading ? (
              <Loader2 size={18} className="animate-ab-spin" />
            ) : (
              <>Send Reset Link <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER: Main Login Form
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-[460px] glass-card rounded-2xl p-9 sm:p-10 shadow-ab-card animate-ab-fade-up-delay px-[30px] py-[30px]">
      <header className="mb-7">
        <h2 className="font-display text-[26px] font-bold tracking-tight text-[var(--ab-ink)]">
          Welcome back
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Sign in to access your dashboard
        </p>
      </header>

      {/* API Error Banner */}
      {apiError && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3.5 py-2.5 font-medium">
          {apiError}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} noValidate>
        {/* Email / Mobile */}
        <div className="mb-4">
          <label className="block text-[13px] font-semibold text-neutral-700 mb-2">
            Email or mobile
          </label>
          <input
            ref={emailRef}
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
              if (apiError) setApiError("");
            }}
            placeholder="Enter your User ID"
            autoComplete="username"
            className={`w-full px-4 py-3.5 text-[15px] rounded-[10px] bg-white border-[1.5px] outline-none transition-all ${
              errors.email
                ? "border-red-500 focus:shadow-[0_0_0_4px_rgba(230,57,70,0.12)]"
                : "border-neutral-200 hover:border-neutral-300 focus:border-[var(--ab-orange)] focus:shadow-[0_0_0_4px_var(--ab-glow)]"
            }`}
          />
          {errors.email && (
            <span className="block mt-1.5 text-xs font-medium text-red-500">
              {errors.email}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <div className="flex justify-between items-baseline mb-2">
            <label className="block text-[13px] font-semibold text-neutral-700">
              Password
            </label>
            <button
              type="button"
              onClick={() => setView("forgot")}
              className="text-xs font-semibold text-[var(--ab-orange)] hover:underline"
            >
              Forgot?
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
                if (apiError) setApiError("");
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`w-full px-4 py-3.5 pr-12 text-[15px] rounded-[10px] bg-white border-[1.5px] outline-none transition-all ${
                errors.password
                  ? "border-red-500 focus:shadow-[0_0_0_4px_rgba(230,57,70,0.12)]"
                  : "border-neutral-200 hover:border-neutral-300 focus:border-[var(--ab-orange)] focus:shadow-[0_0_0_4px_var(--ab-glow)]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-black/5 text-neutral-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="block mt-1.5 text-xs font-medium text-red-500">
              {errors.password}
            </span>
          )}
        </div>

        {/* Login CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] font-bold tracking-tight text-white bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow transition-all hover:-translate-y-px hover:scale-[1.01] hover:shadow-ab-glow-lg hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait text-lg"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-ab-spin" />
          ) : (
            <>Agency Login <ArrowRight size={18} /></>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-5 text-[11px] uppercase tracking-[0.1em] text-neutral-400">
          <span className="flex-1 h-px bg-neutral-200" />
          <span className="px-3.5">or</span>
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* Register CTA */}
        <button
          type="button"
          onClick={onRegisterClick}
          className="w-full px-5 py-3 rounded-[10px] border-[1.5px] border-neutral-200 hover:border-[var(--ab-orange)] transition-all font-bold text-base bg-[#004bad] text-white opacity-70"
        >
          REGISTER A NEW AGENCY
        </button>

        <p className="text-center text-xs text-neutral-500 mt-4 inline-flex items-center justify-center gap-1.5 w-full">
          <Lock size={12} /> Secure login · Trusted by 10,000+ agents
        </p>

        <p className="text-center text-[11px] text-neutral-500 mt-3 leading-relaxed">
          By logging in you agree to AgentBazar's{" "}
          <a href="/terms-conditions" className="text-[var(--ab-navy)] underline">Terms of Use</a>{" "}
          and{" "}
          <a href="/privacy" className="text-[var(--ab-navy)] underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}
