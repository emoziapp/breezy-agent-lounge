// ─────────────────────────────────────────────────────────────────────────────
// RegistrationModal.tsx — Full multi-step agency registration
// File: src/components/agentbazar/RegistrationModal.tsx
// NEW FILE — add to project
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import {
  Loader2, X, CheckCircle2, ChevronDown, ChevronUp,
  Upload, AlertCircle, ArrowRight, ArrowLeft
} from "lucide-react";
import {
  checkUserAvailability,
  sendOTP,
  verifyOTP,
  uploadFile,
  registerAgent,
  getCountries,
  getStates,
  getCities,
  type Country,
  type State,
  type City,
} from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RegisterData {
  aid: string;
  username: string;
  companyname: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  address1: string;
  address2: string;
  state: string;
  state_id: string;
  city: string;
  city_id: string;
  country: string;
  country_id: string;
  pincode: string;
  gst_number: string;
  gst_url: string;
  gst_name: string;
  pancard_name: string;
  pancard_number: string;
  pancard_url: string;
  addressproof_url: string;
  logo: string;
  alternate_mobile: string;
  landline: string;
  monthly_turnover: string;
  preferred_sector: string;
  channelreference: string;
  iata_info: string;
  website: string;
  token: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = "check" | "form" | "success";

// ─── Shared input class ───────────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-3 text-[14px] rounded-[10px] bg-white border-[1.5px] border-neutral-200 hover:border-neutral-300 focus:border-[var(--ab-orange)] focus:shadow-[0_0_0_3px_var(--ab-glow)] outline-none transition-all placeholder:text-neutral-400";

const labelCls = "block text-[12px] font-semibold text-neutral-600 mb-1.5 uppercase tracking-wide";

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <span className="text-[13px] font-bold text-[var(--ab-navy)] uppercase tracking-wider whitespace-nowrap">
        {title}
      </span>
      <span className="flex-1 h-px bg-neutral-200" />
    </div>
  );
}

// ─── Status pill ──────────────────────────────────────────────────────────────
function StatusPill({ ok, msg }: { ok: boolean; msg: string }) {
  if (!msg) return null;
  return (
    <p className={`text-[12px] font-medium mt-2 flex items-center gap-1.5 ${ok ? "text-emerald-600" : "text-red-500"}`}>
      {ok ? <CheckCircle2 size={13} /> : <AlertCircle size={13} />}
      {msg}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function RegistrationModal({ open, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Step ──────────────────────────────────────────────────────────────────
  const [step, setStep] = useState<Step>("check");

  // ── Step 1: check username ────────────────────────────────────────────────
  const [username, setUsername] = useState("");
  const [checkError, setCheckError] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);

  // ── Step 2: registration data ─────────────────────────────────────────────
  const [registerData, setRegisterData] = useState<RegisterData>({
    aid: "agentregisterv2",
    username: "",
    companyname: "", firstname: "", lastname: "",
    email: "", mobile: "",
    address1: "", address2: "", pincode: "",
    state: "", state_id: "", city: "", city_id: "",
    country: "", country_id: "",
    gst_number: "", gst_url: "", gst_name: "",
    pancard_name: "", pancard_number: "", pancard_url: "",
    addressproof_url: "", logo: "",
    alternate_mobile: "", landline: "", monthly_turnover: "",
    preferred_sector: "", channelreference: "",
    iata_info: "", website: "", token: "",
  });

  // ── OTP state ─────────────────────────────────────────────────────────────
  const [emailOTP, setEmailOTP] = useState("");
  const [phoneOTP, setPhoneOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSentMsg, setOtpSentMsg] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpVerifyMsg, setOtpVerifyMsg] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);

  // ── Geo dropdowns ─────────────────────────────────────────────────────────
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [countrySearch, setCountrySearch] = useState("");
  const [countryDropOpen, setCountryDropOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);

  // ── File inputs ───────────────────────────────────────────────────────────
  const [panFile, setPanFile] = useState<File | null>(null);
  const [gstFile, setGstFile] = useState<File | null>(null);
  const [addressFile, setAddressFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // ── Additional toggle ─────────────────────────────────────────────────────
  const [showAdditional, setShowAdditional] = useState(false);

  // ── Submit state ──────────────────────────────────────────────────────────
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [submitError, setSubmitError] = useState("");

  // ── Load countries on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (open && countries.length === 0) {
      getCountries()
        .then(setCountries)
        .catch(console.error);
    }
  }, [open]);

  // ── Country outside click ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Fetch states when country changes ─────────────────────────────────────
  useEffect(() => {
    if (registerData.country_id) {
      getStates(registerData.country_id).then(setStates).catch(console.error);
      setCities([]);
      setRegisterData(d => ({ ...d, state_id: "", state: "", city_id: "", city: "" }));
    }
  }, [registerData.country_id]);

  // ── Fetch cities when state changes ───────────────────────────────────────
  useEffect(() => {
    if (registerData.state_id) {
      getCities(registerData.state_id).then(setCities).catch(console.error);
      setRegisterData(d => ({ ...d, city_id: "", city: "" }));
    }
  }, [registerData.state_id]);

  // ── Reset OTP if email/mobile change ─────────────────────────────────────
  useEffect(() => {
    if (otpVerified) { setOtpVerified(false); setOtpSent(false); }
  }, [registerData.email, registerData.mobile]);

  // ── Scroll to top on step change ─────────────────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // ── Step 1: check username ────────────────────────────────────────────────
  const handleCheckUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) { setCheckError("Please enter your email or mobile number"); return; }
    setCheckError("");
    setCheckLoading(true);
    try {
      const res = await checkUserAvailability(username.trim());
      if (res.statuscode === 200) {
        setRegisterData(d => ({ ...d, username: username.trim() }));
        setStep("form");
      } else {
        setCheckError(res.message || "This User ID is already registered. Please login.");
      }
    } catch {
      setCheckError("Connection error. Please try again.");
    } finally {
      setCheckLoading(false);
    }
  };

  // ── Send OTP ──────────────────────────────────────────────────────────────
  const handleSendOTP = async () => {
    if (!registerData.email || !registerData.mobile) {
      setOtpSentMsg("Please enter both email and mobile first.");
      return;
    }
    setOtpLoading(true);
    setOtpSentMsg("");
    try {
      const res = await sendOTP(registerData.email, registerData.mobile);
      if (res.statuscode === 200) {
        setOtpSent(true);
        setOtpSentMsg("OTP sent successfully to your email and mobile!");
      } else {
        setOtpSentMsg(res.message || "Failed to send OTP. Please try again.");
      }
    } catch {
      setOtpSentMsg("Connection error. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ── Verify OTP ────────────────────────────────────────────────────────────
  const handleVerifyOTP = async () => {
    if (!emailOTP || !phoneOTP) {
      setOtpVerifyMsg("Please enter both OTPs.");
      return;
    }
    setVerifyLoading(true);
    setOtpVerifyMsg("");
    try {
      const res = await verifyOTP(registerData.email, emailOTP, registerData.mobile, phoneOTP);
      if (res.statuscode === 200) {
        setOtpVerified(true);
        setRegisterData(d => ({ ...d, token: res.messageinfo }));
        setOtpVerifyMsg("Email & Mobile verified successfully!");
      } else {
        setOtpVerifyMsg(res.message || "OTP verification failed. Please check and retry.");
      }
    } catch {
      setOtpVerifyMsg("Connection error. Please try again.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // ── Final submit ──────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      setSubmitError("Please verify your Email and Mobile OTP before submitting.");
      return;
    }
    if (!panFile) {
      setSubmitError("PAN document is required.");
      return;
    }

    setSubmitError("");
    setSubmitLoading(true);
    setSubmitStatus("Uploading documents...");

    try {
      const data = { ...registerData };

      // Upload files in parallel
      const uploads: Promise<void>[] = [];
      if (panFile) uploads.push(uploadFile(panFile, "pandocument").then(url => { data.pancard_url = url; }));
      if (gstFile) uploads.push(uploadFile(gstFile, "gstdocument").then(url => { data.gst_url = url; }));
      if (addressFile) uploads.push(uploadFile(addressFile, "addressdocument").then(url => { data.addressproof_url = url; }));
      if (logoFile) uploads.push(uploadFile(logoFile, "agentlogo").then(url => { data.logo = url; }));

      await Promise.all(uploads);

      setSubmitStatus("Completing registration...");
      const res = await registerAgent(data as Record<string, string>);

      if (res.statuscode === 200) {
        setStep("success");
      } else {
        setSubmitError(res.message || "Registration failed. Please try again.");
      }
    } catch {
      setSubmitError("Connection error. Please try again.");
    } finally {
      setSubmitLoading(false);
      setSubmitStatus("");
    }
  };

  // ── Filtered countries ────────────────────────────────────────────────────
  const filteredCountries = countries.filter(c =>
    c.country_name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // ─── Don't render if closed ───────────────────────────────────────────────
  if (!open) return null;

  // ─────────────────────────────────────────────────────────────────────────
  // BACKDROP + MODAL SHELL
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[680px] max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col animate-ab-scale-in">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-neutral-100">
          <div>
            <h2 className="font-display text-[20px] font-bold text-[var(--ab-navy)]">
              {step === "check" ? "Register Your Agency" :
               step === "success" ? "Registration Complete!" : "Agency Registration Form"}
            </h2>
            {step === "form" && (
              <p className="text-[12px] text-neutral-500 mt-0.5">
                User ID: <strong className="text-[var(--ab-navy)]">{registerData.username}</strong>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} className="overflow-y-auto flex-1 px-7 py-6">

          {/* ── STEP 1: CHECK USERNAME ─────────────────────────────────────── */}
          {step === "check" && (
            <form onSubmit={handleCheckUsername} noValidate>
              <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                Enter your email address or mobile number to get started. This will become your <strong>User ID</strong> on AgentBazar.
              </p>

              <label className={labelCls}>Email or Mobile Number</label>
              <input
                type="text"
                value={username}
                onChange={e => { setUsername(e.target.value); setCheckError(""); }}
                placeholder="e.g. yourname@email.com or 9876543210"
                autoFocus
                className={inputCls}
              />
              {checkError && (
                <p className="text-xs font-medium text-red-500 mt-2 flex items-center gap-1.5">
                  <AlertCircle size={12} /> {checkError}
                </p>
              )}

              <button
                type="submit"
                disabled={checkLoading}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] font-bold text-white bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow transition-all hover:-translate-y-px hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait text-base"
              >
                {checkLoading ? <Loader2 size={18} className="animate-ab-spin" /> : <>Continue <ArrowRight size={16} /></>}
              </button>

              <p className="text-center text-[11px] text-neutral-400 mt-4">
                Already registered?{" "}
                <button type="button" onClick={onClose} className="text-[var(--ab-orange)] font-semibold hover:underline">
                  Login here
                </button>
              </p>
            </form>
          )}

          {/* ── SUCCESS ───────────────────────────────────────────────────── */}
          {step === "success" && (
            <div className="flex flex-col items-center text-center gap-5 py-8">
              <CheckCircle2 size={64} className="text-emerald-500" />
              <div>
                <h3 className="font-display text-[22px] font-bold text-[var(--ab-ink)] mb-2">
                  Registration Successful! 🎉
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-[380px]">
                  Your agency has been registered successfully. Our team will review your details and contact you within <strong>24–48 hours</strong> to activate your account.
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 w-full max-w-[380px]">
                <p className="text-sm font-semibold text-[var(--ab-orange)]">
                  What's next?
                </p>
                <ul className="text-[13px] text-neutral-600 mt-2 text-left space-y-1">
                  <li>✓ Check your email for confirmation</li>
                  <li>✓ Our team will verify your documents</li>
                  <li>✓ You'll receive login credentials within 24–48 hrs</li>
                </ul>
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 rounded-[10px] font-bold text-white bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow hover:-translate-y-px transition-all"
              >
                Close
              </button>
            </div>
          )}

          {/* ── STEP 2: FULL FORM ─────────────────────────────────────────── */}
          {step === "form" && (
            <form onSubmit={handleSubmit} noValidate>

              {/* Back button */}
              <button
                type="button"
                onClick={() => setStep("check")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-[var(--ab-orange)] mb-2 transition-colors"
              >
                <ArrowLeft size={13} /> Change User ID
              </button>

              {/* ── Agency Info ───────────────────────────────────────────── */}
              <SectionHeading title="Agency Information" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Company Name *</label>
                  <input required type="text" className={inputCls} placeholder="Your Agency Name"
                    value={registerData.companyname}
                    onChange={e => setRegisterData(d => ({ ...d, companyname: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>First Name *</label>
                  <input required type="text" className={inputCls} placeholder="First Name"
                    value={registerData.firstname}
                    onChange={e => setRegisterData(d => ({ ...d, firstname: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Last Name *</label>
                  <input required type="text" className={inputCls} placeholder="Last Name"
                    value={registerData.lastname}
                    onChange={e => setRegisterData(d => ({ ...d, lastname: e.target.value }))} />
                </div>
              </div>

              {/* ── OTP Verification ──────────────────────────────────────── */}
              <SectionHeading title="OTP Verification" />

              <p className="text-[12px] text-neutral-500 mb-4 bg-blue-50 border border-blue-100 rounded-lg px-3.5 py-2.5">
                An OTP will be sent to your Email and Mobile for verification. Both must be verified before you can submit.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className={labelCls}>Agency Email *</label>
                  <input required type="email" className={inputCls} placeholder="agency@email.com"
                    value={registerData.email} disabled={otpVerified}
                    onChange={e => setRegisterData(d => ({ ...d, email: e.target.value }))} />
                </div>
                <div>
                  <label className={labelCls}>Mobile Number * (10 digits)</label>
                  <input required type="text" className={inputCls} placeholder="9876543210"
                    value={registerData.mobile} disabled={otpVerified}
                    maxLength={10}
                    onChange={e => {
                      if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10)
                        setRegisterData(d => ({ ...d, mobile: e.target.value }));
                    }} />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendOTP}
                disabled={otpLoading || otpVerified}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[13px] font-bold text-white bg-[var(--ab-navy)] hover:bg-[var(--ab-navy-2)] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {otpLoading ? <Loader2 size={14} className="animate-ab-spin" /> : null}
                {otpVerified ? "✓ OTP Verified" : "Send OTP to Email & Mobile"}
              </button>
              <StatusPill ok={otpSent && !otpVerified} msg={otpSentMsg} />

              {otpSent && !otpVerified && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className={labelCls}>Email OTP</label>
                    <input type="text" className={inputCls} placeholder="6-digit Email OTP"
                      value={emailOTP} maxLength={6}
                      onChange={e => setEmailOTP(e.target.value)} />
                  </div>
                  <div>
                    <label className={labelCls}>Mobile OTP</label>
                    <input type="text" className={inputCls} placeholder="6-digit Mobile OTP"
                      value={phoneOTP} maxLength={6}
                      onChange={e => setPhoneOTP(e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      disabled={verifyLoading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-[13px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 transition-all"
                    >
                      {verifyLoading ? <Loader2 size={14} className="animate-ab-spin" /> : null}
                      Verify Email & Mobile OTP
                    </button>
                  </div>
                </div>
              )}

              {otpVerified && (
                <p className="text-[13px] font-semibold text-emerald-600 flex items-center gap-1.5 mt-3">
                  <CheckCircle2 size={15} /> Email & Mobile verified successfully!
                </p>
              )}
              {!otpVerified && otpVerifyMsg && (
                <StatusPill ok={false} msg={otpVerifyMsg} />
              )}

              {/* ── Address Details ───────────────────────────────────────── */}
              <SectionHeading title="Address Details" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Pincode *</label>
                  <input required type="text" className={inputCls} placeholder="Pincode"
                    value={registerData.pincode}
                    onChange={e => setRegisterData(d => ({ ...d, pincode: e.target.value }))} />
                </div>

                {/* Country searchable dropdown */}
                <div ref={countryRef} className="relative">
                  <label className={labelCls}>Country *</label>
                  <input
                    type="text"
                    className={inputCls}
                    placeholder="Search country..."
                    value={countrySearch}
                    onChange={e => { setCountrySearch(e.target.value); setCountryDropOpen(true); }}
                    onFocus={() => setCountryDropOpen(true)}
                  />
                  {countryDropOpen && filteredCountries.length > 0 && (
                    <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {filteredCountries.slice(0, 50).map(c => (
                        <div
                          key={c.country_id}
                          onClick={() => {
                            setRegisterData(d => ({ ...d, country_id: c.country_id, country: c.country_name }));
                            setCountrySearch(c.country_name);
                            setCountryDropOpen(false);
                          }}
                          className="px-4 py-2.5 text-[13px] hover:bg-orange-50 hover:text-[var(--ab-orange)] cursor-pointer transition-colors"
                        >
                          {c.country_name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className={labelCls}>Address Line 1 *</label>
                  <input required type="text" className={inputCls} placeholder="Street address"
                    value={registerData.address1}
                    onChange={e => setRegisterData(d => ({ ...d, address1: e.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Address Line 2</label>
                  <input type="text" className={inputCls} placeholder="Apartment, floor, etc."
                    value={registerData.address2}
                    onChange={e => setRegisterData(d => ({ ...d, address2: e.target.value }))} />
                </div>

                <div>
                  <label className={labelCls}>State *</label>
                  <select required className={inputCls}
                    value={registerData.state_id}
                    onChange={e => {
                      const name = e.target.options[e.target.selectedIndex].text;
                      setRegisterData(d => ({ ...d, state_id: e.target.value, state: name }));
                    }}
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s.state_id} value={s.state_id}>{s.state_name}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>City *</label>
                  <select required className={inputCls}
                    value={registerData.city_id}
                    onChange={e => {
                      const name = e.target.options[e.target.selectedIndex].text;
                      setRegisterData(d => ({ ...d, city_id: e.target.value, city: name }));
                    }}
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c.city_id} value={c.city_id}>{c.city_name}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Document Details ──────────────────────────────────────── */}
              <SectionHeading title="Document Details" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>PAN Number *</label>
                  <input required type="text" className={inputCls} placeholder="ABCDE1234F"
                    maxLength={10}
                    value={registerData.pancard_number}
                    onChange={e => setRegisterData(d => ({ ...d, pancard_number: e.target.value.toUpperCase() }))} />
                </div>
                <div>
                  <label className={labelCls}>Name on PAN *</label>
                  <input required type="text" className={inputCls} placeholder="As on PAN card"
                    value={registerData.pancard_name}
                    onChange={e => setRegisterData(d => ({ ...d, pancard_name: e.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Upload PAN Document * (PDF/JPG/PNG)</label>
                  <label className="flex items-center gap-3 w-full px-4 py-3 rounded-[10px] bg-white border-[1.5px] border-dashed border-neutral-300 hover:border-[var(--ab-orange)] cursor-pointer transition-colors">
                    <Upload size={16} className="text-neutral-400 shrink-0" />
                    <span className="text-[13px] text-neutral-500 truncate">
                      {panFile ? panFile.name : "Click to upload PAN document"}
                    </span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                      onChange={e => setPanFile(e.target.files?.[0] || null)} />
                  </label>
                </div>

                <div>
                  <label className={labelCls}>GST Number (Optional)</label>
                  <input type="text" className={inputCls} placeholder="22AAAAA0000A1Z5"
                    maxLength={15}
                    value={registerData.gst_number}
                    onChange={e => setRegisterData(d => ({ ...d, gst_number: e.target.value.toUpperCase() }))} />
                </div>
                <div>
                  <label className={labelCls}>Name on GST (Optional)</label>
                  <input type="text" className={inputCls} placeholder="Registered name"
                    value={registerData.gst_name}
                    onChange={e => setRegisterData(d => ({ ...d, gst_name: e.target.value }))} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Upload GST Document (Optional)</label>
                  <label className="flex items-center gap-3 w-full px-4 py-3 rounded-[10px] bg-white border-[1.5px] border-dashed border-neutral-300 hover:border-[var(--ab-orange)] cursor-pointer transition-colors">
                    <Upload size={16} className="text-neutral-400 shrink-0" />
                    <span className="text-[13px] text-neutral-500 truncate">
                      {gstFile ? gstFile.name : "Click to upload GST document"}
                    </span>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                      onChange={e => setGstFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              </div>

              {/* ── Additional Details (collapsible) ──────────────────────── */}
              <button
                type="button"
                onClick={() => setShowAdditional(!showAdditional)}
                className="flex items-center gap-2 mt-6 text-[13px] font-bold text-[var(--ab-navy)] hover:text-[var(--ab-orange)] transition-colors"
              >
                {showAdditional ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showAdditional ? "Hide" : "Show"} Additional Details (Optional)
              </button>

              {showAdditional && (
                <>
                  <SectionHeading title="Additional Details" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Alternate Mobile</label>
                      <input type="text" className={inputCls} placeholder="Alternate number"
                        value={registerData.alternate_mobile}
                        onChange={e => setRegisterData(d => ({ ...d, alternate_mobile: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Landline</label>
                      <input type="text" className={inputCls} placeholder="Landline number"
                        value={registerData.landline}
                        onChange={e => setRegisterData(d => ({ ...d, landline: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Monthly Turnover</label>
                      <input type="text" className={inputCls} placeholder="e.g. 5 Lakh"
                        value={registerData.monthly_turnover}
                        onChange={e => setRegisterData(d => ({ ...d, monthly_turnover: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>IATA Number</label>
                      <input type="text" className={inputCls} placeholder="IATA accreditation"
                        value={registerData.iata_info}
                        onChange={e => setRegisterData(d => ({ ...d, iata_info: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Referred By</label>
                      <input type="text" className={inputCls} placeholder="Agent/Partner name"
                        value={registerData.channelreference}
                        onChange={e => setRegisterData(d => ({ ...d, channelreference: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Favourite Sectors</label>
                      <input type="text" className={inputCls} placeholder="e.g. DEL-BOM, CCU-MAA"
                        value={registerData.preferred_sector}
                        onChange={e => setRegisterData(d => ({ ...d, preferred_sector: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Website</label>
                      <input type="url" className={inputCls} placeholder="https://youragency.com"
                        value={registerData.website}
                        onChange={e => setRegisterData(d => ({ ...d, website: e.target.value }))} />
                    </div>
                    <div>
                      <label className={labelCls}>Upload Address Proof</label>
                      <label className="flex items-center gap-3 w-full px-4 py-3 rounded-[10px] bg-white border-[1.5px] border-dashed border-neutral-300 hover:border-[var(--ab-orange)] cursor-pointer transition-colors">
                        <Upload size={16} className="text-neutral-400 shrink-0" />
                        <span className="text-[13px] text-neutral-500 truncate">
                          {addressFile ? addressFile.name : "Address proof document"}
                        </span>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png"
                          onChange={e => setAddressFile(e.target.files?.[0] || null)} />
                      </label>
                    </div>
                    <div>
                      <label className={labelCls}>Upload Agency Logo</label>
                      <label className="flex items-center gap-3 w-full px-4 py-3 rounded-[10px] bg-white border-[1.5px] border-dashed border-neutral-300 hover:border-[var(--ab-orange)] cursor-pointer transition-colors">
                        <Upload size={16} className="text-neutral-400 shrink-0" />
                        <span className="text-[13px] text-neutral-500 truncate">
                          {logoFile ? logoFile.name : "Agency logo (PNG/JPG)"}
                        </span>
                        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.svg"
                          onChange={e => setLogoFile(e.target.files?.[0] || null)} />
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* ── Terms + Submit ────────────────────────────────────────── */}
              <div className="flex items-start gap-3 mt-8">
                <input required type="checkbox" id="terms-check"
                  className="mt-0.5 accent-[var(--ab-orange)] w-4 h-4 shrink-0" />
                <label htmlFor="terms-check" className="text-[12px] text-neutral-600 leading-relaxed">
                  I accept the{" "}
                  <a href="/terms-conditions" target="_blank" className="text-[var(--ab-orange)] underline font-semibold">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" target="_blank" className="text-[var(--ab-orange)] underline font-semibold">
                    Privacy Policy
                  </a>{" "}
                  of AgentBazar by Tripforu Holidays Pvt. Ltd.
                </label>
              </div>

              {submitError && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px] px-4 py-3 flex items-start gap-2">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitLoading}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-4 rounded-[10px] font-bold text-white bg-gradient-to-br from-[var(--ab-orange)] to-[var(--ab-orange-dark)] shadow-ab-glow transition-all hover:-translate-y-px hover:brightness-105 active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait text-[15px]"
              >
                {submitLoading ? (
                  <>
                    <Loader2 size={18} className="animate-ab-spin" />
                    {submitStatus || "Processing..."}
                  </>
                ) : (
                  "Submit Registration"
                )}
              </button>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
