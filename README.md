
## Vibe Log: How We Used AI

Startup Copilot was built using structured vibe coding — a workflow where human product thinking leads and AI accelerates execution. Instead of blindly generating features, we first defined user experience flows, API contracts, and output schemas, then used AI to scaffold implementation and iterate rapidly.

### 1️⃣ Why We Used AI (Intentional Use)
We used AI as a structured co-builder, not as an autopilot. Every feature was first designed conceptually, then accelerated using AI for scaffolding, refinement, and iteration. This approach allowed us to reduce decision friction and maintain intentionality throughout the build.

### 2️⃣ Where AI Was Used (Breakdown by Layer)
**🧠 Product Ideation**
- Refining problem statement
- Breaking scope into a 20-hour build
- Designing user onboarding flow
- Designing mascot behavior logic
AI helped us reduce decision friction and clarify our product direction.

**🏗 Backend Development**
- FastAPI scaffolding
- Pydantic model generation
- Structuring strict JSON outputs
- Designing AI prompt schema
- Retry logic for API calls
We emphasized structured prompt engineering and schema enforcement to ensure reliability.

**🎨 Frontend Engineering**
- Tailwind layout scaffolding
- Refactoring repetitive UI patterns
- Framer Motion animation configs
- State management suggestions
- Responsive improvements
All AI-generated code was reviewed and manually refined for quality and consistency.

**🐾 Mascot & Micro-Interactions**
- Designing a fully coded SVG mascot
- Tail animation logic
- Blink interval logic
- Mode-based behavior system
This added a unique, interactive layer to our product.

**✍️ Prompt Engineering Strategy**
- Each feature uses a role-based prompt:
   - Validation → VC Analyst
   - Roadmap → Senior Product Manager
   - Copy → Conversion Copywriter
- Strict JSON schema enforcement
- Temperature tuning
- Parsing validation
- Fallback error handling

### 3️⃣ What We Did NOT Use AI For
We did not allow AI to:
- Make final UX decisions
- Design product strategy blindly
- Replace architectural thinking
All key flows were manually designed before implementation. This ensured maturity and intentionality in our process.

### 4️⃣ Tools Used (Be Transparent)
- Google AI Studio (prompt testing)
- Groq (LLM)
- GitHub Copilot (inline suggestions)
- Antigravity 
Each tool was used for specific tasks, such as prompt validation, code suggestions, and rapid prototyping.

### 5️⃣ Real Impact of AI
Using structured vibe coding reduced our scaffolding time by approximately 40–50%, allowing us to focus more on UI polish, animation, and user experience.

### 6️⃣ What We Learned
- Importance of structured prompts
- Why strict JSON formatting matters
- Why UX polish > raw AI output
- Why AI must be constrained, not freeform

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GROQ_API_KEY` in [.env.local](.env.local) to your Groq API key
3. Run the app:
   `npm run dev`
