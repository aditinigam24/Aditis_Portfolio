import {
  jerryFallback,
  jerryIntro,
  jerryTopics,
  type JerryTopic,
} from "@/data/jerry-knowledge";

function scoreTopic(query: string, topic: JerryTopic) {
  const normalized = query.toLowerCase();
  return topic.keywords.reduce(
    (score, keyword) => (normalized.includes(keyword) ? score + 1 : score),
    0,
  );
}

export function getJerryReply(input: string) {
  const query = input.trim();
  if (!query) return jerryIntro;

  let best: JerryTopic | undefined;
  let bestScore = 0;

  for (const topic of jerryTopics) {
    const score = scoreTopic(query, topic);
    if (score > bestScore) {
      bestScore = score;
      best = topic;
    }
  }

  return bestScore > 0 && best ? best.answer : jerryFallback;
}
