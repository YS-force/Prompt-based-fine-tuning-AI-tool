// backend/server.js
// Express server to handle Groq-based JSON extraction from HTML
// Uses Groq SDK and dotenv for configuration
// USAGE: node backend/server.js
// ENDPOINT: POST /api/extract with JSON body {html: "..."}
// RESPONSE: {success: true, json: {...}, raw: "..."}
// Requires GROQ_API_KEY in .env


import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { extractJSONFromText } from "./utils.js";
// Initialize Groq client

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST /api/extract endpoint
// Expects {html: "..."} in body
// Returns extracted JSON
// Uses Groq LLM to extract structured data from input HTML with a system prompt defining the expected JSON schema

app.post("/api/extract", async (req, res) => {
  try {
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ error: "HTML field is required" });
    }

    const systemPrompt = `
You are an expert JSON extractor. 
Return ONLY valid JSON. 
Output schema:
{
  "product": string,
  "price": number,
  "category": string,
  "brand": string
}
No explanations. No extra text.
`;
// Call Groq LLM for chat completion
// Use the system prompt and user HTML input
// Temperature set to 0 for deterministic output
// Parse the returned text to extract JSON
// Return both parsed JSON and raw text in response
// Handle errors and return appropriate status codes
// Send response with extracted JSON
// 
const completion = await client.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Extract product info:\n${html}` }
  ],
  temperature: 0
});

    const text = completion.choices[0].message.content;
    const parsed = extractJSONFromText(text);

    res.json({
      success: true,
      json: parsed,
      raw: text
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log("Groq server running on http://localhost:" + process.env.PORT)
);
