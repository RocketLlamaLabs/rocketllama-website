import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { Finding } from "./shared";

// The AI answer-engine test. Claude searches the live web the way ChatGPT,
// Perplexity and Gemini do when someone asks for a local pro, then reports
// whether the prospect gets recommended, what the web says about them and
// which sources the answer leans on. Needs ANTHROPIC_API_KEY.

export type AiResult = {
  question: string;
  answer: string;
  recommended: { name: string; reason: string }[];
  mentioned: boolean;
  position: number | null;
  brandSummary: string;
  sources: { title: string; url: string }[];
  citationGaps: string[];
  accuracyIssues: string[];
  recommendations: string[];
  findings: Finding[];
};

export const aiEnabled = () => !!process.env.ANTHROPIC_API_KEY;

const SYSTEM = `You are the AI-visibility analyst inside a marketing audit run by Rocket Llama Labs, an agency that grows local and small businesses.

You are given a business and the question a customer would type into an AI assistant. Use web search to answer it the way an AI answer engine would for a real customer, then look up the business itself.

Work in this order:
1. Search for the customer question and decide which businesses you would honestly recommend, best first, as ChatGPT or Perplexity would. Do not favour the audited business.
2. Search for the business by name and location to learn what the web says about it: reviews, directories, news, social profiles.
3. Note which kinds of sources (directories, review sites, Reddit, local news, lists) the recommended businesses appear on and the audited business does not.

Then reply with only a JSON object, no prose before or after, in this shape:
{
  "answer": "the two to four sentence answer you would give the customer",
  "recommended": [{"name": "business name", "reason": "why, in under 15 words"}],
  "mentioned": true or false (is the audited business in "recommended"),
  "position": 1-based position of the audited business in "recommended", or null,
  "brandSummary": "two or three sentences on what the web says about the audited business, or that little or nothing could be found",
  "citationGaps": ["source or directory where competitors show up and the audited business does not"],
  "accuracyIssues": ["conflicting or outdated facts about the business, such as different phone numbers, addresses or hours"],
  "recommendations": ["specific action that would make AI engines more likely to recommend the business"]
}
Keep "recommended" to at most 5 entries and each list to at most 5 items. Write in plain, direct sentences. If a fact is unknown, say so instead of guessing.`;

function extractJson(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return null;
  }
}

const strList = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string").slice(0, 6) : []);

export async function auditAi({ name, city, industry, site }: { name: string; city: string; industry: string; site: string | null }): Promise<AiResult> {
  const service = industry || "company like this one";
  const question = city ? `Who is the best ${service} in ${city}?` : `What is the best ${service} near me?`;
  const client = new Anthropic({ timeout: 55000, maxRetries: 0 });
  const started = Date.now();

  const messages: Anthropic.Beta.BetaMessageParam[] = [
    {
      role: "user",
      content: `Audited business: ${name}${site ? ` (website ${site})` : ""}${city ? `, located in or serving ${city}` : ""}${industry ? `, industry: ${industry}` : ""}.

Customer question to answer: "${question}"`,
    },
  ];

  let response: Anthropic.Beta.BetaMessage | null = null;
  // A long server-tool turn can pause; continue it once if there is time.
  for (let attempt = 0; attempt < 2; attempt++) {
    response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 8000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "low" },
      system: SYSTEM,
      tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 5 }],
      messages,
    });
    if (response.stop_reason !== "pause_turn" || Date.now() - started > 30000) break;
    messages.push({ role: "assistant", content: response.content });
  }
  if (!response) throw new Error("No response from the AI check.");
  if (response.stop_reason === "refusal") throw new Error("The AI check declined this request.");

  const sources = new Map<string, string>();
  let text = "";
  for (const block of response.content) {
    if (block.type === "text") {
      text += block.text;
      for (const c of block.citations ?? []) {
        if ("url" in c && typeof c.url === "string" && sources.size < 12) sources.set(c.url, ("title" in c && typeof c.title === "string" && c.title) || c.url);
      }
    } else if (block.type === "web_search_tool_result" && Array.isArray(block.content)) {
      for (const r of block.content) {
        if (r.type === "web_search_result" && sources.size < 12 && !sources.has(r.url)) sources.set(r.url, r.title);
      }
    }
  }
  const json = extractJson(text);
  if (!json) throw new Error("The AI check did not return a readable answer.");

  const recommended = (Array.isArray(json.recommended) ? json.recommended : [])
    .filter((r): r is { name: string; reason?: string } => !!r && typeof r === "object" && typeof (r as { name?: unknown }).name === "string")
    .slice(0, 5)
    .map((r) => ({ name: r.name, reason: typeof r.reason === "string" ? r.reason : "" }));
  const mentioned = json.mentioned === true;
  const position = typeof json.position === "number" ? json.position : null;

  const result: AiResult = {
    question,
    answer: typeof json.answer === "string" ? json.answer : "",
    recommended,
    mentioned,
    position,
    brandSummary: typeof json.brandSummary === "string" ? json.brandSummary : "",
    sources: [...sources].map(([url, title]) => ({ url, title })),
    citationGaps: strList(json.citationGaps),
    accuracyIssues: strList(json.accuracyIssues),
    recommendations: strList(json.recommendations),
    findings: [],
  };

  result.findings.push({
    id: "ai-recommended",
    category: "ai",
    label: "Recommended by AI search",
    impact: "high",
    status: mentioned ? (position !== null && position <= 2 ? "pass" : "warn") : "fail",
    detail: mentioned
      ? `Asked “${question}”, the AI answer lists ${name} at number ${position ?? "?"} of ${recommended.length}.`
      : `Asked “${question}”, the AI answer recommends ${recommended.map((r) => r.name).slice(0, 3).join(", ") || "other businesses"} and does not mention ${name}.`,
    fix: "Win citations on the sources AI engines lean on, add schema and an FAQ, and keep name, address and phone identical everywhere.",
    steps: result.recommendations.length ? result.recommendations : undefined,
    items: result.citationGaps.length ? result.citationGaps.map((g) => `Missing from: ${g}`) : undefined,
  });
  if (result.accuracyIssues.length) {
    result.findings.push({
      id: "ai-accuracy",
      category: "ai",
      label: "Consistent facts across the web",
      impact: "medium",
      status: "warn",
      detail: result.accuracyIssues.slice(0, 2).join(" "),
      fix: "Correct the business details on every directory and profile so they match the website and Google profile.",
      items: result.accuracyIssues,
    });
  }
  return result;
}
