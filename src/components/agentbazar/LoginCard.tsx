import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, Loader2, ArrowRight, Lock } from "lucide-react";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Please enter your email or mobile";
    if (!password) e.password = "Please enter your password";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    // Demo only — in your Next.js repo this calls config.login_base_url
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2400);
    }, 900);
  };

  return (
    <div className="w-full max-w-[460px] glass-card rounded-2xl p-9 sm:p-10 shadow-ab-card animate-ab-fade-up-delay">
      <header className="mb-7">
        <h2 className="font-display text-[26px] font-bold tracking-tight text-[var(--ab-ink)]">
          Welcome back
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Sign in to access your dashboard
        </p>
      </header>

      {success && (
        <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-3.5 py-2.5 font-medium">
          ✓ Demo submit successful (no backend in preview)
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
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

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] text-[15px] font-bold tracking-tight text-white bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow transition-all hover:-translate-y-px hover:scale-[1.01] hover:shadow-ab-glow-lg hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait"
        >
          {isSubmitting ? (
            <Loader2 size={18} className="animate-ab-spin" />
          ) : (
            <>
              Access Dashboard <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center my-5 text-[11px] uppercase tracking-[0.1em] text-neutral-400">
          <span className="flex-1 h-px bg-neutral-200" />
          <span className="px-3.5">or</span>
          <span className="flex-1 h-px bg-neutral-200" />
        </div>

        {/* Secondary */}
        <button
          type="button"
          className="w-full px-5 py-3 rounded-[10px] text-sm font-semibold text-[var(--ab-navy)] border-[1.5px] border-neutral-200 hover:border-[var(--ab-orange)] hover:bg-orange-50/50 transition-all"
        >
          Register a new agency
        </button>

        <p className="text-center text-xs text-neutral-500 mt-4 inline-flex items-center justify-center gap-1.5 w-full">
          <Lock size={12} /> Secure login · Trusted by 10,000+ agents
        </p>

        <p className="text-center text-[11px] text-neutral-500 mt-3 leading-relaxed">
          By logging in you agree to AgentBazar's{" "}
          <a href="#" className="text-[var(--ab-navy)] underline">Terms of Use</a>{" "}
          and{" "}
          <a href="#" className="text-[var(--ab-navy)] underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  );
}
