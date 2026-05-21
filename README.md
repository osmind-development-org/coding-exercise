# Clinical coding assistant — interview exercise

Scaffolding for the Senior Software Engineer (IPD) live coding exercise: an assistant that reads visit data (structured or transcript) and suggests CPT billing codes.

Prompts align with:

- Part 1 — [Clinical Coding Assistant (Phase 1)](https://www.notion.so/osmind/Senior-Engineer-Coding-Exercise-Part-1-Candidate-View-35f5e7a3097880559a85ed585c730cff)
- Part 2 & 3 — [Transcript parsing & uncertainty](https://www.notion.so/osmind/Senior-Engineer-Coding-Exercise-Part-2-Candidate-View-35f5e7a3097880f9b50cc75f78bd8612)

## Project layout

| File | Purpose |
| --- | --- |
| `src/types.ts` | `VisitRecord`, `ParsedVisit` |
| `src/prompt.ts` | Optional OpenAI Responses helper (`prompt`) with structured JSON wiring |
| `src/phase1.ts` / `phase1.test.ts` | Structured visit → CPT codes |
| `src/phase2.ts` / `phase2.test.ts` | Transcript → `VisitRecord`, then Phase 1 `suggestCodes` |
| `src/phase3.ts` / `phase3.test.ts` | `ParsedVisit` + review flag |

Starter implementations are stubs; **`npm run test`** is expected to **fail** until you implement logic.

## Setup

Clone with **HTTPS**:

```bash
git clone https://github.com/osmind-development-org/coding-exercise.git
cd coding-exercise
npm install
```

### OpenAI API key (later phases)

If you use the included `prompt` helper:

```bash
cp .env.example .env
# Put your OPENAI_API_KEY in .env (provided at interview time).
```

## Run tests

```bash
npm run test
```
