
# CLAUDE.md

## 🧠 Project Purpose

This workspace contains a crypto trading analysis platform that uses the Coinbase API and a Large Language Model (LLM) to detect arbitrage and long-term trading opportunities. The stack is a TypeScript monorepo using Turborepo and `pnpm`. The backend uses a mix of TypeScript and Python packages for data ingestion, market analysis, and LLM interaction.

Your job is to help design, build, and refactor features using best practices in full-stack development, clean code, modular design, and ML/LLM integration.

---

## 🧭 Workspace Structure (Monorepo)

```
apps/
  web/                → Next.js frontend dashboard
  api/                → Node.js API server (REST + WebSocket)
packages/
  coinbase-client/    → Coinbase API abstraction (REST + WebSocket)
  data-pipeline/      → Data ingestion and transformation (Python)
  analysis/           → Market analysis logic (ML + technical indicators)
  llm/                → LLM interface layer (Claude/OpenAI/Mistral)
  db/                 → Prisma ORM models, Postgres connectors
  types/              → Shared TypeScript types
  utils/              → Reusable helpers
```

---

## 🔧 Setup & Environment Commands (BASH)

To be used when creating scripts or pipelines.

###
sudo password = 'yurikml2'

### 1. Install dependencies and bootstrap
```bash
pnpm install
pnpm run build
```

### 2. Start services for local development
```bash
pnpm dev  # Starts frontend, backend, and workers if defined in turbo.json
```

### 3. Run type checking and linting
```bash
pnpm type-check
pnpm lint
```

### 4. Run Python data fetcher
```bash
cd packages/data-pipeline
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python fetch.py
```

### 5. Prisma database setup
```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

---

## 🤖 Claude Instructions

### 🔒 Constraints

- Do not modify existing keys inside `.env*` files, but you may read them and add new keys or variables.
- Do not delete `apps/api` or `packages/coinbase-client` — these are required to bootstrap data.
- Do not invoke real trade execution unless `TRADING_MODE=enabled`.

### 🧱 Code Tasks

Use the following conventions and workflows:

#### 🧪 To write new packages or services:
1. Scaffold using Turbo naming: `pnpm create package <name>`
2. Follow workspace conventions (TS + `.tsconfig`, use named exports)
3. Add the new package to `turbo.json` and `pnpm-workspace.yaml`

#### 🔁 To refactor existing code:
1. Use `zen:refactor` before making large changes
2. Follow import paths relative to `@/` or `@story-engine/*`
3. Update imports across all consumers

#### 📊 To implement a new analysis algorithm:
1. Add the implementation in `packages/analysis/indicators/`
2. Expose via a shared API in `packages/analysis/index.ts`
3. Document input format, return format, and intended usage

#### 🧠 To invoke the LLM:
1. Use Claude or Mistral (OpenRouter or local Ollama)
2. Wrap LLM calls in `packages/llm/index.ts`
3. Add test prompts to `packages/llm/tests/` for reproducibility
4. Include a JSON schema for expected model outputs

---

## 🧠 Sample Tasks Claude Can Perform

### ✅ Add Bollinger Band detection
```bash
# Inside packages/analysis/indicators/
touch bollinger.ts
# Export a function:
export function detectBollingerBreakout(prices: number[]): { upperCross: boolean, lowerCross: boolean }
```

### ✅ Create a reusable Coinbase REST client
```ts
// Inside packages/coinbase-client/index.ts
export async function getCandles(pair: string, granularity: number): Promise<Candle[]> { ... }
```

### ✅ Generate LLM prompt for BTC long-term trend
```ts
// packages/llm/prompts/longterm.ts
export const trendPrompt = (data: Candle[]) => `Summarize the trend in BTC/USD over the past 60 days...`
```

---

## 🧪 Testing

- Unit tests: Use `vitest` or `jest` for all TS packages
- LLM prompt tests: Provide snapshot input/output examples
- Data tests: Validate shape of incoming Coinbase responses

---

## 💬 Claude Reminders

Always:
- Use clear function names and include JSDoc where helpful
- Prefer named exports over default
- Break large features into composable modules
- Test your assumptions by reading the actual TypeScript types in `/types`
- Ask before using a new external API or model provider

---

## ❓ Open Questions for the User

### ✅ Answers from User
21. **Secrets Management** – Environment variables and vault-style local storage will be sufficient for managing exchange API keys, as the system will only have a single user.
22. **Timeframe Strategy Alignment** – All strategies will operate on a shared set of timeframes and indicators to enable consistent performance comparison.
23. **Live Monitoring Dashboard** – A real-time dashboard will be implemented to display active trades, positions, open signals, and system metrics.
24. **LLM Switcher Interface** – A frontend toggle will allow selecting between available LLM backends (Claude, OpenAI, local Mistral/Ollama) for testing and experimentation.
25. **Offline Mode** – Full offline mode is not required, as LLMs like GPT, Claude, and Gemini will remain cloud-hosted. Local models may be used only for testing purposes.

11. **Backtesting Timeframes** – Backtesting will support multiple time granularities: 1m, 5m, 30m, 1h, 12h, 1d, 1w, 1mo, 6mo, 1y, and all-time. High-frequency strategies are essential for crypto.
12. **Simulation Result Tracking** – Strategy performance tracking must be precise. Profit/loss should be calculated independently of user deposits or withdrawals, reflecting only the performance of trades. Leaderboard-style strategy comparisons are for personal use only.
13. **Strategy Modularity** – Strategies will be modular and follow a defined interface. This format should be easy to generate or evolve using AI (LLMs) and can be extended manually.
14. **LLM Prompt Tuning & Evolution** – Prompt engineering will be supported manually at first. Over time, the system may evolve its own prompts using reinforcement learning or result-driven updates.
15. **Risk Controls** – Comprehensive protection logic will be required, including stop-loss, take-profit, max drawdown, and similar risk mitigation techniques.

6. **Arbitrage Scope** – The system should support both intra-exchange and cross-exchange arbitrage. For now, only Coinbase will be integrated, but the architecture should allow adding new CEX/DEX APIs via configuration and secrets.
7. **Trading Execution Mode** – The app will simulate trades at first. Real trade execution will be implemented later, with safeguards and testnet support.
8. **Backtesting** – Backtesting is critical and should be robust. It should support simulation against historical OHLCV data and allow strategy evaluation. Visual playback of simulated trades (e.g., chart overlays of trades over time) is optional but encouraged if feasible.
9. **Alerts & Automation** – The system should trade automatically unless `TRADING_MODE=disabled`. Alerts will only be sent in edge cases such as flash crashes or volatility spikes.
10. **LLM Output Format** – Trade advice format should be optimized for machine-readability and downstream use by the trade executor. Prefer structured JSON over plain text summaries.

1. **Backend First** – Prioritize backend analytics, data ingestion, and analysis algorithms before front-end charts.
2. **LLM Plugin Architecture** – Yes, support pluggable model backends. The app should work with Claude/OpenAI APIs as well as local models (via Ollama).
3. **LLM Output Testing Strategy** – (See explanation below.)
4. **Deployment Target** – Develop locally using WSL, deploy to cloud (likely AWS) when ready.
5. **Initial Trading Pairs** – Start with USDC and Tether as seed currencies. Focus only on USDC/USDT <-> BTC or ETH trading pairs. Do not trade BTC ↔ ETH directly.

---

### 💡 Clarification for Question #3: LLM Output Testing

When writing code that uses LLMs, you typically want to make sure the output:
- Is **consistent** (especially for decision logic)
- Matches **expected format or schema**
- Doesn’t change due to random variation or model drift

#### 🧪 Your Options:
**A. Snapshot Testing** – Save an example output and compare future results to it. Useful for fixed prompt+input pairs.
```ts
expect(generatedOutput).toMatchInlineSnapshot(`Buy BTC at 42,500. Trend is bullish.`)
```

**B. Schema Testing** – Define the structure of the expected result and validate it. Good for cases where structure matters more than wording.
```ts
z.object({
  summary: z.string(),
  action: z.enum(['buy', 'sell', 'hold']),
  confidence: z.number().min(0).max(1)
})
```

**C. Mocking** – Replace the LLM call with a fake fixed result during unit tests. Fast, but not realistic.

✅ **Recommendation for You:** Use **schema validation** during runtime and **mocking** during unit tests to reduce cost and flakiness. Add snapshot tests for key prompts during critical decision logic development.


Please clarify:
1. Should I implement chart visualization or focus on backend analytics first?
2. Do you want to build a plugin-based model for LLM tasks (e.g., allow swapping Claude/OpenAI/Mistral)?
3. Are we writing full tests for LLM outputs or mocking for now?
4. Do you plan to run all services locally, or deploy some to cloud (e.g., LLM inference)?
5. What trading pairs should be prioritized first?

Once you reply, I’ll help update the workspace accordingly.
