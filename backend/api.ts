/**
 * services/api.ts
 * ================
 * API client for the MAD System backend.
 * Import and call analyzeReceipt() from your React components.
 */

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// ─────────────────────────────────────────────────────────────────────
// TYPES — mirror what Python worker returns
// ─────────────────────────────────────────────────────────────────────

export interface ELAResult {
  mean      : number;
  max       : number;
  std       : number;
  suspicious: boolean;
  quality?  : number;
  error?    : string;
}

export interface MetadataResult {
  format      ?: string;
  mode        ?: string;
  size        ?: [number, number];
  has_exif     : boolean;
  software    ?: string | null;
  device_make ?: string | null;
  device_model?: string | null;
  datetime    ?: string | null;
  suspicious   : boolean;
  error?       : string;
}

export interface NoiseResult {
  variance  : number;
  mean_abs  : number;
  suspicious: boolean;
  method?   : string;
  error?    : string;
}

export interface AnalysisResult {
  id          : string;
  error       : string | null;

  // ML prediction
  prediction  : "Real" | "AI/Fake";
  confidence  : number;
  real_prob   : number;
  fake_prob   : number;
  flag_review : boolean;
  model_votes?: Record<string, string>;

  // Digital forensics
  ela              : ELAResult;
  metadata         : MetadataResult;
  noise            : NoiseResult;
  forensic_flags   : number;
  forensic_verdict : string;
}

export interface HealthStatus {
  status            : string;
  mlReady           : boolean;
  forensicsAvailable: boolean;
}

// ─────────────────────────────────────────────────────────────────────
// API FUNCTIONS
// ─────────────────────────────────────────────────────────────────────

/**
 * Check if the backend and ML worker are online.
 */
export async function checkHealth(): Promise<HealthStatus> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}

/**
 * Upload a receipt image and get the ML + forensics analysis.
 *
 * @param file  — File object from <input type="file"> or drag-and-drop
 * @returns     AnalysisResult
 * @throws      Error if the server returns an error or network fails
 */
export async function analyzeReceipt(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: "POST",
    body  : formData,
    // Do NOT set Content-Type — browser must set multipart boundary
  });

  let data: AnalysisResult;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server returned non-JSON response (status ${res.status})`);
  }

  if (!res.ok || data.error) {
    throw new Error(data.error ?? `Request failed (status ${res.status})`);
  }

  return data;
}
