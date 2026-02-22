# Startup Copilot 

**AI-Powered Co-Founder for Early-Stage Builders**  
*Built for the Aya Community Hack the Vibe Hackathon (36-hour build challenge).*

---

## Problem Statement
Early-stage founders often struggle to:
- **Validate** whether their idea has real market potential.
- **Identify** competitors and understand positioning.
- **Define** a clear, actionable MVP roadmap.
- **Craft** compelling landing copy that converts.

This lack of structured validation slows momentum, leads to weak execution, and increases the risk of building products nobody wants. Founders need a fast, intelligent way to move from **idea → clarity → execution**.

## Solution
Startup Copilot is an AI-powered co-founder that helps early-stage builders validate ideas, define MVP roadmaps, and generate high-converting landing copy — all in minutes.

By combining structured AI reasoning with actionable outputs, Startup Copilot transforms vague startup ideas into:
- A validated concept.
- A prioritized MVP execution plan.
- Ready-to-use marketing copy.

It reduces decision paralysis and accelerates execution.

---

## Features

### 1. Idea Validation & Competitor Insights
- **Investability Score:** 0–100 rating based on market potential.
- **SWOT Analysis:** Structured breakdown of Strengths, Weaknesses, Opportunities, and Threats.
- **Risk Assessment:** Identification of key risks and strategic opportunities.
- **Competitor Snapshot:** Insights into rival positioning and market gaps.

### 2. MVP Roadmap Generator
- **Timeline:** Week 1, Month 1, and Quarter 1 execution roadmaps.
- **Feature Prioritization:** A focused list of core features for launch.
- **Tech Stack Recommendations:** Tailored suggestions for your specific product type.
- **Success Metrics:** Defined KPIs for each milestone.

### 3. Landing Page Copy Generator
- **Hero Headlines:** High-impact titles and subheadings.
- **Value Propositions:** 3 core points that highlight your unique selling position.
- **CTA Optimization:** Strategic Call-to-Action phrases.
- **Pitch Script:** A 30-second script perfect for demos and investor intros.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Framer Motion (for premium animations).
- **Backend:** Python (FastAPI).
- **AI Integration:** Groq AI with structured prompt engineering and JSON schema enforcement.
- **Deployment:** Vercel (Frontend), Render/Railway (Backend).

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/VivekGoudAdula/startup-copilot.git
cd startup-copilot
```

### 2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (if applicable)
cd ../backend
pip install -r requirements.txt
```

### 3. Add Environment Variables
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_api_key_here
```

### 4. Run Locally
```bash
# Frontend
npm run dev
```
The app will be available at: [http://localhost:5173](http://localhost:5173) (or 3000 depending on config).

---

## Demo Link
Live hosted demo: [start-up-copilot.vercel.app](https://start-up-copilot.vercel.app)

---

## Vibe Log
Startup Copilot was built using **structured vibe coding** — a workflow where human product thinking leads and AI accelerates execution. Instead of blindly generating features, we defined experience flows, API contracts, and output schemas first, then used AI to scaffold implementation and iterate rapidly.

### 1. Why We Used AI
We used AI as a **structured co-builder**, not as an autopilot. Every feature was first designed conceptually, then accelerated using AI for scaffolding, refinement, and iteration. This approach allowed us to reduce decision friction and maintain intentionality throughout the build.

### 2. Where AI Was Used
#### **Product Ideation**
- Refining the problem statement.
- Breaking scope into a 20-hour build.
- Designing user onboarding flows and mascot behavior logic.

#### **Backend Development**
- FastAPI scaffolding and Pydantic model generation.
- Structuring strict JSON outputs and designing AI prompt schemas.
- Implementation of retry logic for API calls.

#### **Frontend Engineering**
- Tailwind layout scaffolding and refactoring repetitive UI patterns.
- Framer Motion animation configurations and responsive improvements.

#### **Mascot & Micro-Interactions**
- Designing a fully coded SVG mascot.
- Mode-based behavior system (Blink, Tail animation, etc.).

#### **Prompt Engineering Strategy**
- Role-based prompts: **VC Analyst** (Validation), **Product Manager** (Roadmap), **Copywriter** (Landing Copy).
- Strict temperature tuning and JSON schema enforcement.

### 3. What We Did NOT Use AI For
We did not allow AI to:
- Make final UX/Product strategy decisions.
- Replace core architectural thinking.
- Design the brand identity/narrative.

### 4. Tools Used
- **GitHub Copilot:** Inline suggestions and boilerplate.
- **Groq:** Ultra-fast LLM inference.
- **Antigravity:** Rapid prototyping and agentic workflows.

---

## Future Scope
- **Market Size Estimation:** Deep TAM/SAM/SOM analysis.
- **Investor Deck Generator:** Automatic generation of pitch slides.
- **Financial Modeling:** AI-projected revenue and burn rate models.
- **Web Scraping:** Automated real-time competitor data pulling.
- **One-Click Deployment:** Landing page auto-builder with instant Vercel hosting.
- **GitHub Integration:** Auto-creating issues from the MVP roadmap.

**Long-term vision:** A complete AI-powered operating system for early-stage startups.
