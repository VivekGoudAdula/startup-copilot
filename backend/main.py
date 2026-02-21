import os
import json
import re
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from groq import Groq

# Load root-level .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = FastAPI(title="Startup Copilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_groq_client() -> Groq:
    api_key = os.getenv("GROQ_API_KEY", "").strip()
    if not api_key or api_key == "YOUR_GROQ_API_KEY_HERE":
        raise HTTPException(
            status_code=500,
            detail="GROQ_API_KEY is not configured. Add it to your .env file — get one free at https://console.groq.com/keys"
        )
    return Groq(api_key=api_key)

def extract_json(text: str) -> dict:
    """Robustly extract JSON from LLM response."""
    # Try direct parse first
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    # Look for JSON block in markdown code fences
    match = re.search(r"```(?:json)?\s*([\s\S]+?)```", text)
    if match:
        try:
            return json.loads(match.group(1).strip())
        except json.JSONDecodeError:
            pass
    # Fallback: find first { ... }
    match = re.search(r"\{[\s\S]+\}", text)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass
    raise ValueError(f"Could not extract JSON from response: {text[:300]}")


# ── Request Models ──────────────────────────────────────────────────────────

class ValidateRequest(BaseModel):
    idea: str
    audience: str
    competitors: Optional[str] = None

class RoadmapRequest(BaseModel):
    idea: str
    focus: str  # 'web' | 'mobile' | 'saas'

class CopyRequest(BaseModel):
    idea: str
    audience: str
    tone: str  # 'professional' | 'bold' | 'playful'


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "Startup Copilot API"}


@app.post("/validate")
def validate_idea(body: ValidateRequest):
    client = get_groq_client()

    competitors_clause = f"Known competitors: {body.competitors}." if body.competitors else ""
    prompt = f"""Validate this startup idea: "{body.idea}" for the target audience: "{body.audience}". {competitors_clause}

Return ONLY a valid JSON object with exactly this structure (no extra keys, no markdown, no explanation):
{{
  "investability_score": <integer 0-100>,
  "summary": "<2-3 sentence executive summary>",
  "swot": {{
    "strengths": ["...", "..."],
    "weaknesses": ["...", "..."],
    "opportunities": ["...", "..."],
    "threats": ["...", "..."]
  }},
  "risks": ["...", "..."],
  "competitors": [
    {{"name": "...", "positioning": "...", "advantage": "..."}}
  ]
}}"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a world-class VC and startup strategist. "
                    "Provide a critical, data-driven validation of startup ideas. "
                    "Be honest but constructive. Always respond with valid JSON only."
                )
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=2048,
    )

    raw = completion.choices[0].message.content or "{}"
    try:
        return extract_json(raw)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))


@app.post("/roadmap")
def generate_roadmap(body: RoadmapRequest):
    client = get_groq_client()

    prompt = f"""Generate an MVP roadmap for: "{body.idea}". Focus type: {body.focus}.

Return ONLY a valid JSON object with exactly this structure (no markdown, no explanation):
{{
  "week_1": {{
    "goals": ["...", "..."],
    "features": ["...", "..."],
    "success_metrics": ["...", "..."]
  }},
  "month_1": {{
    "goals": ["...", "..."],
    "features": ["...", "..."],
    "success_metrics": ["...", "..."]
  }},
  "quarter_1": {{
    "goals": ["...", "..."],
    "features": ["...", "..."],
    "success_metrics": ["...", "..."]
  }},
  "suggested_tech_stack": ["...", "..."],
  "risks_to_watch": ["...", "..."]
}}"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a senior product manager. "
                    "Create realistic, actionable 3-month roadmaps for MVPs. "
                    "Always respond with valid JSON only."
                )
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.7,
        max_tokens=2048,
    )

    raw = completion.choices[0].message.content or "{}"
    try:
        return extract_json(raw)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))


@app.post("/copy")
def generate_copy(body: CopyRequest):
    client = get_groq_client()

    prompt = f"""Generate landing page copy for: "{body.idea}". Target audience: "{body.audience}". Tone: {body.tone}.

Return ONLY a valid JSON object with exactly this structure (no markdown, no explanation):
{{
  "hero_headline": "...",
  "subheadline": "...",
  "value_props": ["...", "...", "...", "..."],
  "cta": "...",
  "pitch_script": "..."
}}"""

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a world-class conversion copywriter. "
                    "Create compelling, high-converting landing page copy. "
                    "Always respond with valid JSON only."
                )
            },
            {"role": "user", "content": prompt}
        ],
        temperature=0.8,
        max_tokens=1024,
    )

    raw = completion.choices[0].message.content or "{}"
    try:
        return extract_json(raw)
    except ValueError as e:
        raise HTTPException(status_code=502, detail=str(e))
