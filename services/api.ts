/**
 * API Service for communicating with the Django backend
 * Provides type-safe functions for all API endpoints
 */

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface FileMetadata {
  name: string;
  size_bytes: number;
  content_type: string;
  md5: string;
  uploaded_at: string;
}

export interface ForensicsResult {
  [key: string]: any;
}

export interface MLResult {
  prediction: string;
  confidence: number;
  [key: string]: any;
}

export interface AnalysisSummary {
  label: 'authentic' | 'suspicious' | 'fabricated';
  overall_confidence: number;
  pipeline_order: string[];
}

export interface AnalysisResponse {
  status: string;
  file: FileMetadata;
  forensics: ForensicsResult;
  ml_result: MLResult;
  summary: AnalysisSummary;
}

export interface HealthCheckResponse {
  status: string;
}

// ============================================================================
// API Configuration
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const API_ENDPOINTS = {
  HEALTH: '/api/health/',
  ANALYZE: '/api/analyze/',
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
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Health check failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
}

/**
 * Upload an image file and analyze it
 * @param file - The image file to analyze
 * @returns Analysis results from the backend
 */
export async function uploadImageForAnalysis(file: File): Promise<AnalysisResponse> {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.ANALYZE}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Analysis failed with status ${response.status}`
      );
    }

    const data = await response.json();
    return data as AnalysisResponse;
  } catch (error) {
    console.error('Error uploading image for analysis:', error);
    throw error;
  }
}

/**
 * Get the full API base URL (useful for debugging)
 */
export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
