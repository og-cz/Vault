/**
 * API Service for communicating with the Django backend
 * Provides type-safe functions for all API endpoints
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface FileMetadata {
  name: string;
  size: number;
  sizeReadable: string;
  type: string;
  resolution: string;
}

export interface TestResult {
  status: "CLEAN" | "WARNING" | "SUSPICIOUS";
  message: string;
  technical: string;
}

export interface TestResults {
  cnn_pattern_recognition?: TestResult;
  ela_error_level_analysis?: TestResult;
  metadata_forensics?: TestResult;
  noise_pattern_analysis?: TestResult;
  visual_artifact_scan?: TestResult;
  [key: string]: TestResult | undefined;
}

export interface MLAnalysis {
  prediction: string;
  confidence: number;
  models_used: string[];
  features_extracted: number;
}

export interface AnalysisResponse {
  status: string;
  verdict: "Authentic" | "AI-Generated" | "Suspicious" | "Error";
  confidence: number;
  fileInfo: FileMetadata;
  tests: TestResults;
  summary?: {
    total_tests: number;
    suspicious_flags: number;
    warning_flags: number;
    clean_flags: number;
  };
  mlAnalysis?: MLAnalysis;
  md5?: string;
  timestamp?: string;
  error?: string;
}

export interface HealthCheckResponse {
  status: string;
}

// ============================================================================
// API Configuration
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const API_ENDPOINTS = {
  HEALTH: "/api/health",
  ANALYZE: "/api/analyze",
};

// ============================================================================
// API Functions
// ============================================================================

/**
 * Check the health status of the backend
 */
export async function checkHealth(): Promise<HealthCheckResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.HEALTH}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking health:", error);
    throw error;
  }
}

/**
 * Upload an image file and analyze it
 * @param file - The image file to analyze
 * @returns Analysis results from the backend
 */
export async function uploadImageForAnalysis(
  file: File,
): Promise<AnalysisResponse> {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ANALYZE}`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Analysis failed with status ${response.status}`,
      );
    }

    const data = await response.json();
    return data as AnalysisResponse;
  } catch (error) {
    console.error("Error uploading image for analysis:", error);
    throw error;
  }
}

/**
 * Get the full API base URL (useful for debugging)
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
