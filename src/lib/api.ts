// ─────────────────────────────────────────────────────────────────────────────
// AgentBazar AWS API Service Layer
// File: src/lib/api.ts
// ─────────────────────────────────────────────────────────────────────────────

const ADMIN_URL = "https://admin.agentbazar.in";

// ─── Config cache (fetched once on app load) ─────────────────────────────────
let config: Record<string, string> | null = null;

export async function loadConfig(): Promise<Record<string, string>> {
  if (config) return config;

  const res = await fetch(`${ADMIN_URL}/appsetting.api`);
  if (!res.ok) throw new Error("Failed to load app config");

  const data = await res.json();
  config = {};
  (data["appconfig"] as { key: string; value: string }[]).forEach((item) => {
    config![item.key] = item.value;
  });

  // Apply brand colours from API to CSS variables (same as current site)
  if (data["colorinfo"]) {
    const c = data["colorinfo"];
    document.documentElement.style.setProperty("--ab-orange", c["primary"] || "#ff6600");
    document.documentElement.style.setProperty("--ab-navy", c["secondary"] || "#001d4a");
  }

  return config;
}

export function getConfig(): Record<string, string> | null {
  return config;
}

// ─── Generic POST helper ──────────────────────────────────────────────────────
async function apiPost<T = Record<string, unknown>>(
  url: string,
  body: string
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
export interface LoginResponse {
  responsemessage: { statuscode: number; message: string };
  tokenid: string;
  [key: string]: unknown;
}

export async function loginAgent(
  username: string,
  password: string
): Promise<LoginResponse> {
  const cfg = await loadConfig();
  const requestData = { username, password };
  return apiPost<LoginResponse>(
    cfg["login_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────────────────────────
export interface SimpleResponse {
  statuscode: number;
  message: string;
}

export async function forgotPassword(userid: string): Promise<SimpleResponse> {
  const cfg = await loadConfig();
  return apiPost<SimpleResponse>(
    cfg["forgot_base_url"],
    `userid=${encodeURIComponent(userid)}`
  );
}

// ─── CHECK USER AVAILABILITY (step 1 of registration) ────────────────────────
export async function checkUserAvailability(
  username: string
): Promise<SimpleResponse> {
  const cfg = await loadConfig();
  const requestData = { aid: "checkuseravailability", data: { username } };
  return apiPost<SimpleResponse>(
    cfg["common_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}

// ─── SEND OTP ─────────────────────────────────────────────────────────────────
export async function sendOTP(
  email: string,
  mobile: string
): Promise<SimpleResponse> {
  const cfg = await loadConfig();
  const requestData = {
    aid: "sendregistrationotp",
    data: { emailid: email, mobilenumber: mobile },
  };
  return apiPost<SimpleResponse>(
    cfg["common_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}

// ─── VERIFY OTP ───────────────────────────────────────────────────────────────
export interface VerifyOTPResponse {
  statuscode: number;
  message: string;
  messageinfo: string; // this is the token
}

export async function verifyOTP(
  email: string,
  emailOtp: string,
  mobile: string,
  mobileOtp: string
): Promise<VerifyOTPResponse> {
  const cfg = await loadConfig();
  const requestData = {
    aid: "verifyregistrationotp",
    data: {
      emailid: email,
      emailotp: emailOtp,
      mobilenumber: mobile,
      mobileotp: mobileOtp,
    },
  };
  return apiPost<VerifyOTPResponse>(
    cfg["common_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}

// ─── UPLOAD FILE ──────────────────────────────────────────────────────────────
export async function uploadFile(
  file: File,
  uploadtype: string
): Promise<string> {
  const cfg = await loadConfig();
  const formData = new FormData();
  formData.append("file", file);
  formData.append("uploadtype", uploadtype);
  const res = await fetch(cfg["uploadfile_base_url"], {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data["messagecode"] as string;
}

// ─── REGISTER AGENT ───────────────────────────────────────────────────────────
export async function registerAgent(
  registerData: Record<string, string>
): Promise<SimpleResponse> {
  const cfg = await loadConfig();
  return apiPost<SimpleResponse>(
    cfg["register_base_url"],
    `registerdata=${encodeURIComponent(JSON.stringify(registerData))}`
  );
}

// ─── GEO: COUNTRIES / STATES / CITIES ────────────────────────────────────────
export interface Country {
  country_id: string;
  country_name: string;
}
export interface State {
  state_id: string;
  state_name: string;
}
export interface City {
  city_id: string;
  city_name: string;
}

export async function getCountries(): Promise<Country[]> {
  const cfg = await loadConfig();
  const requestData = { aid: "country", data: {} };
  return apiPost<Country[]>(
    cfg["common_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}

export async function getStates(countryId: string): Promise<State[]> {
  const cfg = await loadConfig();
  const requestData = { aid: "state", data: { country_id: countryId } };
  return apiPost<State[]>(
    cfg["common_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}

export async function getCities(stateId: string): Promise<City[]> {
  const cfg = await loadConfig();
  const requestData = { aid: "city", data: { state_id: stateId } };
  return apiPost<City[]>(
    cfg["common_base_url"],
    `requestdata=${encodeURIComponent(JSON.stringify(requestData))}`
  );
}
