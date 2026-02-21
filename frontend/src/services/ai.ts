// All AI generation is handled by the Python/Groq backend.
// This module just wraps the REST API calls.

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface ValidationResponse {
  investability_score: number;
  summary: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  risks: string[];
  competitors: {
    name: string;
    positioning: string;
    advantage: string;
  }[];
}

export interface RoadmapResponse {
  week_1: {
    goals: string[];
    features: string[];
    success_metrics: string[];
  };
  month_1: {
    goals: string[];
    features: string[];
    success_metrics: string[];
  };
  quarter_1: {
    goals: string[];
    features: string[];
    success_metrics: string[];
  };
  suggested_tech_stack: string[];
  risks_to_watch: string[];
}

export interface CopyResponse {
  hero_headline: string;
  subheadline: string;
  value_props: string[];
  cta: string;
  pitch_script: string;
}

export type FocusType = 'web' | 'mobile' | 'saas';
export type ToneType = 'professional' | 'bold' | 'playful';

async function post<T>(endpoint: string, body: object): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const validateIdea = (
  idea: string,
  audience: string,
  competitors?: string
): Promise<ValidationResponse> =>
  post<ValidationResponse>('/validate', { idea, audience, competitors });

export const generateRoadmap = (
  idea: string,
  focus: FocusType
): Promise<RoadmapResponse> =>
  post<RoadmapResponse>('/roadmap', { idea, focus });

export const generateCopy = (
  idea: string,
  audience: string,
  tone: ToneType
): Promise<CopyResponse> =>
  post<CopyResponse>('/copy', { idea, audience, tone });
