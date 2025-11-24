// utils.js
/**
 * Try to extract the first JSON object from a string.
 * Returns parsed JSON or null.
 */
export function extractJSONFromText(text) {
  if (!text || typeof text !== "string") return null;
  // try direct parse
  try {
    const trimmed = text.trim();
    return JSON.parse(trimmed);
  } catch (e) {}

  // fallback: regex to find {...}
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const candidate = text.slice(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch (e) {}
  }

  // fallback: look for code fences containing json
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenceMatch) {
    try {
      return JSON.parse(fenceMatch[1]);
    } catch (e) {}
  }

  return null;
}
