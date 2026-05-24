import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { jerrySystemPrompt } from "@/data/jerry-system-prompt";
import { getJerryReply } from "@/lib/jerry-brain";

const chatInput = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(1500),
      }),
    )
    .max(12)
    .optional(),
});

type ChatTurn = NonNullable<z.infer<typeof chatInput>["history"]>[number];

function getHistory(data: z.infer<typeof chatInput>) {
  return data.history ?? [];
}

async function chatWithGroq(
  history: ChatTurn[],
  message: string,
  apiKey: string,
) {
  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: jerrySystemPrompt },
          ...history.map((m) => ({ role: m.role, content: m.content })),
          { role: "user", content: message },
        ],
        max_tokens: 400,
        temperature: 0.6,
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Groq API error (${response.status}): ${detail.slice(0, 200)}`,
    );
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("Groq returned an empty response");
  return reply;
}

async function chatWithGemini(
  history: ChatTurn[],
  message: string,
  apiKey: string,
) {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const contents = [
    ...history.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: jerrySystemPrompt }] },
      contents,
      generationConfig: {
        maxOutputTokens: 400,
        temperature: 0.6,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Gemini API error (${response.status}): ${detail.slice(0, 200)}`,
    );
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!reply) throw new Error("Gemini returned an empty response");
  return reply;
}

/** Free tier — no API key; used when Groq/Gemini are not configured. */
async function chatWithPollinations(history: ChatTurn[], message: string) {
  const transcript = history
    .slice(-6)
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = [
    jerrySystemPrompt.slice(0, 1200),
    transcript,
    `user: ${message}`,
    "assistant:",
  ]
    .filter(Boolean)
    .join("\n\n");

  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai-fast`;

  const response = await fetch(url, {
    headers: { Accept: "text/plain" },
    signal: AbortSignal.timeout(25_000),
  });

  if (!response.ok) {
    throw new Error(`Pollinations error (${response.status})`);
  }

  const reply = (await response.text()).trim();
  if (!reply) throw new Error("Pollinations returned an empty response");
  return reply.slice(0, 1200);
}

export const chatWithJerry = createServerFn({ method: "POST" })
  .inputValidator(chatInput)
  .handler(async ({ data }) => {
    const history = getHistory(data);
    const groqKey = process.env.GROQ_API_KEY?.trim();
    const geminiKey = process.env.GEMINI_API_KEY?.trim();

    const errors: string[] = [];

    if (groqKey) {
      try {
        const reply = await chatWithGroq(history, data.message, groqKey);
        return { reply, source: "groq" as const };
      } catch (error) {
        console.error("Jerry Groq error:", error);
        errors.push(error instanceof Error ? error.message : "Groq failed");
      }
    }

    if (geminiKey) {
      try {
        const reply = await chatWithGemini(history, data.message, geminiKey);
        return { reply, source: "gemini" as const };
      } catch (error) {
        console.error("Jerry Gemini error:", error);
        errors.push(error instanceof Error ? error.message : "Gemini failed");
      }
    }

    try {
      const reply = await chatWithPollinations(history, data.message);
      return { reply, source: "pollinations" as const };
    } catch (error) {
      console.error("Jerry Pollinations error:", error);
      errors.push(
        error instanceof Error ? error.message : "Free AI provider failed",
      );
    }

    return {
      reply: getJerryReply(data.message),
      source: "local" as const,
      hint:
        errors.length > 0
          ? "Add GROQ_API_KEY to .env for reliable AI (free at console.groq.com)."
          : "Add GROQ_API_KEY to .env for smarter replies (free at console.groq.com).",
    };
  });
