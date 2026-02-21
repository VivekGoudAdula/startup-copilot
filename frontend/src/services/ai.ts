import { GoogleGenAI, Type } from "@google/genai";

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

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  return new GoogleGenAI({ apiKey });
};

export const validateIdea = async (idea: string, audience: string, competitors?: string): Promise<ValidationResponse> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Validate this startup idea: "${idea}" for the target audience: "${audience}". ${competitors ? `Known competitors: ${competitors}` : ""}`,
    config: {
      systemInstruction: "You are a world-class VC and startup strategist. Provide a critical, data-driven validation of the startup idea. Be honest but constructive.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          investability_score: { type: Type.NUMBER, description: "Score from 0-100" },
          summary: { type: Type.STRING },
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"]
          },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          competitors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                positioning: { type: Type.STRING },
                advantage: { type: Type.STRING },
              },
              required: ["name", "positioning", "advantage"]
            }
          }
        },
        required: ["investability_score", "summary", "swot", "risks", "competitors"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateRoadmap = async (idea: string, focus: FocusType): Promise<RoadmapResponse> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Generate an MVP roadmap for: "${idea}". Focus type: ${focus}.`,
    config: {
      systemInstruction: "You are a senior product manager. Create a realistic, actionable 3-month roadmap for an MVP.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          week_1: {
            type: Type.OBJECT,
            properties: {
              goals: { type: Type.ARRAY, items: { type: Type.STRING } },
              features: { type: Type.ARRAY, items: { type: Type.STRING } },
              success_metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["goals", "features", "success_metrics"]
          },
          month_1: {
            type: Type.OBJECT,
            properties: {
              goals: { type: Type.ARRAY, items: { type: Type.STRING } },
              features: { type: Type.ARRAY, items: { type: Type.STRING } },
              success_metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["goals", "features", "success_metrics"]
          },
          quarter_1: {
            type: Type.OBJECT,
            properties: {
              goals: { type: Type.ARRAY, items: { type: Type.STRING } },
              features: { type: Type.ARRAY, items: { type: Type.STRING } },
              success_metrics: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["goals", "features", "success_metrics"]
          },
          suggested_tech_stack: { type: Type.ARRAY, items: { type: Type.STRING } },
          risks_to_watch: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["week_1", "month_1", "quarter_1", "suggested_tech_stack", "risks_to_watch"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateCopy = async (idea: string, audience: string, tone: ToneType): Promise<CopyResponse> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Generate landing page copy for: "${idea}". Target audience: "${audience}". Tone: ${tone}.`,
    config: {
      systemInstruction: "You are a world-class conversion copywriter. Create compelling, high-converting copy.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          hero_headline: { type: Type.STRING },
          subheadline: { type: Type.STRING },
          value_props: { type: Type.ARRAY, items: { type: Type.STRING } },
          cta: { type: Type.STRING },
          pitch_script: { type: Type.STRING },
        },
        required: ["hero_headline", "subheadline", "value_props", "cta", "pitch_script"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
