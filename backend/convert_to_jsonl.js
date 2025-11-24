// THIS FILE CONVERTS dataset.json TO dataset.jsonl FOR OPENAI FINE-TUNING
// RUN THIS FILE BEFORE UPLOADING TO OPENAI
// USAGE: node backend/convert_to_jsonl.js
// INPUT: dataset.json (array of {input:..., output:...} objects)
// OUTPUT: dataset.jsonl (JSONL file with messages format)

import fs from "fs";

const inPath = "./dataset.json";
const outPath = "./dataset.jsonl";

const raw = fs.readFileSync(inPath, "utf8");
const dataset = JSON.parse(raw);

const out = fs.createWriteStream(outPath, { flags: "w" });

dataset.forEach(item => {
  // Build messages-based JSONL (for OpenAI chat-style fine-tune)
  const prompt = item.input;
  // Normalize output: make sure it's a valid JSON string as assistant message
  const assistantContent = JSON.stringify(item.output);
  const line = {
    messages: [
      { role: "user", content: prompt },
      { role: "assistant", content: assistantContent }
    ]
  };
  out.write(JSON.stringify(line) + "\n");
});

out.end();
console.log("Wrote", outPath);
