import "server-only";
import Anthropic from "@anthropic-ai/sdk";

// Ready-to-paste rewrites for the prospect's site and Google profile, written
// by Claude from the homepage text the site check collected. Needs
// ANTHROPIC_API_KEY.

export type CopyInput = {
  name: string;
  city: string;
  industry: string;
  site: string;
  title: string;
  description: string;
  h1: string;
  pageText: string;
};

export type CopyResult = {
  title: string;
  metaDescription: string;
  h1: string;
  subheadline: string;
  aboutParagraph: string;
  gbpDescription: string;
  faqs: { question: string; answer: string }[];
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["title", "metaDescription", "h1", "subheadline", "aboutParagraph", "gbpDescription", "faqs"],
  properties: {
    title: { type: "string", description: "Homepage <title>, 50-60 characters: main service, city, brand." },
    metaDescription: { type: "string", description: "140-160 characters: service, area, a reason to click, a call to action." },
    h1: { type: "string", description: "Homepage H1, under 70 characters, says what the business does and where." },
    subheadline: { type: "string", description: "One or two sentences under the H1 with the strongest proof points." },
    aboutParagraph: { type: "string", description: "80-120 word paragraph for the homepage: who they are, what they do, where, why choose them." },
    gbpDescription: { type: "string", description: "Google Business Profile description, 600-750 characters, no links or phone numbers." },
    faqs: {
      type: "array",
      description: "Six FAQs customers of this business ask, each answered in two or three sentences.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "answer"],
        properties: { question: { type: "string" }, answer: { type: "string" } },
      },
    },
  },
};

const SYSTEM = `You write website and Google Business Profile copy for local and small businesses, for the agency Rocket Llama Labs.

Rules:
- Use only facts found in the page text or the inputs. Where a fact is needed but unknown (years in business, licence number, prices, warranty length), write a bracketed placeholder such as [years in business] instead of inventing it.
- Write so a search engine and an AI assistant can quote it: say the service and the city plainly, answer questions directly in the first sentence.
- Plain, direct sentences. No exclamation marks, no hype words like "premier", "top-notch" or "one-stop shop".`;

export async function writeCopy(input: CopyInput): Promise<CopyResult> {
  const client = new Anthropic({ timeout: 55000, maxRetries: 0 });
  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 6000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
    system: SYSTEM,
    messages: [
      {
        role: "user",
        content: `Business: ${input.name}
Website: ${input.site}
City or service area: ${input.city || "unknown"}
Industry or main service: ${input.industry || "unknown, infer it from the page"}

Current title: ${input.title || "(none)"}
Current meta description: ${input.description || "(none)"}
Current H1: ${input.h1 || "(none)"}

Homepage text:
"""
${input.pageText.slice(0, 6000)}
"""`,
      },
    ],
  });
  if (response.stop_reason === "refusal") throw new Error("The copywriter declined this request.");
  const text = response.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  const data = JSON.parse(text) as CopyResult;
  data.faqs = (data.faqs ?? []).slice(0, 8);
  return data;
}
